"use client";

import type React from "react";
import { useState } from "react";
import {
  Typography,
  Button,
  Box,
  Container,
  Grid,
  Paper,
  Card,
  TextField,
  Avatar,
  Chip,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SendIcon from "@mui/icons-material/Send";
import ShieldIcon from "@mui/icons-material/Security";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ChatIcon from "@mui/icons-material/Chat";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleInputChange =
    (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const contactMethods = [
    {
      icon: <EmailIcon sx={{ fontSize: 40, color: "#4ed9df" }} />,
      title: "אימייל",
      description: "support@safekids.co.il",
      subtitle: "מענה תוך 24 שעות",
    },
    {
      icon: <PhoneIcon sx={{ fontSize: 40, color: "#4ed9df" }} />,
      title: "טלפון",
      description: "03-123-4567",
      subtitle: "ראשון-חמישי 9:00-18:00",
    },
    {
      icon: <LocationOnIcon sx={{ fontSize: 40, color: "#4ed9df" }} />,
      title: "כתובת",
      description: "רחוב הטכנולוגיה 15",
      subtitle: "תל אביב, ישראל",
    },
  ];

  const supportFeatures = [
    {
      icon: <SupportAgentIcon sx={{ fontSize: 30, color: "#4ed9df" }} />,
      title: "תמיכה אישית",
      description: "צוות מקצועי לשירותכם",
    },
    {
      icon: <AccessTimeIcon sx={{ fontSize: 30, color: "#4ed9df" }} />,
      title: "מענה מהיר",
      description: "תגובה תוך 24 שעות",
    },
    {
      icon: <ChatIcon sx={{ fontSize: 30, color: "#4ed9df" }} />,
      title: "ייעוץ חינם",
      description: "עזרה בהתאמת המערכת",
    },
  ];

  return (
    <Box dir="rtl" sx={{ overflow: "hidden" }}>
      <Box
        component="section"
        sx={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            //  background: "linear-gradient(135deg, rgba(78,217,223,0.1) 0%, rgba(78,217,223,0.05) 100%)"
            pointerEvents: "none",
          },
        }}
      >
        <Container sx={{ position: "relative", zIndex: 1 }}>
          <Box textAlign="center" mb={8}>
            <Box display="flex" justifyContent="center" mb={3}>
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  background:
                    "linear-gradient(135deg, #4ed9df 0%, #3ea9ae 100%)",
                  mb: 2,
                }}
              >
                <ShieldIcon sx={{ fontSize: 40 }} />
              </Avatar>
            </Box>

            <Chip
              label="🤝 אנחנו כאן בשבילכם"
              sx={{
                mb: 3,
                background:
                  "linear-gradient(45deg, rgba(78,217,223,0.1), rgba(78,217,223,0.1))",
                border: "1px solid rgba(78,217,223,0.2)",
                fontWeight: "bold",
              }}
            />

            <Typography
              variant="h2"
              fontWeight="700"
              gutterBottom
              sx={{
                fontSize: { xs: "2.5rem", md: "3.5rem" },
                background:
                  "linear-gradient(135deg, #4ed9df 0%, #3ea9ae 50%, #34b6c0 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0 4px 20px rgba(78,217,223,0.3)",
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                mb: 3,
              }}
            >
              צרו קשר עם SAFEKIDS
            </Typography>

            <Typography
              variant="h5"
              color="text.secondary"
              sx={{
                fontSize: { xs: "1.1rem", md: "1.3rem" },
                lineHeight: 1.6,
                maxWidth: "600px",
                mx: "auto",
              }}
            >
              יש לכם שאלות? רוצים עזרה? אנחנו כאן כדי לעזור לכם ליצור סביבה
              בטוחה יותר לילדים שלכם
            </Typography>
          </Box>

          <Grid container spacing={4} justifyContent="center" alignContent={"space-around"}>
            {contactMethods.map((method, index) => (
              <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
                <Card
                  elevation={0}
                  sx={{
                    p: 4,
                    textAlign: "center",
                    height: "100%",
                    background:
                      "linear-gradient(135deg, rgba(78,217,223,0.05) 0%, rgba(78,217,223,0.1) 100%)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(78,217,223,0.2)",
                    borderRadius: "20px",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-10px)",
                      boxShadow: "0 25px 50px rgba(78,217,223,0.15)",
                    },
                  }}
                >
                  <Box mb={2}>{method.icon}</Box>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {method.title}
                  </Typography>
                  <Typography
                    variant="h6"
                    color="#4ed9df"
                    fontWeight="bold"
                    gutterBottom
                  >
                    {method.description}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {method.subtitle}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Contact Form Section */}
      <Box component="section" py={15} sx={{ bgcolor: "#f8fafc" }}>
        <Container>
          <Grid container spacing={8} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Box>
                <Typography
                  variant="h3"
                  fontWeight="700"
                  gutterBottom
                  color="#4ed9df"
                >
                  שלחו לנו הודעה
                </Typography>
                <Typography
                  variant="h6"
                  color="text.secondary"
                  paragraph
                  sx={{ mb: 4 }}
                >
                  מלאו את הטופס ואנחנו נחזור אליכם בהקדם האפשרי
                </Typography>

                <Paper
                  component="form"
                  onSubmit={handleSubmit}
                  elevation={0}
                  sx={{
                    p: 4,
                    background:
                      "linear-gradient(135deg, rgba(78,217,223,0.05) 0%, rgba(78,217,223,0.1) 100%)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(78,217,223,0.2)",
                    borderRadius: "20px",
                  }}
                >
                  <Grid container spacing={3}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        label="שם מלא"
                        value={formData.name}
                        onChange={handleInputChange("name")}
                        sx={{
                          "& .MuiOutlinedInput-root": { borderRadius: "12px" },
                        }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        label="אימייל"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange("email")}
                        sx={{
                          "& .MuiOutlinedInput-root": { borderRadius: "12px" },
                        }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <TextField
                        fullWidth
                        label="טלפון"
                        value={formData.phone}
                        onChange={handleInputChange("phone")}
                        sx={{
                          "& .MuiOutlinedInput-root": { borderRadius: "12px" },
                        }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <TextField
                        fullWidth
                        label="הודעה"
                        multiline
                        rows={4}
                        value={formData.message}
                        onChange={handleInputChange("message")}
                        sx={{
                          "& .MuiOutlinedInput-root": { borderRadius: "12px" },
                        }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        endIcon={<SendIcon />}
                        sx={{
                          borderRadius: "15px",
                          px: 4,
                          py: 1,
                          fontSize: "1.1rem",
                          fontWeight: "bold",
                          background:
                            "linear-gradient(135deg, #4ed9df 0%, #3ea9ae 100%)",
                          boxShadow: "0 8px 32px rgba(78,217,223,0.4)",
                          transition: "all 0.3s ease",
                          gap: 1.5, // מוסיף רווח בין הטקסט לאייקון
                          "&:hover": {
                            transform: "translateY(-2px)",
                            boxShadow: "0 12px 40px rgba(78,217,223,0.5)",
                          },
                        }}
                      >
                        שלח הודעה
                      </Button>
                    </Grid>
                  </Grid>
                </Paper>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Box>
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  gutterBottom
                  color="#4ed9df"
                >
                  למה לבחור בנו?
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  paragraph
                  sx={{ mb: 4 }}
                >
                  אנחנו מתחייבים לתת לכם את השירות הטוב ביותר
                </Typography>

                <Grid container spacing={3}>
                  {supportFeatures.map((feature, index) => (
                    <Grid key={index} size={{ xs: 12 }}>
                      <Card
                        elevation={0}
                        sx={{
                          p: 3,
                          background:
                            "linear-gradient(135deg, rgba(78,217,223,0.05) 0%, rgba(78,217,223,0.1) 100%)",
                          backdropFilter: "blur(10px)",
                          border: "1px solid rgba(78,217,223,0.2)",
                          borderRadius: "15px",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            transform: "translateX(-5px)",
                            boxShadow: "0 15px 30px rgba(78,217,223,0.1)",
                          },
                        }}
                      >
                        <Box display="flex" alignItems="center" gap={3}>
                          <Avatar
                            sx={{
                              background:
                                "linear-gradient(135deg, rgba(78,217,223,0.1), rgba(78,217,223,0.1))",
                              border: "1px solid rgba(78,217,223,0.2)",
                            }}
                          >
                            {feature.icon}
                          </Avatar>
                          <Box>
                            <Typography
                              variant="h6"
                              fontWeight="bold"
                              gutterBottom
                            >
                              {feature.title}
                            </Typography>
                            <Typography color="text.secondary">
                              {feature.description}
                            </Typography>
                          </Box>
                        </Box>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
