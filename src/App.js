import { useState } from 'react';
import axios from 'axios';
import { Container, IconButton, InputAdornment, List, ListItem, ListItemButton, ListItemText, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import { Search, Clear } from '@mui/icons-material';

function App() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [parsedData, setParsedData] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [apiCallTime, setApiCallTime] = useState(null);

  const handleQueryChange = async (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    const response = await axios.get(`/suggestions?name=${newQuery}`);
    const parsedData = response.data.map((item) => {
      const [id, data] = item.split(",");
      return { id, data };
    });
    setParsedData(parsedData);
    setSuggestions(parsedData.map(item => item.data));
  };

  const handleClick = async (id) => {
    const startTime = new Date().getTime(); // start timing the API call
    const response = await axios.get(`/findById/${id}`);
    const endTime = new Date().getTime(); // end timing the API call
    setApiCallTime(endTime - startTime); // set the API call time in milliseconds
    setSelectedCustomer(response.data);
    setQuery(response.data.firstname + " " + response.data.lastname);
    setSuggestions([]);
  };

  return (
    <div>
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
          <List style={{ position: "fixed", width: '29%', zIndex: 999, backgroundColor: 'white'  }}>
            {suggestions.map((suggestion, index) => (
              <ListItem key={index}>
                <ListItemButton onClick={() => handleClick(parsedData[index].id)}>
                  <ListItemText primary={suggestion} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
      </Container>
      <Container maxWidth="lg" sx={{ marginTop: "50px" }}>
        {selectedCustomer && (
          <div>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell style={{ width: '20%' , textAlign: 'center' }}>First Name</TableCell>
                    <TableCell style={{ width: '20%' , textAlign: 'center' }}>Last Name</TableCell>
                    <TableCell style={{ width: '20%' , textAlign: 'center' }}>Email ID</TableCell>
                    <TableCell style={{ width: '20%' , textAlign: 'center' }}>Created On</TableCell>
                    <TableCell style={{ width: '20%' , textAlign: 'center' }}>Updated On</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell style={{ textAlign: 'center' }}>{selectedCustomer.firstname}</TableCell>
                    <TableCell style={{ textAlign: 'center' }}>{selectedCustomer.lastname}</TableCell>
                    <TableCell style={{ textAlign: 'center' }}>{selectedCustomer.email}</TableCell>
                    <TableCell style={{ textAlign: 'center' }}>{selectedCustomer.created}</TableCell>
                    <TableCell style={{ textAlign: 'center' }}>{selectedCustomer.updated}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <h4 align="center">{apiCallTime && <p>API call took {apiCallTime} milliseconds</p>}</h4>
          </div>
        )}
      </Container>
    </div>
  );
}

export default App;