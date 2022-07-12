import { useState } from "react";
import constate from "constate";
import { useSignInMutation } from "../gen/graphql-client";
import { useBoolean } from "../hooks/useBoolean";
import { usePublicRoute } from "../hooks/usePublicRoute";
import { profileStorage } from "../utils/local-storage/profile";
import { tokenStorage } from "../utils/local-storage/token";

export interface Profile {
  id: number;
  /**
   * github login名
   */
  githubLogin: string;
  /**
   * プロフィール名
   */
  name: string;
  /**
   * MP
   */
  matchingPoint: number;
  /**
   * プロフィール
   */
  bio?: string;
}

export const [AuthProvider, useAuth, useProfile] = constate(
  () => {
    const [isLogin, setIsLogin] = useBoolean(tokenStorage.load() !== null);
    const [profile, setProfile] = useState<Partial<Profile>>(
      profileStorage.load() ?? {}
    );
    const [signInMutation] = useSignInMutation();
    const { goToLogin } = usePublicRoute();

    const signIn = async (code: string) => {
      if (tokenStorage.load() === null) {
        await signInMutation({
          variables: { code },
          onCompleted: (data) => {
            tokenStorage.save(data?.authGithub.token ?? "");
            profileStorage.save({
              id: data.authGithub.user.id,
              githubLogin: data?.authGithub.user.githubLogin,
              name: data?.authGithub.user.name,
              matchingPoint: data?.authGithub.user.matchingPoint,
              bio: data?.authGithub.user.bio,
            });
            setIsLogin.on();
            setProfile({
              id: data.authGithub.user.id,
              githubLogin: data?.authGithub.user.githubLogin,
              name: data?.authGithub.user.name,
              matchingPoint: data?.authGithub.user.matchingPoint,
              bio: data?.authGithub.user.bio,
            });
          },
        });
        if (tokenStorage.load() === null) {
          goToLogin();
        }
      }
    };

    return { isLogin, setIsLogin, profile, setProfile, signIn };
  },
  ({ signIn, isLogin, setIsLogin }) => ({ signIn, isLogin, setIsLogin }),
  ({ profile, setProfile }) => ({ profile, setProfile })
);
