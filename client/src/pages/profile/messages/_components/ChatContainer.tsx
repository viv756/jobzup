import { useEffect, useRef } from "react";
import { format } from "date-fns";

import { useAppSelector } from "../../../../hooks/useSelector";
import { useAppDispatch } from "../../../../hooks/useReducer";
import {
  fetchMessageOfSelectedUser,
  setSocketMessage,
} from "../../../../redux/message/message.slice";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skelton/MessageSkelton";
import { useSocket } from "../../../../context/SocketProvider";
import type { Message } from "../../../../types/api.type";

const ChatContainer = () => {
  const { messages, selectedUser, conversationId, isMessagesLoading } = useAppSelector(
    (store) => store.message
  );
  const { socket } = useSocket();
  const { currentUser } = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();

  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!selectedUser || !socket) return;

    // fetch messages of selected user
    dispatch(
      fetchMessageOfSelectedUser({
        conversationId,
        userToChatId: selectedUser.userId as string,
      })
    );

    // subscribe to new messages
    const handleNewMessage = (newMessage: Message) => {
      // check senderId and selected userId is same or not
      if (newMessage.sender !== selectedUser.userId) return;
      dispatch(setSocketMessage(newMessage));
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage); // proper cleanup
    };
  }, [selectedUser, dispatch, conversationId]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${message.sender === currentUser?._id ? "chat-end" : "chat-start"}`}
            ref={messageEndRef}>
            <div className=" chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.sender === currentUser?._id
                      ? currentUser?.profilePicture || "/avatar.png"
                      : selectedUser?.profilePicture || "/avatar.png"
                  }
                  alt="profile pic"
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1 font-dm">
                {format(new Date(message.createdAt), "EEE hh:mm a")}
              </time>
            </div>
            <div className="chat-bubble flex flex-col font-dm">
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
