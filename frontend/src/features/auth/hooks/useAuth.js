import { useContext, useEffect } from "react"
import { AuthContext } from "../auth_context"
import { register, login, logout, getMe } from "../services/auth_api"



export const useAuth = () => {

    const context = useContext(AuthContext)
    const { user, setUser, loading, setLoading } = context

    const handleLogin = async ({ email, password }) => {

        setLoading(true)
        try {
            const data = await login({ email, password })           // in backend login controller sends data       
            if (data && data.user) {
                setUser(data.user)
                console.log("Login successful:", data)
            }
        }
        catch (error) {
            console.error("Login failed:", error)
        }
        finally {
            setLoading(false)
        }
    }

    const handleRegister = async ({ username, email, password }) => {
        setLoading(true)
        try {
            const data = await register({ username, email, password })
            if (data && data.user) {
                setUser(data.user)
            }
        }
        catch (error) {
            console.error("Registration failed:", error)
        }
        finally {
            setLoading(false)
        }
    }

    const handleLogout = async () => {
        setLoading(true)
        try {
            await logout()                 // no data is sent from backend logout controller
            setUser(null)
        }
        catch (error) {
            console.error("Logout failed:", error)
        }
        finally {
            setLoading(false)
        }
    }

    const handleGetMe = async () => {
        setLoading(true)
        try {
            const data = await getMe()      // in backend getMe controller sends data
            if (data && data.user) {
                setUser(data.user)
            }
        }
        catch (error) {
            console.error("Failed to fetch user info:", error)
        }
        finally {
            setLoading(false)
        }
    }


    return {
        user,
        loading,
        handleLogin,
        handleRegister,
        handleLogout,
        handleGetMe
    }
}

