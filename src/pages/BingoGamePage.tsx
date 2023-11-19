const BingoGamePage: React.FC = () => {
    const phrases = [
        ["Phrase 1", "Phrase 2", "Phrase 3"],
        ["Phrase 4", "Phrase 5", "Phrase 6"],
        ["Phrase 7", "Phrase 8", "Phrase 9"],
    ]

    const handlePhraseClick = (x: number, y: number) => {
        console.log(`x: ${x}, y: ${y}`)
    }

    return (
        <div className="flex flex-col min-h-screen py-10 items-center bg-blue-500 text-white">
            <h1 className="mb-10 text-3xl font-bold">Bingo Name</h1>

            {/* bingo grid */}
            <div className="grid max-w-3xl grid-cols-3 grid-rows-3 gap-1 md:gap-2">
                {phrases.map((row, rowIndex) => {
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
