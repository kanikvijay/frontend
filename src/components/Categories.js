import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";

const Categories = () => {
  const categories = ["travel", "food", "gaming", "movies", "tech"];
  const [blogs, setBlogs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategory = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/blog/filter",
        {
          params: {
            categories: selectedCategory, // Pass selectedCategory as an array
          },
        }
      );
      const blogsData = response.data;
      console.log(blogs);
      setBlogs(blogsData);
    } catch (error) {
      // res.status(500).json({ message: "error in server", error });
      console.log(error);
    }
  };
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  console.log(selectedCategory);
  console.log(blogs);
  useEffect(() => {
    if (selectedCategory) {
      handleCategory();
    }
  }, [selectedCategory]);

  return (
    <div>
      <FormControl variant="outlined">
        <InputLabel>Select a category</InputLabel>
        <Select
          label="Select a category"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <MenuItem style={{ width: 200 }}>Select a category</MenuItem>
          {/* Use map function to dynamically generate MenuItem for each category */}
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              <Typography variant="body1" color="red">
                {category}
              </Typography>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <h2>Selected Category: {selectedCategory}</h2>
      {blogs.length === 0 ? (
        <Typography variant="body1">No results found.</Typography>
      ) : (
        <Grid container spacing={2}>
          {blogs.map((blog) => (
            <Grid item key={blog._id} xs={12} sm={6} md={4}>
              <Card>
                {/* Blog thumbnail */}
                <CardMedia
                  component="img"
                  height="140"
                  image={blog.image}
                  alt="Blog Thumbnail"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {blog.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {blog.description}
                  </Typography>
                  {/* Display other blog information as needed */}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default Categories;
