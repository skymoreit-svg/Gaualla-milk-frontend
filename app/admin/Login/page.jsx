// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import axios from "axios";
// import {
//   Box,
//   TextField,
//   Button,
//   Typography,
//   IconButton,
//   InputAdornment,
//   Paper,
//   Fade,
//   Stack,
//   CircularProgress,
//   Alert,
// } from "@mui/material";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import { adminurl } from "../adminCompo/adminapis";

// export default function MuiLoginWithSuggestions() {
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPass, setShowPass] = useState(false);
//   const [suggestions, setSuggestions] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const generatePasswords = () => {
//     const chars =
//       "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
//     const generate = () =>
//       Array.from({ length: 12 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");

//     setSuggestions([generate()]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (!email || !password) {
//       setError("Please fill in all fields");
//       return;
//     }

//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//       setError("Please enter a valid email address");
//       return;
//     }

//     setLoading(true);

//     try {
//       const { data } = await axios.post(
//         `${adminurl}/login`,
//         { email, password },
//         {
//           withCredentials: true,
//         }
//       );

//       if (data.success) {
//         router.push("/admin/dashboard");
//       } else {
//         setError(data.message || "Login failed. Please try again.");
//       }
//     } catch (err) {
//       setError(
//         err.response?.data?.message || "Login failed. Please check your credentials."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         background: "linear-gradient(135deg, #0f172a, #1e293b)",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         p: 5, // increased
//       }}
//     >
//       <Paper
//         elevation={6}
//         sx={{
//           p: 5, // increased padding
//           width: 480, // Increased width
//           minHeight: 500, // Increased height
//           backdropFilter: "blur(12px)",
//           background: "rgba(255,255,255,0.08)",
//           borderRadius: 4,
//         }}
//       >
//         <Typography
//           variant="h4"
//           align="center"
//           sx={{ mb: 4, color: "white", fontWeight: "bold" }}
//         >
//           Admin Login
//         </Typography>

//         {error && (
//           <Alert severity="error" sx={{ mb: 3, bgcolor: "rgba(211, 47, 47, 0.1)", color: "white" }}>
//             {error}
//           </Alert>
//         )}

//         <form onSubmit={handleSubmit}>
//           {/* Email */}
//           <TextField
//             fullWidth
//             label="Email"
//             variant="outlined"
//             type="email"
//             value={email}
//             onChange={(e) => {
//               setEmail(e.target.value);
//               setError("");
//             }}
//             required
//             sx={{
//               mb: 4,
//               input: { color: "white", height: "20px" },
//               label: { color: "white" },
//               "& fieldset": { borderColor: "white" },
//               "&:hover fieldset": { borderColor: "#60a5fa" },
//             }}
//           />

//         {/* Password */}
//         <TextField
//           fullWidth
//           label="Password"
//           variant="outlined"
//           type={showPass ? "text" : "password"}
//           value={password}
//           onFocus={generatePasswords}
//           onChange={(e) => setPassword(e.target.value)}
//           sx={{
//             mb: 3,
//             input: { color: "white", height: "20px" },
//             label: { color: "white" },
//             "& fieldset": { borderColor: "white" },
//             "&:hover fieldset": { borderColor: "#60a5fa" },
//           }}
//           InputProps={{
//             endAdornment: (
//               <InputAdornment position="end">
//                 <IconButton
//                   onClick={() => setShowPass(!showPass)}
//                   edge="end"
//                   sx={{ color: "white" }}
//                 >
//                   {showPass ? <VisibilityOff /> : <Visibility />}
//                 </IconButton>
//               </InputAdornment>
//             ),
//           }}
//         />

//         {/* Password Suggestions */}
//         <Fade in={suggestions.length > 0}>
//           <Stack spacing={2} sx={{ mb: 4 }}>
//             {suggestions.map((p, i) => (
//               <Paper
//                 key={i}
//                 onClick={() => setPassword(p)}
//                 sx={{
//                   p: 2,
//                   borderRadius: 2,
//                   bgcolor: "rgba(255,255,255,0.1)",
//                   border: "1px solid rgba(255,255,255,0.2)",
//                   color: "white",
//                   cursor: "pointer",
//                   fontSize: "15px",
//                   "&:hover": {
//                     bgcolor: "rgba(255,255,255,0.2)",
//                   },
//                 }}
//               >
//                 Use Strong Password <span style={{ color: "red" }}>— {p}</span>
//               </Paper>
//             ))}
//           </Stack>
//         </Fade>

//           {/* Login Button */}
//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             disabled={loading}
//             sx={{
//               py: 2,
//               fontWeight: "bold",
//               fontSize: "16px",
//               borderRadius: 2,
//               background: "#3b82f6",
//               "&:hover": { background: "#2563eb" },
//               "&:disabled": { background: "#1e40af" },
//             }}
//           >
//             {loading ? (
//               <CircularProgress size={24} sx={{ color: "white" }} />
//             ) : (
//               "Login"
//             )}
//           </Button>
//         </form>
//       </Paper>
//     </Box>
//   );
// }




























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
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { adminurl } from "../adminCompo/adminapis";

export default function MuiLoginWithSuggestions() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

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
        { withCredentials: true }
      );

      if (data.success) {
        setShowSuccess(true);
        setTimeout(() => {
          router.push("/admin/dashboard");
        }, 3000);
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
          background: "linear-gradient(135deg, #0f172ab2, #1e293bb0)",
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
          Welcome Back, Admin!
        </Typography>
        <Typography variant="h6" sx={{ mb: 6, opacity: 0.9 }}>
          Here's your dashboard overview.
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

  // LOGIN FORM
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f172a, #1e293b)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 3,
      }}
    >
      <Paper
        elevation={10}
        sx={{
          p: 6,
          width: { xs: "95%", sm: 500 },
          maxWidth: 520,
          borderRadius: 4,
          backdropFilter: "blur(16px)",
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <Typography variant="h4" align="center" sx={{ mb: 4, color: "white", fontWeight: 700 }}>
          Admin Login
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3, bgcolor: "rgba(239,68,68,0.15)", color: "white" }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
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
              input: { color: "white" },
              label: { color: "white" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                "&:hover fieldset": { borderColor: "#60a5fa" },
                "&.Mui-focused fieldset": { borderColor: "#3b82f6" },
              },
            }}
          />

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
              input: { color: "white" },
              label: { color: "white" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                "&:hover fieldset": { borderColor: "#60a5fa" },
                "&.Mui-focused fieldset": { borderColor: "#3b82f6" },
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPass(!showPass)} sx={{ color: "white" }}>
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
                  elevation={2}
                  sx={{
                    p: 2,
                    bgcolor: "rgba(59,130,246,0.15)",
                    color: "white",
                    cursor: "pointer",
                    border: "1px dashed #60a5fa",
                    "&:hover": { bgcolor: "rgba(59,130,246,0.25)" },
                  }}
                >
                  Suggested: <strong>{p}</strong> (Click to use)
                </Paper>
              ))}
            </Stack>
          </Fade>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{
              py: 2,
              fontSize: "18px",
              fontWeight: "bold",
              borderRadius: 3,
              background: "linear-gradient(to right, #3b82f6, #8b5cf6)",
              "&:hover": { background: "linear-gradient(to right, #2563eb, #7c3aed)" },
              textTransform: "none",
            }}
          >
            {loading ? <CircularProgress size={28} sx={{ color: "white" }} /> : "Login"}
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
