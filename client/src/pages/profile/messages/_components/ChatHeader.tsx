import { X } from "lucide-react";

import { useAppSelector } from "../../../../hooks/useSelector";
import { setSelectedUserFromSidebar } from "../../../../redux/message/message.slice";
import { useAppDispatch } from "../../../../hooks/useReducer";

const ChatHeader = () => {
  const { selectedUser } = useAppSelector((store) => store.message);
  const dispatch = useAppDispatch();

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img src={selectedUser?.profilePicture || "/avatar.png"} alt={selectedUser?.name} />
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium font-dm">{selectedUser?.name}</h3>
            {/* <p className="text-sm text-base-content/70">
              {onlineUsers.includes(selectedUser?.userId as string) ? "Online" : "Offline"}
            </p> */}
          </div>
        </div>

        {/* Close button */}
        <button onClick={() => dispatch(setSelectedUserFromSidebar(null))}>
          <X />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
