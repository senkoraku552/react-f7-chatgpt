import { createStore } from "framework7/lite";

// Define States
let state = {
  count: 0,
};

// Define Getters
const getters = {
  count({ state }) {
    return state.count;
  },
  // save reply for chatAPI callback
  replyStore({ state }) {
    return state.replyStore;
  },
};

// Define Actions
const actions = {
  setCount({ state }, newValue) {
    state.count = newValue;
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
