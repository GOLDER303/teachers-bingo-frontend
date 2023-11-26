import axios from "axios"
import { CoordinatesDTO } from "../dtos/CoordinatesDTO"
import { PlayerChoiceDTO } from "../dtos/PlayerChoiceDTO"
import { PlayerChoiceResponseDTO } from "../dtos/PlayerChoiceResponseDTO"

const API_URL: string = import.meta.env.VITE_API_URL

export const JoinCurrentBingo = async (playerName: string) => {
    try {
        const response = await axios.post(`${API_URL}/api/bingo/join`, { PlayerName: playerName })

        const data = response.data

        const bingoId = data as number

        return bingoId
    } catch (error) {
        const errorMessage = "Error while joining bingo game"

        console.error(`${errorMessage}:\n${error}`)
        throw new Error(errorMessage)
    }
}

export const makeChoice = async (
    bingoGameId: number,
    playerName: string,
    coordinates: CoordinatesDTO
): Promise<PlayerChoiceResponseDTO> => {
    try {
        const payload: PlayerChoiceDTO = {
            playerName,
            coordinates,
        }

        const response = await axios.post(`${API_URL}/api/bingo/${bingoGameId}/choice`, payload)

        const data = response.data

        const playerChoiceResponseDTO = data as PlayerChoiceResponseDTO

        return playerChoiceResponseDTO
    } catch (error) {
        const errorMessage = "Error while making choice"

        console.error(`${errorMessage}:\n${error}`)
        throw new Error(errorMessage)
    }
}
