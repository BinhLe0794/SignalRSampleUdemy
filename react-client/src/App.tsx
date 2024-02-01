import * as signalR from '@microsoft/signalr';
import { useEffect, useState } from 'react';
const connectionUserCount = new signalR.HubConnectionBuilder()
  //.configureLogging(signalR.LogLevel.Information)
  .withAutomaticReconnect()
  .withUrl('http://localhost:7067/hubs/vehiclestatus', signalR.HttpTransportType.WebSockets)
  .build();

function App() {
  const [receiveMessage, setReceiveMessage] = useState('');
  const [userConnected, setUserConnected] = useState('');
  connectionUserCount.on('ReceiveUserConnected', function (userId, userName) {
    console.log('userName openned', userName);
    setUserConnected(prevState => prevState + '\r' + `${userName} has openned a connection`);
  });

  connectionUserCount.on('ReceiveUserDisconnected', function (userId, userName) {
    console.log('userName closed', userName);
    setUserConnected(prevState => prevState + '\r' + `${userName} has closed a connection`);
  });
  connectionUserCount.on('ReceivePublicMessage', function (roomId, userId, username, message) {
    // receivepublicMessage(roomId, userId, username, message);
    // console.log('data', roomId, userId, username, message);
    setReceiveMessage(`${username} says ${message}`);
  });

  useEffect(() => {
    function fulfilled(): void {
      //do something on start
      console.log('Connection to User Hub Successful');
    }
    function rejected() {
      //rejected logs
    }
    connectionUserCount.start().then(fulfilled, rejected);
  }, []);

  return (
    <div className='isolate w-full bg-white px-6 py-24 sm:py-32 lg:px-8'>
      <div className='absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]' aria-hidden='true'>
        <div
          className='relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]'
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      <div className='mx-auto text-center'>
        <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>Simple Chat</h2>
        <p className='mt-2 text-lg leading-8 text-gray-600'>Let's talk somethings nice.</p>
      </div>
      <div className='grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2'>
        {/* <div>
            <label htmlFor='first-name' className='block text-sm font-semibold leading-6 text-gray-900'>
              First name
            </label>
            <div className='mt-2.5'>
              <input
                type='text'
                name='first-name'
                id='first-name'
                autoComplete='given-name'
                className='block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              />
            </div>
          </div> */}
        {/* <div>
            <label htmlFor='last-name' className='block text-sm font-semibold leading-6 text-gray-900'>
              Last name
            </label>
            <div className='mt-2.5'>
              <input
                type='text'
                name='last-name'
                id='last-name'
                autoComplete='family-name'
                className='block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              />
            </div>
          </div> */}
        <div className='sm:col-span-2'>
          <label htmlFor='email' className='block text-sm font-semibold leading-6 text-gray-900'>
            Sender
          </label>
          <div className='mt-2.5'>
            <input
              type='email'
              name='email'
              id='email'
              autoComplete='email'
              className='block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
            />
          </div>
        </div>
        <div className='sm:col-span-2'>
          <label htmlFor='email' className='block text-sm font-semibold leading-6 text-gray-900'>
            Receiver
          </label>
          <div className='mt-2.5'>
            <input
              type='email'
              name='email'
              id='email'
              autoComplete='email'
              className='block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
            />
          </div>
        </div>

        <div className='sm:col-span-2 grid grid-cols-1'>
          <div>
            <label htmlFor='message' className='block text-sm font-semibold leading-6 text-gray-900'>
              Message
            </label>
            <textarea
              name='message'
              id='message'
              rows={4}
              className='block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              defaultValue={''}
            />
          </div>
          <div>
            <label htmlFor='getmessage' className='block text-sm font-semibold leading-6 text-gray-900'>
              Receive Message
            </label>
            <textarea
              disabled
              name='getmessage'
              id='getmessage'
              rows={4}
              className='block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              defaultValue={receiveMessage + userConnected}
            />
          </div>
        </div>
        {/* <Switch.Group as='div' className='flex gap-x-4 sm:col-span-2'>
            <div className='flex h-6 items-center'>
              <Switch
                checked={agreed}
                onChange={setAgreed}
                className={classNames(
                  agreed ? 'bg-indigo-600' : 'bg-gray-200',
                  'flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                )}>
                <span className='sr-only'>Agree to policies</span>
                <span
                  aria-hidden='true'
                  className={classNames(
                    agreed ? 'translate-x-3.5' : 'translate-x-0',
                    'h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out'
                  )}
                />
              </Switch>
            </div>
            <Switch.Label className='text-sm leading-6 text-gray-600'>
              By selecting this, you agree to our{' '}
              <a href='#' className='font-semibold text-indigo-600'>
                privacy&nbsp;policy
              </a>
              .
            </Switch.Label>
          </Switch.Group> */}
      </div>
      <div className='mt-10'>
        <button
          type='submit'
          className='block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
          Let's talk
        </button>
      </div>
    </div>
  );
}

export default App;
