import React, { useState } from "react";
import { AppBar, Toolbar, Typography, IconButton, Button, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const SiteHeader = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const menuOptions = [
    { label: "Home", path: "/" },
    { label: "Favorites", path: "/movies/favorites" },
    { label: "Playlist", path: "/movies/playlist" },
    { label: "Upcoming", path: "/movies/upcoming" },
    { label: "Trending Today", path: "/movies/trending/today" },
    { label: "Popular", path: "/movies/popular" },
    { label: "Top Rated", path: "/movies/top-rated" },
    { label: "Now Playing", path: "/movies/now-playing" },
  ];

  const handleMenuSelect = (path) => { setAnchorEl(null); navigate(path); };
  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);

  return (
    <>
      <AppBar sx={{ background: "linear-gradient(90deg,#2196f3,#64b5f6)", boxShadow: 4 }}>
        <Toolbar sx={{ flexWrap: "wrap", gap: 2 }}>
          <Typography variant="h4" sx={{ flexGrow: 1, fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}>
            TMDB Client
          </Typography>
          <Typography variant="subtitle1" sx={{ flexGrow: 1, color: "#e3f2fd", fontFamily: "'Roboto', sans-serif" }}>
            All you ever wanted to know about Movies!
          </Typography>
          {isMobile ? (
            <>
              <IconButton onClick={handleMenuOpen} sx={{ backgroundColor: 'rgba(255,255,255,0.1)', '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' } }}>
                <MenuIcon />
              </IconButton>
              <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
                {menuOptions.map((opt) => (
                  <MenuItem key={opt.label} onClick={() => handleMenuSelect(opt.path)} sx={{ '&:hover': { backgroundColor: '#bbdefb' } }}>
                    {opt.label}
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            menuOptions.map((opt) => (
              <Button key={opt.label} onClick={() => handleMenuSelect(opt.path)} sx={{ color: "#fff", fontWeight: 500, '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 2 } }}>
                {opt.label}
              </Button>
            ))
          )}
        </Toolbar>
      </AppBar>
      <div style={{ minHeight: "64px" }} />
    </>
  );
};

export default SiteHeader;
