import Image from 'next/image'
import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Search from "./components/Search"; // Make sure to import your Search component
import FileUploader from './components/FileUploader';

function MainPage() {
  return (
    <Paper
      elevation={0}
      sx={{
        backgroundColor: "#f0f0f0", // Set your desired background color
        padding:'3rem', // Add padding around the content
        minHeight: "100vh", // Ensure the container takes the full viewport height
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Typography
        variant="h4"
        sx={{ marginBottom: '1.5rem' }} // Add spacing below the title
        align="center"
      >
        🚀 Explore MultiParameter Data 🔍
      </Typography>
      <FileUploader/>
    </Paper>
  );
}

export default MainPage;
