import { ComponentStory, ComponentMeta } from "@storybook/react";
import { TitleToggle } from ".";

export default {
  title: "TitleToggle",
  component: TitleToggle,
} as ComponentMeta<typeof TitleToggle>;

const Template: ComponentStory<typeof TitleToggle> = (props) => (
  <TitleToggle {...props} />
);
export const Default = Template.bind({});
