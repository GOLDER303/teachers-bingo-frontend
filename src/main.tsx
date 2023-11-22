import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import BingoGamePage from "./pages/BingoGamePage.tsx"
import ErrorPage from "./pages/ErrorPage.tsx"
import MainPage from "./pages/MainPage.tsx"
import "./style/index.css"

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainPage />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/bingoGame/:bingoGameId",
        element: <BingoGamePage />,
        errorElement: <ErrorPage />,
    },
])

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)
