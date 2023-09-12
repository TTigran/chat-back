export type MessageData = {
    imageURL: string,
    username: string,
    roomId: string,
    clientId: string,
    date: string,
    message: string,
}

export type JsonForJoining ={
    username: string,
    joinedRoomId: string,
    imageURL: string
}