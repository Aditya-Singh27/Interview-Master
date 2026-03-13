import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router";


const Protected = ({ children }) => {
    const {loading, user} = useAuth()

    if (loading) {
        return (
            <main className='loading-screen'>
                <div className="loading-content">
                    <div className="spinner-container">
                        <div className="spinner-outer"></div>
                        <div className="spinner-inner"></div>
                        <div className="spinner-center"></div>
                    </div>
                    <h1>Checking authentication...</h1>
                    <p>Verifying your session for a secure experience.</p>
                </div>
            </main>
        )
    }
    
    if(!user){
        return <Navigate to={'/login'}/>
    }
    
    return children
}

export default Protected