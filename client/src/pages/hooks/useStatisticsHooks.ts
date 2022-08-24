import {
  useFetchDrivenSkillsListQuery,
  useFetchDriverRankingQuery,
  useFetchNavigatedSkillsListQuery,
  useFetchNavigatorRankingQuery,
} from "../../gen/graphql-client";

/**
 * client/statisticsで使われるhooks
 */
export const useStatisticsHooks = () => {
  const { data: drivenSkillsList } = useFetchDrivenSkillsListQuery();
  const { data: navigatedSkillsList } = useFetchNavigatedSkillsListQuery();
  const { data: navigatorRankig } = useFetchNavigatorRankingQuery();
  const { data: driverRanking } = useFetchDriverRankingQuery();

  return {
    drivenSkillsList,
    driverRanking,
    navigatedSkillsList,
    navigatorRankig,
  };
};
