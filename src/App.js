import { Button, IconButton, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const  handleClick = () => {
    setMessages([...messages, {content: input, isBot: false}]);
    setInput("");
  }

  useEffect(() => {
    //Connection Api
  });

  useEffect(() => {
    setMessages([{content: "Test", isBot: false}, {content: 'Hello World', isBot: true}]);
  }, [])
  return (
    <div className='app'>
      <div className='app_container'>
        <div className='app_title'>
          <h3>ChatBot Epitech</h3>
        </div>
        <div className='app_text_history'>
          {
            messages.map((message) => {
              return (
                <div>
                    <div className='divider'/>
                    <div className='app_message_container' style={{justifyContent: message.isBot ? 'left' : 'right'}}>
                      <div className={message.isBot ? "app_message_bot" : "app_message_client"}><span>{message.content}</span></div>
                    </div>
                </div>
              );
            })
          }
        </div>
        <div className='app_text_input'>
          <TextField variant="filled" style={{height: '50px', width: '380px', backgroundColor: 'grey'}} onChange={(event) => setInput(event.target.value)} placeholder='Enter your question' value={input}/>
          <Button style={{backgroundColor: 'blueviolet', borderRadius: 'none', height: '50px'}} onClick={handleClick}>
            <SendIcon style={{color: 'white', width: '8Opx'}}/>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;
