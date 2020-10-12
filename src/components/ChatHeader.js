import React from "react";
import "../styles/ChatHeader.css";
import NotificationImportantIcon from "@material-ui/icons/NotificationImportant";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import PersonPinCircleIcon from "@material-ui/icons/PersonPinCircle";
import SearchIcon from "@material-ui/icons/Search";
import SendIcon from "@material-ui/icons/Send";
import NotListedLocationIcon from "@material-ui/icons/NotListedLocation";

function ChatHeader({ channelName }) {
  return (
    <div className="chatHeader">
      <div className="chatHeader__left">
        <h3>
          <span className="chatHeader__hash">#</span>
          {channelName}
        </h3>
      </div>
      <div className="chatHeader__right">
        <NotificationImportantIcon />
        <PeopleAltIcon />
        <PersonPinCircleIcon />
        <div className="chatHeader__search">
          <input placeholder="Search" />
          <SearchIcon />
        </div>
        <SendIcon />
        <NotListedLocationIcon />
      </div>
    </div>
  );
}

export default ChatHeader;
