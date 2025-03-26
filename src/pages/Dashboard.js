import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Grid,
  Card,
  CardContent,
  CardActionArea
} from "@mui/material";
import { 
  ExitToApp as ExitToAppIcon,
  Create as CreateIcon,
  Visibility as VisibilityIcon
} from "@mui/icons-material";
import { getAuth, signOut } from "firebase/auth";
import { app } from "./firebase";

const Dashboard = () => {
  const navigate = useNavigate();
  const auth = getAuth(app);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/"); // Add this line to redirect after sign-out
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const features = [
    {
      title: "Create Ticket",
      description: "Submit a new request or issue",
      icon: <CreateIcon color="primary" sx={{ fontSize: 60 }} />,
      path: "/create-ticket"
    },
    {
      title: "View Status",
      description: "Check your submitted requests",
      icon: <VisibilityIcon color="primary" sx={{ fontSize: 60 }} />,
      path: "/view-status"
    }
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppBar position="static" elevation={0} sx={{ bgcolor: "background.paper" }}>
        <Toolbar>
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              flexGrow: 1,
              fontWeight: "bold",
              color: "primary.main"
            }}
          >
            HostelGo
          </Typography>
          
          <Button
            color="inherit"
            startIcon={<ExitToAppIcon />}
            onClick={handleLogout}
            sx={{
              color: "error.main",
              "&:hover": {
                backgroundColor: "rgba(239, 83, 80, 0.08)"
              }
            }}
          >
            Sign Out
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4, flexGrow: 1 }}>
        <Box
          sx={{
            my: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center"
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome to HostelGo! 🎉
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Select an option to proceed
          </Typography>

          <Grid container spacing={4} sx={{ mt: 4 }}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Card sx={{ height: '100%' }}>
                  <CardActionArea 
                    sx={{ 
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      p: 4
                    }}
                    onClick={() => navigate(feature.path)}
                  >
                    {feature.icon}
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {feature.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Dashboard;