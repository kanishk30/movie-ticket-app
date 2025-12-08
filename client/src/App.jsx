import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import PublicRoute from "./components/PublicRoute.jsx";
import Admin from "./pages/Admin/index.jsx";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Partner from "./pages/Partner";
import SingleMovie from "./pages/SingleMovie";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <h2>Movie Tickets</h2>

      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />

          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route path="/admin" element={<Admin />} />
          <Route path="/partner" element={<Partner />} />
          <Route path="/singleMovie/:id" element={<SingleMovie />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
