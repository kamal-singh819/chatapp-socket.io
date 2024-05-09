import { useState } from 'react';
import Chat from './components/Chat';
import io from 'socket.io-client';
const socket = io.connect('http://localhost:5500');

const App = () => {
    const [username, setUsername] = useState("");
    const [roomId, setRoomId] = useState("");
    const [showChat, setShowChat] = useState(false);
    function handleSendMessage(e) {
        e.preventDefault();
        console.log('Send message button clicked!!!');
        if (username && roomId) {
            socket.emit("join_room", roomId);
            setShowChat(true);
        }

    }

    return (
        <div className='flex justify-center'>
            {!showChat ?
                (<form onSubmit={handleSendMessage} className='flex flex-col gap-3 p-4 max-w-[20rem] w-full'>
                    <h2 className='font-bold text-xl'>Join the chat room</h2>
                    <input onChange={(e) => setUsername(e.target.value)} className='focus:outline-none border-2 border-black rounded-md p-2 w-full' type="text" placeholder='Username...' />
                    <input onChange={(e) => setRoomId(e.target.value)} className='focus:outline-none border-2 border-black rounded-md p-2 w-full' type="text" placeholder='Room Id' />
                    <button type='submit' className='border-2 border-black p-2 rounded-md'>Send</button>
                </form>)
                :
                (<Chat socket={socket} username={username} roomId={roomId} />)
            }
        </div>
    )
}
export default App;