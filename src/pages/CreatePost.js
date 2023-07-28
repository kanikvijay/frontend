import React, { useState } from "react";
import {
  Button,
  Select,
  MenuItem,
  FormControl,
  TextField,
  InputLabel,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import e from "cors";
import FileBase from "react-file-base64";
// import { resizer } from "react-image-file-resizer";

// const useStyles = makeStyles((theme) => ({
//   form: {
//     display: "flex",
//     flexDirection: "column",
//     maxWidth: "400px",
//     margin: "0 auto",
//     "& > *": {
//       margin: theme.spacing(2),
//     },
//   },
//   select: {
//     minWidth: 200,
//   },
// }));
const categories = ["travel", "food", "gaming", "movies", "tech"];

const CreatePost = (e) => {
  const navigate = useNavigate();
  //   const classes = useStyles();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    categories: "",
  });
console.log(formData);
  const handleSubmit = async (event) => {
    event.preventDefault();
    // const formDataToSubmit = new FormData();
    // formDataToSubmit.append("title", formData.title);
    // formDataToSubmit.append("description", formData.description);
    // formDataToSubmit.append("categories", formData.categories);
    // formDataToSubmit.append("image", formData.image);

    // console.log(formDataToSubmit);
    try {
      // const formdata= new FormData()
      // formdata.append("file",formData);
      await axios
        .post(
          "http://localhost:5000/api/blog/make",
          formData
          // {
          //   title: formData.title,
          //   description: formData.description,
          //   categories: formData.categories,
          //   image: formData.image,
          // },
        )
        .then((res) => {
          console.log(`i am in re${res}`);
        })
        .catch((e) => console.log(e));
      navigate("/allBlogs");
    } catch (error) {
      console.log(error);
    }

    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="title"
        label="Title"
        variant="outlined"
        value={formData.title}
        onChange={(e) => setFormData({...formData,title:e.target.value})}
      />
      <TextField
        name="description"
        label="Description"
        variant="outlined"
        multiline
        rows={4}
        value={formData.description}
       onChange={(e) => setFormData({...formData,description:e.target.value})}
      />
      <FileBase
        type="file"
        multiple={false}
        onDone={({ base64 }) => setFormData({ ...formData, image: base64 })}
      />
      {/* <label htmlFor="image-file">
        <Button variant="outlined" component="span">
          Upload Image
        </Button>
      </label> */}
      <FormControl variant="outlined">
        <InputLabel>Categories</InputLabel>
        <Select
          name="categories"
          label="Categories"
          value={formData.categories}
       onChange={(e) => setFormData({...formData,categories:e.target.value})
       }
        >
          {categories.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};
export default CreatePost;
