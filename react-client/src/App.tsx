import { useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';
import './App.css';
const connectionUserCount = new signalR.HubConnectionBuilder()
  //.configureLogging(signalR.LogLevel.Information)
  .withAutomaticReconnect()
  .withUrl('https://localhost:7001/hubs/userCount', signalR.HttpTransportType.WebSockets)
  .build();

function App() {
  const [views, setViews] = useState('');
  function newWindowLoadedOnClient() {
    connectionUserCount
      .invoke('NewWindowLoaded', 'Bhrugen')
      .then(value => {
        console.log(value);
        setViews(value as string);
      })
      .catch(error => console.log(error));
  }
  function fulfilled(): void {
    //do something on start
    console.log('Connection to User Hub Successful');
    newWindowLoadedOnClient();
  }
  function rejected() {
    //rejected logs
  }
  useEffect(() => {
    connectionUserCount.start().then(fulfilled, rejected);
  }, []);

  return (
    <>
      <span className='text-bluegray'>Views : {views}</span>
    </>
  );
}

export default App;
