import React from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

function SearchParameter({ param, onRemove, onInputChange, parameterNames }) {
  const handleInputChange = (e) => {
    onInputChange(param.id, e.target.name, e.target.value);
  };

  return (
    <Paper elevation={3} style={{ padding: "1rem", marginBottom: "1rem" }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            select // Change to a select field
            label="Parameter Name"
            name="name"
            value={param.name}
            onChange={handleInputChange}
          >
            {parameterNames.length === 0 && ( // Conditionally render placeholder
              <MenuItem value="" disabled>
                Please upload a JSON file 🥺
              </MenuItem>
            )}
            {parameterNames.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Parameter Value"
            name="value"
            value={param.value}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={4} style={{ textAlign: "right" }}>
          <IconButton
            aria-label="Delete"
            onClick={() => onRemove(param.id)}
            color="error"
          >
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default SearchParameter;
