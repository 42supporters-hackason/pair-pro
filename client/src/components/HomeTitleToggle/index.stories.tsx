import { ComponentStory, ComponentMeta } from "@storybook/react";
import { HomeTitleToggle } from ".";

export default {
  title: "HomeTitleToggle",
  component: HomeTitleToggle,
} as ComponentMeta<typeof HomeTitleToggle>;

const Template: ComponentStory<typeof HomeTitleToggle> = (props) => (
  <HomeTitleToggle {...props} />
);
export const Default = Template.bind({});
