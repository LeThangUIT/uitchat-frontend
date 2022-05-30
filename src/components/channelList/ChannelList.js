import React from "react";
import "./ChannelList.css";
function ChannelList(props) {
  return (
    <div className="channelList">
      <h5>
        <span className="channelList__hash">#</span>
        {props.dataFromParent.name}
      </h5>
    </div>
  );
}

export default ChannelList;
