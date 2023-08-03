import Translation from "../components/Translation";
import { Box, Typography } from "@mui/material";

const Home = () => {
  return (
    <Box mt={4} p={2}>
      <Typography variant="h4" align="center" gutterBottom>
        Translation App
      </Typography>
      <Translation />
    </Box>
  );
};

export default Home;
