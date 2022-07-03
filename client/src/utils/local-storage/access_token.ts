import { localStorageFactory } from "./factory";

const TOKEN_KEY = "github_access_token";

/**
 * githubのアクセストークンを管理するlocalstorageクライアント
 */
export const accessTokenStorage = localStorageFactory<string>({
  key: TOKEN_KEY,
  parser: (value) => value,
  serializer: (value) => value,
});
