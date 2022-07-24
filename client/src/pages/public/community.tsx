import React, { useCallback, useEffect } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { useClientRoute } from "../../hooks/useClientRoute";
import { usePublicRoute } from "../../hooks/usePublicRoute";

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
  /**
   * misc.
   */
  const { goToCreateCommunity, goToLogin } = usePublicRoute();
  const { goToHome } = useClientRoute();
  const { signIn } = useAuth();

  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");

  /**
   * event-handler
   */
  const handleEnterCommunity = useCallback(
    (id: string) => {
      // TODO: communityを決める処理
      goToHome({ replace: true });
    },
    [goToHome]
  );

  /**
   * signIn処理を実行
   */
  useEffect(() => {
    if (code !== null) {
      signIn(code);
    }
  }, [signIn, code, goToLogin]);

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
                onClick={() => handleEnterCommunity(id)}
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
            新しいコミュニティに入る
          </Typography>
          <TextField sx={{ width: "450px" }} label="コミュニティID" />
          <Button
            variant="contained"
            sx={{ width: "200px", height: "40px", borderRadius: "25px" }}
          >
            communityに入る
          </Button>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
          <Typography variant="h6" fontWeight="bold">
            communityを作成したい方へ。
          </Typography>
          <Button
            variant="contained"
            sx={{ height: "60px", borderRadius: "30px" }}
            onClick={() => goToCreateCommunity()}
          >
            新しいcommunityを作る
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
