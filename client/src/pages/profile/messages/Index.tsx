import { useAppSelector } from "../../../hooks/useSelector";

import Sidebar from "./_components/Sidebar";
import ChatContainer from "./_components/ChatContainer";
import NoChatSelected from "./_components/NoChatSelected";

const Messages = () => {
  const { selectedUser } = useAppSelector((store) => store.message);

  return (
    <div className="">
      <div className="h-20 flex items-center">
        <h1 className="font-dm font-medium text-3xl">Messages</h1>
      </div>
      <div className="flex items-center justify-center">
        <div className="bg-base-100 rounded-lg shadow-cl w-full h-[calc(100vh-10rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
