import { Card } from ".";
import { ComponentStory, ComponentMeta } from "@storybook/react";

export default {
  title: "Card",
  component: Card,
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (props) => (
  <Card {...props}>aaaaaaa</Card>
);

export const Default = Template.bind({});
