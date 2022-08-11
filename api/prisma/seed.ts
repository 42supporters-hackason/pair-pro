import { languagesObject } from "../src/utils";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

(async () => {
  await prisma.skill.createMany({
    data: languagesObject,
  });
  await prisma.user.createMany({
    data: [
      {
        githubId: "githubId1",
        githubLogin: "githubLogin1",
        githubBio: "githubBio1",
      },
      {
        githubId: "githubId2",
        githubLogin: "githubLogin2",
        githubBio: "githubBio2",
      },
    ],
  });
  await prisma.community.createMany({
    data: [
      {
        id: "communityId1",
        name: "community1",
      },
      {
        id: "communityId2",
        name: "community2",
      },
    ],
  });
  await prisma.profile.createMany({
    data: [
      {
        name: "user1_profile1",
        matchingPoint: 3,
        bio: "user1_profileBio1",
        communityId: "communityId1",
        userId: 1,
      },
      {
        name: "user1_profile2",
        matchingPoint: 3,
        bio: "user1_profileBio2",
        communityId: "communityId2",
        userId: 1,
      },
      {
        name: "user2_profile1",
        matchingPoint: 3,
        bio: "user2_profileBio1",
        communityId: "communityId1",
        userId: 2,
      },
      {
        name: "user2_profile2",
        matchingPoint: 3,
        bio: "user2_profileBio2",
        communityId: "communityId2",
        userId: 2,
      },
    ],
  });
  await prisma.post.createMany({
    data: [
      {
        title: "user1_profile1_post1",
        description: "user1_profile1_postDescription1",
        driverId: 1,
        navigatorId: 3
      },
      {
        title: "user2_profile2_post1",
        description: "user2_profile2_postDescription1",
        driverId: 2,
      },
      {
        title: "user2_profile2_post2",
        description: "user2_profile2_postDescription2",
        driverId: 2,
      },
    ],
  });
})();
