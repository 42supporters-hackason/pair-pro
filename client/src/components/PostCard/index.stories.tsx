import { ComponentStory, ComponentMeta } from "@storybook/react";
import { PostCard } from ".";

export default {
  title: "PostCard",
  component: PostCard,
} as ComponentMeta<typeof PostCard>;

const Template: ComponentStory<typeof PostCard> = (props) => (
  <PostCard {...props} />
);

export const Default = Template.bind({});
