import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Bugs from "./pages/Bugs";
import CreateBug from "./pages/CreateBug";
import BugDetails from "./pages/BugDetails";
import Projects from "./pages/Projects";


function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />


        <Route
          path="/"
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        />


        <Route
          path="*"
          element={

            <ProtectedRoute>

              <Navbar />

              <Routes>

                <Route
                  path="/dashboard"
                  element={<Dashboard />}
                />

                <Route
                  path="/bugs"
                  element={<Bugs />}
                />

                <Route
                  path="/create-bug"
                  element={<CreateBug />}
                />

                <Route
                  path="/bugs/:id"
                  element={<BugDetails />}
                />

                <Route
                  path="/projects"
                  element={<Projects />}
                />

              </Routes>

            </ProtectedRoute>

          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;