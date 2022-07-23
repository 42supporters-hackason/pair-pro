import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";

const DEMO_COMMUNITY = [
  {
    id: "flajljfdlkasjl",
    name: "42tokyo",
  },
  {
    id: "jjflajld",
    name: "community",
  },
  {
    id: "ljldfakjkhfo",
    name: "hogehoge",
  },
];

/**
 * public/community
 */
export const CommunityPage = () => {
  return (
    <Box
      sx={{
        bgcolor: "primary.light",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          pt: "60px",
          gap: "35px",
        }}
      >
        <Box>
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{ textAlign: "center" }}
          >
            コミュニティを選択してください
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
            {DEMO_COMMUNITY.map(({ id, name }) => (
              <Button
                key={id}
                variant="outlined"
                sx={{
                  width: "450px",
                  height: "50px",
                  fontWeight: "bold",
                  fontSize: "18px",
                }}
              >
                {name}
              </Button>
            ))}
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            新しいコミュニティを追加する
          </Typography>
          <TextField sx={{ width: "450px" }} label="コミュニティID" />
          <Button variant="contained" sx={{ width: "200px", height: "40px" }}>
            communityに入る
          </Button>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
          <Typography variant="h6" fontWeight="bold">
            communityを作成したい方へ。
          </Typography>
          <Button variant="contained" sx={{ height: "60px" }}>
            新しいcommunityを作る
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
