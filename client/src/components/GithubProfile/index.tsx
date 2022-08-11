import { Box, Typography } from "@mui/material";
import { Card } from "../Card";

interface Props {
  /**
   * github login
   */
  githubLogin?: string;
  /**
   * name
   */
  name?: string;
  /**
   * 自己紹介
   */
  bio?: string;
}

/**
 * Githubのプロフィールコンポーネント
 */
export const GithubProfile = ({ githubLogin, name, bio }: Props) => {
  return (
    <Box sx={{ width: "80%", mx: "auto" }}>
      <Typography fontWeight="bold" sx={{ textAlign: "center", mb: 2 }}>
        Profile
      </Typography>
      <Card>
        <Typography sx={{ textAlign: "center" }} fontWeight="bold" variant="h5">
          {name}
        </Typography>
        <Box
          component="img"
          sx={{ width: "100%", my: 2, borderRadius: "10px" }}
          src={`https://github-readme-stats.vercel.app/api?username=${githubLogin}&theme=onedark&show_icons=true`}
        />
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography fontWeight="bold" sx={{ textAlign: "center", mt: 2 }}>
            自己紹介
          </Typography>
          <Typography sx={{ mx: 1, textAlign: "center" }}>{bio}</Typography>
        </Box>
      </Card>
    </Box>
  );
};
