import { ComponentStory, ComponentMeta } from "@storybook/react";
import { FormDataModal } from ".";

export default {
  title: "FormDataModal",
  component: FormDataModal,
} as ComponentMeta<typeof FormDataModal>;

const Template: ComponentStory<typeof FormDataModal> = (props) => (
  <FormDataModal {...props} />
);
export const Default = Template.bind({});
