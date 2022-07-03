import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Suspense } from "react";

function App() {
  return (
    <BrowserRouter>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Suspense fallback={null}>
          <AppRoutes />
        </Suspense>
      </LocalizationProvider>
    </BrowserRouter>
  );
}

export default App;
