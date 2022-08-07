import { ComponentStory, ComponentMeta } from "@storybook/react";
import { UserItem } from ".";

export default {
  title: "UserItem",
  component: UserItem,
} as ComponentMeta<typeof UserItem>;

const Template: ComponentStory<typeof UserItem> = (props) => (
  <UserItem {...props} />
);

export const Default = Template.bind({});
