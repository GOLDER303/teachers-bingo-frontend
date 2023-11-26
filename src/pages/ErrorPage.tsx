import { FallbackProps } from "react-error-boundary"

const ErrorPage: React.FC<FallbackProps> = ({ error, resetErrorBoundary }: FallbackProps) => {
    return (
        <div className="flex h-screen flex-col items-center justify-center pb-20 bg-blue-500 text-white">
            <h1 className="text-4xl text-center mb-16">{error.message || "Something went wrong"}</h1>

            <button
                className="group relative px-8 py-3 border-2 border-white rounded-lg cursor-pointer shadow-lg lg:px-12 lg:py-4"
                onClick={resetErrorBoundary}
            >
                <div className="absolute top-0 left-0 w-full h-full bg-white opacity-20 group-hover:opacity-10"></div>
                <p className="relative text-md text-center lg:text-lg">Try again</p>
            </button>
        </div>
    )
}

export default ErrorPage
