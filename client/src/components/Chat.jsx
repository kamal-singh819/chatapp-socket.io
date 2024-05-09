import { useEffect, useState } from "react";
const Chat = ({ socket, username, roomId }) => {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    async function handleSendMessage(e) {
        e.preventDefault();
        if (currentMessage.trim()) {
            const messageData = {
                roomId,
                username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            };
            await socket.emit("send_message", messageData);
            setMessageList(prev => [...prev, messageData]); //store own message also
        }
    }

    useEffect(() => {
        socket.on("receive_message", (data) => {
            console.log(data);
            setMessageList(prev => [...prev, data]); //getting the messages from another user and store
        })
    }, [socket]);

    return (
        <div className="flex flex-col justify-between items-center max-w-[30rem] h-[90vh] w-full border-2 border-black m-2">
            <div className=" border-b-2 mb-2 w-full">
                <p className="text-center">{username}</p>
            </div>
            <div className="flex-1 flex flex-col w-full">
                {messageList.map((msg, index) => <div key={index} className={`flex flex-col gap-1 ${username === msg.username ? "items-end" : "items-start"}`}>
                    <p className="font-semibold text-sm">{msg.message}</p>
                    <div className="flex gap-1">
                        <p className="text-[10px]">{msg.time}</p>
                        <p className="text-[10px]">{msg.username}</p>
                    </div>
                </div>)}
            </div>
            <form className="flex gap-2 border-t-2 w-full" onSubmit={handleSendMessage}>
                <input className="focus:outline-none border-2 border-black rounded-md p-2 w-full" type="text" placeholder="message" onChange={(e) => setCurrentMessage(e.target.value)} />
                <button className="border-2 border-black p-2 rounded-md"> &#9658; </button>
            </form>
        </div>
    )
}

export default Chat;