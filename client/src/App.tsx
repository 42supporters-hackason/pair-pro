import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

function App() {
  return (
    <BrowserRouter>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <AppRoutes />
      </LocalizationProvider>
    </BrowserRouter>
  );
}

export default App;
