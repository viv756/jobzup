import { Users } from "lucide-react";
import React, { useState } from "react";

const Sidebar = () => {
  const [filteredUsers, setFilteredUsers] = useState([
    {
      _id: "u1",
      fullName: "John Doe",
      profilePic: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      _id: "u2",
      fullName: "Jane Smith",
      profilePic: "https://randomuser.me/api/portraits/women/45.jpg",
    },
    {
      _id: "u3",
      fullName: "Michael Johnson",
      profilePic: "https://randomuser.me/api/portraits/men/12.jpg",
    },
    {
      _id: "u4",
      fullName: "Emily Davis",
      profilePic: "https://randomuser.me/api/portraits/women/76.jpg",
    },
    {
      _id: "u5",
      fullName: "Emily Davis",
      profilePic: "https://randomuser.me/api/portraits/women/76.jpg",
    },
    {
      _id: "u6",
      fullName: "Emily Davis",
      profilePic: "https://randomuser.me/api/portraits/women/76.jpg",
    },
    {
      _id: "u7",
      fullName: "Emily Davis",
      profilePic: "https://randomuser.me/api/portraits/women/76.jpg",
    },
    {
      _id: "u8",
      fullName: "Emily Davis",
      profilePic: "https://randomuser.me/api/portraits/women/76.jpg",
    },
    {
      _id: "u9",
      fullName: "Emily Davis",
      profilePic: "https://randomuser.me/api/portraits/women/76.jpg",
    },
    {
      _id: "u10",
      fullName: "Emily Davis",
      profilePic: "https://randomuser.me/api/portraits/women/76.jpg",
    },
  ]);

  const [onlineUsers, setOnlineUsers] = useState(["u1", "u3"]); // mock who is online
  const [selectedUser, setSelectedUser] = useState<any>(null);

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>

        {/* TODO: Online filter toggle */}
        <div className="mt-3 hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              // checked={showOnlineUsersOnly}
              // onChange={(e) => setShowOnlineUsersOnly(e.target.checked)}
              className="checkbox checkbox-sm"
            />
            <span className="text-sm">Show online only</span>
          </label>
          <span className="text-xs text-zinc-500">online</span>
        </div>
      </div>

      <div className="overflow-y-auto w-full py-3">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              w-full p-3 flex items-center gap-3
              hover:bg-base-300 transition-colors
              ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}
            `}>
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.fullName}
                className="size-12 object-cover rounded-full"
              />
              {onlineUsers.includes(user._id) && (
                <span
                  className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-zinc-900"
                />
              )}
            </div>

            {/* User info - only visible on larger screens */}
            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium truncate">{user.fullName}</div>
              <div className="text-sm text-zinc-400">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-zinc-500 py-4">No online users</div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
