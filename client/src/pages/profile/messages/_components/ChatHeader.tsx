import { X } from "lucide-react";
import React, { useState } from "react";

const ChatHeader = () => {

  const [selectedUser, setSelectedUser] = useState<any>({
  _id: "u1",
  fullName: "John Doe",
  profilePic: "https://randomuser.me/api/portraits/men/32.jpg",
});

const [onlineUsers, setOnlineUsers] = useState(["u1", "u3"]); // mock online users


  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.fullName} />
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium">{selectedUser.fullName}</h3>
            <p className="text-sm text-base-content/70">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button onClick={() => setSelectedUser(null)}>
          <X />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
