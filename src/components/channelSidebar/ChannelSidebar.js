import React, { useEffect, useState } from "react";
import { Peer } from "peerjs";
import { useSelector, useDispatch } from "react-redux";
import { selectInfoServer } from "../../features/infoServerSlice";
import { selectChannel } from "../../features/channelSlice";
import { Avatar } from "@mui/material";
import EditServer from "../editServer/EditServer";
import AddChannel from "../addChannel/AddChannel";
import { NavLink, useParams } from "react-router-dom";
import ChannelList from "../channelList/ChannelList";
import {
	selectSocket,
	socketAddListener,
	socketEmitEvent,
	socketRemoveListener,
} from "../../features/socketSlice";
import {
	memberJoinVoiceChannel,
	selectMemberVoiceChannel,
} from "../../features/memberVoiceSlice";

export default function ChannelSidebar({ currentUser, setStreams }) {
	const [peer, setPeer] = useState(null);
	const infoServer = useSelector(selectInfoServer);
	const channels = useSelector(selectChannel);
	const dispatch = useDispatch();
	const memberVoice = useSelector(selectMemberVoiceChannel);
	let { channelId } = useParams();
	const memberVoiceChannel = useSelector(selectMemberVoiceChannel);
	let calls = [];
	let isOwner =
		infoServer.ownerIds &&
		infoServer.ownerIds.find((owner) => owner._id === currentUser.id);

	const socket = useSelector(selectSocket);
	useEffect(() => {
		if (socket && peer) {
			const someOneJoinVoiceChannel = {
				name: "new-user-join-voice-channel", 
				callback: (data) => {
					if (currentUser.id !== data.userId) {
						console.log("here"); // do emit vao server, ko phai emit vao channel
						var getUserMedia =
							navigator.getUserMedia ||
							navigator.webkitGetUserMedia ||
							navigator.mozGetUserMedia;
						getUserMedia(
							{ video: true, audio: true },
							function (stream) {
								var call = peer.call(data.userId, stream);
								setStreams((prev => [...prev, stream]));
								calls[data.userId] = call;
								let video;
								call.on("stream", function (remoteStream) {
									// Show stream in some video/canvas element.
									video = document.createElement("video");
									video.id = data.userId;
									addVideoStream(video, remoteStream);
								});
								call.on("close", function () {

								})
							},
							function (err) {
								console.log("Failed to get local stream", err);
							}
						);
					}

					dispatch(memberJoinVoiceChannel(data));
				},
			};
			dispatch(socketAddListener(someOneJoinVoiceChannel));
			return () => {
				dispatch(socketRemoveListener("new-user-join-voice-channel"));
			};
		}
	}, [socket, peer]);

	useEffect(() => {
		if (socket) {
			const userDisconnected = {
				name: "user-disconnected",
				callback: (data) => {
					if (channelId === data.channelId && currentUser.id !== data.userId) {
						calls[data.userId].close()
					}
				},
			};
			dispatch(socketAddListener(userDisconnected));
		}
	}, [socket]);

	useEffect(() => {
		if (peer) {
			var getUserMedia =
				navigator.getUserMedia ||
				navigator.webkitGetUserMedia ||
				navigator.mozGetUserMedia;
			peer.on("call", function (call) {
				getUserMedia(
					{ video: true, audio: true },
					function (stream) {
						setStreams((prev => [...prev, stream]));
						call.answer(stream); // Answer the call with an A/V stream.
						call.on("stream", function (remoteStream) {
							// Show stream in some video/canvas element.
							const video = document.createElement("video")
							addVideoStream(video, remoteStream);
						});
					},
					function (err) {
						console.log("Failed to get local stream", err);
					}
				);
			});
		}
	});
	const showVoiceSidebar = () => {
		document
			.getElementsByClassName("sidebar__voice")[0]
			.classList.remove("hideSidebar__voice");
	};
	const handleChannelClick = () => {
		showVoiceSidebar();
		setPeer(new Peer(currentUser.id));
	};
	function addVideoStream(video, stream) {
		video.srcObject = stream;
		video.addEventListener("loadedmetadata", () => {
			video.play();
		});
		// videoGrid.append(video)
	}
	return (
		<>
			<div className="sidebar__top">
				<h4>{infoServer.name}</h4>
				<EditServer />
			</div>
			<div className="sidebar__channels">
				<div className="sidebar__channelsHeader">
					<div className="sidebar__header">
						<h3>Text Channels</h3>
					</div>
					{isOwner && (
						<AddChannel
							dataFromParent={currentUser}
							serverId={infoServer._id}
							type="text"
						/>
					)}
				</div>

				<div className="sidebar__channelsList">
					{channels
						.filter((channel) => channel.type === "text")
						.map((channel) => (
							<NavLink
								key={channel._id}
								to={channel._id}
								style={({ isActive }) => {
									return {
										textDecoration: "none",
										color: isActive ? "white" : "gray",
									};
								}}
							>
								<ChannelList channel={channel} />
							</NavLink>
						))}
				</div>
				<div className="sidebar__channelsHeader">
					<div className="sidebar__header">
						<h3>Voice Channels</h3>
					</div>
					{isOwner && (
						<AddChannel
							dataFromParent={currentUser}
							serverId={infoServer._id}
							type="voice"
						/>
					)}
				</div>

				<div className="sidebar__channelsList">
					{channels
						.filter((channel) => channel.type === "voice")
						.map((channel) => (
							<NavLink
								onClick={handleChannelClick}
								key={channel._id}
								to={channel._id}
								style={({ isActive }) => {
									return {
										textDecoration: "none",
										color: isActive ? "white" : "gray",
									};
								}}
							>
								<ChannelList channel={channel} />
								{memberVoiceChannel
									.filter((member) => member.channelId === channel._id)
									.map((member) => (
										<div className="sidebar__memberChannel">
											<Avatar
												sx={{ width: 28, height: 28, mr: 1.5 }}
												src={member.avatar}
											/>
											{member.name}
										</div>
									))}
							</NavLink>
						))}
				</div>
			</div>
		</>
	);
}
