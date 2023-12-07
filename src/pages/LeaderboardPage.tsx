import { useEffect, useState } from "react"
import { useErrorBoundary } from "react-error-boundary"
import { useParams } from "react-router-dom"
import { LeaderboardDTO } from "../dtos/LeaderboardDTO"
import { getBingoGameLeaderboard } from "../services/LeaderboardService"

const LeaderboardPage: React.FC = () => {
    const { showBoundary } = useErrorBoundary()

    const { bingoGameId } = useParams()

    const [leaderboard, setLeaderboard] = useState<LeaderboardDTO>()

    useEffect(() => {
        const fetchData = async (bingoGameId: string) => {
            try {
                const leaderboard = await getBingoGameLeaderboard(bingoGameId)
                setLeaderboard(leaderboard)
            } catch (error) {
                showBoundary(error)
            }
        }

        if (!bingoGameId) {
            showBoundary(new Error("Bingo game id not specified"))
            return
        }

        fetchData(bingoGameId)
    }, [showBoundary, bingoGameId])

    return (
        <div className="flex flex-col h-screen pt-10 items-center bg-blue-500 text-white">
            <h1 className="mb-10 text-3xl font-bold">Leaderboard</h1>

            {leaderboard ? (
                <div className="w-full p-3">
                    <table className="w-1/2 mx-auto text-xl text-center">
                        <thead>
                            <tr>
                                <th className="py-2">Position</th>
                                <th className="py-2">Player Name</th>
                            </tr>
                        </thead>

                        <tbody>
                            {leaderboard.positions.map((position, index) => (
                                <tr
                                    key={index}
                                    className={`${index % 2 === 0 ? "bg-blue-400" : ""}`}
                                >
                                    <td className="py-2">{position.position}</td>
                                    <td className="py-2">{position.playerName}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <h1 className="mt-10 text-xl">Loading the leaderboard...</h1>
            )}
        </div>
    )
}
export default LeaderboardPage
