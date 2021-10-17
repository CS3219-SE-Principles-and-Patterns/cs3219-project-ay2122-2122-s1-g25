import { io } from 'socket.io-client'

export const rotationSocket = io('http://localhost:4000/sockets/rotation')
