import { useCallback } from "react";
import { useProfile } from "../../context/auth";
import {
  useCreatePostMutation,
  useFetchMyPostQuery,
  useFetchSkillsQuery,
} from "../../gen/graphql-client";
import { useClientRoute } from "../../hooks/useClientRoute";
import { unreachable } from "../../utils";
import { profileStorage } from "../../utils/local-storage/profile";
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
  const { setProfile } = useProfile();
  const { data: languagesData } = useFetchSkillsQuery();
  const { goToHome } = useClientRoute();
  const { refetch: refetchMyPosts } = useFetchMyPostQuery();

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
          onCompleted: (data) => {
            closeModal();
            const profile = profileStorage.load();
            profileStorage.save({
              id: profile?.id ?? unreachable(),
              matchingPoint: data.post.driver?.matchingPoint ?? unreachable(),
              name: profile?.name ?? unreachable(),
              githubLogin: profile?.githubLogin ?? unreachable(),
              bio: profile?.bio,
            });
            setProfile(profileStorage.load() ?? {});
            refetchMyPosts();
            goToHome();
          },
        });
      }
    },
    [
      createPostMutation,
      goToHome,
      setProfile,
      languagesData?.skills,
      refetchMyPosts,
    ]
  );
  return { createPost, languagesData };
};
