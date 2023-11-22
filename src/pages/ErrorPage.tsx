import { isRouteErrorResponse, useNavigate, useRouteError } from "react-router-dom"

const ErrorPage: React.FC = () => {
    const navigate = useNavigate()

    const error = useRouteError()

    let errorMessage: string

    if (isRouteErrorResponse(error)) {
        errorMessage = `${error.status} ${error.statusText}`
    } else if (error instanceof Error) {
        errorMessage = error.message
    } else if (typeof error === "string") {
        errorMessage = error
    } else {
        console.error(error)
        errorMessage = "Unknown error"
    }

    const goToHomePage = () => {
        navigate("/")
    }

    return (
        <div className="flex h-screen flex-col items-center justify-center pb-20 bg-blue-500 text-white">
            <h1 className="text-4xl text-center mb-16">{errorMessage}</h1>

            <button
                className="group relative px-8 py-3 border-2 border-white rounded-lg cursor-pointer shadow-lg lg:px-12 lg:py-4"
                onClick={goToHomePage}
            >
                <div className="absolute top-0 left-0 w-full h-full bg-white opacity-20 group-hover:opacity-10"></div>
                <p className="relative text-md text-center lg:text-lg">Go to Home Page</p>
            </button>
        </div>
    )
}

export default ErrorPage
