import { App, View } from "framework7-react";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ArticlePage from "./pages/ArticlePage";
import ShowArticlePage from "./pages/ShowArticlePage";

import store, { Store } from "./store";
import MessagePage from "./pages/MessagePage";
import SettingPage from "./pages/SettingPage";
import ConversationPage from "./pages/ConversationPage";

const f7params = {
  name: "My App",
  view: {
    browserHistory: true,
  },
  // specify routes for app
  routes: [
    {
      path: "/",
      component: HomePage,
    },
    {
      path: "/about/",
      component: AboutPage,
    },
    {
      path: "/article/:id/",
      component: ArticlePage,
    },
    {
      path: "/show/",
      component: ShowArticlePage,
    },
    {
      path: "/message/:id/",
      component: MessagePage,
    },
    {
      path: "/settings/:id/",
      component: SettingPage,
    },
    {
      path: "/conversation/",
      component: ConversationPage,
    },
  ],
};

export default () => (
  // Main Framework7 App component where we pass Framework7 params
  <App store={store} theme="auto" {...f7params}>
    {/* Your main view, should have "main" prop */}
    <View main url="/" />
  </App>
);
