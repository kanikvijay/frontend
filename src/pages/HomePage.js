import React from "react";
import Searchbar from "../components/Searchbar";
import Post from "../components/Post";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const buttonStyle = {
    margin: "10px", // Adding margin from all sides
    padding: "10px", // Adding padding from all sides
    color: "#fff", // Text color (white)
    backgroundColor: "#1976D2", // Primary color (blue)
    "&:hover": {
      backgroundColor: "#1565C0", // Darker color on hover
    },
  };

  const handleClick = () => {
    navigate("/create");
  };
  const handleClicknew = () => {
    navigate("/category");
  };
  return (
    <div>
      <Searchbar />
      <Button onClick={handleClick} style={buttonStyle} variant="contained">
        Create New Blog
      </Button>
      <Button onClick={handleClicknew} style={buttonStyle} variant="contained">
        Search By Category
      </Button>
      <Post></Post>

      {/* Your other content */}
    </div>
  );
};

export default HomePage;
