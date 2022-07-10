import { Profile } from "../../context/auth";
import { localStorageFactory } from "./factory";

const TOKEN_KEY = "profile";

/**
 * profileを格納するlocalstorage
 */
export const profileStorage = localStorageFactory<Profile>({
  key: TOKEN_KEY,
});
