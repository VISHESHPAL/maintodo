import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import {Toaster} from 'react-hot-toast'

createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <App />
    <Toaster position="top-center" reverseOrder={false}  />
  </AuthContextProvider>
);
