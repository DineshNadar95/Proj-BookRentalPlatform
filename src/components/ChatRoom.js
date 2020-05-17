import React, { useEffect } from 'react';
import '../App.js';
import io from 'socket.io-client'
import axios from 'axios';
import firebase from 'firebase/app';
import noImage from '../images/noImage.png';
let socket = io('http://localhost:3001')
let loggedInUser;

const ChatRoom = () => {
    useEffect(() => {
        async function chat() {
            const userId = firebase.auth().currentUser.uid
            await axios.get('http://localhost:4000/user/SI/' + userId)
                .then(async userData => {
                    loggedInUser = userData.data;
                    console.log(loggedInUser)
                })
            const form = document.querySelector("form");
            const input = document.querySelector(".input");
            const messages = document.querySelector(".chat-messages");
            let username = '';
            if(loggedInUser.first_name){
                username = loggedInUser.first_name;
            }
            if(loggedInUser.last_name){
                username = username + " " + loggedInUser.last_name;
            }
            let image;
            if(loggedInUser.profile_pic == "") {
                image = "<img src="+noImage+"></img>"
            }else {
                image = "<img src="+loggedInUser.profile_pic+"></img>"
            }
            form.addEventListener("submit", function (event) {
                event.preventDefault();

                addMessage(image + username + ": " + input.value);

                socket.emit("chat_message", {
                    message: input.value
                });

                input.value = "";
                return false;
            }, false);

            socket.on("chat_message", function (data) {
                addMessage(image + data.username + ": " + data.message);
            });

            socket.emit("user_join", username);

            function addMessage(message) {
                const li = document.createElement("li");
                li.innerHTML = message;
                messages.appendChild(li);
                window.scrollTo(0, document.body.scrollHeight);
            }
        }
        chat();
    }, [])

    return (
        <div className='App-body'>
            < script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.2.0/socket.io.dev.js" ></script >
            <ul className="chat-messages"></ul>
            <form className="chat-form">
                <input type="text" className="input" autoComplete="off" autoFocus />
                <button>Send</button>
            </form>
        </div>
    );
}

export default ChatRoom;