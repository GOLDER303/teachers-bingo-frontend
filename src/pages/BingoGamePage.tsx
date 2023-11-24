import React, { useEffect, useState } from "react"
import { Link, useParams, useSearchParams } from "react-router-dom"
import { PlayerInfoDTO } from "../dtos/PlayerInfoDTO"
import CrossSvg from "../img/RedCross.svg"
import { makeChoice } from "../services/BingoGameService"
import { getPlayerInfo } from "../services/PlayerService"

const BingoGamePage: React.FC = () => {
    const [searchParams] = useSearchParams()

    const { bingoGameId } = useParams()
    const playerName = searchParams.get("playerName")

    const [playerInfo, setPlayerInfo] = useState<PlayerInfoDTO>()

    useEffect(() => {
        if (!bingoGameId) {
            throw new Error("Bingo game id not specified!")
        }
    }, [bingoGameId])

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

    const handlePhraseClick = async (x: number, y: number) => {
        const playerChoiceResponseDTO = await makeChoice(parseInt(bingoGameId!), playerName!, { x, y })

        if (!playerChoiceResponseDTO) {
            console.error("Something went wrong while handling player choice")
            return
        }

        setPlayerInfo((prevPlayerInfo) => {
            if (!prevPlayerInfo) {
                return prevPlayerInfo
            }

            return { ...prevPlayerInfo, currentChoices: playerChoiceResponseDTO.currentChoices }
        })
    }

    return (
        <div className="flex flex-col min-h-screen py-10 items-center bg-blue-500 text-white">
            <h1 className="mb-10 text-3xl font-bold">Bingo Name</h1>

            {/* bingo grid */}
            {playerInfo ? (
                <div className="grid max-w-3xl grid-cols-3 grid-rows-3 gap-1 md:gap-2">
                    {playerInfo.currentPhrases.map((row, rowIndex) => {
                        return (
                            <>
                                {row.map((phrase, colIndex) => {
                                    return (
                                        <div
                                            className="relative flex w-full h-full p-3 aspect-square items-center justify-center bg-blue-400 rounded-xl cursor-pointer hover:bg-blue-300 md:p-5"
                                            onClick={() => {
                                                handlePhraseClick(rowIndex, colIndex)
                                            }}
                                        >
                                            {playerInfo.currentChoices[rowIndex][colIndex] && (
                                                <img
                                                    className="absolute w-full p-3 stroke-red-500 fill-red-500"
                                                    src={CrossSvg}
                                                />
                                            )}
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
            ) : (
                <div className="flex flex-col mt-32 gap-9 items-center justify-between">
                    <h2 className="text-2xl text-center">Error while fetching player info. Try again later</h2>

                    <button className="px-8 py-3 border-2 border-white rounded-lg cursor-pointer shadow-lg lg:px-12 lg:py-4">
                        <Link
                            className="relative text-md text-center lg:text-lg"
                            to={"/"}
                        >
                            Go to Home Page
                        </Link>
                    </button>
                </div>
            )}
        </div>
    )
}
export default BingoGamePage
