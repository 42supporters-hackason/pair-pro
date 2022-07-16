import { useState } from "react";
import {
  useFetchMessagesQuery,
  useFetchMessageSubscription,
  useFetchSpecificPostQuery,
} from "../../gen/graphql-client";

interface Message {
  id: number;
  content: string;
  createdBy: string;
}

/**
 * client/chatで使用されるhooks
 */
export const useChatHooks = (roomId: number) => {
  const [messages, setMessages] = useState<Message[]>([]);

  const { data: post } = useFetchSpecificPostQuery({
    variables: {
      id: Number(roomId),
    },
  });

  useFetchMessagesQuery({
    variables: {
      postId: Number(roomId),
    },
    onCompleted: (data) => {
      const messages = data?.messagesByPostId.map(
        ({ content, createdBy, id }) => ({
          id,
          content,
          createdBy: createdBy.githubLogin,
        })
      );
      setMessages(messages);
    },
  });

  useFetchMessageSubscription({
    variables: {
      postId: Number(roomId),
    },
    onSubscriptionData(data) {
      const message: Message | undefined | null = data.subscriptionData.data
        ?.waitForMessage && {
        id: data.subscriptionData.data.waitForMessage.id,
        content: data.subscriptionData.data.waitForMessage.content,
        createdBy:
          data.subscriptionData.data.waitForMessage.createdBy.githubLogin,
      };
      if (message !== undefined && message !== null) {
        setMessages((prevMessage) => {
          if (!prevMessage.find(({ id }) => id === message.id)) {
            prevMessage.push(message);
          }
          return prevMessage;
        });
      }
    },
  });
  return { messages, post };
};
