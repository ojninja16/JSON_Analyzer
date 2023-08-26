import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { JsonView, allExpanded, defaultStyles } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';

function JsonDisplay({ data }) {
  const [showAll, setShowAll] = useState(false);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const jsonStyle = {
    backgroundColor: "transparent",
    margin: "1rem",
    padding: "1rem",
    minHeight: "12.5rem", 
    overflowX: "auto",
    maxWidth: "50rem",
  };

  return (
    <Paper elevation={3} style={jsonStyle}>
      <Typography variant="h5" gutterBottom>
        Search Results (JSON Format)
      </Typography>
      {data ? (
        <div>
          <div className="json-tree-container">
            <JsonView
              data={showAll ? data : data.slice(0, 3)}
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
