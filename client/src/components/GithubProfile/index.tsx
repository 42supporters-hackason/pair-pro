import { Box, Typography } from "@mui/material";
import { Card } from "../Card";

interface Props {
  githubId: string;
}

/**
 * Githubのプロフィールコンポーネント
 */
export const GithubProfile = ({ githubId }: Props) => {
  return (
    <Box>
      <Typography
        fontWeight="bold"
        sx={{ textAlign: "center", mb: 2 }}
        variant="subtitle1"
      >
        Profile
      </Typography>
      <Card>
        <Box
          component="img"
          src={`https://github-readme-stats.vercel.app/api?username=${githubId}&theme=onedark&show_icons=true)](https://github.com/anuraghazra/github-readme-stats`}
          sx={{ width: "100%" }}
        />
        <Box
          component="img"
          src={`https://raw.githubusercontent.com/${githubId}/${githubId}/main/profile-summary-card-output/default/1-repos-per-language.svg`}
          sx={{ width: "100%" }}
        />
        <Box
          component="img"
          src={`https://raw.githubusercontent.com/${githubId}/${githubId}/main/profile-summary-card-output/default/3-stats.svg`}
          sx={{ width: "100%" }}
        />
      </Card>
    </Box>
  );
};
