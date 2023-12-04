import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import BingoGamePage from "./pages/BingoGamePage.tsx"
import LeaderboardPage from "./pages/LeaderboardPage.tsx"
import MainPage from "./pages/MainPage.tsx"
import RootPage from "./pages/RootPage.tsx"
import "./style/index.css"

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootPage />,
        children: [
            {
                index: true,
                element: <MainPage />,
            },
            {
                path: "/bingoGame/:bingoGameId",
                element: <BingoGamePage />,
            },
            {
                path: "/leaderboard",
                element: <LeaderboardPage />,
            },
        ],
    },
])

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)
