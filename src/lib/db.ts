import type { FrameValidationData } from '@coinbase/onchainkit'
import { getXataClient, User, UserRecord } from './xata'
import { XUser } from './utils'


const xata = getXataClient()

export enum Step {
    F_MATCH = 'F_MATCH',
    X_MATCH = 'X_MATCH',
    REACTION = 'REACTION',
    MATCH_COMPLETE = 'MATCH_COMPLETE',
}


export const getById = async (id: string): Promise<UserRecord | null> => {
    return await xata.db.User.read(`${id}`)
}


export const getOrCreateUser = async (msg: FrameValidationData): Promise<UserRecord> => {
    const user = await xata.db.User.filter({ fid: `${msg.interactor.fid}` }).getFirst()
    const info = {
        fid: msg.interactor.fid.toString(),
        fname: msg.raw.action.interactor.username || '',
        fdisplayName: msg.raw.action.interactor.display_name || '',
        fbio: msg.raw.action.interactor.profile.bio.text || '',
        fpicture: msg.raw.action.interactor.pfp_url || '',
    }
    if (user) {
        return (await xata.db.User.update(user.id, info)) as UserRecord
    }
    return await xata.db.User.create(info)
}

export const getUserByFid = async (fid: string): Promise<UserRecord | null> => {
    return await xata.db.User.filter({ fid }).getFirst()
}

export const updateUserComplete = async (user: UserRecord) => {
    await xata.db.User.update(user.id, { step: Step.MATCH_COMPLETE })
}


export const updateMatchX = async (user: UserRecord, xUser: XUser, step: Step = Step.X_MATCH): Promise<UserRecord | null> => {
    const newUser = await xata.db.User.update(user.id, {
        xid: xUser.twitterId,
        xname: xUser.twitterUsername,
        xdisplayName: xUser.twitterDisplayName,
        xbio: xUser.twitterBio,
        xpicture: xUser.twitterProfilePic,
        step: step,
    })
    return newUser
}
