import axios from "axios"
import { GeneralLeaderboardDTO } from "../dtos/GeneralLeaderboardDTO"

const API_URL: string = import.meta.env.VITE_API_URL

export const getGeneralLeaderboard = async (): Promise<GeneralLeaderboardDTO> => {
    try {
        const response = await axios.get(`${API_URL}/api/leaderboard/general`)

        const data = response.data

        const leaderboard = data as GeneralLeaderboardDTO

        return leaderboard
    } catch (error) {
        const errorMessage = "Error while fetching general leaderboard"

        console.error(`${errorMessage}:\n${error}`)
        throw new Error(errorMessage)
    }
}
