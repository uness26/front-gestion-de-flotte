import { Container, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5, display: 'flex', justifyContent: 'center' }}>
      <TextField
        id="search"
        type="search"
        label="Search"
        value={searchTerm}
        onChange={handleChange}
        sx={{ width: 500 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end" >
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </Container>
  );
}