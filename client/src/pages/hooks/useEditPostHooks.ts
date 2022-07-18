import { useFetchSkillsQuery } from "../../gen/graphql-client";

/**
 * page/client/edit/postで使用されるhooks
 */
export const useEditPostHooks = () => {
  const { data: languagesData } = useFetchSkillsQuery();
  return { languagesData };
};
