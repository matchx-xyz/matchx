import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function truncatedMatchBio(text: string, maxWidth: number) {
  const avgCharWidth = 8
  const maxChars = Math.floor(maxWidth / avgCharWidth)

  let truncatedText = text
  if (text.length * avgCharWidth > maxWidth) {
    truncatedText = text.slice(0, maxChars - 3) + '...'
  }
  return truncatedText
}

export interface XUser {
  twitterId: string
  twitterUsername: string
  twitterDisplayName: string
  twitterBio: string
  twitterProfilePic: string
}

export async function getTwitterUserInfo(username: string): Promise<XUser | null> {
  const res = await fetch(`${process.env.X_API_URL}${username}`)
  if (!res.ok) return null
  return (await res.json()) as XUser
}

export async function postCast(text: string, embeds: any[], parent?: string) {
  const body = {
    text,
    embeds,
    signer_uuid: process.env.NEYNAR_SIGNER_UUID,
    parent,
  }
  const res = await fetch("https://api.neynar.com/v2/farcaster/cast", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api_key': process.env.NEYNAR_API_KEY || '',
      'accept': 'application/json',
    },
    body: JSON.stringify(body),
  })
  console.log(await res.json())
  return res.ok
}

export function extractTwitterUsername(text?: string): string | null {
  if (!text) return null
  const regex = /X @([a-zA-Z][a-zA-Z0-9_]{0,14})$/;
  const match = text.match(regex);

  if (match) {
    return match[1];
  } else {
    return null;
  }
}