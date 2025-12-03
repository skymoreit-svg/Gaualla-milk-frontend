"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
  Paper,
  Fade,
  Stack,
  CircularProgress,
  Alert,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { adminurl } from "../adminCompo/adminapis";

export default function MuiLoginWithSuggestions() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generatePasswords = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
    const generate = () =>
      Array.from({ length: 12 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");

    setSuggestions([generate()]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);

    try {
      const { data } = await axios.post(
        `${adminurl}/login`,
        { email, password },
        {
          withCredentials: true,
        }
      );

      if (data.success) {
        router.push("/admin/dashboard");
      } else {
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f172a, #1e293b)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 5, // increased
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 5, // increased padding
          width: 480, // Increased width
          minHeight: 500, // Increased height
          backdropFilter: "blur(12px)",
          background: "rgba(255,255,255,0.08)",
          borderRadius: 4,
        }}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{ mb: 4, color: "white", fontWeight: "bold" }}
        >
          Admin Login
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3, bgcolor: "rgba(211, 47, 47, 0.1)", color: "white" }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            required
            sx={{
              mb: 4,
              input: { color: "white", height: "20px" },
              label: { color: "white" },
              "& fieldset": { borderColor: "white" },
              "&:hover fieldset": { borderColor: "#60a5fa" },
            }}
          />

        {/* Password */}
        <TextField
          fullWidth
          label="Password"
          variant="outlined"
          type={showPass ? "text" : "password"}
          value={password}
          onFocus={generatePasswords}
          onChange={(e) => setPassword(e.target.value)}
          sx={{
            mb: 3,
            input: { color: "white", height: "20px" },
            label: { color: "white" },
            "& fieldset": { borderColor: "white" },
            "&:hover fieldset": { borderColor: "#60a5fa" },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPass(!showPass)}
                  edge="end"
                  sx={{ color: "white" }}
                >
                  {showPass ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* Password Suggestions */}
        <Fade in={suggestions.length > 0}>
          <Stack spacing={2} sx={{ mb: 4 }}>
            {suggestions.map((p, i) => (
              <Paper
                key={i}
                onClick={() => setPassword(p)}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  bgcolor: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "white",
                  cursor: "pointer",
                  fontSize: "15px",
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.2)",
                  },
                }}
              >
                Use Strong Password <span style={{ color: "red" }}>— {p}</span>
              </Paper>
            ))}
          </Stack>
        </Fade>

          {/* Login Button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{
              py: 2,
              fontWeight: "bold",
              fontSize: "16px",
              borderRadius: 2,
              background: "#3b82f6",
              "&:hover": { background: "#2563eb" },
              "&:disabled": { background: "#1e40af" },
            }}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: "white" }} />
            ) : (
              "Login"
            )}
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
