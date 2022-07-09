import { useState } from "react";
import constate from "constate";
import { useBoolean } from "../hooks/useBoolean";
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
  bio: string;
}

export const [AuthProvider, useIsLogin, useProfile] = constate(
  () => {
    const [isLogin, setIsLogin] = useBoolean(tokenStorage.load() !== null);
    const [profile, setProfile] = useState<Partial<Profile>>(
      profileStorage.load()
    );

    return { isLogin, setIsLogin, profile, setProfile };
  },
  ({ isLogin, setIsLogin }) => ({ isLogin, setIsLogin }),
  ({ profile, setProfile }) => ({ profile, setProfile })
);
