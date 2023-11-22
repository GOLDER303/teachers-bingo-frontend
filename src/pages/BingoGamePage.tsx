import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { PlayerInfoDTO } from "../dtos/PlayerInfoDTO"
import { getPlayerInfo } from "../services/PlayerService"

const BingoGamePage: React.FC = () => {
    const [searchParams] = useSearchParams()

    const playerName = searchParams.get("playerName")

    const [playerInfo, setPlayerInfo] = useState<PlayerInfoDTO>()

    useEffect(() => {
        if (!playerName) {
            throw new Error("Player name not specified!")
        }

        const fetchData = async (playerName: string) => {
            const playerInfo = await getPlayerInfo(playerName)
            setPlayerInfo(playerInfo)
        }

        fetchData(playerName)
    }, [playerName])

    const handlePhraseClick = (x: number, y: number) => {
        console.log(`x: ${x}, y: ${y}`)
    }

    return (
        <div className="flex flex-col min-h-screen py-10 items-center bg-blue-500 text-white">
            <h1 className="mb-10 text-3xl font-bold">Bingo Name</h1>

            {/* bingo grid */}
            <div className="grid max-w-3xl grid-cols-3 grid-rows-3 gap-1 md:gap-2">
                {playerInfo?.currentPhrases.map((row, rowIndex) => {
                    return (
                        <>
                            {row.map((phrase, colIndex) => {
                                return (
                                    <div
                                        className="flex w-full h-full p-3 aspect-square items-center justify-center bg-blue-400 rounded-xl cursor-pointer hover:bg-blue-300 md:p-5"
                                        onClick={() => {
                                            handlePhraseClick(rowIndex, colIndex)
                                        }}
                                    >
                                        <p className="text-base leading-none text-center sm:text-xl lg:leading-snug">
                                            {phrase}
                                        </p>
                                    </div>
                                )
                            })}
                        </>
                    )
                })}
            </div>
        </div>
    )
}
export default BingoGamePage
