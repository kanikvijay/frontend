import react, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
const AddComment = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    content: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { content } = formData;

      await axios.post(`http://localhost:5000/api/blog/comment/${id}`, {
        content,
      });
      navigate(`/seemore/${id}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="content"
        label="Add Comment"
        variant="outlined"
        multiline
        rows={4}
        value={formData.content}
        onChange={handleChange}
      />
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};

export default AddComment;
