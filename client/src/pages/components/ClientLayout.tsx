import { Suspense, useCallback, useEffect, useState } from "react";
import { Box, Checkbox, Modal, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";
import { AgreeModal } from "../../components/AgreeModal";
import { GeneralHeader } from "../../components/GeneralHeader";
import { useClientHeaderMenu } from "../../components/GeneralHeader/useHeaderMenu";
import { useAuth, useProfile } from "../../context/auth";
import {
  useExitCommunityMutation,
  useFetchCurrentCommunityLazyQuery,
  useFetchMeLazyQuery,
} from "../../gen/graphql-client";
import { useBoolean } from "../../hooks/useBoolean";
import { useCommunityRoute } from "../../hooks/useCommunityRoute";
import { usePublicRoute } from "../../hooks/usePublicRoute";
import { loginStatusStorage } from "../../utils/local-storage/login_status";
import { tokenStorage } from "../../utils/local-storage/token";

/**
 * Client画面共通のLayout
 */
export const ClientLayout = () => {
  /**
   * misc.
   */
  const [openLogoutModal, setOpenLogoutModal] = useBoolean(false);
  const [confirmExit, setConfirmExit] = useBoolean(true);
  const [openChangeCommunityModal, setOpenChangeCommunityModal] =
    useBoolean(false);
  const [openExitCommunityModal, setOpenExitCommunityModal] = useBoolean(false);
  const [communityName, setCommunityName] = useState<string>();
  const [matchingPoint, setMatchingPoint] = useState<number>();
  const [githubLogin, setGithubLogin] = useState<string>();
  const { setLoginStatus } = useAuth();

  const { setProfile } = useProfile();
  const { goToLogin } = usePublicRoute();
  const { goToCommunity } = useCommunityRoute();
  const menu = useClientHeaderMenu({
    onLogout: setOpenLogoutModal.on,
    onChangeCommunity: setOpenChangeCommunityModal.on,
    onExitCommunity: setOpenExitCommunityModal.on,
  });
  const [fetchCurrentCommunity] = useFetchCurrentCommunityLazyQuery();
  const [fetchMe] = useFetchMeLazyQuery();
  const [exitCommunity] = useExitCommunityMutation();

  /**
   * event-handler
   */
  const handleLogout = useCallback(() => {
    tokenStorage.clear();
    loginStatusStorage.save("unLogin");
    setLoginStatus("unLogin");
    goToLogin({ replace: true });
  }, [goToLogin, setLoginStatus]);

  const handleChangeCommunity = useCallback(() => {
    setLoginStatus("authFinished");
    loginStatusStorage.save("authFinished");
    goToCommunity({ replace: true });
  }, [goToCommunity, setLoginStatus]);

  const handleExitCommunity = useCallback(() => {
    exitCommunity({
      onCompleted: (data) => {
        if (data.deleteMyProfile?.token) {
          tokenStorage.save(data.deleteMyProfile.token);
        }
        goToCommunity({ replace: true });
      },
    });
  }, [exitCommunity, goToCommunity]);

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
      <Suspense fallback={null}>
        <GeneralHeader
          matchingPoint={matchingPoint}
          communityName={communityName}
          githubLogin={githubLogin}
          menu={menu}
        />
        <Box sx={{ flex: "1" }}>
          <Outlet />
        </Box>
      </Suspense>
      <Modal
        open={openLogoutModal}
        onClose={setOpenLogoutModal.off}
        sx={{ top: "40%", mx: "auto", width: "600px" }}
      >
        <Box>
          <AgreeModal onAgree={handleLogout} onCancel={setOpenLogoutModal.off}>
            ログアウトしますか？
          </AgreeModal>
        </Box>
      </Modal>
      <Modal
        open={openChangeCommunityModal}
        onClose={setOpenChangeCommunityModal.off}
        sx={{ top: "40%", mx: "auto", width: "600px" }}
      >
        <Box>
          <AgreeModal
            onAgree={handleChangeCommunity}
            onCancel={setOpenChangeCommunityModal.off}
          >
            コミュニティを変更しますか？
          </AgreeModal>
        </Box>
      </Modal>
      <Modal
        open={openExitCommunityModal}
        onClose={setOpenExitCommunityModal.off}
        sx={{ top: "40%", mx: "auto", width: "600px" }}
      >
        <Box>
          <AgreeModal
            onAgree={handleExitCommunity}
            onCancel={setOpenExitCommunityModal.off}
            disabled={confirmExit}
          >
            <Typography color="red" variant="h6" fontWeight="bold">
              *注意
            </Typography>
            このコミュニティから退会しますか？
            <br />
            退会した場合、過去の履歴は全て削除されます。
            <br />
            再度加入する場合は、コミュニティIDを入力してください
            <br />
            <br />
            チェックをしてください
            <Checkbox onChange={setConfirmExit.toggle} />
          </AgreeModal>
        </Box>
      </Modal>
    </Box>
  );
};
