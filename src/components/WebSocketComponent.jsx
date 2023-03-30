import { type } from '@testing-library/user-event/dist/type';
import React, { useState, useEffect } from 'react';

export default function WebSocketComponent() {
  const [receivedData, setReceivedData] = useState('');
  const [decryptedMessage, setDecryptedMessage] = useState('');
  const [registrationKey, setRegistrationKey] = useState('a60052d890d8bcb1a3a9be904ae558e61b7a7757ad97c563966aaac76df53135');
  const [counter, setCounter] = useState(0);
  const [webSocket, setWebSocket] = useState(null);
  
  const name = "Yusuf Emir";
  const surname = "Vural";
  const email = "yemirvural@gmail.com";



  const responseMessage = {
    type: "REGISTER",
    name: name,
    surname: surname,
    email: email,
    registrationKey: registrationKey ,
  };
  const jsonMessage = JSON.stringify(responseMessage);

  function decryptMessage() {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const alphabet2 = 'zyxwvutsrqponmlkjihgfedcba';

    let decrypted = '';
    for (let i = 0; i < receivedData.length; i++) {
      let letterIndex = alphabet.indexOf(receivedData[i]);
      if (letterIndex !== -1) {
        decrypted += alphabet2[letterIndex];
      } else {
        decrypted += receivedData[i];
      }
    }
    setDecryptedMessage(decrypted);
    setCounter(counter + 1);
  }

  useEffect(()=>{
    deneme();
  }, [counter])

  function deneme() {
    if(decryptedMessage){
      const parsedMessage = JSON.parse(decryptedMessage);
      const newRegistrationKey = parsedMessage.nvhhztv.split("Your registrationKey : ")[1];
      setRegistrationKey(newRegistrationKey);
      console.log(jsonMessage);
    }
  }

  function handleFirstMessage() {
    webSocket.send(jsonMessage);
  }

  useEffect(() => {
    const ws = new WebSocket('wss://cekirdektenyetisenler.kartaca.com/ws');

    ws.onopen = () => {
      console.log('WebSocket baglantisi kuruldu');
    };

    ws.onmessage = (event) => {
      setReceivedData(event.data);
    };
    
    ws.onerror = (error) => {
      console.error(error);
    };

    setWebSocket(ws);
  }, []);
  

  return (
    <div>
      <h1>Kartaca Çekirdekten Yetişenler Programi Challenge</h1>
      <button onClick={decryptMessage}>Şifreyi Çöz</button>
      <button onClick={handleFirstMessage}>Gönder</button>
      <div>
        <p>Alinan mesaj: {receivedData}</p>
        <p>Şifresi çözülmüş mesaj: {decryptedMessage}</p>
      </div>
    </div>
    
  );
}
