import { useCallback } from "react";
import {
  useFetchMyPostQuery,
  useFetchSkillsQuery,
  useFetchSpecificPostQuery,
  useUpdatePostMutation,
} from "../../gen/graphql-client";
import { EditPostSchema } from "../validation/edit_post_validation";
import { useClientRoute } from "./../../hooks/useClientRoute";

/**
 * page/client/edit/postで使用されるhooks
 */
export const useEditPostHooks = (postId: string) => {
  const { data: languagesData } = useFetchSkillsQuery();
  const [updatePostMutation] = useUpdatePostMutation();
  const { refetch: refetchMyPost } = useFetchMyPostQuery();
  const { goToHome } = useClientRoute();

  const { data: postData, loading: postLoading } = useFetchSpecificPostQuery({
    variables: {
      id: postId,
    },
  });

  const updatePost = useCallback(
    async (editFormData: EditPostSchema) => {
      await updatePostMutation({
        variables: {
          id: postId,
          title: editFormData.title,
          description: editFormData.content,
          requiredSkillsIds: editFormData.language.map(
            (language) =>
              languagesData?.skills.find(({ name }) => name === language)
                ?.id as number
          ),
        },
        onCompleted: () => {
          refetchMyPost();
          goToHome();
        },
      });
    },
    [postId, languagesData, updatePostMutation, refetchMyPost, goToHome]
  );

  return { languagesData, updatePost, postData, postLoading };
};
