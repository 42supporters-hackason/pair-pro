import { useCallback, useState } from "react";
import constate from "constate";
import {
  useFetchCurrentCommunityLazyQuery,
  useFetchMeLazyQuery,
  useJoinCommunityMutation,
  useSignInMutation,
} from "../gen/graphql-client";
import { useBoolean } from "../hooks/useBoolean";
import { usePublicRoute } from "../hooks/usePublicRoute";
import { tokenStorage } from "../utils/local-storage/token";
import { useClientRoute } from "./../hooks/useClientRoute";
import { useHomeHooks } from "./../pages/hooks/useHomeHooks";

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
   * プロフィール
   */
  bio?: string;
}

export const [AuthProvider, useAuth, useProfile, useCommunity] = constate(
  () => {
    const [isLogin, setIsLogin] = useBoolean(tokenStorage.load() !== null);
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

    const signIn = async (code: string) => {
      if (tokenStorage.load() === null) {
        await signInMutation({
          variables: { code },
          onCompleted: (data) => {
            tokenStorage.save(data?.authGithub.token ?? "");
            goToCommunity({ replace: true });
          },
        });
        if (tokenStorage.load() === null) {
          goToLogin();
        }
      }
    };

    const joinCommunity = async (id: string) => {
      joinCommunityMutation({
        variables: { communityId: id },
        onCompleted: (data) => {
          tokenStorage.save(data.joinCommunity.token);
          refetchMatchedPosts();
          refetchMyPosts();
          goToHome({ replace: true });
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
      isLogin,
      setIsLogin,
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
  ({ signIn, isLogin, setIsLogin }) => ({ signIn, isLogin, setIsLogin }),
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
