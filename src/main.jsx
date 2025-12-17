import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Redux
import { Provider } from "react-redux";
import { store } from "./redux/store";

// 全局样式只在这里引入一次
import "./styles/globals.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
