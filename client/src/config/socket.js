import { io } from 'socket.io-client'

const baseURL = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/sockets`

export const rotationSocket = io(`${baseURL}/rotation`)
export const chatSocket = io(`${baseURL}/chat`)
export const codeSocket = io(`${baseURL}/code`)
export const videoSocket = io.connect(`${baseURL}/video`)
