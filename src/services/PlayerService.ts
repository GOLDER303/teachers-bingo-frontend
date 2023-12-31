import axios from "axios"
import { PlayerInfoDTO } from "../dtos/PlayerInfoDTO"
import { API_URL, PLAYER_ENDPOINT } from "../utils/ApiRoutes"

export const getPlayerInfo = async (playerName: string): Promise<PlayerInfoDTO> => {
    try {
        const response = await axios.get(`${API_URL}/${PLAYER_ENDPOINT}/${playerName}/info`)

        const data = response.data as PlayerInfoDTO

        return data
    } catch (error) {
        const errorMessage = "Problem while fetching player data"

        console.error(`${errorMessage}:\n${error}`)
        throw new Error(errorMessage)
    }
}
