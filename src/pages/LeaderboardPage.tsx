const LeaderboardPage: React.FC = () => {
    const positions = [
        {
            playerName: "test1",
            position: 1,
            bingoWinsCount: 2,
        },
        {
            playerName: "test2",
            position: 2,
            bingoWinsCount: 1,
        },
        {
            playerName: "test3",
            position: 2,
            bingoWinsCount: 1,
        },
    ]

    return (
        <div className="flex flex-col h-screen pt-10 items-center bg-blue-500 text-white">
            <h1 className="mb-10 text-3xl font-bold">General Leaderboard</h1>

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
                        {positions.map((position, index) => (
                            <tr
                                key={index}
                                className={`${index % 2 === 0 ? "bg-blue-400" : ""} rounded-`}
                            >
                                <td className="py-2">{position.position}</td>
                                <td className="py-2">{position.playerName}</td>
                                <td className="py-2">{position.bingoWinsCount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default LeaderboardPage
