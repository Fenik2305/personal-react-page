import { useState } from "react"
import { useLogin } from "../../hooks/useLogin.js"
import { Stack, TextField, Button } from "@mui/material";
import { Link } from "react-router-dom"

import LoginPageStyles from "./Login.css";

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login, error, isLoading} = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(email, password)
    }

    return (
        <div className="LoginForm">
            <Stack spacing={4}>
                <h2>Log In:</h2>
                <TextField
                    required
                    id='email'
                    label="E-mail"
                    helperText="Please enter your email"
                    onChange={(e) => setEmail(e.target.value)}
                    inputProps={{style: {fontSize: "26px"}}}/>
                <TextField
                    id='password'
                    type='password'
                    label='Password'
                    helperText='Please enter your password'
                    onChange={(e) => setPassword(e.target.value)}
                    inputProps={{style: {fontSize: "26px"}}}/>
                <Button 
                    variant="contained"
                    size='large'
                    disabled={isLoading}
                    onClick={handleSubmit}>
                    Log in
                </Button>
                
                {error && <label>{error}</label>}
            </Stack>
        </div>
    )
}

export default Login