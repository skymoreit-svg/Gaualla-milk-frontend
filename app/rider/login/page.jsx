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
  CircularProgress,
  Alert,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { API_ENDPOINTS } from "../../config/constants";

export default function RiderLogin() {
  const router = useRouter();
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!emailOrPhone || !password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const { data } = await axios.post(
        `${API_ENDPOINTS.RIDER_AUTH}/login`,
        { phone: emailOrPhone, password },
        { withCredentials: true }
      );

      if (data.success) {
        setShowSuccess(true);
        setTimeout(() => {
          router.push("/rider/dashboard");
        }, 2000);
      } else {
        setError(data.message || "Login failed");
        setLoading(false);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
      setLoading(false);
    }
  };

  // SUCCESS SCREEN
  if (showSuccess) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #064e3b, #065f46)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          textAlign: "center",
          p: 3,
        }}
      >
        <CheckCircleOutlineIcon
          sx={{
            fontSize: 100,
            mb: 3,
            animation: "bounce 2s infinite",
            "@keyframes bounce": {
              "0%, 100%": { transform: "translateY(0)" },
              "50%": { transform: "translateY(-20px)" },
            },
          }}
        />
        <Typography variant="h3" fontWeight="bold" sx={{ mb: 2 }}>
          Ride On!
        </Typography>
        <Typography variant="h6" sx={{ mb: 6, opacity: 0.9 }}>
          Accessing your delivery dashboard...
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          {[0, 1, 2].map((i) => (
            <Box
              key={i}
              sx={{ 
                width: 16,
                height: 16,
                borderRadius: "50%",
                background: "white",
                animation: `bounce 1.4s infinite ease-in-out`,
                animationDelay: `${i * 0.16}s`,
              }}
            />
          ))}
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #111827, #1f2937)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={10}
        sx={{
          p: { xs: 4, sm: 6 },
          width: "100%",
          maxWidth: 450,
          borderRadius: 4,
          backdropFilter: "blur(16px)",
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <DirectionsBikeIcon sx={{ fontSize: 48, color: "#10b981", mb: 2 }} />
          <Typography variant="h4" sx={{ color: "white", fontWeight: 700 }}>
            Rider Portal
          </Typography>
          <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)", mt: 1 }}>
            Sign in to start your deliveries
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3, bgcolor: "rgba(239,68,68,0.15)", color: "white" }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Phone Number or Email"
            variant="outlined"
            type="text"
            value={emailOrPhone}
            placeholder="Enter phone or email"
            onChange={(e) => setEmailOrPhone(e.target.value)}
            required
            sx={{
              mb: 3,
              input: { color: "white" },
              label: { color: "rgba(255,255,255,0.7)" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
                "&:hover fieldset": { borderColor: "#10b981" },
                "&.Mui-focused fieldset": { borderColor: "#10b981" },
              },
            }}
          />

          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            type={showPass ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            sx={{
              mb: 4,
              input: { color: "white" },
              label: { color: "rgba(255,255,255,0.7)" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
                "&:hover fieldset": { borderColor: "#10b981" },
                "&.Mui-focused fieldset": { borderColor: "#10b981" },
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPass(!showPass)} sx={{ color: "rgba(255,255,255,0.7)" }}>
                    {showPass ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{
              py: 2,
              fontSize: "18px",
              fontWeight: "bold",
              borderRadius: 2,
              background: "linear-gradient(to right, #10b981, #059669)",
              "&:hover": { background: "linear-gradient(to right, #059669, #047857)" },
              textTransform: "none",
            }}
          >
            {loading ? <CircularProgress size={28} sx={{ color: "white" }} /> : "Sign In"}
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
