import React, { useState, useEffect } from "react";
import {
  Button,
  Select,
  MenuItem,
  FormControl,
  TextField,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UpdatePost = () => {
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  //   useEffect(() => {
  //     const fetchBlogPost = async () => {
  //       try {
  //         const response = await axios.get(
  //           `http://localhost:5000/api/blog/${id}`
  //         );
  //         const { title, description } = response.data;
  //         setFormData({ title, description });
  //         setLoading(false);
  //       } catch (error) {
  //         console.error("Error fetching blog data:", error);
  //         setLoading(false);
  //       }
  //     };

  //     fetchBlogPost();
  //   }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // const formDataToSubmit = new FormData();
    // formDataToSubmit.append("title", formData.title);
    // formDataToSubmit.append("description", formData.description);
    // formDataToSubmit.append("categories", formData.categories);
    // formDataToSubmit.append("image", formData.image);

    try {
      await axios.put(
        `http://localhost:5000/api/blog/update/${id}`,

        formData
        // {
        //   title: formData.title,
        //   description: formData.description,
        //   categories: formData.categories,
        //   image: formData.image,
        // },
      );
      navigate("/allBlogs");
    } catch (error) {
      console.error("Error updating blog post:", error);
    }

    console.log(formData);
  };
  //   if (loading) {
  //     return <CircularProgress />;
  //   }  
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="title"
        label="Title"
        variant="outlined"
        value={formData.title}
        onChange={handleChange}
      />
      <TextField
        name="description"
        label="Description"
        variant="outlined"
        multiline
        rows={4}
        value={formData.description}
        onChange={handleChange}
      />
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};
export default UpdatePost;
