import {
  useFetchDrivenSkillsListQuery,
  useFetchDriverRankingQuery,
  useFetchNavigatedSkillsListQuery,
  useFetchNavigatorRankingQuery,
  useFetchPopularSkillsListQuery,
} from "../../gen/graphql-client";

/**
 * client/statisticsで使われるhooks
 */
export const useStatisticsHooks = () => {
  const { data: drivenSkillsList } = useFetchDrivenSkillsListQuery();
  const { data: navigatedSkillsList } = useFetchNavigatedSkillsListQuery();
  const { data: navigatorRankig } = useFetchNavigatorRankingQuery();
  const { data: driverRanking } = useFetchDriverRankingQuery();
  const { data: popularSkillsList } = useFetchPopularSkillsListQuery();

  return {
    drivenSkillsList,
    driverRanking,
    navigatedSkillsList,
    navigatorRankig,
    popularSkillsList,
  };
};
