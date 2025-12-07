"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
  Alert,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { adminurl } from "./adminCompo/adminapis";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Check if already authenticated
    const checkAuth = async () => {
      try {
        const res = await fetch(`${adminurl}/verify`, {
          credentials: "include",
        });
        if (res.ok) {
          router.push("/admin/dashboard");
        }
      } catch (err) {
        // Not authenticated, stay on login
      }
    };
    checkAuth();
  }, [router]);

  const generatePasswords = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
    const generate = () =>
      Array.from({ length: 12 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");

    setSuggestions([generate()]);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${adminurl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/admin/dashboard");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Network error");
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
        p: 5,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 5,
          width: 480,
          minHeight: 500,
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
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleLogin}>
          {/* Email */}
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              mb: 4,
              input: { color: "white", height: "20px" },
              label: { color: "white" },
              "& fieldset": { borderColor: "white" },
              "&:hover fieldset": { borderColor: "#60a5fa" },
            }}
            required
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
            required
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
            fullWidth
            variant="contained"
            type="submit"
            disabled={loading}
            sx={{
              py: 2,
              fontWeight: "bold",
              fontSize: "16px",
              borderRadius: 2,
              background: "#3b82f6",
              "&:hover": { background: "#2563eb" },
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
