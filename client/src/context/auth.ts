import { useCallback, useState } from "react";
import constate from "constate";
import {
  useExitCommunityMutation,
  useFetchCurrentCommunityLazyQuery,
  useFetchMeLazyQuery,
  useJoinCommunityMutation,
  useSignInMutation,
} from "../gen/graphql-client";
import { usePublicRoute } from "../hooks/usePublicRoute";
import { loginStatusStorage } from "../utils/local-storage/login_status";
import { tokenStorage } from "../utils/local-storage/token";
import { useClientRoute } from "./../hooks/useClientRoute";
import { useHomeHooks } from "./../pages/hooks/useHomeHooks";

export interface Profile {
  id?: number;
  /**
   * github login名
   */
  githubLogin?: string;
  /**
   * プロフィール名
   */
  name?: string;
  /**
   * プロフィール
   */
  bio?: string;
}

export type LoginStatus = "unLogin" | "authFinished" | "logined";

export const [AuthProvider, useAuth, useProfile, useCommunity] = constate(
  () => {
    const [loginStatus, setLoginStatus] = useState<LoginStatus>(
      () => loginStatusStorage.load() ?? "unLogin"
    );
    const [profile, setProfile] = useState<Profile>();
    const [matchingPoint, setMatchingPoint] = useState<number>();
    const [communityName, setCommunityName] = useState<string>();
    const [signInMutation] = useSignInMutation();
    const { goToLogin, goToCommunity } = usePublicRoute();
    const { goToHome } = useClientRoute();
    const { refetchMatchedPosts, refetchMyPosts } = useHomeHooks();
    const [fetchMe] = useFetchMeLazyQuery();
    const [joinCommunityMutation] = useJoinCommunityMutation();
    const [fetchCurrentCommunity] = useFetchCurrentCommunityLazyQuery();
    const [exitCommunityMutation] = useExitCommunityMutation();

    const signIn = async (code?: string | null) => {
      if (code === null || code === undefined) {
        goToLogin();
      }
      if (tokenStorage.load() === null && code) {
        await signInMutation({
          variables: { code },
          onCompleted: (data) => {
            tokenStorage.save(data?.authGithub.token ?? "");
            loginStatusStorage.save("authFinished");
            setLoginStatus("authFinished");
            goToCommunity({ replace: true });
          },
        });
      }
    };

    const logout = useCallback(() => {
      tokenStorage.clear();
      loginStatusStorage.save("unLogin");
      setLoginStatus("unLogin");
      goToLogin({ replace: true });
    }, [goToLogin, setLoginStatus]);

    const joinCommunity = async (id: string) => {
      await joinCommunityMutation({
        variables: { communityId: id },
        onCompleted: (data) => {
          tokenStorage.save(data.joinCommunity.token);
          refetchMatchedPosts();
          refetchMyPosts();
          loginStatusStorage.save("logined");
          setLoginStatus("logined");
          goToHome({ replace: true });
        },
      });
    };

    const changeCommunity = useCallback(() => {
      setLoginStatus("authFinished");
      loginStatusStorage.save("authFinished");
      goToCommunity({ replace: true });
    }, [goToCommunity, setLoginStatus]);

    const exitCommunity = useCallback(() => {
      exitCommunityMutation({
        onCompleted: (data) => {
          if (data.deleteMyProfile?.token) {
            tokenStorage.save(data.deleteMyProfile.token);
          }
          setLoginStatus("authFinished");
          loginStatusStorage.save("authFinished");
          goToCommunity({ replace: true });
        },
      });
    }, [exitCommunityMutation, goToCommunity, setLoginStatus]);

    const updateMatchingPoint = useCallback(async () => {
      await fetchMe({
        onCompleted: (data) => {
          setMatchingPoint(data.myProfile.matchingPoint);
        },
      });
    }, [fetchMe]);

    const fetchMyProfile = useCallback(() => {
      fetchMe({
        onCompleted: (data) => {
          setProfile({
            id: data.myProfile.id,
            githubLogin: data.myProfile.user.githubLogin,
            name: data.myProfile.name,
            bio: data.myProfile.bio,
          });
          setMatchingPoint(data.myProfile.matchingPoint);
        },
      });
      fetchCurrentCommunity({
        onCompleted: (data) => {
          setCommunityName(data.myCurrentCommunity?.name);
        },
      });
    }, [fetchMe, fetchCurrentCommunity]);

    return {
      loginStatus,
      setLoginStatus,
      profile,
      setProfile,
      signIn,
      updateMatchingPoint,
      joinCommunity,
      fetchMyProfile,
      setCommunityName,
      logout,
      exitCommunity,
      changeCommunity,
      matchingPoint,
      communityName,
    };
  },
  ({
    signIn,
    loginStatus,
    setLoginStatus,
    logout,
    exitCommunity,
    changeCommunity,
  }) => ({
    signIn,
    loginStatus,
    setLoginStatus,
    logout,
    exitCommunity,
    changeCommunity,
  }),
  ({
    profile,
    setProfile,
    updateMatchingPoint,
    fetchMyProfile,
    matchingPoint,
    communityName,
    setCommunityName,
  }) => ({
    profile,
    setProfile,
    updateMatchingPoint,
    fetchMyProfile,
    matchingPoint,
    communityName,
    setCommunityName,
  }),
  ({ joinCommunity }) => ({ joinCommunity })
);
