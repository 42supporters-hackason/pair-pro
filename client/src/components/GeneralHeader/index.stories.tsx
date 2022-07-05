import { ComponentStory, ComponentMeta } from "@storybook/react";
import { GeneralHeader } from ".";

export default {
  title: "GeneralHeader",
  component: GeneralHeader,
} as ComponentMeta<typeof GeneralHeader>;

const Template: ComponentStory<typeof GeneralHeader> = () => <GeneralHeader />;

export const Default = Template.bind({});
