import React from "react";
import "./message.css";

export default function Message({
  error = true,
  text = "Something went wrong",
}) {
  const content = () => {
    if (error) {
      return <div className="msg-box__label msg-box__label--error">{text}</div>;
    }
    return <div>not ready</div>;
  };
  return <div className="msg-box ">{content()}</div>;
}
