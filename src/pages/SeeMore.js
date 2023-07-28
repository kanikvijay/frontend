import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography, Grid, Card, CardMedia, CardContent } from "@mui/material";
import { useParams } from "react-router-dom";

const SeeMore = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/blog/seemore/${id}`
        );
        setBlog(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blog post", error);
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return <Typography variant="body1">Loading...</Typography>;
  }

  if (!blog) {
    return <Typography variant="body1">Blog not found</Typography>;
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6} key={blog._id}>
        <Card>
          {/* Display image if you have one */}
          {blog.image && (
            <CardMedia
              component="img"
              height="200"
              src={blog.image}
              alt="Blog Thumbnail"
            />
          )}
          <CardContent>
            <Typography variant="h5" component="h2" color="red" padding="10px">
              {blog.title}
            </Typography>
            <Typography variant="body1" border="2px solid black" padding="10px">
              {blog.description}
            </Typography>
            <Typography variant="subtitle1">
              Category: {blog.categories}
            </Typography>
            <Typography variant="subtitle1">Author:{blog.author}</Typography>
            <Typography variant="subtitle1">
              Likes: {blog.likes.length}
            </Typography>
            <Typography variant="h6">Comments:</Typography>
            <ul>
              {blog.comments.map((comment) => (
                <li key={comment._id}>
                  <Typography variant="body2" component="span">
                    <strong>{comment.author}</strong>: {comment.content}
                  </Typography>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default SeeMore;
