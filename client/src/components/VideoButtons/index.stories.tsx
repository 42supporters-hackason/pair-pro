import { ComponentStory, ComponentMeta } from "@storybook/react";
import { VideoButtons } from ".";

export default {
  title: "VideoButtons",
  component: VideoButtons,
} as ComponentMeta<typeof VideoButtons>;

const Template: ComponentStory<typeof VideoButtons> = (props) => (
  <VideoButtons {...props} />
);

export const Default = Template.bind({});
