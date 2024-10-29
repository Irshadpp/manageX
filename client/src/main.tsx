import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import store, { persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import ErrorBoundary from "./components/error-boundary/ErrorBountary";

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
  </ErrorBoundary>
);
