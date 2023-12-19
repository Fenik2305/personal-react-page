import { useState } from "react"
import { useSignup } from "../../hooks/useSignup.js"
import { Stack, TextField, Button } from "@mui/material";

const Signup = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {signup, error, isLoading} = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await signup(name, email, password)
    }

    return (
        <div className="SignupForm">
            <Stack spacing={4}>
                <h2>Sign up:</h2>
                <TextField
                    id='name'
                    type='text'
                    label={"Name"}
                    helperText="Please enter your name"
                    onChange={(e) => setName(e.target.value)}
                    inputProps={{style: {fontSize: "26px"}}}/>
                <TextField
                    required
                    id='email'
                    type='text'
                    label={"E-mail"}
                    helperText="Please enter your email"
                    onChange={(e) => setEmail(e.target.value)}
                    inputProps={{style: {fontSize: "26px"}}}/>
                <TextField
                    required
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
                    style={{maxWidth: '170px'}}
                    onClick={handleSubmit}>
                    Sign up
                </Button>
                {error && <label>{error}</label>}
            </Stack>
        </div>
    )
}

export default Signup