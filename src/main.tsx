import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import BingoGamePage from "./pages/BingoGamePage.tsx"
import MainPage from "./pages/MainPage.tsx"
import "./style/index.css"

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainPage />,
    },
    {
        path: "/bingoGame/:id",
        element: <BingoGamePage />,
    },
])

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)
