import { localStorageFactory } from "./factory";

const TOKEN_KEY = "jwt_token";

/**
 * jwt tokenを格納するlocalstorage
 */
export const tokenStorage = localStorageFactory<string>({
  key: TOKEN_KEY,
  parser: (value) => value,
  serializer: (value) => value,
});
