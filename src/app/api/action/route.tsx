import { postCast } from '@/lib/utils';
import { FrameRequest, getFrameMessage } from '@coinbase/onchainkit/frame';

export const runtime = 'edge';

export async function POST(req: Request) {
    const frameRequest: FrameRequest = await req.json();
    const { isValid, message } = await getFrameMessage(frameRequest, {
        neynarApiKey: process.env.NEYNAR_API_KEY,
    })
    if (!isValid) return Response.json({ message: 'Message Invalid' }, { status: 400 })

    const posted = await postCast('', [{ url: `https://${process.env.WEBSITE_URL}/user/${message.raw.action.cast.author.fid}` }], message.raw.action.cast.hash)
    if (posted) return Response.json({ message: 'Check Cast Reply!' }, { status: 200 })
    return Response.json({ message: 'Server error' }, { status: 400 })
}

export async function GET() {
    return Response.json({
        name: 'Match X',
        icon: 'workflow',
        description: 'Automatically reply to the trigger cast with author "Match X".',
        aboutUrl: 'https://www.matchx.link',
        action: { type: 'post' }
    }, { status: 200 })
}