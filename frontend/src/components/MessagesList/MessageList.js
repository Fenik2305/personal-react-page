import { Stack } from "@mui/material";
import MessageDetails from "./MessageDetails.js"
import { useMessagesContext } from "../../hooks/useMessagesContext";

const MessagesList = () => {
    const { messages } = useMessagesContext()
    console.log(messages)

    return (
        <div>
            <Stack spacing={4}>
                <h2>Messages:</h2>
                {messages && messages.map((message) => (
                    <MessageDetails key={message._id} message={message}/>
                ))}
            </Stack>
        </div>
    )
}

export default MessagesList