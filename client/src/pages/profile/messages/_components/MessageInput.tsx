import React, { useState } from "react";
import { Send } from "lucide-react";
import toast from "react-hot-toast";

import { useAppDispatch } from "../../../../hooks/useReducer";
import { sendMessageToSelectedUser } from "../../../../redux/message/message.slice";

const MessageInput = () => {
  const [text, setText] = useState("");

  const dispatch = useAppDispatch();

  // Handle send message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (!text.trim()) return;

    try {
      dispatch(sendMessageToSelectedUser({ text }));
      setText("");
    } catch (error: any) {
      toast.error(error.message || "failed");
    }
    // Reset input fields
  };

  return (
    <div className="p-4 w-full">
      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-sm btn-circle" disabled={!text.trim()}>
          <Send size={22} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
