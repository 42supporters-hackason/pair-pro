import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { IconButton } from ".";

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
