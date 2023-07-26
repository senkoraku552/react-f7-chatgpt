// ChatCompletions
// 接口基本使用方法
// 接口路徑
// https://api.openai.com/v1/chat/completions
// Method: POST
// Header:
// Authorization: Bearer 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
// Content-type: application/json
// JSON Body
// model: gpt-3.5-turbo
// messages: [{ role: "system/assistant/user", content: "..." }]
// temperature: 0.7

import React, { useEffect, useRef, useState } from "react";
import {
  Navbar,
  Page,
  Messages,
  MessagesTitle,
  Message,
  Messagebar,
  Link,
  f7ready,
  f7,
  useStore,
} from "framework7-react";
import store from "../store";

import { Configuration, OpenAIApi } from "openai";

export default () => {
  // set apiKey
  // const configuration = new Configuration({
  //   apiKey: API_KEY,
  // });
  const replyStore = useStore("replyStore");

  const [typingMessage, setTypingMessage] = useState(null);
  const [messageText, setMessageText] = useState("");
  const [messagesData, setMessagesData] = useState([
    {
      type: "sent",
      text: "How are you?",
    },
    {
      name: "ChatGPT",
      type: "received",
      text: "Hi, I am good!",
    },
  ]);

  useEffect(() => {
    f7ready(() => {
      //
    });
  }, []);

  const isFirstMessage = (message, index) => {
    const previousMessage = messagesData[index - 1];
    if (message.isTitle) return false;
    if (
      !previousMessage ||
      previousMessage.type !== message.type ||
      previousMessage.name !== message.name
    )
      return true;
    return false;
  };

  const isLastMessage = (message, index) => {
    const nextMessage = messagesData[index + 1];
    if (message.isTitle) return false;
    if (
      !nextMessage ||
      nextMessage.type !== message.type ||
      nextMessage.name !== message.name
    )
      return true;
    return false;
  };

  const isTailMessage = (message, index) => {
    const nextMessage = messagesData[index + 1];
    if (message.isTitle) return false;
    if (
      !nextMessage ||
      nextMessage.type !== message.type ||
      nextMessage.name !== message.name
    )
      return true;
    return false;
  };

  const sendMessage = () => {
    const text = messageText.replace(/\n/g, "<br>").trim();
    const messagesToSend = [];

    if (text.length) {
      messagesToSend.push({
        type: "sent",
        text,
      });
    }
    if (messagesToSend.length === 0) {
      return;
    }

    setMessagesData([...messagesData, ...messagesToSend]);
    setMessageText("");

    // show loading indicator
    setTypingMessage(true);

    // chatGPT API
    setTimeout(() => {
      setMessagesData((previousMessage) => {
        return [
          ...previousMessage,
          {
            type: "received",
            text: "this is some content text",
          },
        ];
      });
      setTypingMessage(false);
    }, 3000);
  };

  return (
    <Page>
      <Navbar title="Messages">
        <Link slot="left" back>
          Back
        </Link>

        <Link slot="right">Link</Link>
      </Navbar>

      <Messagebar
        value={messageText}
        onInput={(e) => setMessageText(e.target.value)}
      >
        <Link slot="inner-end" onClick={sendMessage}>
          Send
        </Link>
      </Messagebar>

      <Messages>
        <MessagesTitle>Conversation</MessagesTitle>

        {messagesData.map((message, index) => (
          <Message
            key={index}
            type={message.type}
            name={message.name}
            first={isFirstMessage(message, index)}
            last={isLastMessage(message, index)}
            tail={isTailMessage(message, index)}
          >
            {message.text}
          </Message>
        ))}
        {typingMessage && (
          <Message
            type="received"
            typing={true}
            first={true}
            last={true}
            tail={true}
            header={`ChatGPT is typing`}
          />
        )}
      </Messages>
    </Page>
  );
};
