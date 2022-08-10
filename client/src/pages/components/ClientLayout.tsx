import { Suspense, useCallback, useEffect, useState } from "react";
import { Box, Modal } from "@mui/material";
import { Outlet } from "react-router-dom";
import { AgreeModal } from "../../components/AgreeModal";
import { GeneralHeader } from "../../components/GeneralHeader";
import { useClientHeaderMenu } from "../../components/GeneralHeader/useHeaderMenu";
import { useProfile } from "../../context/auth";
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
  const [openLogoutModal, setOpenLogoutModal] = useBoolean(false);
  const [openChangeCommunityModal, setOpenChangeCommunityModal] =
    useBoolean(false);
  const [communityName, setCommunityName] = useState<string>();
  const [matchingPoint, setMatchingPoint] = useState<number>();
  const [githubLogin, setGithubLogin] = useState<string>();

  const { setProfile } = useProfile();
  const { goToLogin, goToCommunity } = usePublicRoute();
  const menu = useClientHeaderMenu({
    onLogout: setOpenLogoutModal.on,
    onChangeCommunity: setOpenChangeCommunityModal.on,
  });
  const [fetchCurrentCommunity] = useFetchCurrentCommunityLazyQuery();
  const [fetchMe] = useFetchMeLazyQuery();

  /**
   * event-handler
   */
  const handleLogout = useCallback(() => {
    tokenStorage.clear();
    goToLogin({ replace: true });
  }, [goToLogin]);

  const handleChangeCommunity = useCallback(() => {
    goToCommunity({ replace: true });
  }, [goToCommunity]);

  useEffect(() => {
    if (communityName === undefined) {
      fetchCurrentCommunity({
        onCompleted: (data) => setCommunityName(data.myCurrentCommunity?.name),
      });
    }
    if (matchingPoint === undefined) {
      fetchMe({
        onCompleted: (data) => {
          setMatchingPoint(data.myProfile.matchingPoint);
          setGithubLogin(data.myProfile.user.githubLogin);
          setProfile({
            id: data.myProfile.id,
            githubLogin: data.myProfile.user.githubLogin,
            name: data.myProfile.name,
            bio: data.myProfile.bio,
          });
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
    setProfile,
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
      <Modal
        open={openChangeCommunityModal}
        onClose={setOpenChangeCommunityModal.off}
        sx={{ top: "40%", mx: "auto", width: "600px" }}
      >
        <Box>
          <AgreeModal
            content="コミュニティを変更しますか？"
            onAgree={handleChangeCommunity}
            onCancel={setOpenChangeCommunityModal.off}
          />
        </Box>
      </Modal>
    </Box>
  );
};
