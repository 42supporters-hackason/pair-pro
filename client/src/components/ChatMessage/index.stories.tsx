import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ChatMessage } from ".";

export default {
  title: "ChatMessage",
  component: ChatMessage,
} as ComponentMeta<typeof ChatMessage>;

const Template: ComponentStory<typeof ChatMessage> = (props) => (
  <ChatMessage {...props} />
);
export const Default = Template.bind({});
