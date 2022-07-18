import {
  useFetchSkillsQuery,
  useFetchSpecificPostQuery,
} from "../../gen/graphql-client";

/**
 * page/client/edit/postで使用されるhooks
 */
export const useEditPostHooks = (postId: string) => {
  const { data: languagesData } = useFetchSkillsQuery();
  const { data: post } = useFetchSpecificPostQuery({
    variables: {
      id: postId,
    },
  });

  return { languagesData, post };
};
