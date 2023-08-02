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
  List,
  ListItem,
  ListButton,
  useStore,
  Button,
  Block,
} from "framework7-react";

export default ({ id }) => {
  // read params from f7 store
  const conversationsData = useStore("conversationsData");

  const createConversation = () => {
    f7.store.dispatch("setConversationsData");
  };

  const setConversationsData = (conversation) => {
    f7.store.dispatch("setConversationsData", conversation);
  };

  return (
    <Page>
      <Navbar title="Conversation">
        <Link slot="left" back>
          Back
        </Link>

        <Link slot="right" href={`/setting/${id}/`}>
          Settings
        </Link>
      </Navbar>

      <List dividersIos mediaList outlineIos strongIos>
        <List inset>
          <ListButton title="Create New" />
        </List>
        {conversationsData.map((conversation) => (
          <ListItem
            key={conversation.id}
            link="/message/:id/"
            title={conversation.name}
            after={conversation.updatedAt}
            subtitle={conversation.prompt || "prompt not set"}
            text={conversation.lastMessage || "-"}
          />
        ))}
      </List>
    </Page>
  );
};
