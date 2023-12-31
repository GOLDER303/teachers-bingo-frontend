import { useRef, useState } from "react"
import { Link, createSearchParams, useNavigate } from "react-router-dom"
import { JoinCurrentBingo } from "../services/BingoGameService"
import LeaderboardIcon from "/img/LeaderboardIcon.svg"

const MainPage: React.FC = () => {
    const navigate = useNavigate()

    const playerNameInputRef = useRef<HTMLInputElement>(null)

    const [error, setError] = useState<string | undefined>()

    const handlePlayerNameSubmit = async () => {
        if (!playerNameInputRef.current || !playerNameInputRef.current.value) {
            return
        }

        setError("")

        const playerName = playerNameInputRef.current.value

        try {
            const bingoGameId = await JoinCurrentBingo(playerName)
            const bingoGameSearchParams = { playerName }

            navigate({
                pathname: `/bingoGame/${bingoGameId}`,
                search: createSearchParams(bingoGameSearchParams).toString(),
            })
        } catch (error) {
            setError("Problem while joining the game. Try again later")
            return
        }
    }

    return (
        <div className="flex flex-col h-screen pb-20 items-center justify-center bg-blue-500 text-white">
            <h1 className="mb-20 text-5xl font-bold">Teacher's Bingo</h1>

            <form
                className="flex flex-col h-1/3 items-center justify-between"
                onSubmit={(event) => {
                    event.preventDefault()
                    handlePlayerNameSubmit()
                }}
            >
                <label
                    className="text-3xl"
                    htmlFor="playerName"
                >
                    Enter Your Name:
                </label>
                <input
                    className="p-1 text-2xl text-neutral-700 text-center rounded-lg"
                    type="text"
                    name="playerName"
                    id="playerName"
                    placeholder="Your Name"
                    ref={playerNameInputRef}
                />
                <button
                    className="px-10 py-3 text-2xl border-2 border-white rounded-xl"
                    type="submit"
                >
                    Play
                </button>

                <Link
                    className="flex p-3 items-center justify-center border-2 border-white rounded-xl"
                    to={"/leaderboard"}
                >
                    <img
                        width={35}
                        src={LeaderboardIcon}
                    />
                </Link>
            </form>
            <p className={`h-4 pt-5 ${error ? "opacity-100" : "opacity-0"}`}>{error}</p>
        </div>
    )
}

export default MainPage
