import React, { useContext } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Button,
} from "@mui/material";
import UpdatePost from "../pages/UpdatePost";
import { UserContext } from "../context/userProvider";

const Post = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/blog/allBlog"
        );
      
        console.log(response.data.filename);
        setBlogs(response.data);
        console.log(`i am in response of all blogs}`);
        setLoading(false);
      } catch (error) {
        setError("Error fetching blog data");
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/blog/delete/${id}`);
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
    } catch (error) {
      console.error("Error deleting blog post:", error);
    }
  };
  const handleUpdate = async (id) => {
    navigate(`/update/${id}`);
  };

  // const handleLikeCount = async (id) => {
  //   try {
  //     await axios.post(`http://localhost:5000/api/blog/likes/${id}`);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleLikeCount = async (id) => {
    try {
      // Get the user ID from wherever you are storing it (e.g., from authentication context)
      const userId = user._id;
      const name = user.username;
      console.log(name);
      console.log(userId);

      // Send the request to the backend to like the blog post
      await axios.post(`http://localhost:5000/api/blog/likes/${id}`, {
        userId,
      });

      // After liking the post, update the local state to reflect the changes
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog._id === id
            ? {
                ...blog,
                likes: blog.likes.some((like) => like.userId === userId)
                  ? blog.likes.filter((like) => like.userId !== userId)
                  : [...blog.likes, { userId }],
              }
            : blog
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleSeeMore = async (id) => {
    navigate(`/seemore/${id}`);
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography variant="h6">{error}</Typography>;
  }

  const handleComment = async (id) => {
    navigate(`/comment/${id}`);
  };

  return (
    <Grid container spacing={2}>
      {blogs.map((blog) => (
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
              <Typography variant="h5" component="h2">
                {blog.title}
              </Typography>
              <Typography variant="body1">{blog.description}</Typography>
              <Typography variant="subtitle1">
                Category: {blog.categories}
              </Typography>
              <Typography variant="subtitle1">Author: {blog.author}</Typography>
              <Typography variant="subtitle1">
                Likes: {blog.likes.length}
              </Typography>
              <Typography variant="h6">
                Comments:{""}
                <Button onClick={() => handleSeeMore(blog._id)}>
                  SEE Comments
                </Button>
              </Typography>
              {/* <ul>
                {blog.comments.map((comment) => (
                  <li key={comment._id}>
                    <Typography variant="body2" component="span">
                      <strong>{comment.author}</strong>: {comment.content}
                    </Typography>
                  </li>
                ))}
              </ul> */}
            </CardContent>
            <Button onClick={() => handleDelete(blog._id)}>DELETE POST</Button>
            <Button onClick={() => handleUpdate(blog._id)}>UPDATE POST</Button>
            <Button onClick={() => handleLikeCount(blog._id)}>Like</Button>
            <Button onClick={() => handleSeeMore(blog._id)}>SEE MORE</Button>
            <Button onClick={() => handleComment(blog._id)}>ADD COMMENT</Button>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
export default Post;
