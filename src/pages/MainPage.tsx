import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import { JoinCurrentBingo } from "../services/BingoGameService"

const MainPage: React.FC = () => {
    const playerNameInputRef = useRef<HTMLInputElement>(null)

    const navigate = useNavigate()

    const handlePlayerNameSubmit = async () => {
        if (!playerNameInputRef.current || !playerNameInputRef.current.value) {
            return
        }

        const playerName = playerNameInputRef.current.value

        const bingoGameId = await JoinCurrentBingo(playerName)

        navigate(`/bingoGame/${bingoGameId}`)
    }

    return (
        <div className="flex flex-col h-screen pb-20 items-center justify-center bg-blue-500 text-white">
            <h1 className="mb-20 text-5xl font-bold">Teacher's Bingo</h1>
            <form
                className="flex flex-col h-1/4 items-center justify-between"
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
            </form>
        </div>
    )
}

export default MainPage
