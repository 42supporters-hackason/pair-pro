import { ComponentStory, ComponentMeta } from "@storybook/react";
import { LanguageItem } from ".";

export default {
  title: "LanguageItem",
  component: LanguageItem,
} as ComponentMeta<typeof LanguageItem>;

const Template: ComponentStory<typeof LanguageItem> = (props) => (
  <LanguageItem {...props} />
);

export const Default = Template.bind({});
