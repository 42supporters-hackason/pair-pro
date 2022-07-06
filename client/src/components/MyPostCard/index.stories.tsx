import { ComponentStory, ComponentMeta } from "@storybook/react";
import { MyPostCard } from ".";

export default {
  title: "MyPostCard",
  component: MyPostCard,
} as ComponentMeta<typeof MyPostCard>;

const Template: ComponentStory<typeof MyPostCard> = (props) => (
  <MyPostCard {...props} />
);
export const Default = Template.bind({});
