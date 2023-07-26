import { createStore } from "framework7/lite";

// Define States
let state = {
  messagesData: [],

  temperature: 0.7,
};

// Define Getters
const getters = {
  messagesData({ state }) {
    return state.messagesData;
  },
  temperature({ state }) {
    return state.temperature;
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
