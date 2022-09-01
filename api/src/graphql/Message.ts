import { Message } from "@prisma/client";
import {
  extendType,
  intArg,
  nonNull,
  objectType,
  stringArg,
  subscriptionType,
} from "nexus";
import { Profile, Post } from "@prisma/client";

export const MessageObject = objectType({
  name: "Message",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.field("post", {
      type: "Post",
      async resolve(parent, args, context) {
        return (await context.prisma.message
          .findUnique({
            where: { id: parent.id },
          })
          .post()) as Post;
      },
    });
    t.nonNull.dateTime("createdAt");
    t.nonNull.string("content");
    t.nonNull.field("createdBy", {
      type: "Profile",
      // todo: Link's postedBy is nullable in tutorial
      async resolve(parent, args, context) {
        return (await context.prisma.message
          .findUnique({
            where: { id: parent.id },
          })
          .createdBy()) as Profile;
      },
    });
    t.nonNull.boolean("isRead");
  },
});

export const MessageQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("messagesByPostId", {
      type: "Message",
      args: {
        postId: nonNull(stringArg()),
      },
      async resolve(parent, args, context) {
        const { postId } = args;
        const { profileId } = context.expectUserJoinedCommunity();
        const post = await context.prisma.post.findUnique({
          where: { id: postId },
        });
        if (!post) {
          throw new Error("post doesn't exist");
        }
        validateOwnership(profileId, post);

        return await context.prisma.message.findMany({
          where: { postId },
          orderBy: { id: "asc" },
        });
      },
    });
  },
});

export const MessageMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createMessage", {
      type: "Message",
      args: {
        postId: nonNull(stringArg()),
        content: nonNull(stringArg()),
      },
      async resolve(parent, args, context) {
        const { postId, content } = args;
        const { profileId } = context.expectUserJoinedCommunity();

        const post = await context.prisma.post.findUnique({
          where: { id: postId },
        });
        if (!post) {
          throw new Error("post doesn't exist");
        }
        validateOwnership(profileId, post);

        const newMessage = await context.prisma.message.create({
          data: {
            post: {
              connect: { id: postId },
            },
            content,
            createdBy: {
              connect: { id: profileId },
            },
          },
        });
        const opponentId = (
          post.driverId == profileId ? post.navigatorId : post.driverId
        ) as number;

        // todo: is 'await' necessary? (https://codesandbox.io/s/nexus-example-subscriptions-59kdb?file=/src/schema/index.ts)
        await context.pubsub.publish(postId.toString(), newMessage);
        await context.pubsub.publish(
          "messageNotification:" + opponentId.toString(),
          post
        );
        return newMessage;
      },
    });

    t.nonNull.list.nonNull.field("markMessagesAsRead", {
      type: "Message",
      args: {
        postId: nonNull(stringArg()),
      },
      async resolve(parent, args, context) {
        const { postId } = args;
        const { profileId } = context.expectUserJoinedCommunity();
        const post = await context.prisma.post.findUnique({
          where: { id: postId },
        });
        if (!post) {
          throw new Error("post doesn't exist");
        }
        validateOwnership(profileId, post);

        const where = { postId, createdById: { not: profileId } };
        await context.prisma.message.updateMany({
          where,
          data: {
            isRead: true,
          },
        });
        return await context.prisma.message.findMany({
          where,
        });
      },
    });
  },
});

export const MessageSubscription = subscriptionType({
  definition(t) {
    // todo: should it be non-nullable?
    t.nonNull.field("waitForMessage", {
      type: "Message",
      args: {
        postId: nonNull(stringArg()),
      },
      async subscribe(parent, args, context) {
        const { postId } = args;
        const { profileId } = context.expectUserJoinedCommunity();
        const post = await context.prisma.post.findUnique({
          where: { id: postId },
        });
        if (!post) {
          throw new Error("post doesn't exist");
        }
        validateOwnership(profileId, post);

        return context.pubsub.asyncIterator(postId);
      },
      async resolve(messagePromise: Promise<Message>) {
        return await messagePromise;
      },
    });

    t.nonNull.field("waitForMessageNotification", {
      type: "Post",
      subscribe(parent, args, context) {
        const { profileId } = context.expectUserJoinedCommunity();
        return context.pubsub.asyncIterator(
          "messageNotification:" + profileId.toString()
        );
      },
      async resolve(postPromise: Promise<Post>) {
        return await postPromise;
      },
    });
  },
});

const validateOwnership = (profileId: number, post: Post) => {
  if (profileId != post.driverId && profileId != post.navigatorId) {
    throw new Error("no right to see messages");
  }
};
