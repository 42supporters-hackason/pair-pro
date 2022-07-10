import { Suspense } from "react";
import { ApolloProvider } from "@apollo/client";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/auth";
import { apolloClient } from "./lib/apollo-client";
import { AppRoutes } from "./routes";

function App() {
  return (
    <BrowserRouter>
      <ApolloProvider client={apolloClient}>
        <AuthProvider>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Suspense fallback={null}>
              <AppRoutes />
            </Suspense>
          </LocalizationProvider>
        </AuthProvider>
      </ApolloProvider>
    </BrowserRouter>
  );
}

export default App;
