import React, { FC } from "react";

interface MessageProps {
  msg: string;
  type: "danger" | "success";
}

const Message: FC<MessageProps> = ({ msg, type }) => {
  let typeClass = "";

  if (type === "danger") {
    typeClass = "isDanger";
  }

  if (type === "success") {
    typeClass = "isSuccess";
  }

  return (
    <article className={`message ${typeClass}`}>
      <div className="message-body">{msg}</div>
    </article>
  );
};

export default Message;
