import React from "react";
import PropTypes from "prop-types";
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
Message.propTypes = {
  error: PropTypes.bool,
  text: PropTypes.string,
};
