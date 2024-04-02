import React from 'react';
import { Grid, FormControl, InputLabel, MenuItem, Select, Button, TextField, InputAdornment } from '@mui/material';
import { CiSearch } from "react-icons/ci";
import './Style/Filter.css';

const Filter = ({ handleMovieNameChange, handleGenreSelectChange, search }) => {
    return (
        <div className="filter-container">
            <div className="filter">
                <Grid container spacing={2} alignItems="center" justifyContent="center">
                    <Grid item xs={12} sm={6} md={4}> {/* Adjust grid size to better accommodate both components */}
                        <FormControl fullWidth>
                            <InputLabel id="genre-select-label" style={{ color: 'white' }}>Select a genre</InputLabel>
                            <Select
                                labelId="genre-select-label"
                                id="genre-select"
                                onChange={handleGenreSelectChange}
                                inputProps={{ style: { color: 'white' } }}
                                style={{ minWidth: 150, borderColor: 'white' }}
                            >
                                <MenuItem value="">Select a genre</MenuItem>
                                <MenuItem value='SCIENCE_FICTION'>Science fiction</MenuItem>
                                <MenuItem value='ACTION'>Action</MenuItem>
                                <MenuItem value='COMEDY'>Comedy</MenuItem>
                                <MenuItem value='DRAMA'>Drama</MenuItem>
                                <MenuItem value='ROMANCE'>Romance</MenuItem>
                                <MenuItem value='HORROR'>Horror</MenuItem>
                                <MenuItem value='THRILLER'>Thriller</MenuItem>
                                <MenuItem value='WESTERN'>Western</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <TextField
                            fullWidth
                            id="search"
                            label="Search"
                            placeholder="Search movies..."
                            variant="outlined"
                            onChange={handleMovieNameChange}
                            InputLabelProps={{ style: { color: 'white' } }}
                            InputProps={{
                                style: { color: 'white', borderColor: 'white' },
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Button onClick={search} variant="contained" startIcon={<CiSearch />} style={{ backgroundColor: 'transparent' }} />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default Filter;
