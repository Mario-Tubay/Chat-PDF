import { writable } from "svelte/store";

export const APP_STATUS = {
    INIT: 0,
    LOADING: 1,
    CHAT_MODE: 2,
    ERROR: -1,
}

export const appStatus = writable(APP_STATUS.CHAT_MODE)
export const appStatusInfo = writable({id: 'b30aff1760dff3e341fbd5c1e98550c2', url: 'https://res.cloudinary.com/din1likc0/image/upload/v1707452167/pdf/a2vpmmalpnlt4d0jftc7.pdf', pages: 4})

export const setAppstatusLoading = () => {
    appStatus.set(APP_STATUS.LOADING)
}

export const setAppStatusError = () => {
    appStatus.set(APP_STATUS.ERROR)
}

export const setAppStatusAppChatMode = ({id, url, pages}: { id: string, url: string, pages: number}) => {
    appStatus.set(APP_STATUS.CHAT_MODE)
    appStatusInfo.set({id, url, pages})
}