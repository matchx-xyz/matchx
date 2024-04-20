import { FrameMetadataType } from "@coinbase/onchainkit"

export const rootPostCastUrl = ''

export const homeFrame: FrameMetadataType = {
    buttons: [
        {
            action: 'post',
            label: 'Match X',
        }
    ],
    image: 'https://frame.matchx.link/match-x-frame-home.png',
    postUrl: `https://${process.env.WEBSITE_URL}/api/frame`,
}

export const homeOpenGraph = {
    title: "Match X",
    description: "Expand Platforms, Amplify Voices, Enhance Freedom.",
    images: [
        {
            url: homeFrame.image as string,
        },
    ]
}

export const matchF = (id: string): FrameMetadataType => ({
    buttons: [
        {
            action: 'post',
            label: 'Next 👉'
        }
    ],
    image: `https://${process.env.WEBSITE_URL}/api/frame/image?type=f&id=${id}&timestamp=${new Date().getTime()}`,
    postUrl: `https://${process.env.WEBSITE_URL}/api/frame`,
})

export const matchX = (id: string): FrameMetadataType => ({
    buttons: [
        {
            action: 'post',
            label: 'Next 👉'
        }
    ],
    image: `https://${process.env.WEBSITE_URL}/api/frame/image?type=x&id=${id}&timestamp=${new Date().getTime()}`,
    postUrl: `https://${process.env.WEBSITE_URL}/api/frame`,
})

export const reAction = (id: string): FrameMetadataType => ({
    buttons: [
        {
            action: 'post',
            label: 'recast + like, 👉'
        }
    ],
    image: `https://${process.env.WEBSITE_URL}/api/frame/image?type=x&id=${id}&timestamp=${new Date().getTime()}`,
    postUrl: `https://${process.env.WEBSITE_URL}/api/frame`,
})

export const addActionLink = `https://warpcast.com/~/add-cast-action?url=${encodeURIComponent(`https://${process.env.WEBSITE_URL}/api/action`)}`

export const matchComplete = (id: string, xname: string): FrameMetadataType => ({
    buttons: [
        {
            action: 'post',
            label: 'Match X',
            target: `https://${process.env.WEBSITE_URL}/api/frame/rematch`,
        },
        {
            action: 'link',
            label: 'Go X',
            target: `https://x.com/${xname}`
        },
        {
            action: 'link',
            label: 'Action',
            target: addActionLink
        },
    ],
    image: `https://${process.env.WEBSITE_URL}/api/frame/image/complete?id=${id}`,
})