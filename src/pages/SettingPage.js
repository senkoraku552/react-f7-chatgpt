import {
  Page,
  Navbar,
  Link,
  Block,
  List,
  ListInput,
  ListItem,
  Range,
  Stepper,
  f7,
  f7ready,
  useStore,
} from "framework7-react";
import { useState, useEffect } from "react";

const SettingPage = ({ id }) => {
  // read conversation store from f7 data
  const [conversation, setConversation] = useState(null);
  const conversationsData = useStore("conversationsData");

  // load params from conversation with useEffect
  useEffect(() => {
    f7ready(() => {
      // load corresponding conversation
      const theConversation = conversationsData.find((item) => {
        return item.id === id;
      });

      if (theConversation) {
        setConversation(theConversation);
      }
    });
  }, []);

  const updateConversationProperty = (property, value) => {
    const newConversations = [...conversationsData];
    const theConversation = newConversations.find((item) => {
      return item.id === id;
    });
    theConversation[property] = value;
    f7.store.dispatch("setConversations", newConversations);
  };

  return (
    <>
      <Page>
        <Navbar title="Settings" backLink="Back"></Navbar>
        <List strongIos dividersIos insetIos>
          {/* read input value of conversation  */}
          <ListInput
            label="Name"
            type="text"
            placeholder="Conversation Name"
            clearButton
            value={conversation?.name || ""}
            onInput={(e) => {
              updateConversationProperty("name", e.target.value);
            }}
          />
          {/* read input value of prompt */}
          <ListInput
            label="Prompt"
            type="text"
            placeholder="Instruct your chatbot"
            clearButton
            value={conversation?.prompt || ""}
            onInput={(e) => {
              updateConversationProperty("prompt", e.target.value);
            }}
          />
          {/* read temperature from this-conversation */}
          <ListInput
            label={`Temperature (${conversation?.temperature})`}
            input={false}
          >
            <Range
              slot="input"
              // value={temperature}
              value={conversation?.temperature}
              onRangeChanged={(value) => {
                // setTemperature(+value.toFixed(1));
                updateConversationProperty("temperature", +value.toFixed(1));
              }}
              min={0.1}
              max={2}
              step={0.1}
            />
          </ListInput>
          <ListItem title="Context">
            <Stepper
              min={2}
              max={20}
              step={1}
              small
              raised
              slot="after"
              // value={context}
              value={conversation?.context}
              onStepperChange={(value) => {
                // setContext(+value);
                updateConversationProperty("context", +value);
              }}
            />
          </ListItem>
        </List>
      </Page>
    </>
  );
};

export default SettingPage;
