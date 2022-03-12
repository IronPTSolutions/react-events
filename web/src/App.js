import EventDetail from "./components/event-detail";
import EventEdit from "./components/event-edit";
import EventNew from "./components/event-new";
import EventsList from "./components/events-list";
import Login from "./components/login";
import Profile from "./components/profile";
import Register from "./components/register";
import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import NavBar from "./components/navbar";
import AuthGuard from "./guards/auth-guard";
import { AlertContextProvider } from "./contexts/alert-context";

function App() {
  const [showModal, setShowModal] = React.useState(false);

  function toggleShowModal() {
    setShowModal(!showModal);
  }

  return (
    <div className="App">
      <NavBar />

      <AlertContextProvider>
        {showModal && <EventNew onClose={toggleShowModal} />}

        <div className="container py-5">
          <button
            className="btn btn-primary mb-3 d-flex align-items-center"
            onClick={toggleShowModal}
          >
            New Event
          </button>

          <Routes>
            <Route
              path="/events"
              element={<AuthGuard component={EventsList} key={showModal} />}
            />
            <Route
              path="/events/:id"
              element={<AuthGuard component={EventDetail} />}
            />
            <Route
              path="/events/:id/edit"
              element={<AuthGuard component={EventEdit} />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/profile"
              element={<AuthGuard component={Profile} />}
            />
            <Route path="/" element={<Navigate to="/events" />} />
          </Routes>
        </div>
      </AlertContextProvider>
    </div>
  );
}

export default App;
