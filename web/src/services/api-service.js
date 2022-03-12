import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:3001",
  withCredentials: true,
});

http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.replace("/login");
    }

    return Promise.reject(error);
  }
);

export function getEvents() {
  return http.get("/api/events");
}

export function getEvent(id) {
  return http.get(`/api/events/${id}`);
}

export function deleteEvent(id) {
  return http.delete(`/api/events/${id}`);
}

export function createEvent(event) {
  return http.post("/api/events", event);
}

export function login(user) {
  return http.post("/api/login", user);
}

export function register(user) {
  return http.post("/api/register", user);
}
