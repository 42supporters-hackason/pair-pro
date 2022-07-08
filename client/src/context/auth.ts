import { useState } from "react";
import constate from "constate";
import { useBoolean } from "../hooks/useBoolean";
import { tokenStorage } from "../utils/local-storage/token";

interface Profile {
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
    const [profile, setProfile] = useState<Partial<Profile>>();

    return { isLogin, setIsLogin, profile, setProfile };
  },
  ({ isLogin, setIsLogin }) => ({ isLogin, setIsLogin }),
  ({ profile, setProfile }) => ({ profile, setProfile })
);
