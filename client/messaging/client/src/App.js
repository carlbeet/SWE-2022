import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";

const socket = io.connect("http://localhost:3004");

function App() {
  // const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const username = Object.fromEntries(document.cookie.split('; ').map(c => c.split('=')))['username'];
  const joinRoom = () => {
    console.log("joining room");
    console.log(username);
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <>
    <div class="topnav">
        <a class="active" href="http://localhost:3000">Home</a>
        <a href="http://localhost:3001">Comment</a>
        <a href="http://localhost:3002">Messaging</a>
        <a href="http://localhost:3003">About</a>
      </div>

    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>AMWA Chat</h3>
          <input
            type="text"
            placeholder="Username"
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Chat</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
    </>
  );
}

export default App;
