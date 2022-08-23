import { useCallback, useMemo } from "react";
import { useProfile } from "../../context/auth";
import {
  FetchUnmatchedPostQuery,
  useFetchCurrentCommunityQuery,
  useFetchMatchedPostQuery,
  useFetchSkillsQuery,
  useFetchUnmatchedPostQuery,
  useMatchPostMutation,
} from "../../gen/graphql-client";
import { useClientRoute } from "../../hooks/useClientRoute";

const postsTranslator = (posts: FetchUnmatchedPostQuery) =>
  posts.unmatchedPosts.posts.map((post) => ({
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
  /**
   * キーワード検索
   */
  keywordFilter?: string;
  /**
   * 一度に取得する個数
   */
  skip?: number;
  /**
   * 何個めを取得するか
   */
  take?: number;
}

/**
 * pages/client/recruitで使用されるHooks
 */
export const useRecruitHooks = ({
  driverNameFilter,
  requiredSkillsFilter,
  keywordFilter,
  skip,
  take,
}: Props) => {
  /**
   * misc.
   */
  const [matchPostMutation] = useMatchPostMutation();
  const { refetch: refetchMatchedPost } = useFetchMatchedPostQuery();
  const { goToHome } = useClientRoute();
  const { updateMatchingPoint } = useProfile();
  const { data: currentCommunityData } = useFetchCurrentCommunityQuery();
  const communityMember =
    currentCommunityData?.myCurrentCommunity?.profiles.map(({ name }) => name);

  /**
   * requiredSkillsのデータ
   */
  const { data: skillsData } = useFetchSkillsQuery();
  const languages = skillsData?.skills.map(({ name }) => name);
  const languagesData = skillsData?.skills.map(({ name, imageUrl }) => ({
    name,
    imageUrl,
  }));

  /**
   * マッチングしていないPOST一覧
   */
  const { data: fetchPosts, refetch: refetchPosts } =
    useFetchUnmatchedPostQuery({
      variables: {
        driverNameFilter,
        requiredSkillsFilter,
        keywordFilter,
        skip,
        take,
      },
    });
  const posts = fetchPosts && postsTranslator(fetchPosts);
  const paginationCountData = fetchPosts?.unmatchedPosts.count;
  const paginationCount = useMemo(() => {
    if (take !== undefined && paginationCountData !== undefined) {
      return Math.ceil(paginationCountData / take);
    }
  }, [take, paginationCountData]);

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

  return {
    posts,
    languages,
    matchPost,
    skillsData,
    refetchPosts,
    communityMember,
    paginationCount,
    languagesData,
  };
};
