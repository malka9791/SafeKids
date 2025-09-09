import {
  Card,
  CardContent,
  Typography,
  Box,
  Container,
  Grid,
  Avatar,
} from "@mui/material";
import { CheckCircle } from "@mui/icons-material";

export function Explain() {
  const steps = [
    {
      label: "הזינו פרטי הילד",
      description: "מלאו טופס פשוט עם פרטי הילד, אלרגיות וקשרי חירום",
    },
    {
      label: "העלו תמונה",
      description: "הוסיפו תמונה עדכנית של הילד לזיהוי מהיר",
    },
    // {
    //   label: "קבלו כרטיס דיגיטלי",
    //   description: "המערכת תיצור כרטיס מקצועי מיד להורדה ושיתוף",
    // },
  ];

  return (
    <Box component="section" py={15} sx={{ bgcolor: "#f8fafc" }} dir="rtl">
      <Container>
        <Box textAlign="center" mb={10}>
          <Typography variant="h3" sx={{ maxWidth: "600px", mx: "auto" }}>
            איך זה עובד?
          </Typography>
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{ maxWidth: "600px", mx: "auto" }}
          >
            שלושה שלבים פשוטים ליצירת כרטיס אלרגיות מקצועי
          </Typography>
        </Box>

        <Grid
          container
          spacing={4}
          justifyContent="center"
          alignItems="stretch"
        >
          {steps.map((step, index) => (
            <Grid size={{ xs: 12, md: 4 }} key={index}>
              <Card
                elevation={3}
                sx={{
                  p: 2,
                  borderRadius: 3,
                  background: "#fff",
                  color: "#4ed9df",
                  textAlign: "center",
                  transition: "all 0.3s ease",
                  height: "100%", // חשוב לגובה אחיד
                  maxHeight: "200px",
                  display: "flex",
                  flexDirection: "column",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                  },
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: "#4ed9df",
                    color: "#fff",
                    width: 56,
                    height: 56,
                    fontWeight: "bold",
                    fontSize: "1.5rem",
                    // mb: 2,
                    mx: "auto",
                  }}
                >
                  {index + 1}
                </Avatar>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {step.label}
                  </Typography>
                  <Typography>{step.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}

          <Grid size={{ xs: 12, md: 4 }}>
            <Card
              elevation={3}
              sx={{
                p: 2,
                borderRadius: 3,
                background:
                  "linear-gradient(135deg, #4ed9df 0%, #4ed9dfaa 100%)",
                color: "#fff",
                textAlign: "center",
                transition: "all 0.3s ease",
                height: "100%",
                maxHeight: "200px",
                display: "flex",
                flexDirection: "column",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                },
              }}
            >
              <Box display="flex" alignItems="strech" justifyContent="center">
                <CheckCircle sx={{ fontSize: 60, mx: "auto", mb: 1 }} />
              </Box>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                כרטיס מוכן!
              </Typography>
              <Typography sx={{ opacity: 0.9, flexGrow: 1 }}>
                כרטיס אלרגיות מקצועי מוכן להורדה ושיתוף
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
