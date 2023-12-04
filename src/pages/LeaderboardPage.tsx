import { useEffect, useState } from "react"
import { useErrorBoundary } from "react-error-boundary"
import { GeneralLeaderboardDTO } from "../dtos/GeneralLeaderboardDTO"
import { getGeneralLeaderboard } from "../services/LeaderboardService"

const LeaderboardPage: React.FC = () => {
    const { showBoundary } = useErrorBoundary()

    const [generalLeaderboard, setGeneralLeaderboard] = useState<GeneralLeaderboardDTO>()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const generalLeaderboard = await getGeneralLeaderboard()
                setGeneralLeaderboard(generalLeaderboard)
            } catch (error) {
                showBoundary(error)
            }
        }

        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="flex flex-col h-screen pt-10 items-center bg-blue-500 text-white">
            <h1 className="mb-10 text-3xl font-bold">General Leaderboard</h1>

            {generalLeaderboard ? (
                <div className="w-full p-3">
                    <table className="w-full text-xl text-center">
                        <thead>
                            <tr className="">
                                <th className="py-2">Position</th>
                                <th className="py-2">Player Name</th>
                                <th className="py-2">Win Count</th>
                            </tr>
                        </thead>

                        <tbody>
                            {generalLeaderboard.positions.map((position, index) => (
                                <tr
                                    key={index}
                                    className={`${index % 2 === 0 ? "bg-blue-400" : ""}`}
                                >
                                    <td className="py-2">{position.position}</td>
                                    <td className="py-2">{position.playerName}</td>
                                    <td className="py-2">{position.bingoWinsCount}</td>
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
