import { getUserByFid, Step } from '@/lib/db'
import { addActionLink, homeFrame, homeOpenGraph, matchComplete, rootPostCastUrl } from '@/lib/frames'
import { getFrameMetadata } from '@coinbase/onchainkit/frame'
import { Metadata, ResolvingMetadata } from 'next'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import CompleteLogo from '@/assets/complete.png'
import Link from 'next/link'

interface UserProps {
    params: { fid: string }
}

export async function generateMetadata(
    { params }: UserProps,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const fid = params.fid
    const user = await getUserByFid(fid)
    if (!user || user.step !== Step.MATCH_COMPLETE) {
        return {
            manifest: '/manifest.json',
            other: {
                ...getFrameMetadata(homeFrame)
            },
            openGraph: homeOpenGraph,
            twitter: {
                ...homeOpenGraph,
                card: 'summary_large_image'
            }
        };
    }
    const md = matchComplete(user.id, user.xname || '')
    return {
        manifest: '/manifest.json',
        title: `Match X`,
        description: `${user.fname} Match with ${user.xname}`,
        other: {
            ...getFrameMetadata(md)
        },
        openGraph: {
            title: `Match X`,
            description: `${user.fname} Match with ${user.xname}`,
            images: [
                {
                    url: md.image as string,
                },
            ]
        },
        twitter: {
            title: `Match X`,
            description: `${user.xname} Match with ${user.fname}`,
            images: [
                {
                    url: md.image as string,
                },
            ],
            card: 'summary_large_image'
        },
    }
}

export default async function User({ params }: UserProps) {
    const fid = params.fid
    const user = await getUserByFid(fid)
    if (!user) {
        redirect('/')
    }
    return (
        <main className="grid place-content-center min-h-screen items-center">
            <div className="w-[528px] h-[276px] bg-[#E0E0E0] flex items-center flex-col justify-center rounded-t-lg relative">
                <Image src={CompleteLogo} alt="complete" />
                <div className="flex items-center justify-start absolute top-[34px] left-[233px] font-semibold">
                    <div className="flex text-[#855DCD]">@{user.fname}</div>
                    <div className="flex ml-2 w-8 h-8">
                        <Image src={user.fpicture || ''} alt="fpicture" width={32} height={32} className="rounded-full" />
                    </div>
                </div>
                <div className="flex items-center justify-end absolute bottom-[34px] right-[230px] font-semibold">
                    <div className="flex w-8 h-8">
                        <Image src={user.xpicture || ''} alt="xpicture" width={32} height={32} className="rounded-full" />
                    </div>
                    <div className="flex text-[#1F1F1F] ml-2">@{user.xname}</div>
                </div>
            </div>
            <div className='grid grid-cols-3 item-center text-center bg-[#f3f3f3] px-4 py-2 gap-[10px] rounded-b-lg'>
                <Link className='rounded-lg border bg-white border-default px-4 py-2 text-sm h-10 items-center hover:bg-[#efefef]' href={rootPostCastUrl}>Match X</Link>
                <Link className='rounded-lg border bg-white border-default px-4 py-2 text-sm h-10 items-center hover:bg-[#efefef]' href={`https://x.com/${user.xname}`}>Go X</Link>
                <Link className='rounded-lg border bg-white border-default px-4 py-2 text-sm h-10 items-center hover:bg-[#efefef]' href={addActionLink}>Action</Link>
            </div>
        </main>
    )
}