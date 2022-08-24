import { useCallback } from "react";
import { Profile, useProfile } from "../../context/auth";
import {
  FetchCompletedPostQuery,
  FetchMatchedPostQuery,
  useCompletePostMutation,
  useDeletePostMutation,
  useFetchCompletedPostQuery,
  useFetchMatchedPostQuery,
  useFetchMeQuery,
  useFetchMyPostQuery,
  useFetchSkillsQuery,
} from "../../gen/graphql-client";
import { FetchMyPostQuery } from "./../../gen/graphql-client";

const myPostsTranslator = (myPosts: FetchMyPostQuery) =>
  myPosts.myDrivingPosts.map(({ id, title, description, requiredSkills }) => ({
    id,
    title,
    content: description,
    languages: requiredSkills.map(({ name }) => name),
  }));

const matchedPostsTaranslator = (
  matchedPosts: FetchMatchedPostQuery,
  myGithubLogin: string
) =>
  matchedPosts.myMatchedPosts.map(
    ({ id, title, description, navigator, requiredSkills, driver }) => ({
      id,
      title,
      content: description,
      languages: requiredSkills.map(({ name }) => name),
      name:
        myGithubLogin === driver?.user.githubLogin
          ? navigator?.name
          : driver?.name,
      githubLogin:
        myGithubLogin === driver?.user.githubLogin
          ? navigator?.user.githubLogin
          : driver?.user.githubLogin,
      bio:
        myGithubLogin === driver?.user.githubLogin
          ? navigator?.bio
          : driver?.bio,
    })
  );

const completedPostsTaranslator = (
  completedPosts: FetchCompletedPostQuery,
  myGithubLogin: string
) =>
  completedPosts.myCompletedPosts.map(
    ({ id, title, description, navigator, requiredSkills, driver }) => ({
      id,
      title,
      content: description,
      languages: requiredSkills.map(({ name }) => name),
      name:
        myGithubLogin === driver?.user.githubLogin
          ? navigator?.name
          : driver?.name,
      githubLogin:
        myGithubLogin === driver?.user.githubLogin
          ? navigator?.user.githubLogin
          : driver?.user.githubLogin,
      bio:
        myGithubLogin === driver?.user.githubLogin
          ? navigator?.bio
          : driver?.bio,
    })
  );
interface DeletePostProps {
  selectedId: string;
  closeModal: () => void;
}

/**
 * pages/client/homeで使用されるHooks
 */
export const useHomeHooks = () => {
  /**
   * misc.
   */
  const { updateMatchingPoint } = useProfile();
  const [deletePostMutation] = useDeletePostMutation();
  const { data: fetchLanguagesData } = useFetchSkillsQuery();
  const languagesData = fetchLanguagesData?.skills.map(
    ({ name, imageUrl }) => ({
      name,
      imageUrl,
    })
  );
  const [completePostMutation] = useCompletePostMutation();

  /**
   * 自分自身のプロフィールを取得
   */
  const { data: meData } = useFetchMeQuery();
  const profile: Profile = {
    id: meData?.myProfile.id,
    githubLogin: meData?.myProfile.user.githubLogin,
    name: meData?.myProfile.name,
    bio: meData?.myProfile.bio,
  };

  /**
   * 自分が投稿したPOSTを取得
   */
  const { data: fetchMyPosts, refetch: refetchMyPosts } = useFetchMyPostQuery();
  const myPosts = fetchMyPosts && myPostsTranslator(fetchMyPosts);

  /**
   * マッチしたPOSTを取得
   */
  const { data: fetchMatchedPosts, refetch: refetchMatchedPosts } =
    useFetchMatchedPostQuery();
  const matchedPosts =
    fetchMatchedPosts &&
    matchedPostsTaranslator(fetchMatchedPosts, profile?.githubLogin ?? "");

  /**
   * 終了したPOSTを取得
   */
  const { data: completedPostData, refetch: refetchCompletedPost } =
    useFetchCompletedPostQuery();
  const completedPosts =
    completedPostData &&
    completedPostsTaranslator(completedPostData, profile.githubLogin ?? "");

  /**
   * POSTを削除するhandler
   */
  const deletePost = useCallback(
    async ({ selectedId, closeModal }: DeletePostProps) => {
      if (selectedId) {
        await deletePostMutation({
          variables: {
            id: selectedId,
          },
          onCompleted: async () => {
            closeModal();
            refetchMyPosts();
            updateMatchingPoint();
          },
        });
      }
    },
    [deletePostMutation, refetchMyPosts, updateMatchingPoint]
  );

  const completePost = useCallback(
    (completedId: string) => {
      completePostMutation({
        variables: {
          postId: completedId,
        },
        onCompleted: () => {
          refetchMatchedPosts();
          refetchCompletedPost();
        },
      });
    },
    [completePostMutation, refetchMatchedPosts, refetchCompletedPost]
  );

  return {
    myPosts,
    matchedPosts,
    completedPosts,
    refetchMatchedPosts,
    refetchMyPosts,
    deletePost,
    completePost,
    profile,
    languagesData,
  };
};
