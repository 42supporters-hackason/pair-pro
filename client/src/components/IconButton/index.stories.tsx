import { IconButton } from ".";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

export default {
  title: "IconButton",
  component: IconButton,
} as ComponentMeta<typeof IconButton>;

const Template: ComponentStory<typeof IconButton> = (props) => (
  <IconButton {...props}>
    <VolumeUpIcon />
  </IconButton>
);

export const Default = Template.bind({});
