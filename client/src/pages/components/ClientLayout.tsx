import { Box } from "@mui/material";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { GeneralHeader } from "../../components/GeneralHeader";

/**
 * Client画面共通のLayout
 */
export const ClientLayout = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        minHeight: "100vh",
      }}
    >
      <GeneralHeader />
      <Box sx={{ flex: "1" }}>
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </Box>
    </Box>
  );
};
