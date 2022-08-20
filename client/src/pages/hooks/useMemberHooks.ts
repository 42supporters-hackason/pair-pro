import { useMemo } from "react";
import { useFetchCurrentCommunityQuery } from "../../gen/graphql-client";

interface Props {
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
 * client/memberで使用されるhooks
 */
export const useMemberHooks = ({ take, skip }: Props) => {
  const { data: currentCommunityData } = useFetchCurrentCommunityQuery({
    variables: {
      take,
      skip,
    },
  });
  /**
   * コミュニティ名
   */
  const communityName = currentCommunityData?.myCurrentCommunity?.name;
  /**
   * コミュニティID
   */
  const communityId = currentCommunityData?.myCurrentCommunity?.id;
  /**
   * コミュニティメンバー
   */
  const communityMember = currentCommunityData?.profilesInMyCommunity.profiles;
  const firstCommunityMember = useMemo(() => {
    if (take !== undefined) {
      return communityMember?.slice(0, take / 2);
    }
  }, [take, communityMember]);
  const secondCommunityMember = useMemo(() => {
    if (take !== undefined) {
      return communityMember?.slice(take / 2, take);
    }
  }, [take, communityMember]);
  /**
   * ページネーション数
   */
  const paginationCountData = currentCommunityData?.profilesInMyCommunity.count;
  const paginationCount = useMemo(() => {
    if (take !== undefined && paginationCountData !== undefined) {
      return Math.ceil(paginationCountData / take);
    }
  }, [take, paginationCountData]);

  return {
    communityName,
    communityMember,
    communityId,
    paginationCount,
    firstCommunityMember,
    secondCommunityMember,
  };
};
