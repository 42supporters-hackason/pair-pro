import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ProfileCard } from ".";

export default {
  title: "ProfileCard",
  component: ProfileCard,
} as ComponentMeta<typeof ProfileCard>;

const Template: ComponentStory<typeof ProfileCard> = (props) => (
  <ProfileCard {...props} />
);

export const Default = Template.bind({});
