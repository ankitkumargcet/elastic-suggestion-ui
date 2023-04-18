import { useState } from 'react';
import axios from 'axios';
import { Container, IconButton, InputAdornment, List, ListItem, ListItemButton, ListItemText, TextField } from '@mui/material';
import { Search, Clear } from '@mui/icons-material';

function App() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleQueryChange = async (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    const response = await axios.get(`/suggestions?name=${newQuery}`);
    setSuggestions(response.data);
  };

  return (
    <Container maxWidth="sm">
      <h1 align="center">Customer Suggestion Application</h1>
      <TextField
        label="Search for a customer"
        value={query}
        onChange={handleQueryChange}
        fullWidth
        margin="normal"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setQuery('')}>
                <Clear />
              </IconButton>
            </InputAdornment>
          )
        }}
      />
      <List>
        {suggestions.map((suggestion) => (
          <ListItem key={suggestion}>
            <ListItemButton>
              <ListItemText primary={suggestion} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default App;