import { Suspense, useEffect, useState } from "react";
import { Box, Checkbox, Modal, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";
import { AgreeModal } from "../../components/AgreeModal";
import { GeneralHeader } from "../../components/GeneralHeader";
import { useClientHeaderMenu } from "../../components/GeneralHeader/useHeaderMenu";
import { useAuth, useProfile } from "../../context/auth";
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
  /**
   * modal state
   */
  const [openLogoutModal, setOpenLogoutModal] = useBoolean(false);
  const [confirmExit, setConfirmExit] = useBoolean(true);
  const [openChangeCommunityModal, setOpenChangeCommunityModal] =
    useBoolean(false);
  const [openExitCommunityModal, setOpenExitCommunityModal] = useBoolean(false);

  /**
   * state
   */
  const [communityName, setCommunityName] = useState<string>();
  const [matchingPoint, setMatchingPoint] = useState<number>();
  const [githubLogin, setGithubLogin] = useState<string>();

  /**
   * hooks
   */
  const { logout, changeCommunity, exitCommunity, setLoginStatus } = useAuth();
  const { setProfile } = useProfile();
  const { goToNotFound } = usePublicRoute();

  /**
   * graphql hooks
   */
  const [fetchCurrentCommunity] = useFetchCurrentCommunityLazyQuery();
  const [fetchMe] = useFetchMeLazyQuery();

  const menu = useClientHeaderMenu({
    onLogout: setOpenLogoutModal.on,
    onChangeCommunity: setOpenChangeCommunityModal.on,
    onExitCommunity: setOpenExitCommunityModal.on,
  });

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

  useEffect(() => {
    if (tokenStorage.load() === null) {
      setLoginStatus("unLogin");
      goToNotFound();
    }
  }, [goToNotFound, setLoginStatus]);

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
          <AgreeModal onAgree={logout} onCancel={setOpenLogoutModal.off}>
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
            onAgree={changeCommunity}
            onCancel={setOpenChangeCommunityModal.off}
          >
            コミュニティを変更しますか？
          </AgreeModal>
        </Box>
      </Modal>
      <Modal
        open={openExitCommunityModal}
        onClose={() => {
          setOpenExitCommunityModal.off();
          setConfirmExit.on();
        }}
        sx={{ top: "40%", mx: "auto", width: "600px" }}
      >
        <Box>
          <AgreeModal
            onAgree={exitCommunity}
            onCancel={() => {
              setOpenExitCommunityModal.off();
              setConfirmExit.on();
            }}
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
            <Checkbox onChange={setConfirmExit.toggle} checked={!confirmExit} />
          </AgreeModal>
        </Box>
      </Modal>
    </Box>
  );
};
