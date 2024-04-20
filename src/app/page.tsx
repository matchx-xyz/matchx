import Link from "next/link"
import Image from "next/image"
import { rootPostCastUrl } from "@/lib/frames"


export default function Home() {
  return (
    <main className="grid place-content-center min-h-screen items-center">
      <div className="w-[528px] h-[276px] bg-[#E0E0E0] flex items-center flex-col justify-center rounded-t-lg relative">
        <Image src={"https://frame.matchx.link/match-x-frame-home.png"} width={528} height={276} className="rounded-t-lg" alt="home" />
      </div>
      <div className='flex item-center text-center bg-[#f3f3f3] px-4 py-2 gap-[10px] rounded-b-lg'>
        <Link className='rounded-lg border bg-white border-default px-4 py-2 text-sm h-10 items-center hover:bg-[#efefef] w-full' href={rootPostCastUrl}>Match X</Link>
      </div>
    </main>
  )
}
