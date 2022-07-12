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

const matchedPostsTaranslator = (matchedPosts: FetchMatchedPostQuery) =>
  matchedPosts.myMatchedPosts.map(
    ({ id, title, description, navigator, requiredSkills }) => ({
      id,
      title,
      content: description,
      languages: requiredSkills.map(({ name }) => name),
      name: navigator?.name,
      githubLogin: navigator?.githubLogin,
    })
  );

/**
 * pages/client/homeで使用されるHooks
 */
export const useHomeHooks = () => {
  const { data: fetchMyPosts } = useFetchMyPostQuery();
  const { data: fetchMatchedPosts } = useFetchMatchedPostQuery();

  const myPosts = fetchMyPosts && myPostsTranslator(fetchMyPosts);
  const matchedPosts =
    fetchMatchedPosts && matchedPostsTaranslator(fetchMatchedPosts);
  return { myPosts, matchedPosts };
};
