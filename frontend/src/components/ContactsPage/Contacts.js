import React, { useState } from "react";
import { Stack, TextField, Button } from "@mui/material";
import { useMessagesContext } from "../../hooks/useMessagesContext.js"
import { useAuthContext } from "../../hooks/useAuthContext.js"; 
import './Contacts.css'

export default function Contacts() {
    const { user } = useAuthContext();
    const { dispatch } = useMessagesContext();
    const [emailError, setEmailError] = useState(false);

    const emailValidation = (input) => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return regex.test(input);
    };

    const sendMessageHandler = async () => {
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const mssg = document.getElementById("mssg ").value;

        setEmailError(!emailValidation(email) ? true : false);

        const message = {
            name: name ? name : "N/A",
            email: email ? email : "N/A",
            mssg : mssg  ? mssg  : "N/A"
        };

        const response = await fetch('/api/messages', {
            method: "POST",
            body: JSON.stringify(message),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()


        if (response.ok) {
            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("mssg ").value = "";
            dispatch({type: 'CREATE_MESSAGE', payload: json})
        }
    };

    return (
        <div className="Contacts">
            <Stack spacing={4}>
                <Stack direction='row' spacing={4}>
                    <TextField
                        id='name'
                        label='Name'
                        helperText='Please enter your name'
                        inputProps={{style: {fontSize: "26px"}}}/>
                    <TextField
                        required
                        id='email'
                        label={"E-mail"}
                        error={emailError}
                        helperText={!emailError ? "Please enter your email" : "Only 'email@example.com' format"}
                        inputProps={{style: {fontSize: "26px"}}}/>
                </Stack>
                    <TextField
                        id='mssg '
                        variant="filled"
                        label='Please write your message'
                        inputProps={{style: {fontSize: "26px"}}}/>
                    <Button 
                        variant="contained"
                        size='large'
                        style={{maxWidth: '170px'}}
                        onClick={sendMessageHandler}>
                        SEND MESSAGE
                    </Button>
            </Stack>
        </div>
    );
}
