// ChatCompletions
// 接口基本使用方法
// 接口路徑
// https://api.openai.com/v1/chat/completions
// Method: POST
// Header:
// Authorization: Bearer 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
// context-type: application/json
// JSON Body
// model: gpt-3.5-turbo
// messages: [{ role: "system/assistant/user", context: "..." }]
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

export default ({ id }) => {
  // setup params defalut value
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

  // read params from f7 store
  const messagesData = useStore("messagesData");

  // read conversationsData
  const conversationsData = useStore("conversationsData");

  const [conversation, setConversation] = useState(null);

  // add recording function by useState
  const [isRecording, setIsRecording] = useState(null);
  const [isRecognizing, setIsRecognizing] = useState(false);

  // initial useEffect by f7ready
  useEffect(() => {
    f7ready(() => {
      //
      const thisConversation = conversationsData.find((item) => {
        return item.id === id;
      });

      if (thisConversation) {
        setConversation(thisConversation);
      }
    });
  }, []);

  // initial recording function
  useEffect(() => {
    if (isRecording !== null && !isRecording) {
      setIsRecognizing(true);

      setTimeout(() => {
        // Simulate audio recognization time
        setIsRecognizing(false);
      }, 3000);
    }
  }, [isRecording]);

  // set f7 store
  const setMessagesData = (data) => {
    f7.store.dispatch("setMessagesData", data);
  };

  // recording function
  const handleRecording = () => {
    setIsRecording(!isRecording);
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
    //         text: "this is some context text",
    //       },
    //     ];
    //   });
    //   setTypingMessage(false);
    // }, 3000);
    // end demo **//

    /* */
    // chatGPT API online
    const response = await fetch(
      `https://cm633.fluentgpt.app/openai/v1/chat/completions`,
      {
        method: "post",
        headers: {
          "context-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          temperature: conversation?.temperature,
          messages: newMessageData
            .map((message) => {
              return {
                role: message.type === "sent" ? "user" : "assistant",
                context: message.text,
              };
            })
            .slice(conversation?.context * -1),
        }),
      }
    );

    const data = await response.json();

    if (data.choices.length > 0) {
      const replyFromChatGPT = data.choices[0].message.context;

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

        <Link slot="right" href={`/setting/${id}/`}>
          Settings
        </Link>
      </Navbar>

      <Messagebar
        value={messageText}
        placeholder={isRecognizing ? "Recognizing Audio..." : "Message"}
        onInput={(e) => setMessageText(e.target.value)}
      >
        {/* recording button */}
        <Link slot="inner-start" onClick={handleRecording}>
          {!isRecording && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              style={{ display: "inline-block", width: "24px", height: "24px" }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
              />
            </svg>
          )}

          {isRecording && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="red"
              style={{ display: "inline-block", width: "24px", height: "24px" }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 9.563C9 9.252 9.252 9 9.563 9h4.874c.311 0 .563.252.563.563v4.874c0 .311-.252.563-.563.563H9.564A.562.562 0 019 14.437V9.564z"
              />
            </svg>
          )}
        </Link>

        {/* text input */}
        <Link slot="inner-end" onClick={sendMessage}>
          Send
        </Link>
      </Messagebar>

      <Messages>
        <MessagesTitle>
          ID: {id}, Temperature: {conversation?.temperature}, Context:{" "}
          {conversation?.context}
        </MessagesTitle>

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
