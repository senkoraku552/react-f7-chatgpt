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

const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

// import { Configuration, OpenAIApi } from "openai";

export default () => {
  // setup params
  const [typingMessage, setTypingMessage] = useState(null);
  const [messageText, setMessageText] = useState("");
  // const [messagesData, setMessagesData] = useState([
  //   {
  //     type: "sent",
  //     text: "How are you?",
  //   },
  //   {
  //     name: "ChatGPT",
  //     type: "received",
  //     text: "Hi, I am good!",
  //   },
  // ]);
  const messagesData = useStore("messagesData");

  useEffect(() => {
    f7ready(() => {
      //
    });
  }, []);

  // f7 store

  const setMessagesData = (data) => {
    f7.store.dispatch("setMessagesData", data);
  };

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

  const sendMessage = async () => {
    // const text = messageText.replace(/\n/g, "<br>").trim();
    const text = messageText.trim();
    // const messagesToSend = [];

    if (text.length === 0) return;

    // {
    //   messagesToSend.push({
    //     type: "sent",
    //     text: text,
    //   });
    // }
    // if (messagesToSend.length === 0) {
    //   return;
    // }

    const newMessageData = [...messagesData];
    newMessageData.push({
      type: "sent",
      text: text,
    });

    // setMessagesData([...messagesData, ...messagesToSend]);

    // new set with useStore
    setMessagesData(newMessageData);
    setMessageText("");

    // show loading indicator
    setTypingMessage(true);

    // chatGPT demo
    // setTimeout(() => {
    //   setMessagesData((previousMessage) => {
    //     return [
    //       ...previousMessage,
    //       {
    //         type: "received",
    //         text: "this is some content text",
    //       },
    //     ];
    //   });
    //   setTypingMessage(false);
    // }, 3000);
    // end demo

    //
    // chatGPT API online
    const response = await fetch(`https://api.openai.com/v1/chat/completions`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        temperature: 0.7,
        messages: newMessageData
          .map((message) => {
            return {
              role: message.type === "sent" ? "user" : "assistant",
              content: message.text,
            };
          })
          .slice(-4), // TODO
      }),
    });

    const data = await response.json();

    if (data.choices.length > 0) {
      const replyFromChatGPT = data.choices[0].message.content;

      newMessageData.push({
        type: "received",
        text: replyFromChatGPT,
      });

      setMessagesData(newMessageData);
    }

    // Stop loading indicator
    setTypingMessage(false);
  };

  return (
    <Page>
      <Navbar title="Messages">
        <Link slot="left" back>
          Back
        </Link>

        <Link slot="right" href="/settings/">
          Settings
        </Link>
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
