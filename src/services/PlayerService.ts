import axios from "axios"
import { PlayerInfoDTO } from "../dtos/PlayerInfoDTO"

const API_URL: string = import.meta.env.VITE_API_URL

export const getPlayerInfo = async (playerName: string): Promise<PlayerInfoDTO> => {
    try {
        const response = await axios.get(`${API_URL}/api/player/${playerName}/info`)

        const data = response.data as PlayerInfoDTO

        return data
    } catch (error) {
        const errorMessage = "Problem while fetching player data"

        console.error(`${errorMessage}:\n${error}`)
        throw new Error(errorMessage)
    }
}
