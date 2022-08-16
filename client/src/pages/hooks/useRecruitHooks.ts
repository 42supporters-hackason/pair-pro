import { useCallback } from "react";
import { useProfile } from "../../context/auth";
import {
  FetchUnmatchedPostQuery,
  useFetchMatchedPostQuery,
  useFetchSkillsQuery,
  useFetchUnmatchedPostQuery,
  useMatchPostMutation,
} from "../../gen/graphql-client";
import { useClientRoute } from "../../hooks/useClientRoute";

const postsTranslator = (posts: FetchUnmatchedPostQuery) =>
  posts.unmatchedPosts.map((post) => ({
    id: post?.id,
    title: post?.title,
    content: post?.description,
    language: post?.requiredSkills.map(({ name }) => name),
    name: post?.driver?.name,
    githubLogin: post?.driver?.user.githubLogin,
    bio: post?.driver?.bio,
  }));

interface MatchPostProps {
  selectedId: string;
  profileId: number;
  closeModal: () => void;
}

interface Props {
  /**
   * ユーザ名の絞り込み
   */
  driverNameFilter?: string;
  /**
   * 使用言語の絞り込み
   */
  requiredSkillsFilter?: number;
}

/**
 * pages/client/recruitで使用されるHooks
 */
export const useRecruitHooks = ({
  driverNameFilter,
  requiredSkillsFilter,
}: Props) => {
  /**
   * misc.
   */
  const [matchPostMutation] = useMatchPostMutation();
  const { refetch: refetchMatchedPost } = useFetchMatchedPostQuery();
  const { goToHome } = useClientRoute();
  const { updateMatchingPoint } = useProfile();

  /**
   * requiredSkillsのデータ
   */
  const { data: skillsData } = useFetchSkillsQuery();
  const languages = skillsData?.skills.map(({ name }) => name);

  /**
   * マッチングしていないPOST一覧
   */
  const { data: fetchPosts, refetch: refetchPosts } =
    useFetchUnmatchedPostQuery({
      variables: {
        driverNameFilter,
        requiredSkillsFilter,
      },
    });
  const posts = fetchPosts && postsTranslator(fetchPosts);

  /**
   * POSTをマッチさせるhandler
   */
  const matchPost = useCallback(
    ({ selectedId, profileId, closeModal }: MatchPostProps) => {
      matchPostMutation({
        variables: {
          postId: selectedId,
          navigatorId: profileId,
        },
        onCompleted: () => {
          closeModal();
          refetchMatchedPost();
          updateMatchingPoint();
          refetchPosts();
          goToHome();
        },
      });
    },
    [
      matchPostMutation,
      refetchMatchedPost,
      goToHome,
      updateMatchingPoint,
      refetchPosts,
    ]
  );

  return { posts, languages, matchPost, skillsData, refetchPosts };
};
