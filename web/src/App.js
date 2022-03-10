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

function App() {
  return (
    <div className="App">
      <NavBar />

      <div className="container py-5">
        <Routes>
          <Route
            path="/events"
            element={<AuthGuard component={EventsList} />}
          />
          <Route
            path="/events/new"
            element={<AuthGuard component={EventNew} />}
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
          <Route
            path="/register"
            element={<AuthGuard component={Register} />}
          />
          <Route path="/profile" element={<AuthGuard component={Profile} />} />
          <Route path="/" element={<Navigate to="/events" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
