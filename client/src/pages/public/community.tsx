import React, { useCallback, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { Card } from "../../components/Card";
import { useAuth, useCommunity } from "../../context/auth";
import { usePublicRoute } from "../../hooks/usePublicRoute";
import { useCommunityHooks } from "../hooks/useCommunityHooks";
import {
  CommunitySchema,
  communitySchema,
} from "../validation/community_validation";

/**
 * public/community
 */
export const CommunityPage = () => {
  /**
   * misc.
   */
  const { goToCreateCommunity, goToLogin } = usePublicRoute();
  const { signIn } = useAuth();

  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");

  /**
   * custom hooks
   */
  const { myCommunities, refecthMyCommunities } = useCommunityHooks();
  const { joinCommunity } = useCommunity();

  /**
   * form validation
   */
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<CommunitySchema>({
    resolver: zodResolver(communitySchema),
  });

  /**
   * event-handler
   */
  const handleEnterCommunity = useCallback(
    (id: string) => {
      joinCommunity(id);
    },
    [joinCommunity]
  );

  const handleEnterByCommunityId = useCallback(() => {
    const id = getValues("communityId");
    joinCommunity(id);
  }, [joinCommunity, getValues]);

  /**
   * signIn処理を実行
   */
  useEffect(() => {
    if (code !== null) {
      signIn(code);
    }
    refecthMyCommunities();
  }, [signIn, code, goToLogin, searchParams, refecthMyCommunities]);

  return (
    <Box
      sx={{
        bgcolor: "primary.light",
        height: "100%",
        pb: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          pt: "60px",
          gap: "15px",
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
            {myCommunities &&
              myCommunities.myCommunities.map(({ id, name }) => (
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
            p: 3,
          }}
          component="form"
          onSubmit={handleSubmit(handleEnterByCommunityId)}
        >
          <Typography variant="h6" fontWeight="bold">
            新しいコミュニティに入る
          </Typography>
          <TextField
            sx={{ width: "450px" }}
            label="コミュニティID"
            {...register("communityId")}
          />
          <Typography color="error">{errors.communityId?.message}</Typography>
          <Button
            variant="contained"
            sx={{ width: "200px", height: "40px", borderRadius: "25px" }}
            type="submit"
          >
            communityに入る
          </Button>
        </Box>
        <Card
          style={{
            width: "300px",
            boxShadow:
              "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Typography fontWeight="bold">
              新しいcommunityを作成したい方へ。
            </Typography>
            <Button
              variant="contained"
              sx={{ borderRadius: "30px" }}
              onClick={() => goToCreateCommunity()}
            >
              community作成ページへ
            </Button>
          </Box>
        </Card>
      </Box>
    </Box>
  );
};
