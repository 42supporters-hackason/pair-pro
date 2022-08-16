import { useCallback, useState } from "react";
import constate from "constate";
import {
  useFetchCurrentCommunityLazyQuery,
  useFetchMeLazyQuery,
  useJoinCommunityMutation,
  useSignInMutation,
} from "../gen/graphql-client";
import { useCommunityRoute } from "../hooks/useCommunityRoute";
import { usePublicRoute } from "../hooks/usePublicRoute";
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

type LoginStatus = "unLogin" | "authFinished" | "logined";

export const [AuthProvider, useAuth, useProfile, useCommunity] = constate(
  () => {
    const [loginStatus, setLoginStatus] = useState<LoginStatus>("unLogin");
    const [profile, setProfile] = useState<Profile>();
    const [matchingPoint, setMatchingPoint] = useState<number>();
    const [communityName, setCommunityName] = useState<string>();
    const [signInMutation] = useSignInMutation();
    const { goToLogin } = usePublicRoute();
    const { goToCommunity } = useCommunityRoute();
    const { goToHome } = useClientRoute();
    const { refetchMatchedPosts, refetchMyPosts } = useHomeHooks();
    const [fetchMe] = useFetchMeLazyQuery();
    const [joinCommunityMutation] = useJoinCommunityMutation();
    const [fetchCurrentCommunity] = useFetchCurrentCommunityLazyQuery();

    const signIn = async (code: string) => {
      if (tokenStorage.load() === null) {
        await signInMutation({
          variables: { code },
          onCompleted: (data) => {
            tokenStorage.save(data?.authGithub.token ?? "");
            goToCommunity({ replace: true });
            setLoginStatus("authFinished");
          },
        });
        if (tokenStorage.load() === null) {
          goToLogin();
        }
      }
    };

    const joinCommunity = async (id: string) => {
      await joinCommunityMutation({
        variables: { communityId: id },
        onCompleted: (data) => {
          tokenStorage.save(data.joinCommunity.token);
          refetchMatchedPosts();
          refetchMyPosts();
          goToHome({ replace: true });
          setLoginStatus("logined");
        },
      });
    };

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
      matchingPoint,
      communityName,
    };
  },
  ({ signIn, loginStatus, setLoginStatus }) => ({
    signIn,
    loginStatus,
    setLoginStatus,
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
