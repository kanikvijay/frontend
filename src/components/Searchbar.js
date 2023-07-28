// import React from "react";
// import { Button, TextField, Typography } from "@mui/material";
// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Searchbar = () => {
//   // const navigate = useNavigate();
//   const [title, setTitle] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [error, setError] = useState(null);
//   const handleSearch = async (title) => {
//     try {
//       // title.preventDefault();
//       console.log(title);
//       const response = await axios.get(
//         "http://localhost:5000/api/blog/search",
//         {
//           params: {
//             title: title, // Update this line to pass the search query
//           },
//         }
//       );
//       //   const response = await axios.get(
//       //     "http://localhost:5000/api/blog/search",
//       //     {
//       //       params: {
//       //         query: searchQuery,
//       //       },
//       //     }
//       //   );
//       // navigate("/search");
//       setSearchResults(response.data);
//       console.log(response.data);
//       setError(null);
//     } catch (error) {
//       setError(error.message);
//       setSearchResults([]);
//     }
//   };

//   return (
//     <div>
//       <TextField
//         label="Search"
//         variant="outlined"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//       />
//       <Button variant="contained" color="primary" onClick={handleSearch}>
//         Search
//       </Button>
//       {error && (
//         <Typography variant="body1" color="error">
//           Error: {error}
//         </Typography>
//       )}
//       {searchResults.length === 0 ? (
//         <Typography variant="body1">No results found.</Typography>
//       ) : (
//         searchResults.map((result) => (
//           <div key={result._id}>
//             <Typography variant="h6">{result.title}</Typography>
//             <Typography variant="body1">{result.description}</Typography>
//             <hr />
//           </div>
//         ))
//       )}
//     </div>
//   );
// };
// export default Searchbar;

import React from "react";
import {
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";

const Searchbar = () => {
  const [title, setTitle] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/blog/search",
        {
          params: {
            title: title,
          },
        }
      );
      setSearchResults(response.data);
      setError(null);
    } catch (error) {
      setError(error.message);
      setSearchResults([]);
    }
  };

  return (
    <div>
      <TextField
        label="Search"
        variant="outlined"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Search
      </Button>
      {error && (
        <Typography variant="body1" color="error">
          Error: {error}
        </Typography>
      )}
      {searchResults.length === 0 ? (
        <Typography variant="body1">No results found.</Typography>
      ) : (
        searchResults.map((result) => (
          <div key={result._id}>
            <Card>
              {result.image && (
                <CardMedia
                  component="img"
                  height="200"
                  src={result.image}
                  alt="Blog Thumbnail"
                />
              )}
              <CardContent>
                <Typography variant="h6">{result.title}</Typography>
                <Typography variant="body1">{result.description}</Typography>
                <hr />
              </CardContent>
            </Card>
          </div>
        ))
      )}
    </div>
  );
};

export default Searchbar;
