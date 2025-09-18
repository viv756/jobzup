import React, { useRef, useState } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";

const ChatContainer = () => {
  const [authUser] = useState({
    _id: "u1",
    fullName: "John Doe",
    profilePic: "https://randomuser.me/api/portraits/men/32.jpg",
  });

  const [selectedUser] = useState({
    _id: "u2",
    fullName: "Jane Smith",
    profilePic: "https://randomuser.me/api/portraits/women/44.jpg",
  });

 const [messages] = useState([
  {
    _id: "m1",
    senderId: "u2",
    text: "Hi John, thanks for applying!",
    createdAt: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
  },
  {
    _id: "m2",
    senderId: "u1",
    text: "Hello Jane! Happy to connect with you.",
    createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 mins ago
  },
  {
    _id: "m3",
    senderId: "u2",
    text: "Can you share your latest resume?",
    createdAt: new Date(Date.now() - 1000 * 60 * 10), // 10 mins ago
    image: "https://via.placeholder.com/150", // optional
  },
  {
    _id: "m4",
    senderId: "u1",
    text: "Sure, here it is!",
    createdAt: new Date(Date.now() - 1000 * 60 * 2), // 2 mins ago
    image: "https://via.placeholder.com/200x280.png?text=Resume", // simulate resume attachment
  },
  {
    _id: "m5",
    senderId: "u2",
    text: "Perfect, I’ll review it and get back to you.",
    createdAt: new Date(Date.now() - 1000 * 60 * 1.5), // 1.5 mins ago
  },
  {
    _id: "m6",
    senderId: "u1",
    text: "By the way, here’s my portfolio website:",
    createdAt: new Date(Date.now() - 1000 * 60 * 1), // 1 min ago
  },
  {
    _id: "m7",
    senderId: "u1",
    image: "https://via.placeholder.com/300x180.png?text=Portfolio+Screenshot",
    createdAt: new Date(Date.now() - 1000 * 50), // 50 secs ago
  },
  {
    _id: "m8",
    senderId: "u2",
    text: "Looks impressive! 👏 Do you have experience with React?",
    createdAt: new Date(Date.now() - 1000 * 30), // 30 secs ago
  },
  {
    _id: "m9",
    senderId: "u1",
    text: "Yes, 3+ years. I also work with Next.js and Node.js.",
    createdAt: new Date(Date.now() - 1000 * 15), // 15 secs ago
  },
  {
    _id: "m10",
    senderId: "u2",
    text: "Awesome, let’s schedule a quick call tomorrow.",
    createdAt: new Date(), // now
  },
]);


  const messageEndRef = useRef<HTMLDivElement>(null);

  const formatMessageTime = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
            ref={messageEndRef}>
            <div className=" chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic || "/avatar.png"
                      : selectedUser.profilePic || "/avatar.png"
                  }
                  alt="profile pic"
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div className="chat-bubble flex flex-col">
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
