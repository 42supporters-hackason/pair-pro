import { ComponentStory, ComponentMeta } from "@storybook/react";
import { BackButton } from ".";

export default {
  title: "BackButton",
  component: BackButton,
} as ComponentMeta<typeof BackButton>;

const Template: ComponentStory<typeof BackButton> = (props) => (
  <BackButton {...props}>aaaaaa</BackButton>
);

export const Default = Template.bind({});
