import { useEffect, useRef } from "react";
import { format } from "date-fns";

import { useAppSelector } from "../../../../hooks/useSelector";
import { useAppDispatch } from "../../../../hooks/useReducer";
import { fetchMessageOfSelectedUser } from "../../../../redux/message/message.slice";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skelton/MessageSkelton";

const ChatContainer = () => {
  const { messages, selectedUser, conversationId, isMessagesLoading } = useAppSelector(
    (store) => store.message
  );
  const { currentUser } = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();

  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedUser) {
      dispatch(
        fetchMessageOfSelectedUser({
          conversationId,
          userToChatId: selectedUser.userId as string,
        })
      );
    }
  }, [selectedUser, dispatch, conversationId]);

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
                {format(new Date(message.createdAt), "MM yy EEE")}
              </time>
            </div>
            <div className="chat-bubble flex flex-col font-dm">{message.text && <p>{message.text}</p>}</div>
          </div>
        ))}
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
