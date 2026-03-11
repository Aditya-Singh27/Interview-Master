import React, { useState } from 'react'
import '../form.scss'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth.js'

const Register = () => {

    const navigate = useNavigate()
    const { loading, handleRegister } = useAuth()

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        await handleRegister({ username, email, password })
        navigate("/login")
    }

    if (loading) {
        return (<main className="auth-dashboard"><h1>Loading...</h1></main>)
    }

    return (
        <main className="auth-dashboard">
            <div className="auth-container">
                <header className="auth-header">
                    <h1>Interview <span>Master</span></h1>
                    <p>Create a new account to get started.</p>
                </header>

                <form onSubmit={handleSubmit}>

                    <div className="input-group">
                        <label htmlFor="Username">Username</label>
                        <input
                            onChange={(e) => setUsername(e.target.value)}
                            type="text" id="Username" name="Username" placeholder='johndoe' />
                    </div>

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
                            type="password" id='password' name="password" placeholder='Create a secure password...' />
                    </div>

                    <button className='submit-btn'>
                        Register
                    </button>

                </form>

                <div className="auth-footer">
                    <p>Already have an account? <Link to="/login">Login</Link></p>
                </div>
            </div>
        </main>
    )
}

export default Register
