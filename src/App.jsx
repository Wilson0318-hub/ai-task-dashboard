import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

import Board from "./pages/Board";

function App() {
  return (
    <BrowserRouter>

      <nav className="navbar">
        <Link className="nav-link" to="/board">
          AI Task Dashboard
        </Link>
      </nav>

      <Routes>

        <Route
          path="/board"
          element={<Board />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
