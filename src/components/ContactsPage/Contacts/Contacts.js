import React, { useState } from "react";
import { Stack, TextField, Button } from "@mui/material";
import './Contacts.css'

export default function Contacts() {
    const [messages, setMessages] = useState([]);

    const sendMessageHandler = () => {
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        const newMessage = {
            name: name ? name : "N/A",
            email: email ? email : "N/A",
            message: message ? message : "N/A"
        };

        setMessages([...messages, newMessage]);

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
