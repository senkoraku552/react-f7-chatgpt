import { createStore } from "framework7/lite";

// Define States
let state = {
  conversationsData: [
    {
      id: "123",
      name: "(Conversation Name)",
      prompt: "You are my english teacher",
      lastMessage: "...",
      updatedAt: "2023-08-02 19:37:59",
    },
    {
      id: "223",
      name: "(Conversation Name 2)",
      prompt: "You are my english teacher",
      lastMessage: "...",
      updatedAt: "2023-08-02 19:38:19",
    },
  ],

  messagesData: [],

  temperature: 0.7,

  context: 6,
};

// Define Getters
const getters = {
  messagesData({ state }) {
    return state.messagesData;
  },
  temperature({ state }) {
    return state.temperature;
  },
  conversationsData({ state }) {
    return state.conversationsData;
  },
};

// Define Actions
const actions = {
  setMessagesData({ state }, newValue) {
    state.messagesData = newValue;
  },
  setTemperature({ state }, newValue) {
    state.temperature = newValue;
  },
  setConversationData({ state }, newValue) {
    state.conversationsData = newValue;
  },
};

if (typeof window !== "undefined") {
  const savedState = localStorage.getItem("state");

  if (savedState) {
    state = JSON.parse(savedState);
  }
}

const store = createStore({
  state,
  getters,
  actions,
});

store.state = new Proxy(store.state, {
  set(obj, prop, value) {
    obj[prop] = value;

    // save to localStorage
    if (typeof window !== "undefined") {
      const currentState = JSON.stringify(store.state);
      localStorage.setItem("state", currentState);
    }

    return true;
  },
});

export default store;
