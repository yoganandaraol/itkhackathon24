// src/components/Chat.tsx
import React, { useEffect, useState } from "react";
import { TextField, Button, Container, Grid, CircularProgress, LinearProgress } from "@mui/material";
import Message from "./Message";
import { MessageDto } from "../models/MessageDto";
import axios from "axios";
import { threadId } from "worker_threads";

const Chat: React.FC = () => {
  const [isWaiting, setIsWaiting] = useState<boolean>(true);
  const [messages, setMessages] = useState<Array<MessageDto>>(new Array<MessageDto>());
  const [input, setInput] = useState<string>("");
  const [assistant, setAssistant] = useState<any>(null);
  const [thread, setThread] = useState<any>(null);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if(file != null && thread === null && assistant === null) {
        initChatBot();
    }
  }, [file]);

  useEffect(() => {
    setMessages([
      {
        content: "Hi, I'm your personal assistant. How can I help you?",
        isUser: false,
      },
    ]);
  }, [assistant]);

  const initChatBot = async () => {
    setIsWaiting(true);
    const formData = new FormData();
    formData.append('file', file!);

    axios.post('http://localhost:8080/initAssistant', formData).then(response => {
        console.log(response);
        setAssistant((response.data! as any).assistant!);
        setThread((response.data! as any).thread);
        setIsWaiting(false);
    })
  };

  const createNewMessage = (content: string, isUser: boolean) => {
    const newMessage = new MessageDto(isUser, content);
    return newMessage;
  };

  const handleSendMessage = async () => {
    messages.push(createNewMessage(input, true));
    setMessages([...messages]);
    setInput("");
    setIsWaiting(true);

    const response = await axios.post('http://localhost:8080/askForHelp', {
        question: input,
        assistantId: assistant.id,
        threadId: thread.id
    });

    setIsWaiting(false);

    const message = response.data;
    // Print the last message coming from the assistant
    if (message) {
      setMessages([...messages, createNewMessage(message.content[0]["text"].value, false)]);
    }
  };

  // detect enter key and send message
  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleFileChange = (event: any) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    await initChatBot();
  }

  return (
    <Container>
      <Grid container direction="column" spacing={2} paddingBottom={5}>
        {messages.map((message, index) => (
          <Grid item alignSelf={message.isUser ? "flex-end" : "flex-start"} key={index}>
            <Message key={index} message={message} />
          </Grid>
        ))}
        <Grid item>
          <TextField
            label="Type your message"
            variant="outlined"
            disabled={isWaiting}
            fullWidth
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          {isWaiting && <LinearProgress color="inherit" />}
        </Grid>
        {!isWaiting && (
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleSendMessage} disabled={isWaiting}>
              Send
            </Button>
          </Grid>
        )}
      </Grid>

      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit" disabled={!file}>Initialize</button>
      </form>
    </Container>
  );
};

export default Chat;