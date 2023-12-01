import React, { useEffect, useState } from "react"
import Confetti from "react-confetti"
import { useErrorBoundary } from "react-error-boundary"
import { Link, useParams, useSearchParams } from "react-router-dom"
import { PlayerInfoDTO } from "../dtos/PlayerInfoDTO"
import { makeChoice } from "../services/BingoGameService"
import { getPlayerInfo } from "../services/PlayerService"

const BingoGamePage: React.FC = () => {
    const { showBoundary } = useErrorBoundary()

    const [searchParams] = useSearchParams()

    const { bingoGameId } = useParams()
    const playerName = searchParams.get("playerName")

    const [playerInfo, setPlayerInfo] = useState<PlayerInfoDTO>()
    const [playerHasWon, setPlayerHasWon] = useState(false)

    const [isConfettiActive, setIsConfettiActive] = useState(false)

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
            try {
                const playerInfo = await getPlayerInfo(playerName)
                setPlayerInfo(playerInfo)
            } catch (error) {
                showBoundary(error)
            }
        }

        fetchData(playerName)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [playerName])

    const handlePhraseClick = async (x: number, y: number) => {
        setPlayerInfo((prevPlayerInfo) => {
            if (!prevPlayerInfo) {
                return prevPlayerInfo
            }

            const newPlayerInfo = { ...prevPlayerInfo }

            newPlayerInfo.currentChoices = JSON.parse(JSON.stringify(prevPlayerInfo.currentChoices))

            newPlayerInfo.currentChoices[x][y] = !newPlayerInfo.currentChoices[x][y]

            return newPlayerInfo
        })

        try {
            const playerChoiceResponseDTO = await makeChoice(parseInt(bingoGameId!), playerName!, { x, y })

            if (!playerHasWon && playerChoiceResponseDTO.playerHasWon) {
                setIsConfettiActive(true)
            }

            setPlayerHasWon(playerChoiceResponseDTO.playerHasWon)

            setPlayerInfo((prevPlayerInfo) => {
                if (!prevPlayerInfo) {
                    return prevPlayerInfo
                }

                return { ...prevPlayerInfo, currentChoices: playerChoiceResponseDTO.currentChoices }
            })
        } catch (error) {
            showBoundary(error)
        }
    }

    return (
        <div className="flex flex-col min-h-screen py-10 items-center bg-blue-500 text-white">
            <h1 className="mb-10 text-3xl font-bold">Bingo Name</h1>

            {isConfettiActive && (
                <Confetti
                    width={window.innerWidth}
                    height={window.innerHeight}
                    numberOfPieces={700}
                    gravity={0.4}
                    recycle={false}
                    onConfettiComplete={() => {
                        setIsConfettiActive(false)
                    }}
                />
            )}

            {/* bingo grid */}
            {playerInfo ? (
                <div className="grid max-w-3xl grid-cols-3 grid-rows-3 gap-1 md:gap-2">
                    {playerInfo.currentPhrases.map((row, rowIndex) => {
                        return (
                            <React.Fragment key={`row-${rowIndex}`}>
                                {row.map((phrase, colIndex) => {
                                    const key = `cel-${rowIndex}-${colIndex}`

                                    return (
                                        <div
                                            className="relative flex w-full h-full p-3 aspect-square items-center justify-center bg-blue-400 rounded-xl cursor-pointer hover:bg-blue-300 md:p-5"
                                            key={key}
                                            onClick={() => {
                                                handlePhraseClick(rowIndex, colIndex)
                                            }}
                                        >
                                            {playerInfo.currentChoices[rowIndex][colIndex] && (
                                                <svg
                                                    className="absolute w-full p-3 stroke-red-500 fill-red-500 opacity-90"
                                                    width="60mm"
                                                    height="60mm"
                                                    viewBox="0 0 60 60"
                                                >
                                                    <g>
                                                        <rect
                                                            strokeWidth=".969107"
                                                            width="77.529"
                                                            height="11.629"
                                                            x="-38.764"
                                                            y="36.612"
                                                            ry="4.846"
                                                            transform="rotate(-45)"
                                                        />
                                                        <rect
                                                            strokeWidth=".969107"
                                                            width="77.529"
                                                            height="11.629"
                                                            x="-81.191"
                                                            y="-5.815"
                                                            ry="4.846"
                                                            transform="rotate(-135)"
                                                        />
                                                    </g>
                                                </svg>
                                            )}
                                            <p className="text-base leading-none text-center sm:text-xl lg:leading-snug">
                                                {phrase}
                                            </p>
                                        </div>
                                    )
                                })}
                            </React.Fragment>
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
