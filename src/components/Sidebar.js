import React, { useState, useEffect } from "react";
import "../styles/Sidebar.css";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import AddIcon from "@material-ui/icons/Add";
import NetworkCheckIcon from "@material-ui/icons/NetworkCheck";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import SettingsVoiceIcon from "@material-ui/icons/SettingsVoice";
import SidebarChannel from "../components/SidebarChannel";
import MicNoneIcon from "@material-ui/icons/MicNone";
import SettingsPhoneIcon from "@material-ui/icons/SettingsPhone";
import SettingsIcon from "@material-ui/icons/Settings";
import { Avatar } from "@material-ui/core";
import { useSelector } from "react-redux";
import { selectUser } from "./../features/userSlice";
import db, { auth } from "../firebase";

function Sidebar() {
  //get data user from userSlice/REDUX
  const user = useSelector(selectUser);
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    db.collection("channels").onSnapshot((snapshot) =>
      setChannels(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          channel: doc.data(),
        }))
      )
    );
  }, []);

  const handleAddChannel = () => {
    const channelName = prompt("Enter a new channel name");
    if (channelName) {
      db.collection("channels").add({
        channelName: channelName,
      });
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <h3>fake Dishord</h3>
        <ArrowBackIosIcon className="sidebar__arrowIcon" />
      </div>
      <div className="sidebar__channels">
        <div className="sidebar__channelsHeader">
          <div className="sidebar__header">
            <ArrowBackIosIcon className="sidebar__arrowIcon" />
            <h4>text channels</h4>
          </div>
          <AddIcon className="sidebar__addChannel" onClick={handleAddChannel} />
        </div>
        <div className="sidebar__channelList">
          {channels.map(({ id, channel }) => (
            <SidebarChannel
              key={id}
              id={id}
              channelName={channel.channelName}
            />
          ))}
        </div>
      </div>
      <div className="sidebar__voice">
        <NetworkCheckIcon className="sidebar__voiceIcon" fontSize="large" />
        <div className="sidebar__voiceInfo">
          <h3>Voice Connected</h3>
          <p>stream</p>
        </div>
        <div className="sidebar__voiceIcons">
          <PhoneAndroidIcon />
          <SettingsVoiceIcon />
        </div>
      </div>
      <div className="sidebar__profile">
        <Avatar onClick={() => auth.signOut()} src={user.photo} />
        <div className="sidebar__profileInfo">
          <h3>{user.displayName}</h3>
          <p>#{user.uid.substring(0, 5)}</p>
        </div>
        <div className="sidebar__profileIcons">
          <MicNoneIcon />
          <SettingsIcon />
          <SettingsPhoneIcon />
        </div>
      </div>
    </div>
  );
}
export default Sidebar;
