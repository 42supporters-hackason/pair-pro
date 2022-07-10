import * as React from "react";

/**
 * 再帰的にオプショナルにするutils
 */
export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

// named imports for React.lazy: https://github.com/facebook/react/issues/14603#issuecomment-726551598
export function lazyImport<
  T extends React.ComponentType<unknown>,
  I extends { [K2 in K]: T },
  K extends keyof I
>(factory: () => Promise<I>, name: K): I {
  return Object.create({
    [name]: React.lazy(() =>
      factory().then((module) => ({ default: module[name] }))
    ),
  });
}

/**
 * 到達不可能なコードを記載した際にエラーを起こす
 */
export const unreachable = (errorText?: string) => {
  if (errorText) {
    throw new Error(errorText);
  }
  throw new Error("このコードに到達してしまっています");
};

/**
 * No operation
 */
// eslint-disable-next-line @typescript-eslint/no-empty-function
export const noop = () => {};

/**
 * githubのOAuthに必要なurlを生成する
 */
export const getGithubAuthUrl = () => {
  const rootUrl = "https://github.com/login/oauth/authorize";

  const options = {
    client_id: import.meta.env.VITE_GITHUB_OAUTH_CLIENT_ID as string,
    redirect_uri: import.meta.env.VITE_GITHUB_OAUTH_REDIRECT_URL as string,
    scope: "user:email",
  };

  const queryString = new URLSearchParams(options);

  return `${rootUrl}?${queryString.toString()}`;
};
