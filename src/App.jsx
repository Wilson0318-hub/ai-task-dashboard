import { BrowserRouter, Routes, Route } from "react-router-dom";

import Board from "./pages/Board";
import Analytics from "./pages/Analytics";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Board />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;