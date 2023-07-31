import { connect } from 'socket.io-client';

class Helper {
    private socket = connect(process.env.TIC_TAC_TOE_GAME_SOCKET_CONNECTION_URL!)

    createRoom = async (player1Id: string, player1Name: string, player2Id: string, player2Name: string, roomId: string) => {
        this.socket.emit('joinRoom', { username: player1Name, userId: player1Id, roomId: roomId })
        this.socket.emit('joinExistingRoom', { username: player2Name, userId: player2Id, roomId: roomId });
    }
}

const helper = new Helper()
export default helper
