import React, { useState } from 'react';
import axios from 'axios';
import {
  Container,
  TextField,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { Search } from '@material-ui/icons';

function App() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleQueryChange = async (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    const response = await axios.get(`/suggestions?query=${newQuery}`);
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
            <ListItemIcon>
              <Search />
            </ListItemIcon>
          ),
        }}
      />
      <List>
        {suggestions.map((suggestion) => (
          <ListItem button key={suggestion}>
            <ListItemText primary={suggestion} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default App;