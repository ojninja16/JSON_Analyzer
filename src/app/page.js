import Image from 'next/image'
import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Search from "./components/Search"; 
import FileUploader from './components/FileUploader';

function MainPage() {
  return (
    <Paper
      elevation={0}
      sx={{
        backgroundColor: "#f0f0f0", 
        padding:'3rem', 
        minHeight: "100vh", 
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Typography
        variant="h4"
        sx={{ marginBottom: '1.5rem' }} 
        align="center"
      >
        🚀 Explore MultiParameter Data 🔍
      </Typography>
      <FileUploader/>
    </Paper>
  );
}

export default MainPage;
