import React, { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import PhoneDisabledIcon from '@mui/icons-material/PhoneDisabled';
import { Avatar } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import HeadsetIcon from "@mui/icons-material/Headset";
import SettingsIcon from "@mui/icons-material/Settings";
import { useDispatch, useSelector } from "react-redux";
import { updateInfoServerFromSocket } from "../../features/infoServerSlice";
import { fetchInfoServerData } from "../../features/infoServerSlice";
import { selectSocket, socketAddListener, socketEmitEvent } from "../../features/socketSlice";
import ChannelSidebar from "../channelSidebar/ChannelSidebar";
import ContactSidebar from "../contactSidebar/ContactSidebar";

import "./Sidebar.css";
import { fetchMembersVoiceChannel } from "../../features/memberVoiceSlice";

function Sidebar(props) {
	const { user: currentUser } = useSelector((state) => state.auth);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const socket = useSelector(selectSocket);
	const serverId = props.serverId;
	let { channelId } = useParams();
	const [streams, setStreams] = useState([])

	useEffect(() => {
		if (!currentUser) {
			navigate("/login");
		}
	}, [currentUser]);

	useEffect(() => {
		if (serverId) {
			dispatch(fetchInfoServerData(serverId));
		}
	}, [serverId]);

	useEffect(() => {
		if(socket) {
			const currentUsersInVoice = {
				name: "current-users-in-voice-channel",
				callback: (data) => {
					console.log(data)
					dispatch(fetchMembersVoiceChannel(data))
				},
			}
			dispatch(socketAddListener(currentUsersInVoice))
		}
	}, [socket])

	useEffect(() => {
		if (socket) {
			const updatedServer = {
				name: "updated-server",
				callback: (server) => {
					dispatch(updateInfoServerFromSocket(server));
				},
			};
			dispatch(socketAddListener(updatedServer));
		}
	}, [socket]);

	useEffect(() => {
		if (socket) {
			const deletedServer = {
				name: "deleted-server",
				callback: (server) => {
					navigate("/servers/@me");
				},
			};
			dispatch(socketAddListener(deletedServer));
		}
	}, [socket]);

	const hideVoiceSidebar = () => {
		document.getElementsByClassName("sidebar__voice")[0].classList.add("hideSidebar__voice")
	}

	const closeStream = () => {
		streams.forEach(stream => {
			stream.getTracks().forEach(function (track) {
				track.stop();
			});
		});
	}
	const handleDisconnect = () => {
		closeStream()
		//hideVoiceSidebar()
		const leaveChannelEvent = {
			name: "leave-channel",
			data: {
				channelId,
			},
		};
		// close call
		// remove video
		dispatch(socketEmitEvent(leaveChannelEvent));
		navigate(`/servers/${serverId}`)
	}

	return (
		<div className="sidebar">
			{serverId ? (
				<ChannelSidebar currentUser={currentUser} setStreams={setStreams} />
			) : (
				<ContactSidebar />
			)}
			<div className="sidebar__voice hideSidebar__voice">
				<SignalCellularAltIcon
					className="sidebar__voiceIcon"
					fontSize="large"
				/>
				<div className="sidebar__voiceInfo">
					<h4>Voice connected</h4>
					<p>Play game</p>
				</div>
				<div className="sidebar__voiceIcons">
					<InfoOutlinedIcon />
					<PhoneDisabledIcon onClick={handleDisconnect} />
				</div>
			</div>
			<div className="sidebar__profile">
				<Avatar src={currentUser.avatar} />
				<div className="sidebar__profileInfo">
					<h5>{currentUser.name}</h5>
				</div>
				<div className="sidebar__profileIcons">
					<MicIcon className="sidebar__profileIcon" />
					<HeadsetIcon className="sidebar__profileIcon" />
					<Link to={"/profile"} className="sidebar__profileIcon">
						<SettingsIcon className="setting__Icon" />
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Sidebar;
