import { io } from 'socket.io-client'

const baseURL = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/sockets`

export const rotationSocket = io(`${baseURL}/rotation`)
