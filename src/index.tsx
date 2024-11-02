import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { FavouritesProvider } from "./context_providers/FavouritesContext";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ChakraProvider value={defaultSystem}>
      <FavouritesProvider>
        <App />
      </FavouritesProvider>
    </ChakraProvider>
  </React.StrictMode>
);
