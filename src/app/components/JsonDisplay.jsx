import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { JsonView, allExpanded, defaultStyles } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

function JsonDisplay({ data }) {
  const [showAll, setShowAll] = useState(false);
  const [selected, setSelected] = useState([]);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const handleParameterSelection = (paramname) => {
    if (selected.includes(paramname)) {
      setSelected(selected.filter((param) => param !== paramname));
    } else {
      setSelected([...selected, paramname]);
    }
  };

  const jsonStyle = {
    backgroundColor: "transparent",
    margin: "1rem",
    padding: "1rem",
    minHeight: "12.5rem",
    overflowX: "auto",
    maxWidth: "50rem",
  };

  const filteredData = data.map((item) => {
    const filteredItem = {};
    for (const paramName of selected) {
      filteredItem[paramName] = item[paramName];
    }
    return filteredItem;
  });

  return (
    <Paper elevation={3} style={jsonStyle}>
      <Typography variant="h5" gutterBottom>
        Search Results (JSON Format)
      </Typography>
      <Divider sx={{ marginBottom: "1rem" }} />
      <Typography variant="h6">Select Parameters to Display:</Typography>
      <Grid container spacing={2}>
        {data &&
          Object.keys(data[0]).map((paramname) => (
            <Grid item xs={6} sm={4} md={3} key={paramname}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selected.includes(paramname)}
                    onChange={() => handleParameterSelection(paramname)}
                    color="primary"
                  />
                }
                label={paramname}
              />
            </Grid>
          ))}
      </Grid>
      {data ? (
        <div>
          <Divider sx={{ margin: "1rem 0" }} />
          <div className="json-tree-container">
            <JsonView
              data={showAll ? filteredData : filteredData.slice(0, 3)}
              shouldInitiallyExpand={allExpanded}
              style={defaultStyles}
              limitMaxLength={500}
              displayObjectSize={false}
              displayDataTypes={false}
            />
          </div>
          {data.length > 3 && !showAll && (
            <Typography
              variant="body2"
              color="primary"
              style={{ cursor: "pointer" }}
              onClick={toggleShowAll}
            >
              Show More
            </Typography>
          )}
        </div>
      ) : (
        <CircularProgress />
      )}
    </Paper>
  );
}

export default JsonDisplay;
