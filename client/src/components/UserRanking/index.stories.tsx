import { ComponentStory, ComponentMeta } from "@storybook/react";
import { UserRanking } from ".";

export default {
  title: "UserRanking",
  component: UserRanking,
} as ComponentMeta<typeof UserRanking>;

const Template: ComponentStory<typeof UserRanking> = (props) => (
  <UserRanking {...props} />
);

export const Default = Template.bind({});
