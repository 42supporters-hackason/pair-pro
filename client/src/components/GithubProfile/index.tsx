import { Box, Typography } from "@mui/material";
import { Card } from "../Card";

interface Props {
  /**
   * github login
   */
  githubLogin: string;
}

/**
 * Githubのプロフィールコンポーネント
 */
export const GithubProfile = ({ githubLogin }: Props) => {
  return (
    <Box sx={{ width: "80%", mx: "auto" }}>
      <Typography fontWeight="bold" sx={{ textAlign: "center", mb: 2 }}>
        Profile
      </Typography>
      <Card>
        <Box
          component="img"
          sx={{ width: "100%", mb: 2 }}
          src={`https://github-readme-stats.vercel.app/api?username=${githubLogin}&theme=onedark&show_icons=true`}
        />
        <Box
          component="img"
          sx={{ width: "100%" }}
          src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${githubLogin}&layout=compact`}
        />
      </Card>
    </Box>
  );
};
