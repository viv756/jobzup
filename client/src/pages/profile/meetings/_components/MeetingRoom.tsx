import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useAppSelector } from "../../../../hooks/useSelector";

const MeetingRoom = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { currentUser } = useAppSelector((store) => store.user);
  const { roomId } = useParams<{ roomId: string }>();
  const zpRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current || !currentUser?._id) return;

    const appId = Number(import.meta.env.VITE_ZEGO_APPID); // Your App ID
    const serverSecret = import.meta.env.VITE_ZEGO_SERVER_SECRET; // Only for testing
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appId,
      serverSecret,
      roomId!,
      `User-${currentUser._id}`, // userID
      `User-${currentUser._id}` // userName
    );

    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zpRef.current = zp;

    zp.joinRoom({
      container: containerRef.current,
      scenario: { mode: ZegoUIKitPrebuilt.OneONoneCall },
      onLeaveRoom: () => {
        cleanupMedia();
        window.location.href = "/profile/meetings";
      },
    });

    const handleUnload = () => cleanupMedia();
    window.addEventListener("beforeunload", handleUnload);

    return () => {
      handleUnload();
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, [containerRef, roomId, currentUser?._id]);

  const cleanupMedia = () => {
    console.log("🛑 Cleaning up media and meeting...");
    // Stop any active streams
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        stream.getTracks().forEach((track) => track.stop());
      })
      .catch(() => {});
    // Destroy Zego session
    if (zpRef.current) {
      zpRef.current.destroy();
      zpRef.current = null;
    }
  };

  return <div ref={containerRef} style={{ width: "100%", height: "100%" }} />;
};

export default MeetingRoom;
