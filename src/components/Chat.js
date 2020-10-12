import React, { useState, useEffect } from "react";
import "../styles/Chat.css";
import ChatHeader from "./ChatHeader";
import Message from "./Message";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import EmojiObjectsIcon from "@material-ui/icons/EmojiObjects";
import { useSelector } from "react-redux";
import { selectUser } from "./../features/userSlice";
import { selectChannelName, selectChannelId } from "./../features/appSlice";
import db from "../firebase.js";
import firebase from "firebase";

function Chat() {
  const channelId = useSelector(selectChannelId);
  const user = useSelector(selectUser);
  const channelName = useSelector(selectChannelName);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (channelId) {
      db.collection("channels")
        .doc(channelId)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setMessages(snapshot.docs.map((doc) => doc.data()));
        });
    }
  }, [channelId]);

  const sendMessage = (e) => {
    e.preventDefault();

    db.collection("channels").doc(channelId).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      user: user,
    });
    setInput("");
  };

  return (
    <div className="chat">
      <ChatHeader channelName={channelName} />
      <div className="chat__messages">
        {messages.map((message) => (
          <Message
            timestamp={message.timestamp}
            message={message.message}
            user={message.user}
          />
        ))}
      </div>
      <div className="chat__input">
        <DonutLargeIcon fontSize="large" />
        <form>
          <input
            value={input}
            disabled={!channelId}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`message #${channelName}=${channelId}`}
          />
          <button
            disabled={!channelId}
            className="chat__inputButton"
            type="submit"
            onClick={sendMessage}
          >
            Send message
          </button>
        </form>
        <div className="chat__inputIcons">
          <SentimentVerySatisfiedIcon fontSize="large" />
          <EmojiPeopleIcon fontSize="large" />
          <EmojiObjectsIcon fontSize="large" />
        </div>
      </div>
    </div>
  );
}

export default Chat;
