import React, { useCallback, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { BackButton } from "../../components/BackButton";
import { Card } from "../../components/Card";
import { useAuth, useCommunity } from "../../context/auth";
import { useCommunityRoute } from "../../hooks/useCommunityRoute";
import { useCommunityHooks } from "../hooks/useCommunityHooks";
import {
  CommunitySchema,
  communitySchema,
} from "../validation/community_validation";
import { LoadingPage } from "./loading";

/**
 * public/community
 */
export const CommunityPage = () => {
  /**
   * misc.
   */
  const { goToCreateCommunity } = useCommunityRoute();
  const { signIn, loginStatus, logout } = useAuth();

  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");

  /**
   * custom hooks
   */
  const { myCommunities, refecthMyCommunities, loadingMyCommunities } =
    useCommunityHooks();
  const { joinCommunity } = useCommunity();

  /**
   * form validation
   */
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
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

  const handleEnterByCommunityId = useCallback(async () => {
    const id = getValues("communityId");
    try {
      await joinCommunity(id);
    } catch (error) {
      setError("communityId", {
        message: "存在しないIDです",
      });
    }
  }, [joinCommunity, getValues, setError]);

  /**
   * signIn処理を実行
   */
  useEffect(() => {
    if (loginStatus !== "authFinished") {
      signIn(code);
    }
    refecthMyCommunities();
  }, [signIn, code, searchParams, refecthMyCommunities, loginStatus]);

  if (loginStatus === "unLogin") {
    return <LoadingPage />;
  }

  return (
    <Box
      sx={{
        bgcolor: "primary.light",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "40px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 3,
          pt: "70px",
        }}
      >
        <Box
          sx={{
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            p: 3,
            borderRadius: 3,
          }}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{ textAlign: "center" }}
          >
            コミュニティ一覧
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "300px",
              gap: 3,
              mt: 2,
              overflow: "scroll",
              px: 2,
              py: 2,
            }}
          >
            {myCommunities &&
              !loadingMyCommunities &&
              myCommunities.myCommunities.map(({ id, name }) => (
                <Button
                  key={id}
                  variant="outlined"
                  sx={{
                    width: "450px",
                    height: "50px",
                    fontWeight: "bold",
                    fontSize: "18px",
                    textTransform: "none",
                    borderRadius: "999px",
                    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                    minHeight: "60px",
                    borderWidth: "3px",
                  }}
                  onClick={() => handleEnterCommunity(id)}
                >
                  {name}
                </Button>
              ))}
            {loadingMyCommunities && <CircularProgress sx={{ m: "auto" }} />}
            {myCommunities === undefined && !loadingMyCommunities && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                  alignItems: "center",
                }}
              >
                <Typography sx={{ textAlign: "center" }}>
                  新規にコミュニティを作成するか、
                  <br />
                  IDを入力してコミュニティに加入してください。
                </Typography>
                <Typography
                  fontWeight="bold"
                  variant="h4"
                  sx={{ fontFamily: "Hannotate TC" }}
                >
                  楽しいペアプロライフを!
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            p: 3,
            borderRadius: 3,
          }}
          component="form"
          onSubmit={handleSubmit(handleEnterByCommunityId)}
        >
          <Typography variant="h6" fontWeight="bold">
            新しいコミュニティに入る
          </Typography>
          <TextField
            sx={{
              width: "450px",
              boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
              borderRadius: "999px",
              bgcolor: "#fff",
              [`& fieldset`]: {
                borderRadius: "50px",
              },
            }}
            label="コミュニティID"
            {...register("communityId")}
          />
          <Typography color="error">{errors.communityId?.message}</Typography>
          <Button
            variant="contained"
            sx={{
              width: "200px",
              height: "40px",
              borderRadius: "25px",
              textTransform: "none",
            }}
            type="submit"
          >
            Enter
          </Button>
        </Box>
      </Box>
      <Box sx={{ mb: 1 }}>
        <Card
          style={{
            width: "300px",
            boxShadow:
              "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
            marginBottom: "30px",
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
              新しいコミュニティを作成する
            </Typography>
            <Button
              variant="contained"
              sx={{ borderRadius: "30px" }}
              onClick={() => goToCreateCommunity()}
            >
              コミュニティ作成ページへ
            </Button>
          </Box>
        </Card>
        <BackButton
          style={{ margin: "0 auto", width: "350px" }}
          onClick={logout}
        >
          Top画面に戻る
        </BackButton>
      </Box>
    </Box>
  );
};
