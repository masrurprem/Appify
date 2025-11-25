import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Feed from "./pages/feed";

//render
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      {/*Both /(landing route for now) and /login leads to login page */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />
      <Route path="/feed" element={<Feed />} />
    </Routes>
  </BrowserRouter>
);
