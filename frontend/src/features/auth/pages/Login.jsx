import React from 'react'
import { useState } from 'react'
import { useAuth } from '../hooks/useAuth.js'

import { useNavigate, Link } from 'react-router'
import '../form.scss'

const login = () => {

    const navigate = useNavigate()

    const { loading, handleLogin } = useAuth()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        await handleLogin({ email, password })
        navigate("/")
    }

    if (loading) {
        return (<main className="auth-dashboard"><h1>Loading...</h1></main>)
    }

    return (
        <main className="auth-dashboard">
            <div className="auth-container">
                <header className="auth-header">
                    <h1>Interview <span>Master</span></h1>
                    <p>Welcome back! Please login to your account.</p>
                </header>

                <form onSubmit={handleSubmit}>

                    <div className="input-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            type="email" id="email" name="email" placeholder='name@company.com' />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type="password" id='password' name="password" placeholder='Enter your password...' />
                    </div>

                    <button className='submit-btn'>
                        Login
                    </button>

                </form>

                <div className="auth-footer">
                    <p>Don't have an account? <Link to="/register">Register</Link></p>
                </div>

            </div>
        </main>
    )
}

export default login
