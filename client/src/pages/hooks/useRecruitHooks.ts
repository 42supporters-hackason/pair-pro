import {
  FetchUnmatchedPostQuery,
  useFetchSkillsQuery,
  useFetchUnmatchedPostQuery,
} from "../../gen/graphql-client";

const postsTranslator = (posts: FetchUnmatchedPostQuery) =>
  posts.unmatchedPosts.map((post) => ({
    id: post?.id,
    title: post?.title,
    content: post?.description,
    language: post?.requiredSkills.map(({ name }) => name),
    name: post?.driver?.name,
    githubLogin: post?.driver?.githubLogin,
  }));

export const useRecruitHooks = () => {
  const { data } = useFetchSkillsQuery();
  const { data: fetchPosts } = useFetchUnmatchedPostQuery();

  const posts = fetchPosts && postsTranslator(fetchPosts);

  const languages = data?.skills.map(({ name }) => name);
  return { posts, languages };
};
