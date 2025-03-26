import React, { useState } from "react";
import { 
  TextField, 
  Button, 
  Container, 
  Typography, 
  Paper,
  Link,
  Box
} from "@mui/material";
import { motion } from "framer-motion";
import { 
  getAuth, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword 
} from "firebase/auth";
import { app } from "./firebase";
import "./Login.css";

const Login = ({ onRegisterToggle }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const auth = getAuth(app);

  const handleAuth = async () => {
    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }

    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Registration successful!");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Login successful!");
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <Container maxWidth="xs" className="login-container">
      <motion.div 
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
        className="motion-div"
      >
        <Paper elevation={5} className="login-paper">
          <Typography variant="h4" className="login-title">
            HoGo
          </Typography>
          <Typography variant="h6" className="login-subtitle">
            {isRegister ? "Register" : "Login"}
          </Typography>

          {isRegister && (
            <TextField
              label="Full Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="login-input"
            />
          )}

          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
          />

          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleAuth}
            className="login-button"
            sx={{ mt: 2 }}
          >
            {isRegister ? "Register" : "Login"}
          </Button>

          <Box sx={{ mt: 2, textAlign: "center" }}>
            <Link 
              component="button" 
              onClick={() => setIsRegister(!isRegister)}
              className="toggle-link"
            >
              {isRegister ? "Already have an account? Login" : "New user? Register"}
            </Link>
          </Box>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default Login;
