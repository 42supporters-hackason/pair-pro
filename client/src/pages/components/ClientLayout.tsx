import { Suspense, useCallback, useEffect, useState } from "react";
import { Box, Modal } from "@mui/material";
import { Outlet } from "react-router-dom";
import { AgreeModal } from "../../components/AgreeModal";
import { GeneralHeader } from "../../components/GeneralHeader";
import { useClientHeaderMenu } from "../../components/GeneralHeader/useHeaderMenu";
import {
  useFetchCurrentCommunityLazyQuery,
  useFetchMeLazyQuery,
} from "../../gen/graphql-client";
import { useBoolean } from "../../hooks/useBoolean";
import { usePublicRoute } from "../../hooks/usePublicRoute";
import { tokenStorage } from "../../utils/local-storage/token";

/**
 * Client画面共通のLayout
 */
export const ClientLayout = () => {
  /**
   * misc.
   */
  const { goToLogin } = usePublicRoute();
  const [openLogoutModal, setOpenLogoutModal] = useBoolean(false);
  const menu = useClientHeaderMenu({ onLogout: setOpenLogoutModal.on });
  const [fetchCurrentCommunity] = useFetchCurrentCommunityLazyQuery();
  const [fetchMe] = useFetchMeLazyQuery();
  const [communityName, setCommunityName] = useState<string>();
  const [matchingPoint, setMatchingPoint] = useState<number>();
  const [githubLogin, setGithubLogin] = useState<string>();

  /**
   * event-handler
   */
  const handleLogout = useCallback(() => {
    tokenStorage.clear();
    goToLogin();
  }, [goToLogin]);

  useEffect(() => {
    if (communityName === undefined) {
      fetchCurrentCommunity({
        onCompleted: (data) => setCommunityName(data.myCurrentCommunity?.name),
      });
    }
    if (matchingPoint === undefined) {
      fetchMe({
        onCompleted: (data) => {
          setMatchingPoint(data.myProfile.matchingPoint),
            setGithubLogin(data.myProfile.user.githubLogin);
        },
      });
    }
  }, [
    fetchMe,
    fetchCurrentCommunity,
    setCommunityName,
    setMatchingPoint,
    communityName,
    matchingPoint,
  ]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        minHeight: "100vh",
      }}
    >
      <GeneralHeader
        matchingPoint={matchingPoint}
        communityName={communityName}
        githubLogin={githubLogin}
        menu={menu}
      />
      <Box sx={{ flex: "1" }}>
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </Box>
      <Modal
        open={openLogoutModal}
        onClose={setOpenLogoutModal.off}
        sx={{ top: "40%", mx: "auto", width: "600px" }}
      >
        <Box>
          <AgreeModal
            content="ログアウトしますか？"
            onAgree={handleLogout}
            onCancel={setOpenLogoutModal.off}
          />
        </Box>
      </Modal>
    </Box>
  );
};
