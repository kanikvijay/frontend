import "./App.css";
import React from "react";
import ReactDOM from "react-dom/client";
import Login from "./pages/Login.js";
import Register from "./pages/Register";
import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { BrowserRouter } from "react-router-dom";
import Searchbar from "./components/Searchbar";
import Post from "./components/Post";
import CreatePost from "./pages/CreatePost";
import UpdatePost from "./pages/UpdatePost";
import Categories from "./components/Categories";
import UserProvider from "./context/userProvider";
import SeeMore from "./pages/SeeMore";
import AddComment from "./pages/AddComment";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Navbar />
        {/* <Searchbar /> */}
        <Routes>
          {/* <Route path="/search" element={<Searchbar />} /> */}
          <Route path="/" element={<HomePage />} />
          <Route path="/category" element={<Categories />} />
          <Route path="/update/:id" element={<UpdatePost />} />
          <Route path="seemore/:id" element={<SeeMore />} />
          <Route path="comment/:id" element={<AddComment />} />
          <Route path="/allBlogs" element={<Post />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
