import { RefObject, useState } from "react";
import { useProfile } from "../../context/auth";
import {
  useFetchMeQuery,
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
export const useChatHooks = (
  roomId: string,
  ref: RefObject<HTMLDivElement>
) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const { profile } = useProfile();

  const { data: post } = useFetchSpecificPostQuery({
    variables: {
      id: roomId,
    },
  });

  const { data: meData } = useFetchMeQuery();
  const myGithubLogin = meData?.myProfile.user.githubLogin;

  const opponentGithubLogin =
    profile?.githubLogin === post?.post?.driver?.user.githubLogin
      ? post?.post?.navigator?.user.githubLogin
      : post?.post?.driver?.user.githubLogin;

  const opponentName =
    profile?.name === post?.post?.driver?.name
      ? post?.post?.navigator?.name
      : post?.post?.driver?.name;

  const { refetch: refetchMessages } = useFetchMessagesQuery({
    variables: {
      postId: roomId,
    },
    onCompleted: (data) => {
      const messages = data?.messagesByPostId.map(
        ({ content, createdBy, id }) => ({
          id,
          content,
          createdBy: createdBy.user.githubLogin,
        })
      );
      setMessages(messages);
    },
  });

  useFetchMessageSubscription({
    variables: {
      postId: roomId,
    },
    onSubscriptionData(data) {
      const message: Message | undefined | null = data.subscriptionData.data
        ?.waitForMessage && {
        id: data.subscriptionData.data.waitForMessage.id,
        content: data.subscriptionData.data.waitForMessage.content,
        createdBy:
          data.subscriptionData.data.waitForMessage.createdBy.user.githubLogin,
      };
      if (message !== undefined && message !== null) {
        setMessages((prevMessage) => {
          if (!prevMessage.find(({ id }) => id === message.id)) {
            prevMessage.push(message);
          }
          return prevMessage;
        });
      }
      setTimeout(() => ref.current?.scrollIntoView(), 10);
    },
  });
  return {
    messages,
    opponentGithubLogin,
    opponentName,
    myGithubLogin,
    refetchMessages,
  };
};
