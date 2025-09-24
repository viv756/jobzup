import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaPhoneSlash } from "react-icons/fa6";
import { FaMicrophone, FaVideo, FaVideoSlash, FaMicrophoneSlash } from "react-icons/fa";
import { format } from "date-fns";
import Peer from "simple-peer";

import type { Meeting } from "../../../types/api.type";
import { getMeetingsApiFn } from "../../../lib/api";
import { useAppSelector } from "../../../hooks/useSelector";
import { useSocket } from "../../../context/SocketProvider";

const Meetings = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const { socket, startMeeting, setStartMeeting } = useSocket();
  const [stream, setStream] = useState<MediaStream | null>();

  const myVideo = useRef<HTMLVideoElement | null>(null);
  const receiverVideo = useRef<HTMLVideoElement | null>(null);
  const peerRef = useRef<any | null>(null);
  const [currentMeetingToken, setCurrentMeetingToken] = useState<string>("");
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCamOn, setIsCamOn] = useState(true);

  const { currentUser } = useAppSelector((store) => store.user);

  useEffect(() => {
    const fetchMeetings = async () => {
      setLoading(true);
      try {
        const data = await getMeetingsApiFn();
        if (data) {
          setMeetings(data.meetings);
        }
        setLoading(false);
      } catch (error: any) {
        toast.error(error.message);
        setLoading(false);
      }
    };

    fetchMeetings();
  }, []);

  useEffect(() => {
    if (startMeeting && myVideo.current && stream) {
      myVideo.current.srcObject = stream;
      myVideo.current.muted = true;
      myVideo.current.play().catch(console.error);
    }
  }, [startMeeting, stream]);

  // Socket listeners
  useEffect(() => {
    if (!socket) return;

    const onOffer = async ({ signal, from }: { signal: any; from: string }) => {
      if (!peerRef.current) {
        const localStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setStream(localStream);
        if (myVideo.current) myVideo.current.srcObject = localStream;

        const peer = new Peer({
          initiator: false,
          trickle: true,
          stream: localStream,
          config: {
            iceServers: [
              { urls: "stun:stun.l.google.com:19302" },
              { urls: "stun:stun1.l.google.com:19302" },
            ],
          },
        });

        peer.on("signal", (answerSignal) => {
          socket.emit("answer", { joinToken: currentMeetingToken, signal: answerSignal, to: from });
        });

        peer.on("stream", (remoteStream: MediaStream) => {
          if (receiverVideo.current) receiverVideo.current.srcObject = remoteStream;
        });

        peerRef.current = peer;
      }
      peerRef.current.signal(signal);
      setStartMeeting(true);
    };

    const onAnswer = ({ signal }: { signal: any }) => {
      peerRef.current?.signal(signal);
    };

    const onPeerLeft = () => {
      if (peerRef.current) peerRef.current.destroy();
      peerRef.current = null;
      if (receiverVideo.current) receiverVideo.current.srcObject = null;
    };

    socket.on("offer", onOffer);
    socket.on("answer", onAnswer);
    socket.on("peer-left", onPeerLeft);

    return () => {
      socket.off("offer", onOffer);
      socket.off("answer", onAnswer);
      socket.off("peer-left", onPeerLeft);
    };
  }, [socket]);

  const handleStartMeeting = async (joinToken: string) => {
    const localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    setStream(localStream);
    setCurrentMeetingToken(joinToken);
    if (myVideo.current) {
      myVideo.current.srcObject = localStream;
      myVideo.current.muted = true;
      await myVideo.current.play().catch(console.error);
    }
    setStartMeeting(true);
    socket?.emit("join-room", { joinToken });

    const peer = new Peer({
      initiator: true,
      trickle: true,
      stream: localStream,
      config: {
        iceServers: [
          { urls: "stun:stun.l.google.com:19302" },
          { urls: "stun:stun1.l.google.com:19302" },
        ],
      },
    });

    peer.on("signal", (signal) => {
      socket?.emit("offer", { joinToken, signal });
    });

    peer.on("stream", (remoteStream) => {
      if (receiverVideo.current) receiverVideo.current.srcObject = remoteStream;
    });

    peerRef.current = peer;
  };

  // Join meeting (participant)
  const joinMeeting = async (joinToken: string) => {
    const localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    setStream(localStream);
    if (myVideo.current) myVideo.current.srcObject = localStream;

    socket?.emit("join-room", { joinToken });
    setStartMeeting(true);
    // Wait for offer from host
  };

  const leaveMeeting = () => {
    console.log("🔴 Leaving meeting...");

    // 1. Stop all local media tracks
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
      console.log("🔴 Local media tracks stopped");
    }

    // 2. Clear local video
    if (myVideo.current) {
      myVideo.current.srcObject = null;
    }

    // 3. Clear remote video
    if (receiverVideo.current) {
      receiverVideo.current.srcObject = null;
    }

    // 4. Destroy peer connection
    if (peerRef.current) {
      peerRef.current.destroy();
      peerRef.current = null;
      console.log("🔴 Peer connection destroyed");
    }

    // 5. Notify other users
    socket?.emit("leave-meeting", { joinToken: currentMeetingToken });

    // 6. Reset state
    setStartMeeting(false);
  };

  const toggleMic = () => {
    if (stream) {
      const audioTrack = stream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !isMicOn;
        setIsMicOn(audioTrack.enabled);
      }
    }
  };

  const toggleCam = () => {
    if (stream) {
      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !isCamOn;
        setIsCamOn(videoTrack.enabled);
      }
    }
  };

  if (loading) {
    return <div>loading</div>;
  }

  console.log(stream);
  console.log(myVideo.current);
  console.log(startMeeting);

  return (
    <>
      {!startMeeting && (
        <div className="flex gap-16 flex-wrap pt-9">
          {meetings.map((meeting) => {
            // const canJoin = currentUser && now >= meetingStart;
            const canJoin = true;
            const isHost = currentUser?._id === meeting.recruiterId._id;

            return (
              <div
                className="border-blue-700 border rounded-xl  w-80 h-60 bg-white p-3"
                key={meeting._id}>
                <h1 className="text-xl font-satoshi text-center mt-3 font-semibold">
                  {meeting.title}
                </h1>
                <div className="font-dm flex flex-col gap-1 mt-4 ">
                  <p>Host : {meeting.recruiterId.name} </p>
                  <p>Job : {meeting.jobId.title}</p>
                  <p>Time: {format(new Date(meeting.scheduledAt), "MMM dd, yyyy 'at' hh:mm a")}</p>
                </div>
                {canJoin ? (
                  isHost ? (
                    <button
                      onClick={() => handleStartMeeting(meeting.joinToken as string)}
                      className="w-full rounded-lg border border-[#1844B5] bg-[#0851CA] px-3 py-2 mt-7 text-center text-md font-medium text-white shadow-sm transition-all font-dm hover:bg-blue-800 focus:bg-blue-800 ">
                      Start Now
                    </button>
                  ) : (
                    <button
                      onClick={() => joinMeeting(meeting.joinToken as string)}
                      className="w-full rounded-lg border border-[#1844B5] bg-[#0851CA] px-3 py-2 mt-7 text-center text-md font-medium text-white shadow-sm transition-all font-dm hover:bg-blue-800 focus:bg-blue-800 disabled:bg-blue-900">
                      Join
                    </button>
                  )
                ) : (
                  <button className="w-full rounded-lg border bg-gray-400 px-3 py-2 mt-7 text-center text-md font-medium text-white shadow-sm transition-all font-dm ">
                    {isHost ? "Start Now" : "Join"}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {startMeeting && (
        <>
          <video
            ref={receiverVideo}
            autoPlay
            className="absolute top-0 left-0 w-full h-full object-contain rounded-lg"
          />
          <div className="absolute bottom-[75px] md:bottom-0 right-1 bg-gray-900 rounded-lg overflow-hidden shadow-lg">
            <video
              ref={myVideo}
              autoPlay
              playsInline
              className="w-32 h-40 md:w-56 md:h-52 object-cover rounded-lg"
            />
          </div>

          <div className="absolute bottom-4 left-9 w-full flex justify-center gap-4">
            <button
              type="button"
              className="bg-red-600 p-4 rounded-full text-white shadow-lg cursor-pointer"
              onClick={leaveMeeting}>
              <FaPhoneSlash size={24} />
            </button>
            {/* 🎤 Toggle Mic */}
            <button
              type="button"
              onClick={toggleMic}
              className={`p-4 rounded-full text-white shadow-lg cursor-pointer transition-colors ${
                isMicOn ? "bg-green-600" : "bg-red-600"
              }`}>
              {isMicOn ? <FaMicrophone size={24} /> : <FaMicrophoneSlash size={24} />}
            </button>

            {/* 📹 Toggle Video */}
            <button
              type="button"
              onClick={toggleCam}
              className={`p-4 rounded-full text-white shadow-lg cursor-pointer transition-colors ${
                isCamOn ? "bg-green-600" : "bg-red-600"
              }`}>
              {isCamOn ? <FaVideo size={24} /> : <FaVideoSlash size={24} />}
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default Meetings;
