import React from "react";
import { Stack, TextField, Button } from "@mui/material";
import './Contacts.css'

export default function Contacts() {
    return (
        <div className="Contacts">
            <Stack spacing={4}>
                <Stack direction='row' spacing={4}>
                    <TextField
                        label='Name'
                        helperText='Please enter your name'
                        inputProps={{
                            style: {
                                fontSize: "26px",
                            },
                        }}
                    />
                    <TextField
                        label='E-mail'
                        helperText='Please enter your e-mail'
                        inputProps={{
                            style: {
                                fontSize: "26px",
                            },
                        }}
                    />
                </Stack>
                    <TextField
                        variant="filled"
                        label='Please write your message'
                        inputProps={{
                            style: {
                                fontSize: "26px",
                            },
                        }}
                    />
                    <Button 
                        variant="contained"
                        size='large'
                        style={{
                            maxWidth: '170px', // Установите желаемую максимальную ширину в пикселях или других подходящих единицах измерения
                        }}>
                        SEND MESSAGE
                    </Button>
            </Stack>
        </div>
    );
}
