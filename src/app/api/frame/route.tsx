import { FrameRequest, getFrameHtmlResponse, getFrameMessage } from '@coinbase/onchainkit/frame';
import { NextResponse } from 'next/server';
import { getOrCreateUser, Step, updateMatchX, updateUserComplete } from '@/lib/db';
import { matchComplete, matchF, matchX, reAction } from '@/lib/frames';
import { extractTwitterUsername, getTwitterUserInfo } from '@/lib/utils';

export const runtime = 'edge';

export async function POST(req: Request) {
    const frameRequest: FrameRequest = await req.json();
    const { isValid, message } = await getFrameMessage(frameRequest, {
        neynarApiKey: process.env.NEYNAR_API_KEY,
    })
    if (!isValid) return Response.json({ message: 'Message invalid' }, { status: 400 })
    const user = await getOrCreateUser(message)

    let fbio = user.fbio
    let step: Step = user.step as Step
    let xname = user.xname

    // check
    if (step === Step.F_MATCH) {
        xname = extractTwitterUsername(fbio || '')
        if (xname) step = Step.X_MATCH
    }

    if (step === Step.X_MATCH) {
        if (!xname) return Response.json({ message: 'X User not found' }, { status: 404 })
        const xUser = await getTwitterUserInfo(xname)
        if (xUser) {
            step = Step.X_MATCH
            if (xUser.twitterBio.endsWith(`Farcaster @${user.fname}`)) {
                step = Step.REACTION
            }
            const upUser = await updateMatchX(user, xUser, step)
            if (!upUser) return Response.json({ message: 'The server is not responding' }, { status: 400 })
        }
    }

    if (step === Step.REACTION) {
        if (message.recasted && message.liked) {
            step = Step.MATCH_COMPLETE
            await updateUserComplete(user)
        }
    }

    // render
    if (step === Step.F_MATCH) {
        return new NextResponse(getFrameHtmlResponse(matchF(user.id)))
    }

    if (step === Step.X_MATCH) {
        return new NextResponse(getFrameHtmlResponse(matchX(user.id)))
    }

    if (step === Step.REACTION) {
        return new NextResponse(getFrameHtmlResponse(reAction(user.id)))
    }

    if (step === Step.MATCH_COMPLETE) {
        return new NextResponse(getFrameHtmlResponse(matchComplete(user.id, user.xname || '')))
    }
    
    return Response.json({ message: 'Step invalid' }, { status: 400 })

}

