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
	memberLeftVoiceChannel,
	selectMemberVoiceChannel,
} from "../../features/memberVoiceSlice";
import {
	setStream
} from "../../features/streamSlice";
import { selectStream } from "../../features/streamSlice";

export default function ChannelSidebar({ currentUser }) {
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
	const streams = useSelector(selectStream);
	
	function closeStream() {
		streams.forEach(stream => {
			stream.getTracks().forEach(function (track) {
				track.stop();
			});
		});
	}

	useEffect(() => {
		if (socket) {
			const someOneJoinVoiceChannel = {
				name: "new-user-join-voice-channel",
				callback: (data) => {
					if (currentUser.id === data.userId) {
						showVoiceSidebar();
					}
					dispatch(memberJoinVoiceChannel(data));
					if (currentUser.id !== data.userId && data.channelId === channelId) {
						var getUserMedia =
							navigator.getUserMedia ||
							navigator.webkitGetUserMedia ||
							navigator.mozGetUserMedia;
						getUserMedia(
							{ video: true, audio: true },
							function (stream) {
								var call = peer.call(data.userId, stream);
								dispatch(setStream(stream));
								calls[data.userId] = call;
								let video;
								call.on("stream", function (remoteStream) {
									// Show stream in some video/canvas element.
									video = document.createElement("video");
									video.id = data.userId;
									addVideoStream(video, remoteStream);
								});
								call.on("close", function () {
									video.remove();
								})
							},
							function (err) {
								console.log("Failed to get local stream", err);
							}
						);
					}

				},
			};
			dispatch(socketAddListener(someOneJoinVoiceChannel));

			const someOneLeftVoiceChannel = {
				name: "user-disconnected",
				callback: (data) => {
					if (data.userId === currentUser.id) { // B
						document.getElementsByClassName("sidebar__voice")[0].classList.add("hideSidebar__voice");
						// close all streams
						closeStream();
					}

					if (channelId === data.channelId && currentUser.id !== data.userId) { // A
						calls[data.userId].close()
					}

					dispatch(memberLeftVoiceChannel(data))
				}
			}
			dispatch(socketAddListener(someOneLeftVoiceChannel))
			return () => {
				dispatch(socketRemoveListener("new-user-join-voice-channel"));
			};
		}
	}, [socket, peer]);

	// useEffect(() => {
	// 	if (socket) {
	// 		const userDisconnected = {
	// 			name: "user-disconnected",
	// 			callback: (data) => {
	// 				console.log(channelId); // 
	// 				if (channelId === data.channelId && currentUser.id !== data.userId) {
	// 					console.log("closing");
	// 					calls[data.userId].close()
	// 				}
	// 			},
	// 		};
	// 		dispatch(socketAddListener(userDisconnected));
	// 	}
	// }, [socket]);

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
						dispatch(setStream(stream));
						call.answer(stream); // Answer the call with an A/V stream.
						let video;
						call.on("stream", function (remoteStream) {
							// Show stream in some video/canvas element.
							video = document.createElement("video");
							addVideoStream(video, remoteStream);
						});
						call.on("close", function () {
							video.remove();
						})
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
		setPeer(new Peer(currentUser.id));
	};
	function addVideoStream(video, stream) { // TODO: them id vao video
		video.srcObject = stream;
		video.addEventListener("loadedmetadata", () => {
			video.play();
		});
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
