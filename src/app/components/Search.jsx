'use client'
import React, { useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SearchParameter from "./SearchParameter";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import JsonDisplay from "./JsonDisplay";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";

function Search({ onSearch, parameterNames, jsonData }) {
  const [searchParams, setSearchParams] = useState([
    { id: 1, name: "", value: "" }, // Initial parameter
  ]);
  const [nextId, setNextId] = useState(2);
  const [filteredData, setFilteredData] = useState([]);

  const handleInputChange = (id, name, value) => {
    setSearchParams((prevParams) =>
      prevParams.map((param) =>
        param.id === id ? { ...param, [name]: value } : param
      )
    );
  };

  const handleAddParameter = () => {
    setSearchParams((prevParams) => [
      ...prevParams,
      { id: nextId, name: "", value: "" },
    ]);
    setNextId(nextId + 1);
  };

  const handleRemoveParameter = (id) => {
    setSearchParams((prevParams) => prevParams.filter((param) => param.id !== id));
  };

  const handleSearch = () => {
    const newData = jsonData.filter((item) => {
      return searchParams.every((param) => {
        const paramValue = item[param.name];
        if (typeof paramValue === "string") {
          return paramValue.includes(param.value);
        }
        if (typeof paramValue === "number") {
          return paramValue === parseFloat(param.value); 
        }
        return false;
      });
    });
    setFilteredData(newData);
  };

  return (
    <Paper elevation={3} style={{ padding: "1rem" }}>
      <Typography variant="h5" gutterBottom>
        🔍 Multi-Parameter Search
      </Typography>
      <Grid container spacing={2}>
        {searchParams.map((param) => (
          <Grid item xs={12} key={param.id}>
            <SearchParameter
              key={param.id}
              param={param}
              onRemove={handleRemoveParameter}
              onInputChange={handleInputChange}
              parameterNames={parameterNames}
            />
          </Grid>
        ))}
        <Grid item xs={12}>
          <Button
            variant="outlined"
            color="success"
            startIcon={<AddIcon />}
            onClick={handleAddParameter}
          >
            Add Parameter
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<SearchIcon />}
            onClick={handleSearch}
          >
            Search
          </Button>
        </Grid>
      </Grid>
      {filteredData.length >0  && <JsonDisplay data={filteredData} />}
    </Paper>
  );
}

export default Search;
