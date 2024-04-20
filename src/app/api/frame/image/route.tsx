/* eslint-disable @next/next/no-img-element */
import { BaseMatch, CompleteMatch } from "@/components/match";
import { getById } from "@/lib/db";
import { truncatedMatchBio } from "@/lib/utils";
import { ImageResponse } from "next/og";

export const runtime = 'edge';

const matchFBottomText = `😊 Please add X @Username in your Farcaster bio.`
const matchXBottomText = (fname: string) => `😊 Please add Farcaster @${fname} in your X bio.`
const matchFTipColor = "#C848FF"
const matchXTipColor = "#1C86EC"

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    const type = searchParams.get('type')
    if (!id || !type || (type !== 'f' && type !== 'x')) {
        return new Response('Missing id or type', { status: 400 })
    }
    const user = await getById(id)
    if (!user) {
        return new Response('user not found', { status: 404 })
    }

    if (type === 'f') {
        const fontData = await fetch(new URL('../../../../assets/Inter-Medium.ttf', import.meta.url)).then((res) => res.arrayBuffer())
        const avatarData = await fetch(new URL(user.fpicture || '', import.meta.url)).then((res) => res.arrayBuffer())
        const logoData = await fetch(new URL('../../../../assets/farcast-logo.png', import.meta.url)).then((res) => res.arrayBuffer())
        const bio = truncatedMatchBio(user.fbio || '', 370)
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
                <BaseMatch
                    logo={logoData}
                    avatar={avatarData}
                    username={user.fname || ''}
                    displayName={user.fdisplayName || ''}
                    tip="X @TwitterUsername"
                    tipColor={matchFTipColor}
                    bio={bio}
                    bottomText={matchFBottomText} />
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
        );
    }
    if (type === 'x') {
        const fontData = await fetch(new URL('../../../../assets/Inter-Medium.ttf', import.meta.url)).then((res) => res.arrayBuffer())
        const avatarData = await fetch(new URL(user.xpicture || '', import.meta.url)).then((res) => res.arrayBuffer())
        const logoData = await fetch(new URL('../../../../assets/x-logo.png', import.meta.url)
        ).then((res) => res.arrayBuffer())
        const bio = truncatedMatchBio(user.xbio || '', 370)
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
                <BaseMatch
                    logo={logoData}
                    avatar={avatarData}
                    username={user.xname || ''}
                    displayName={user.xdisplayName || ''}
                    tip={`Farcaster @${user.fname || ''}`}
                    tipColor={matchXTipColor}
                    bio={bio}
                    bottomText={matchXBottomText(user.fname || '')} />
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
        );
    }
    return new Response('type is illegal', { status: 400 })
}