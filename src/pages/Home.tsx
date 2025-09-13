import { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Box,
  Container,
  Grid,
  Paper,
  Card,
} from "@mui/material";
import ExampleForm from "../img/example-form.jpg";
import Logo from "../img/logo2.jpg";
import ShieldIcon from "@mui/icons-material/Security";
// import GroupIcon from "@mui/icons-material/Group";
// import DescriptionIcon from "@mui/icons-material/Description";
// import SmartphoneIcon from "@mui/icons-material/Smartphone";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Explain } from "./explain";
import { Info } from "@mui/icons-material";

export default function SafeKidsHomepage() {
  const [, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // const features = [
  //   {
  //     icon: <DescriptionIcon sx={{ fontSize: 40, color: "#4ed9df" }} />,
  //     title: "כרטיס אלרגיות דיגיטלי",
  //     description: "צרו כרטיס מקצועי עם כל פרטי האלרגיות של הילד",
  //   },
  //   {
  //     icon: <SmartphoneIcon sx={{ fontSize: 40, color: "#4ed9df" }} />,
  //     title: "נגיש בכל מקום",
  //     description: "גישה מהירה למידע החיוני בכל זמן ומכל מקום",
  //   },
  //   {
  //     icon: <GroupIcon sx={{ fontSize: 40, color: "#4ed9df" }} />,
  //     title: "שיתוף בטוח",
  //     description: "שתפו בקלות עם בית הספר, הגן והצוות הרפואי",
  //   },
  // ];

  const stats = [
    { number: "10,000+", label: "משפחות מרוצות" },
    { number: "99.9%", label: "זמינות המערכת" },
    { number: " מענה תוך 24 שעות ", label: "תמיכה טכנית" },
    { number: "100%", label: "אבטחת מידע" },
  ];

  return (
    <Box dir="rtl">
      <Box
        component="section"
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Container>
          <Box textAlign="center" mb={10}>
            <Card
              elevation={0}
              sx={{
                p: 6,
                background: "#4edadf53", // צבע אחיד של האתר
                color: "text.secondary", // טקסט לבן לקריאה נוחה
                boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)", // הצללה רכה
                borderRadius: "25px",
                maxWidth: "800px",
                mx: "auto",
              }}
            >
              <Info sx={{ fontSize: 50, color: "text.secondary", mb: 2 }} />
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                המשימה שלנו
              </Typography>
              <Typography
                variant="h6"
                sx={{ lineHeight: 1.8, color: "text.secondary" }} // גוון בהיר יותר לקריאה
              >
                ב-SAFEKIDS אנחנו מאמינים שכל ילד זכאי לסביבה בטוחה. המערכת שלנו
                נוצרה כדי לעזור להורים לשתף מידע חיוני על אלרגיות בצורה מהירה,
                ברורה ומקצועית. אנחנו כאן כדי לתת לכם שקט נפשי ולוודא שהילדים
                שלכם מוגנים בכל מקום שהם נמצאים.
              </Typography>
            </Card>
          </Box>

          <Grid container spacing={6} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography
                variant="h2"
                fontWeight="bold"
                gutterBottom
                sx={{
                  background:
                    "linear-gradient(135deg, #4ed9df 0%, #2ba6ac 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                SafeKids
              </Typography>
              <Typography variant="h3" fontWeight="bold" gutterBottom>
                בטיחות ילדים
              </Typography>
              <Typography variant="h6" color="text.secondary" paragraph>
                צור כרטיסי אלרגיה מותאמים אישית עם תמונה של הילד שלך. פשוט, מהיר
                ובטוח - הכל במקום אחד.
              </Typography>

              <Box display="flex" gap={2} mt={4}>
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    borderRadius: "16px",
                    px: 4,
                    background:
                      "linear-gradient(135deg, #4ed9df 0%, #2ba6ac 100%)",
                  }}
                >
                  צור כרטיס עכשיו
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    borderRadius: "16px",
                    px: 4,
                    borderColor: "#4ed9df",
                    color: "#4ed9df",
                  }}
                >
                  למד עוד
                </Button>
              </Box>

              {/* Stats */}
              <Box display="flex" gap={4} mt={6}>
                {stats.map((stat, i) => (
                  <Box key={i} textAlign="center">
                    <Typography variant="h5" fontWeight="bold" color="#4ed9df">
                      {stat.number}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stat.label}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Grid>

            {/* Phone Mockup */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper
                elevation={6}
                sx={{
                  width: 300,
                  mx: "auto",
                  borderRadius: "30px",
                  border: "10px solid black",
                  overflow: "hidden",
                  transform: "rotate(-2deg)",
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "rotate(0deg) scale(1.02)",
                  },
                }}
              >
                <Box
                  sx={{
                    bgcolor: "#4ed9df",
                    color: "white",
                    textAlign: "center",
                    py: 2,
                    borderBottom: "3px solid black",
                  }}
                >
                  <ShieldIcon />
                  <Typography variant="subtitle1">כרטיס אלרגיות</Typography>
                </Box>
                <Box>
                  <img
                    src={ExampleForm}
                    alt="example"
                    style={{ width: "100%" }}
                  />
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Explain />
      {/* CTA Section */}
      <Box
        component="section"
        py={12}
        sx={{
          background: "linear-gradient(135deg, #4ed9df 0%, #2ba6ac 100%)",
          color: "white",
          textAlign: "center",
        }}
      >
        <Container>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            מוכנים להתחיל?
          </Typography>
          <Typography variant="h6" paragraph sx={{ opacity: 0.9 }}>
            הצטרפו לאלפי ההורים שכבר סומכים על SAFEKIDS לבטיחות ילדיהם
          </Typography>
          <Button
            variant="contained"
            sx={{
              mt: 3,
              px: 6,
              py: 2,
              borderRadius: "16px",
              background: "white",
              color: "#4ed9df",
              fontWeight: "bold",
            }}
          >
            צרו כרטיס אלרגיות עכשיו
          </Button>
        </Container>
      </Box>

      {/* Footer */}
      <Box component="footer" py={8} bgcolor="grey.900" color="white">
        <Container>
          <Grid
            container
            spacing={6}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Grid size={{ xs: 12, md: 4 }}>
              <Box display="flex" alignItems="center" gap={1} mb={2}>
                <img
                  src={Logo}
                  alt="Logo"
                  style={{ width: 150, height: "auto" }}
                />
              </Box>
              <Typography color="grey.400">
                המערכת המובילה ביצירת כרטיסי אלרגיות לילדים. בטיחות, נוחות ושקט
                נפשי להורים בכל מקום.
              </Typography>
            </Grid>
            <Grid
              size={{ xs: 6, md: 4 }}
              flexDirection={"column"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Typography fontWeight="bold" mb={2}>
                קישורים
              </Typography>
              {/* <Typography color="grey.400">יתרונות</Typography> */}
              <Typography
                component="a"
                href="/form"
                color="grey.400"
                sx={{
                  textDecoration: "none",
                  "&:hover": { color: "#fff" },
                }}
              >
                ליצירת טופס
              </Typography>
              <Typography
                component="a"
                href="/form"
                color="grey.400"
                sx={{
                  textDecoration: "none",
                  "&:hover": { color: "#fff" },
                }}
              >
                הוראות
              </Typography>
              <Typography
                component="a"
                href="/form"
                color="grey.400"
                sx={{
                  textDecoration: "none",
                  "&:hover": { color: "#fff" },
                }}
              >
                צור קשר
              </Typography>
            </Grid>
            <Grid size={{ xs: 6, md: 3 }}>
              <Typography fontWeight="bold" mb={2}>
                יצירת קשר
              </Typography>
              <Typography color="grey.400">support@safekids.co.il</Typography>
              <Typography color="grey.400">03-123-4567</Typography>
              <Typography color="grey.400">תל אביב, ישראל</Typography>
            </Grid>
          </Grid>
          <Box textAlign="center" mt={6} color="grey.500">
            © 2025 SAFEKIDS כל הזכויות שמורות.
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
