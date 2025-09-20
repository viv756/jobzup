import { useEffect } from "react";
import { Users } from "lucide-react";

import { useAppDispatch } from "../../../../hooks/useReducer";
import { useAppSelector } from "../../../../hooks/useSelector";
import {
  fetchUsersForSidebar,
  setSelectedUserFromSidebar,
} from "../../../../redux/message/message.slice";
import SidebarSkeleton from "./skelton/SidebarSkelton";

const Sidebar = () => {
  const { selectedUser, users, isUsersLoading } = useAppSelector((store) => store.message);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsersForSidebar());
  }, [fetchUsersForSidebar]);

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block font-dm">Contacts</span>
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
            <span className="text-sm font-dm">Show online only</span>
          </label>
          <span className="text-xs text-zinc-500 font-dm">online</span>
        </div>
      </div>

      <div className="overflow-y-auto w-full py-3">
        {users.map((user) => (
          <button
            key={user.userId}
            onClick={() => dispatch(setSelectedUserFromSidebar({ user }))}
            className={`
              w-full p-3 flex items-center gap-3
              hover:bg-base-300 transition-colors
           ${selectedUser?.userId === user.userId ? "bg-base-300 ring-1 ring-base-300" : ""}
            `}>
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilePicture || "/avatar.png"}
                alt={user.userId}
                className="size-12 object-cover rounded-full"
              />
              {/* {onlineUsers.includes(user.userId) && (
                <span
                  className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-zinc-900"
                />
              )} */}
            </div>

            {/* User info - only visible on larger screens */}
            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium truncate font-dm">{user.name}</div>
              {/* <div className="text-sm text-zinc-400">
                {onlineUsers.includes(user.userId) ? "Online" : "Offline"}
              </div> */}
            </div>
          </button>
        ))}

        {users.length === 0 && (
          <div className="text-center text-zinc-500 py-4 font-dm">No online users</div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
