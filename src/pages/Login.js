import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  TextField, 
  Button, 
  Container, 
  Typography, 
  Paper,
  Link,
  Box,
  Alert
} from "@mui/material";
import { motion } from "framer-motion";
import { 
  getAuth, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged
} from "firebase/auth";
import { app } from "./firebase";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth(app);

  // Check auth state on component mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/dashboard'); // Redirect if already logged in
      }
    });
    return unsubscribe; // Cleanup subscription
  }, [auth, navigate]);

  const handleAuth = async () => {
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    setLoading(true);
    setError("");

    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Registration successful! Please login.");
        setIsRegister(false); // Switch back to login after registration
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        navigate('/dashboard'); // Redirect to dashboard after successful login
      }
    } catch (error) {
      setError(error.message.replace("Firebase: ", ""));
    } finally {
      setLoading(false);
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

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {isRegister && (
            <TextField
              label="Full Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="login-input"
              disabled={loading}
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
            disabled={loading}
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
            disabled={loading}
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleAuth}
            className="login-button"
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? "Processing..." : isRegister ? "Register" : "Login"}
          </Button>

          <Box sx={{ mt: 2, textAlign: "center" }}>
            <Link 
              component="button" 
              onClick={() => setIsRegister(!isRegister)}
              className="toggle-link"
              disabled={loading}
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