import { ComponentStory, ComponentMeta } from "@storybook/react";
import { CopyInput } from ".";

export default {
  title: "CopyInput",
  component: CopyInput,
} as ComponentMeta<typeof CopyInput>;

const Template: ComponentStory<typeof CopyInput> = (props) => (
  <CopyInput {...props} />
);

export const Default = Template.bind({});
