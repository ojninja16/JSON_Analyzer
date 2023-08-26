'use client'
import React, { useCallback, useState } from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Search from "./Search";
import { useDropzone } from "react-dropzone";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

function FileUploader({ onFileUpload }) {
  const [parsedData, setParsedData] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length === 1 && acceptedFiles[0].type === "application/json") {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const jsonData = JSON.parse(event.target.result);
          setParsedData(jsonData);
          onFileUpload(jsonData);
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      };
      reader.readAsText(file);
    } else {
      alert("Please select a JSON file.");
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ".json",
    multiple: false,
  });

  return (
    <Paper
      elevation={3}
      sx={{
        backgroundColor: "#f5f5f5",
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Typography variant="h5" sx={{ marginBottom: "1rem" }}>
        📂 Add your JSON file here
      </Typography>
      <div
        {...getRootProps()}
        style={{
          border: "2px dashed #ccc",
          padding: "3rem",
          textAlign: "center",
          cursor: "pointer",
          width: "45rem",
          height: "15rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <input {...getInputProps()} />
        <InsertDriveFileIcon sx={{ fontSize: 48, marginBottom: "1rem" }} />
        <Typography variant="h6">Drag & Drop a JSON file here</Typography>
        <Typography variant="body2">(Or click to select one)</Typography>
      </div>
      {parsedData && (
        <Typography variant="body1" sx={{ marginTop: "1rem", color: "green" }}>
          🚀 JSON File Parsed Successfully!
        </Typography>
      )}
      <Typography variant="h6" align="center" sx={{ margin: "1rem" }}>
        📝 Log Search
      </Typography>
      <Search parameterNames={parsedData ? Object.keys(parsedData[0]) : []} jsonData={parsedData} />
    </Paper>
  );
}

export default FileUploader;
