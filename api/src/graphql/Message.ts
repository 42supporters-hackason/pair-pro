import { Message } from "@prisma/client";
import {
  extendType,
  intArg,
  nonNull,
  objectType,
  stringArg,
  subscriptionType,
} from "nexus";
import { User, Post } from "@prisma/client";

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
    // TODO createdAt
    t.nonNull.string("content");
    t.nonNull.field("createdBy", {
      type: "User",
      // todo: Link's postedBy is nullable in tutorial
      async resolve(parent, args, context) {
        return (await context.prisma.message
          .findUnique({
            where: { id: parent.id },
          })
          .createdBy()) as User;
      },
    });
  },
});

export const MessageQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("messagesByPostId", {
      type: "Message",
      args: {
        postId: nonNull(intArg()),
      },
      async resolve(parent, args, context) {
        const { postId } = args;
        return await context.prisma.message.findMany({
          where: { postId },
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
        postId: nonNull(intArg()),
        content: nonNull(stringArg()),
      },
      async resolve(parent, args, context) {
        const { postId, content } = args;
        const { userId } = context;

        if (!userId) {
          throw new Error("You have to log in.");
        }

        const newMessage = await context.prisma.message.create({
          data: {
            post: {
              connect: { id: postId },
            },
            content,
            createdBy: {
              connect: { id: userId },
            },
          },
        });
        // todo: is 'await' necessary? (https://codesandbox.io/s/nexus-example-subscriptions-59kdb?file=/src/schema/index.ts)
        await context.pubsub.publish(postId.toString(), newMessage);
        return newMessage;
      },
    });
  },
});

export const MessageSubscription = subscriptionType({
  definition(t) {
    // todo: should it be non-nullable?
    t.field("waitForMessage", {
      type: "Message",
      args: {
        postId: nonNull(intArg()),
      },
      subscribe(parent, args, context) {
        const { postId } = args;
        return context.pubsub.asyncIterator(postId.toString());
      },
      async resolve(messagePromise: Promise<Message>) {
        return await messagePromise;
      },
    });
  },
});
