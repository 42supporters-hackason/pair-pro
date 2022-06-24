import { ProfileCard } from ".";
import { ComponentStory, ComponentMeta } from "@storybook/react";

export default {
  title: "ProfileCard",
  component: ProfileCard,
} as ComponentMeta<typeof ProfileCard>;

const Template: ComponentStory<typeof ProfileCard> = (props) => (
  <ProfileCard {...props} />
);

export const Default = Template.bind({});
