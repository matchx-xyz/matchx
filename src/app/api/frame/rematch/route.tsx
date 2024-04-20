import { FrameRequest, getFrameHtmlResponse, getFrameMessage } from '@coinbase/onchainkit/frame';
import { NextResponse } from 'next/server';
import { getUserByFid, Step } from '@/lib/db';
import { homeFrame, matchF, matchX, reAction } from '@/lib/frames';

export const runtime = 'edge';

export async function POST(req: Request) {
    const frameRequest: FrameRequest = await req.json();
    const { isValid, message } = await getFrameMessage(frameRequest, {
        neynarApiKey: process.env.NEYNAR_API_KEY,
    })
    if (!isValid) return Response.json({ message: 'Message invalid' }, { status: 400 })
    const user = await getUserByFid(message.interactor.fid.toString())
    if (user?.step === Step.MATCH_COMPLETE || user?.step === Step.F_MATCH) {
        return new NextResponse(getFrameHtmlResponse(matchF(user.id)))
    }

    if (user?.step === Step.X_MATCH) {
        return new NextResponse(getFrameHtmlResponse(matchX(user.id)))
    }

    if (user?.step === Step.REACTION) {
        return new NextResponse(getFrameHtmlResponse(reAction(user.id)))
    }

    return new NextResponse(getFrameHtmlResponse(homeFrame))
}

