import axios from "axios"

const API_URL: string = import.meta.env.VITE_API_URL

export const JoinCurrentBingo = async (playerName: string) => {
    try {
        const response = await axios.post(`${API_URL}/api/bingo/join`, { PlayerName: playerName })

        const data = response.data

        const bingoId = data as number

        return bingoId
    } catch (error) {
        //TODO: error handling
        console.error(error)
    }
}
