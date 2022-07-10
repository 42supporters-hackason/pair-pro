import { Suspense, useCallback, useEffect } from "react";
import { Box, Modal } from "@mui/material";
import { Outlet, useSearchParams } from "react-router-dom";
import { AgreeModal } from "../../components/AgreeModal";
import { GeneralHeader } from "../../components/GeneralHeader";
import { useClientHeaderMenu } from "../../components/GeneralHeader/useHeaderMenu";
import { useAuth, useProfile } from "../../context/auth";
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
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const { goToLogin } = usePublicRoute();
  const { isLogin, signIn } = useAuth();
  const {
    profile: { matchingPoint },
  } = useProfile();
  const [openLogoutModal, setOpenLogoutModal] = useBoolean(false);
  const menu = useClientHeaderMenu({ onLogout: setOpenLogoutModal.on });

  /**
   * event-handler
   */
  const handleLogout = useCallback(() => {
    tokenStorage.clear();
    goToLogin();
  }, [goToLogin]);

  useEffect(() => {
    if (!isLogin && code !== null) {
      signIn(code);
    }
  }, [code, signIn, isLogin]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        minHeight: "100vh",
      }}
    >
      <GeneralHeader matchingPoint={matchingPoint} menu={menu} />
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
