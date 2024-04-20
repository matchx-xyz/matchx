/* eslint-disable @next/next/no-img-element */
import { FC } from "react"

interface MatchProps {
    logo: any
    avatar: any
    username: string
    displayName: string
    tip: string
    tipColor: string
    bio: string
    bottomText: string
}

export const BaseMatch: FC<MatchProps> = ({ logo, avatar, username, displayName, bio, tip, tipColor, bottomText }) => {
    return <div tw="w-[528px] h-[276px] bg-[#E0E0E0] flex items-center flex-col rounded-md">
        <div tw="flex relative w-full h-[200px] px-6 bg-[#17101F]">
            <div tw="flex absolute right-6 bottom-4">
                <img width="32" height="32" src={logo as any} tw="rounded-md" alt="logo" />
            </div>
            <div tw="py-9 flex items-start h-[200px]">
                <img src={avatar as any} alt="avatar" width={56} height={56} tw="rounded-full" />
                <div tw="flex flex-col items-start text-white ml-4">
                    <div tw="flex flex-col opacity-55">
                        <div tw="text-lg flex">{displayName}</div>
                        <div tw="flex text-[#8B99A4] text-base">@{username}</div>
                    </div>
                    <div style={{ textOverflow: "ellipsis" }} tw="flex text-base opacity-55 overflow-hidden max-w-[395px] mt-1">{bio}</div>
                    <div tw={`flex text-base text-[${tipColor}] mt-1`}>{tip}</div>
                </div>
            </div>
        </div>
        <div tw="flex justify-center w-full h-full text-base relative text-[#1F1F1F] leading-[70px]">
            {bottomText}
        </div>
    </div>
}

interface CompleteMatchProps {
    logo: string
    fname: string
    fAvatar: string
    xname: string
    xAvatar: string
}

export const CompleteMatch: FC<CompleteMatchProps> = ({ logo, fname, fAvatar, xname, xAvatar }) => {
    return <div tw="w-[528px] h-[276px] bg-[#E0E0E0] flex items-center flex-col justify-center rounded-md relative">
        <img src={logo} alt="complete" width={264} />
        <div tw="flex items-center justify-start absolute top-[34px] left-[233px] font-semibold">
            <div tw="flex text-[#855DCD]">@{fname}</div>
            <div tw="flex ml-2">
                <img src={fAvatar as any} alt="farcaster-avatar" width={32} height={32} tw="rounded-full" />
            </div>
        </div>
        <div tw="flex items-center justify-end absolute bottom-[34px] right-[230px] font-semibold">
            <div tw="flex">
                <img src={xAvatar as any} alt="x-avatar" width={32} height={32} tw="rounded-full" />
            </div>
            <div tw="flex text-[#1F1F1F] ml-2">@{xname}</div>
        </div>
    </div>
}