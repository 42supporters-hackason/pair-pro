import { ComponentStory, ComponentMeta } from "@storybook/react";
import { EnterButton } from ".";

export default {
  title: "EnterButton",
  component: EnterButton,
} as ComponentMeta<typeof EnterButton>;

const Template: ComponentStory<typeof EnterButton> = (props) => (
  <EnterButton {...props} />
);
export const Default = Template.bind({});
