import { useCallback } from "react";
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
  const { data: drivenSkillsList, refetch: refetchdrivenSkillsList } =
    useFetchDrivenSkillsListQuery();
  const { data: navigatedSkillsList, refetch: refetchnavigatedSkillsList } =
    useFetchNavigatedSkillsListQuery();
  const { data: navigatorRankig, refetch: refetchnavigatorRankig } =
    useFetchNavigatorRankingQuery();
  const { data: driverRanking, refetch: refetchdriverRanking } =
    useFetchDriverRankingQuery();
  const { data: popularSkillsList, refetch: refetchpopularSkillsList } =
    useFetchPopularSkillsListQuery();

  const refetchRankings = useCallback(() => {
    refetchdrivenSkillsList();
    refetchnavigatedSkillsList();
    refetchnavigatorRankig();
    refetchdriverRanking();
    refetchpopularSkillsList();
  }, [
    refetchdrivenSkillsList,
    refetchnavigatedSkillsList,
    refetchnavigatorRankig,
    refetchdriverRanking,
    refetchpopularSkillsList,
  ]);

  return {
    drivenSkillsList,
    driverRanking,
    navigatedSkillsList,
    navigatorRankig,
    popularSkillsList,
    refetchRankings,
  };
};
