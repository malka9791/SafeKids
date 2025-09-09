import {
  AppBar,
  Toolbar,
  Button,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link, useNavigate } from "react-router";

export function Header() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box sx={{ mb: 12 }}>
      <AppBar sx={{ backgroundColor: "background.paper", boxShadow: 1 }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box>
              {" "}
              size={32} color={theme.palette.primary.main}{" "}
            </Box>
            <img
              src="./src/img/logo2.jpg"
              alt="Logo"
              style={{ width: 250, height: 70 }}
            />
          </Box>

          {!isMobile && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
              <Button
                component={Link}
                to="/"
                color="inherit"
                sx={{ color: "text.primary", "&:hover": { color: "#4ed9df" } }}
              >
                בית
              </Button>
              <Button
                component={Link}
                to="/contact"
                color="inherit"
                sx={{ color: "text.primary", "&:hover": { color: "#4ed9df" } }}
                href="#features"
              >
                צור קשר
              </Button>
              <Button
                onClick={() => navigate("/explanation")}
                color="inherit"
                sx={{ color: "text.primary", "&:hover": { color: "#4ed9df" } }}
              >
                הסבר
              </Button>
              <Button
                color="inherit"
                sx={{ color: "text.primary", "&:hover": { color: "#4ed9df" } }}
                component={Link}
                to="/form"
              >
                 צור כרטיס עכשיו
              </Button>
            </Box>
          )}

          <Button
            component={Link}
            to="/form"
            variant="contained"
            sx={{
              backgroundColor: "#4ed9df",
              color: "white",
              fontWeight: "bold",
              borderRadius: 2,
              px: 3,
              py: 1,
            }}
          >
            התחל עכשיו
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
