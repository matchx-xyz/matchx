/* eslint-disable @next/next/no-img-element */
import { CompleteMatch } from "@/components/match";
import { getById } from "@/lib/db";
import { ImageResponse } from "next/og";

export const runtime = 'edge';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    if (!id) {
        return new Response('Missing id or type', { status: 400 })
    }
    const user = await getById(id)
    if (!user) {
        return new Response('user not found', { status: 404 })
    }

    const fontData = await fetch(new URL('../../../../../assets/Inter-SemiBold.ttf', import.meta.url)).then((res) => res.arrayBuffer())
    const completeLogo = await fetch(new URL('../../../../../assets/complete.png', import.meta.url)).then((res) => res.arrayBuffer())
    const fAvatar = await fetch(new URL(user.fpicture || '', import.meta.url)).then((res) => res.arrayBuffer())
    const xAvatar = await fetch(new URL(user.xpicture || '', import.meta.url)).then((res) => res.arrayBuffer())
    return new ImageResponse(
        (<div style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            fontFamily: '"Inter"',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#E0E0E0',
        }}>
            <CompleteMatch
                logo={completeLogo as any}
                fname={user.fname || ''}
                fAvatar={fAvatar as any}
                xname={user.xname || ''}
                xAvatar={xAvatar as any}
            />
        </div>),
        {
            width: 528,
            height: 276,
            emoji: 'fluentFlat',
            fonts: [
                {
                    name: 'Inter',
                    data: fontData,
                    style: 'normal',
                },
            ],
        },
    )
}