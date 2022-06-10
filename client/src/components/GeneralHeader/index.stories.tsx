import { GeneralHeader } from ".";
import { ComponentStory, ComponentMeta } from "@storybook/react";

export default {
  title: "GeneralHeader",
  component: GeneralHeader,
} as ComponentMeta<typeof GeneralHeader>;

const Template: ComponentStory<typeof GeneralHeader> = () => <GeneralHeader />;

export const Default = Template.bind({});
