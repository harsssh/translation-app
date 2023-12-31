"use client";

import { useState, useEffect, useRef } from "react";
import {
  TextField,
  Box,
  Grid,
  Button,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import FileCopyIcon from "@mui/icons-material/FileCopy";

const Translation = () => {
  const [text, setText] = useState("");
  const [translation, setTranslation] = useState("");
  const [loading, setLoading] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setTranslation('');
    if (timer.current !== null) {
      clearTimeout(timer.current);
    }
    if (text) {
      timer.current = setTimeout(() => {
        handleTranslate(text);
      }, 1000);
    }
    return () => {
      if (timer.current !== null) {
        clearTimeout(timer.current);
      }
    };
  }, [text]);

  const handleTranslate = async (text: string) => {
    setLoading(true);
    const response = await fetch(
      `http://localhost:5000/translate?text=${encodeURIComponent(text)}`,
    );
    const data = await response.json();
    setTranslation(data.translation);
    setLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(translation);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <Box my={2}>
          <TextField
            id="input-text"
            variant="outlined"
            fullWidth
            multiline
            rows={8}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="翻訳したい文章を入力してください"
          />
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Box my={2} position="relative">
          <TextField
            id="translated-text"
            variant="outlined"
            fullWidth
            multiline
            rows={8}
            value={translation}
            disabled
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Box position="absolute" bottom={2} right={2}>
                    <Button onClick={handleCopy}>
                      <FileCopyIcon />
                    </Button>
                  </Box>
                </InputAdornment>
              ),
            }}
          />
          {loading && (
            <CircularProgress
              size={24}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: -12,
                marginLeft: -12,
              }}
            />
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default Translation;
