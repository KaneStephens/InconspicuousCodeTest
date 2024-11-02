import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CharacterList from "./pages/CharacterList";
import CharacterDetail from "./pages/CharacterDetails";
import Favourites from "./pages/Favourites";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<CharacterList />} />
      <Route path="/character/:id" element={<CharacterDetail />} />
      <Route path="/favourites" element={<Favourites />} />
    </Routes>
  </Router>
);

export default App;
