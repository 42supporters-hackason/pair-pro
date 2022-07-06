import { ComponentStory, ComponentMeta } from "@storybook/react";
import { GithubProfile } from ".";

export default {
  title: "GithubProfile",
  component: GithubProfile,
} as ComponentMeta<typeof GithubProfile>;

const Template: ComponentStory<typeof GithubProfile> = (props) => (
  <GithubProfile {...props} />
);
export const Default = Template.bind({});
