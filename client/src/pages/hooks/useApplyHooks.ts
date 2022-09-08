import { useCallback, useMemo } from "react";
import { useProfile } from "../../context/auth";
import {
  useCreatePostMutation,
  useFetchMeQuery,
  useFetchMyPostQuery,
  useFetchSkillsQuery,
} from "../../gen/graphql-client";
import { useClientRoute } from "../../hooks/useClientRoute";
import { ApplySchema } from "./../validation/apply_vaildation";

interface CreatePostProps {
  /**
   * client/applyで管理するformの情報
   */
  formData: ApplySchema;
  /**
   * modalを開けるハンドラ
   */
  closeModal: () => void;
}

/**
 *  pages/client/applyで使用されるhooks
 */
export const useApplyHooks = () => {
  const [createPostMutation] = useCreatePostMutation();
  const { updateMatchingPoint } = useProfile();
  const { data: languagesData } = useFetchSkillsQuery();
  const { goToHome } = useClientRoute();
  const { refetch: refetchMyPosts } = useFetchMyPostQuery();
  const { data: meData } = useFetchMeQuery();

  /**
   * MPが存在するか？
   */
  const canPost = useMemo(
    () =>
      meData?.myProfile.matchingPoint
        ? meData.myProfile.matchingPoint > 0
        : false,
    [meData]
  );

  /**
   * POSTを作成するhandler
   */
  const createPost = useCallback(
    async ({ formData, closeModal }: CreatePostProps) => {
      const requiredSkillsId = formData.language.map(
        (language) =>
          languagesData?.skills.find(({ name }) => name === language)
            ?.id as number
      );

      if (requiredSkillsId !== undefined) {
        await createPostMutation({
          variables: {
            title: formData.title,
            description: formData.content,
            requiredSkillsId,
          },
          onCompleted: () => {
            closeModal();
            updateMatchingPoint();
            refetchMyPosts();
            goToHome();
          },
        });
      }
    },
    [
      createPostMutation,
      goToHome,
      refetchMyPosts,
      updateMatchingPoint,
      languagesData?.skills,
    ]
  );

  return { createPost, languagesData, canPost };
};
