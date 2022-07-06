import { ComponentStory, ComponentMeta } from "@storybook/react";
import { AgreeModal } from ".";

export default {
  title: "AgreeModal",
  component: AgreeModal,
} as ComponentMeta<typeof AgreeModal>;

const Template: ComponentStory<typeof AgreeModal> = (props) => (
  <AgreeModal {...props} />
);

export const Default = Template.bind({});
