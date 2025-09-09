import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Chip,
  Fade,
  InputAdornment,
  LinearProgress,
  Paper,
  Snackbar,
  TextField,
  Typography,
  createFilterOptions,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { CheckCircle, CloudUpload, Phone } from "@mui/icons-material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import jsPDF from "jspdf";
import formTemplate from "../img/form.jpg";
import {  useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
type FormValues = {
  name: string;
  class: string;
  phone1: string;
  phone2: string;
  allergies: string[];
  imgUrl: string;
};
const phoneRegExp = /^(03\d{7}|05\d{8})$/;

const schema = Yup.object().shape({
  name: Yup.string().required("First Name is required"),
  class: Yup.string().required("Class is required"),
  phone1: Yup.string()
    .matches(phoneRegExp, "מספר פלאפון לא תקין")
    .required("Password is required"),
  phone2: Yup.string().matches(phoneRegExp, "מספר פלאפון לא תקין").required(),
  imgUrl: Yup.string().required("Image is required"),
  allergies: Yup.array()
    .of(Yup.string().required())
    .min(1, "At least one allergy is required")
    .required("Allergies are required"),
});
const Form = () => {
  // React Hook Form setup
  const {
    control,
    watch,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      class: "",
      phone1: "",
      phone2: "",
      imgUrl: "",
      allergies: [],
    },
    mode: "onBlur",
  });
  //userId from useContext in storage

  const [progress, setProgress] = useState(0);
  // const { albumId } = useParams();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selected, setSelected] = useState<string[]>([]);

  const allergies = ["בוטנים", "חלב", "ביצים", "דגים", "סויה", "שומשום"];
  const filter = createFilterOptions<string>();
  const imageWidthPx = 1190; // רוחב הטופס המקורי בפיקסלים
  const imageHeightPx = 1683; // גובה הטופס המקורי בפיקסלים
  const xPx = 60;
  const yPx = 250;
  const widthPx = 214;
  const heightPx = 235;

  const handleExportPDF = (data: FormValues) => {
    const doc = new jsPDF("p", "mm", "a4");
    doc.addImage(formTemplate, "JPEG", 0, 0, 210, 297, undefined, "FAST");

    if (data.imgUrl) {
      const img = new Image();
      img.src = data.imgUrl;
      img.onload = () => {
        // --- חישוב מיקום וגודל הריבוע ב-mm ---
        const x = (xPx / imageWidthPx) * 210;
        const y = (yPx / imageHeightPx) * 297;
        const w = (widthPx / imageWidthPx) * 210;
        const h = (heightPx / imageHeightPx) * 297;

        // --- crop cover: חיתוך מהתמונה כך שתכסה את כל הריבוע בלי עיוות ---
        const rectRatio = widthPx / heightPx;
        const imgRatio = img.width / img.height;
        let sx = 0,
          sy = 0,
          sw = img.width,
          sh = img.height;

        if (imgRatio > rectRatio) {
          // התמונה רחבה מדי, חותכים צדדים
          sw = img.height * rectRatio;
          sx = (img.width - sw) / 2;
        } else {
          // התמונה גבוהה מדי, חותכים למעלה/למטה
          sh = img.width / rectRatio;
          sy = (img.height - sh) / 2;
        }

        // יצירת קנבס זמני לחיתוך
        const cropCanvas = document.createElement("canvas");
        cropCanvas.width = sw;
        cropCanvas.height = sh;
        const cropCtx = cropCanvas.getContext("2d")!;
        cropCtx.drawImage(img, sx, sy, sw, sh, 0, 0, sw, sh);

        // הוספת התמונה החתוכה ל-PDF בדיוק על הריבוע
        doc.addImage(
          cropCanvas.toDataURL("image/jpeg", 0.7),
          "JPEG",
          x,
          y,
          w,
          h,
          undefined,
          "MEDIUM"
        );

        // --- ציור טקסט בתוך הריבוע ---
        const rectXpx = 285;
        const rectYpx = 250;
        const rectWidthPx = 467;
        const rectHeightPx = 246;

        const rectXmm = (rectXpx / imageWidthPx) * 210;
        const rectYmm = (rectYpx / imageHeightPx) * 297;
        const rectWidthMm = (rectWidthPx / imageWidthPx) * 210;
        const rectHeightMm = (rectHeightPx / imageHeightPx) * 297;

        // יצירת קנבס בגודל הריבוע בלבד
        const canvas = document.createElement("canvas");
        canvas.width = rectWidthPx;
        canvas.height = rectHeightPx;
        const ctx = canvas.getContext("2d")!;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // הגדרות טקסט
        ctx.font = "24px Arial";
        ctx.direction = "rtl";
        ctx.textAlign = "right";
        ctx.fillStyle = "black";

        const lineHeight = 44; // ריווח גדול בין שורות
        const padding = 48; // מרווח גדול מכל הכיוונים

        // הגבלת ציור הטקסט לתוך הריבוע בלבד
        ctx.save();
        ctx.beginPath();
        ctx.rect(0, 0, canvas.width, canvas.height);
        ctx.clip();

        // פונקציה לפיצול טקסט לשורות
        function wrapText(
          ctx: CanvasRenderingContext2D,
          text: string,
          maxWidth: number
        ): string[] {
          const words = text.split(" ");
          const lines: string[] = [];
          let currentLine = "";

          for (let i = 0; i < words.length; i++) {
            const testLine = currentLine + (currentLine ? " " : "") + words[i];
            const testWidth = ctx.measureText(testLine).width;

            if (testWidth > maxWidth) {
              lines.push(currentLine);
              currentLine = words[i];
            } else {
              currentLine = testLine;
            }
          }

          if (currentLine) {
            lines.push(currentLine);
          }

          return lines;
        }

        // טקסט לדוגמה
        const text = ` שם הילד/ה: ${data.name}\n אלרגי/ת ל: ${selected.join(
          ", "
        )}\nפלאפון אבא: ${data.phone1}\n פלאפון אמא: ${data.phone2}`;

        // חלוקת הטקסט לשורות
        const wrappedLines = text
          .split("\n")
          .flatMap((line) => wrapText(ctx, line, canvas.width - 2 * padding));

        // ציור הטקסט בתוך ריבוע
        const startX = canvas.width - padding; // ימין
        const startY = padding; // היה padding + lineHeight, עכשיו רק padding

        ctx.textAlign = "right";
        ctx.direction = "rtl";

        wrappedLines.forEach((line, index) => {
          const yPosition = startY + lineHeight * index;

          // בדיקה אם השורה חורגת מגובה הריבוע
          if (yPosition + lineHeight > canvas.height - padding) {
            // קיצור השורה האחרונה והוספת "..."

            const availableWidth = canvas.width - 2 * padding;
            let truncatedLine = line;

            while (
              ctx.measureText(truncatedLine).width > availableWidth &&
              truncatedLine.length > 0
            ) {
              truncatedLine = truncatedLine.slice(0, -1);
            }

            ctx.fillText(truncatedLine, startX, yPosition);
            return;
          }

          ctx.fillText(line, startX, yPosition);
        });

        ctx.restore(); // סיום קליפינג

        // הוספת הקנבס ל-PDF
        const canvasData = canvas.toDataURL("image/png");
        doc.addImage(
          canvasData,
          "PNG",
          rectXmm,
          rectYmm,
          rectWidthMm,
          rectHeightMm
        );

        doc.save("test_form.pdf");
      };
    }
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
  };

  const handleCloseError = () => {
    setShowError(false);
  };

  const onSubmit = async (data: FormValues) => {
    console.log(data);
    try {
      setProgress(100);
      console.log(data);
      await handleExportPDF(data);
      setShowSuccess(true);
    } catch (error) {
      setErrorMessage("Error exporting PDF");
    } finally {
      setProgress(0);
    }

    // const handleReset = () => {
    //   setFile(null);
    // };
  };

  // const handleSelectChange = (event: any) => {
  //   const { value } = event.target;
  //   setSelected(typeof value === "string" ? value.split(",") : value);
  // };
  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: "auto",
        p: 4,
        bgcolor: "#f9fafb97",
        borderRadius: "24px",
        boxShadow: "0 20px 60px rgba(0, 0, 0, 0.1)",
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: -2,
          left: -2,
          right: -2,
          bottom: -2,
          background: "linear-gradient(135deg, #4ed9df 0%, #2ba6ac 100%)",
          borderRadius: "26px",
          zIndex: -1,
          opacity: 0.1,
        },
      }}
    >
      {/* Header */}
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Box
          sx={{
            width: 80,
            height: 80,
            mx: "auto",
            mb: 2,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #4ed9df 0%, #2ba6ac 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 8px 32px rgba(233, 51, 69, 0.3)",
          }}
        >
          <AccountCircleIcon sx={{ fontSize: 40, color: "white" }} />
        </Box>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            background: "linear-gradient(135deg, #1a202c, #2d3748)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 1,
          }}
        >
          טופס אלרגיות
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ color: "#64748b", fontWeight: 500 }}
        >
          מלא את הפרטים ליצירת טופס מותאם אישית
        </Typography>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Name Field */}
        <TextField
          {...register("name")}
          label="שם הילד/ה"
          variant="outlined"
          fullWidth
          error={!!errors.name}
          helperText={errors.name?.message}
          margin="normal"
          InputLabelProps={{
            style: {
              color: "#4ed9df",
              fontWeight: 600,
            },
          }}
          InputProps={{
            style: {
              color: "black",
              fontSize: "15px",
            },
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircleIcon sx={{ color: "#4ed9df" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "16px",
              backgroundColor: "white",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              border: "2px solid transparent",
              backgroundClip: "padding-box",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
              "&:hover": {
                backgroundColor: "white",
                transform: "translateY(-2px)",
                boxShadow: "0 8px 30px rgba(233, 51, 69, 0.15)",
                "& fieldset": {
                  borderColor: "#4ed9df",
                  borderWidth: "2px",
                },
              },
              "&.Mui-focused": {
                backgroundColor: "white",
                transform: "translateY(-2px)",
                boxShadow: "0 8px 30px rgba(233, 51, 69, 0.2)",
                "& fieldset": {
                  borderColor: "#4ed9df !important",
                  borderWidth: "2px",
                },
              },
              "& fieldset": {
                borderColor: "rgba(233, 51, 69, 0.2)",
                borderWidth: "2px",
              },
            },
            "& .MuiFormHelperText-root": {
              fontSize: "13px",
              marginLeft: 0,
              marginTop: "8px",
              fontWeight: 500,
            },
          }}
        />

        {/* Class Field */}
        <TextField
          {...register("class")}
          label="כיתה"
          variant="outlined"
          fullWidth
          error={!!errors.class}
          helperText={errors.class?.message}
          margin="normal"
          InputLabelProps={{
            style: {
              color: "#4ed9df",
              fontWeight: 600,
            },
          }}
          InputProps={{
            style: {
              color: "black",
              fontSize: "15px",
            },
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircleIcon sx={{ color: "#4ed9df" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "16px",
              backgroundColor: "white",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              border: "2px solid transparent",
              backgroundClip: "padding-box",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
              "&:hover": {
                backgroundColor: "white",
                transform: "translateY(-2px)",
                boxShadow: "0 8px 30px rgba(233, 51, 69, 0.15)",
                "& fieldset": {
                  borderColor: "#4ed9df",
                  borderWidth: "2px",
                },
              },
              "&.Mui-focused": {
                backgroundColor: "white",
                transform: "translateY(-2px)",
                boxShadow: "0 8px 30px rgba(233, 51, 69, 0.2)",
                "& fieldset": {
                  borderColor: "#4ed9df !important",
                  borderWidth: "2px",
                },
              },
              "& fieldset": {
                borderColor: "rgba(233, 51, 69, 0.2)",
                borderWidth: "2px",
              },
            },
            "& .MuiFormHelperText-root": {
              fontSize: "13px",
              marginLeft: 0,
              marginTop: "8px",
              fontWeight: 500,
            },
          }}
        />

        {/* Phone 1 Field */}
        <TextField
          {...register("phone1")}
          label="פלאפון אבא"
          variant="filled"
          fullWidth
          type="tel"
          error={!!errors.phone1}
          helperText={errors.phone1?.message}
          margin="normal"
          InputLabelProps={{
            style: {
              color: "#4ed9df",
              fontWeight: 600,
            },
          }}
          InputProps={{
            style: {
              color: "black",
              fontSize: "15px",
            },
            startAdornment: (
              <InputAdornment position="start">
                <Phone sx={{ color: "#4ed9df" }} />
              </InputAdornment>
            ),
            disableUnderline: true,
          }}
          sx={{
            "& .MuiFilledInput-root": {
              borderRadius: "16px",
              backgroundColor: "white",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              border: "2px solid rgba(233, 51, 69, 0.1)",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
              "&:hover": {
                backgroundColor: "white",
                transform: "translateY(-2px)",
                boxShadow: "0 8px 30px rgba(233, 51, 69, 0.15)",
                borderColor: "rgba(233, 51, 69, 0.3)",
              },
              "&.Mui-focused": {
                backgroundColor: "white",
                transform: "translateY(-2px)",
                boxShadow: "0 8px 30px rgba(233, 51, 69, 0.2)",
                border: "2px solid #4ed9df",
              },
            },
          }}
        />

        {/* Phone 2 Field */}
        <TextField
          {...register("phone2")}
          label="פלאפון אמא"
          variant="filled"
          fullWidth
          type="tel"
          error={!!errors.phone2}
          helperText={errors.phone2?.message}
          margin="normal"
          InputLabelProps={{
            style: {
              color: "#4ed9df",
              fontWeight: 600,
            },
          }}
          InputProps={{
            style: {
              color: "black",
              fontSize: "15px",
            },
            startAdornment: (
              <InputAdornment position="start">
                <Phone sx={{ color: "#4ed9df" }} />
              </InputAdornment>
            ),
            disableUnderline: true,
          }}
          sx={{
            "& .MuiFilledInput-root": {
              borderRadius: "16px",
              backgroundColor: "white",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              border: "2px solid rgba(233, 51, 69, 0.1)",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
              "&:hover": {
                backgroundColor: "white",
                transform: "translateY(-2px)",
                boxShadow: "0 8px 30px rgba(233, 51, 69, 0.15)",
                borderColor: "rgba(233, 51, 69, 0.3)",
              },
              "&.Mui-focused": {
                backgroundColor: "white",
                transform: "translateY(-2px)",
                boxShadow: "0 8px 30px rgba(233, 51, 69, 0.2)",
                border: "2px solid #4ed9df",
              },
            },
          }}
        />

        {/* Allergies Field */}
        <Controller
          name="allergies"
          control={control}
          render={({ field }) => (
            <Box sx={{ mt: 3, mb: 3 }}>
              <Autocomplete
                multiple
                freeSolo
                options={allergies}
                value={field.value}
                onChange={(_, newValue) => {
                  const cleaned = newValue
                    .map((v) => (typeof v === "string" ? v.trim() : v))
                    .filter(Boolean);
                  field.onChange(cleaned);
                  setSelected(cleaned);
                }}
                filterOptions={(options, params) => {
                  const filtered = filter(options, params);
                  const { inputValue } = params;
                  if (
                    inputValue !== "" &&
                    !options.includes(inputValue) &&
                    !filtered.includes(inputValue)
                  ) {
                    filtered.push(inputValue);
                  }
                  return filtered;
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="אלרגיות"
                    variant="outlined"
                    helperText={errors.allergies?.message}
                    error={!!errors.allergies}
                    margin="normal"
                    placeholder="בחר או הוסף אלרגיה"
                    InputLabelProps={{
                      style: {
                        color: "#4ed9df",
                        fontWeight: 600,
                      },
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "16px",
                        backgroundColor: "white",
                        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        "& fieldset": {
                          borderColor: "rgba(233, 51, 69, 0.2)",
                          borderWidth: "2px",
                        },
                        "&:hover": {
                          transform: "translateY(-2px)",
                          boxShadow: "0 8px 30px rgba(233, 51, 69, 0.15)",
                          "& fieldset": {
                            borderColor: "#4ed9df",
                            borderWidth: "2px",
                          },
                        },
                        "&.Mui-focused": {
                          transform: "translateY(-2px)",
                          boxShadow: "0 8px 30px rgba(233, 51, 69, 0.2)",
                          "& fieldset": {
                            borderColor: "#4ed9df !important",
                            borderWidth: "2px",
                          },
                        },
                      },
                    }}
                  />
                )}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => {
                    const { key, ...tagProps } = getTagProps({ index });
                    return (
                      <Chip
                        key={key}
                        label={option}
                        variant="outlined"
                        {...tagProps}
                        sx={{
                          borderRadius: "12px",
                          borderColor: "#4ed9df",
                          color: "#4ed9df",
                          backgroundColor: "rgba(233, 51, 69, 0.05)",
                          fontWeight: 600,
                          "&:hover": {
                            backgroundColor: "rgba(233, 51, 69, 0.1)",
                            transform: "scale(1.05)",
                          },
                        }}
                      />
                    );
                  })
                }
                sx={{
                  "& .MuiAutocomplete-tag": {
                    margin: "3px",
                  },
                }}
              />
            </Box>
          )}
        />

        {/* Image Upload */}
        <Box sx={{ mt: 4, mb: 4 }}>
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="file-upload-button"
            type="file"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setValue("imgUrl", URL.createObjectURL(file));
              }
            }}
          />
          <label htmlFor="file-upload-button">
            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: "20px",
                border: "3px dashed rgba(233, 51, 69, 0.3)",
                backgroundColor: "white",
                cursor: "pointer",
                textAlign: "center",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
                position: "relative",
                overflow: "hidden",
                "&:hover": {
                  backgroundColor: "rgba(233, 51, 69, 0.02)",
                  borderColor: "#4ed9df",
                  transform: "translateY(-4px) scale(1.01)",
                  boxShadow: "0 20px 60px rgba(233, 51, 69, 0.15)",
                },
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: "-100%",
                  width: "100%",
                  height: "100%",
                  background:
                    "linear-gradient(90deg, transparent, rgba(233, 51, 69, 0.05), transparent)",
                  transition: "left 0.6s ease",
                },
                "&:hover::before": {
                  left: "100%",
                },
              }}
            >
              {watch("imgUrl") ? (
                <Box sx={{ position: "relative" }}>
                  <img
                    src={watch("imgUrl")}
                    alt="Preview"
                    style={{
                      maxWidth: "100%",
                      maxHeight: 250,
                      borderRadius: "16px",
                      objectFit: "cover",
                      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      background: "rgba(233, 51, 69, 0.9)",
                      color: "white",
                      padding: "8px 16px",
                      borderRadius: "20px",
                      fontSize: "14px",
                      fontWeight: 600,
                      opacity: 0,
                      transition: "opacity 0.3s ease",
                      ".MuiPaper-root:hover &": {
                        opacity: 1,
                      },
                    }}
                  >
                    לחץ לשינוי התמונה
                  </Box>
                </Box>
              ) : (
                <>
                  <CloudUpload
                    sx={{
                      fontSize: 60,
                      color: "#4ed9df",
                      mb: 2,
                      opacity: 0.8,
                    }}
                  />
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#4ed9df",
                      fontWeight: 700,
                      mb: 1,
                    }}
                  >
                    Choose Image of child
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#64748b",
                      fontSize: "14px",
                      fontWeight: 500,
                    }}
                  >
                    Click to select an image
                  </Typography>
                </>
              )}
            </Paper>
          </label>
        </Box>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          startIcon={<EditNoteIcon />}
          sx={{
            py: 2.5,
            borderRadius: "16px",
            background: "linear-gradient(135deg, #4ed9df 0%, #2ba6ac 100%)",
            fontSize: "16px",
            fontWeight: 700,
            textTransform: "none",
            boxShadow: "0 8px 32px rgba(233, 51, 69, 0.3)",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: "-100%",
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
              transition: "left 0.5s ease",
            },
            "&:hover": {
              background: "linear-gradient(135deg, #4ed9df 0%, #2ba6ac 100%)",
              boxShadow: "0 12px 40px rgba(233, 51, 69, 0.4)",
              transform: "translateY(-3px)",
              "&::before": {
                left: "100%",
              },
            },
            "&:active": {
              transform: "translateY(-1px)",
            },
            "&:disabled": {
              background: "linear-gradient(135deg, #cbd5e0 0%, #e2e8f0 100%)",
              boxShadow: "none",
              transform: "none",
            },
          }}
          disabled={progress > 0 && progress < 100}
        >
          {progress > 0 && progress < 100
            ? "מכין את הטופס..."
            : "הכן טופס אלרגיה"}
        </Button>
      </form>

      {/* Error Message */}
      {errorMessage && (
        <Fade in={Boolean(errorMessage)}>
          <Alert
            severity="error"
            sx={{
              mt: 3,
              borderRadius: "16px",
              backgroundColor: "rgba(244, 67, 54, 0.05)",
              border: "2px solid rgba(244, 67, 54, 0.2)",
              boxShadow: "0 4px 20px rgba(244, 67, 54, 0.1)",
              "& .MuiAlert-message": {
                fontWeight: 600,
                fontSize: "14px",
              },
            }}
          >
            {errorMessage}
          </Alert>
        </Fade>
      )}

      {/* Progress Bar */}
      {progress > 0 && (
        <Fade in={progress > 0}>
          <Box sx={{ mt: 3 }}>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography
                variant="body2"
                sx={{ color: "#64748b", fontWeight: 600, fontSize: "13px" }}
              >
                Upload Progress
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#4ed9df", fontWeight: 700, fontSize: "13px" }}
              >
                {progress}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 8,
                borderRadius: 4,
                backgroundColor: "rgba(233, 51, 69, 0.1)",
                "& .MuiLinearProgress-bar": {
                  borderRadius: 4,
                  background:
                    "linear-gradient(90deg, #4ed9df 0%, #ff6b6b 100%)",
                  boxShadow: "0 2px 10px rgba(233, 51, 69, 0.3)",
                },
              }}
            />
          </Box>
        </Fade>
      )}

      {/* Success Alert */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={4000}
        onClose={handleCloseSuccess}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{ zIndex: 9999 }}
      >
        <Alert
          onClose={handleCloseSuccess}
          severity="success"
          variant="filled"
          icon={<CheckCircle sx={{ fontSize: 32 }} />}
          sx={{
            borderRadius: "20px",
            fontSize: "16px",
            fontWeight: "700",
            padding: "20px 32px",
            minWidth: "400px",
            boxShadow: "0 12px 40px rgba(76, 175, 80, 0.4)",
            background: "linear-gradient(135deg, #4caf50, #66bb6a)",
            "& .MuiAlert-message": {
              fontSize: "16px",
              fontWeight: "700",
            },
          }}
        >
          🎉 !!הטופס נוצר בהצלחה
        </Alert>
      </Snackbar>

      {/* Error Alert */}
      <Snackbar
        open={showError}
        autoHideDuration={6000}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{ zIndex: 9999 }}
      >
        <Alert
          onClose={handleCloseError}
          severity="error"
          variant="filled"
          sx={{
            borderRadius: "20px",
            fontSize: "16px",
            fontWeight: "700",
            padding: "20px 32px",
            minWidth: "400px",
            boxShadow: "0 12px 40px rgba(244, 67, 54, 0.4)",
            background: "linear-gradient(135deg, #f44336, #e57373)",
            "& .MuiAlert-message": {
              fontSize: "16px",
              fontWeight: "700",
            },
          }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Form;
