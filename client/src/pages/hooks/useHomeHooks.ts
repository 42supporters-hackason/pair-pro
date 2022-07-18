import { useProfile } from "../../context/auth";
import {
  FetchMatchedPostQuery,
  useFetchMatchedPostQuery,
  useFetchMyPostQuery,
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
        myGithubLogin === driver?.githubLogin ? navigator?.name : driver?.name,
      githubLogin:
        myGithubLogin === driver?.githubLogin
          ? navigator?.githubLogin
          : driver?.githubLogin,
    })
  );

/**
 * pages/client/homeで使用されるHooks
 */
export const useHomeHooks = () => {
  const { data: fetchMyPosts, refetch: refetchMyPosts } = useFetchMyPostQuery();
  const { data: fetchMatchedPosts, refetch: refetchMatchedPosts } =
    useFetchMatchedPostQuery();
  const { profile } = useProfile();

  const myPosts = fetchMyPosts && myPostsTranslator(fetchMyPosts);
  const matchedPosts =
    fetchMatchedPosts &&
    matchedPostsTaranslator(fetchMatchedPosts, profile?.githubLogin ?? "");
  return { myPosts, matchedPosts, refetchMatchedPosts, refetchMyPosts };
};
