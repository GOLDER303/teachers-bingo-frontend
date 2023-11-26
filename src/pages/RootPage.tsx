import { ErrorBoundary } from "react-error-boundary"
import { Outlet } from "react-router-dom"
import ErrorPage from "./ErrorPage"

const RootPage: React.FC = () => {
    return (
        <ErrorBoundary FallbackComponent={ErrorPage}>
            <Outlet />
        </ErrorBoundary>
    )
}
export default RootPage
