import { ThemeProvider } from "@mui/material/styles";
import { Story, StoryContext } from "@storybook/react";
import { theme } from "../theme";

/**
 * Storybookにthemeを反映させるためのProvider
 */
export const StorybookProvider = (Story: Story, context: StoryContext) => {
  return (
    <ThemeProvider theme={theme}>
      <Story {...context} />
    </ThemeProvider>
  );
};
