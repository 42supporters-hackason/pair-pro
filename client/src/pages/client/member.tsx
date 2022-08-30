import React, { useCallback, useEffect, useState } from "react";
import { Pagination, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { BackButton } from "../../components/BackButton";
import { CopyInput } from "../../components/CopyInput";
import { UserItem } from "../../components/UserItem";
import { useClientRoute } from "../../hooks/useClientRoute";
import { useMemberHooks } from "../hooks/useMemberHooks";

const TAKE_PAGINATION = 6;
const DEFAULT_PAGE_NUMBER = 1;

/**
 * client/member
 */
export const MemberPage = () => {
  const [pagination, setPagination] = useState(DEFAULT_PAGE_NUMBER);
  const {
    communityName,
    communityId,
    paginationCount,
    firstCommunityMember,
    secondCommunityMember,
    refetchCurrentCommunity,
  } = useMemberHooks({
    take: TAKE_PAGINATION,
    skip: pagination !== 0 ? (pagination - 1) * TAKE_PAGINATION : 0,
  });

  const { goToHome } = useClientRoute();

  const handleChangePagination = useCallback(
    (event: React.ChangeEvent<unknown>, value: number) => {
      setPagination(value);
    },
    [setPagination]
  );

  useEffect(() => {
    refetchCurrentCommunity();
  }, [refetchCurrentCommunity]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: "30px",
        gap: 2,
        minHeight: "calc(100vh - 150px)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 3,
          alignItems: "center",
          width: "60%",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          {communityName}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography fontWeight="bold">招待コード</Typography>
          <CopyInput value={communityId ?? ""} />
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: 3,
        }}
      >
        <Box
          sx={{
            width: "40%",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {firstCommunityMember &&
            firstCommunityMember.map(({ id, name, user, bio }) => (
              <UserItem
                key={id}
                name={name}
                githubLogin={user.githubLogin}
                bio={bio}
              />
            ))}
        </Box>
        <Box
          sx={{
            width: "40%",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {secondCommunityMember &&
            secondCommunityMember.map(({ id, name, user, bio }) => (
              <UserItem
                key={id}
                name={name}
                githubLogin={user.githubLogin}
                bio={bio}
              />
            ))}
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: "auto",
          mb: 2,
          gap: 3,
        }}
      >
        <Pagination
          color="primary"
          size="large"
          page={pagination}
          count={paginationCount}
          defaultPage={DEFAULT_PAGE_NUMBER + 1}
          onChange={handleChangePagination}
        />
        <BackButton style={{ width: "350px" }} onClick={() => goToHome()}>
          ホームに戻る
        </BackButton>
      </Box>
    </Box>
  );
};
