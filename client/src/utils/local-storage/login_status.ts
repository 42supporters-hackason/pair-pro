import { LoginStatus } from "../../context/auth";
import { localStorageFactory } from "./factory";

const TOKEN_KEY = "login_status";

/**
 * ログイン状態を格納するlocalstorage
 */
export const loginStatusStorage = localStorageFactory<LoginStatus>({
  key: TOKEN_KEY,
});
