import { Box } from "@mui/material";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { GeneralHeader } from "../../components/GeneralHeader";

/**
 * Client画面共通のLayout
 */
export const ClientLayout = () => {
  return (
    <Box>
      <GeneralHeader />
      <Box>
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </Box>
    </Box>
  );
};
