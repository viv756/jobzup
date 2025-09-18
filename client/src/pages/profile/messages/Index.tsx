import React from "react";
import Sidebar from "./_components/Sidebar";
import ChatContainer from "./_components/ChatContainer";

const Messages = () => {
  return (
    <div className="">
      <div className="h-20 flex items-center">
        <h1 className="font-dm font-medium text-3xl">Messages</h1>
      </div>
      <div className="flex items-center justify-center">
        <div className="bg-base-100 rounded-lg shadow-cl w-full h-[calc(100vh-10rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />
            <ChatContainer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
