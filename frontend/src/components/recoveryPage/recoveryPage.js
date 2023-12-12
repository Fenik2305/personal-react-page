import { useState } from "react"
import { Stack, TextField, Button } from "@mui/material";

import recoveryPageStyles from "./recoveryPage.css";

const recoveryPage = () => {
    return (
        <div className="recovery-form">
            <Stack spacing={4}>
                <h2>Password Recovery:</h2>
                {/*<ol>
                    <li>Enter the email address associated with your account and click the "Reset Password" button.</li>
                    <li>Login to the email account linked to your account and follow the password reset link in the email we will send you.</li>
                    <li>Enter your new password and confirm the password change.</li>
                </ol>*/}
                <p>Please enter the e-mail address associated with your account:</p>
                <TextField
                    required
                    id='email'
                    label="E-mail"
                    helperText="Please enter your email"
                    inputProps={{style: {fontSize: "26px"}}}
                />
                
                <Button 
                    variant="contained"
                    size='large'>
                    Reset Password
                </Button>            
            </Stack>
        </div>
    )
}

export default recoveryPage