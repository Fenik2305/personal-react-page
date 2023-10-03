import React from "react";
import { Stack, TextField, Button } from "@mui/material";
import './Contacts.css'

export default function Contacts({messages, onNewMessage}) {
    const emailValidation = (input) => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return regex.test(input);
    };

    const sendMessageHandler = () => {
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        if (!emailValidation(email)) {
            alert("Invalid email!");
            return;
        }

        const newMessage = {
            name: name ? name : "N/A",
            email: email ? email : "N/A",
            message: message ? message : "N/A"
        };

        onNewMessage([...messages, newMessage]);

        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("message").value = "";
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
                        id='email'
                        label='E-mail'
                        helperText='Please enter your e-mail'
                        inputProps={{style: {fontSize: "26px"}}}/>
                </Stack>
                    <TextField
                        id='message'
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
