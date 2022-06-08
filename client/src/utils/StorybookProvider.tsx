import { Story, StoryContext } from "@storybook/react";
import { ThemeProvider } from "styled-components";
import generateThemes from "../theme";

/**
 * Storybookにthemeを反映させるためのProvider
 */
export const StorybookProvider = (Story: Story, context: StoryContext) => {
  const { lightTheme } = generateThemes();
  return (
    <ThemeProvider theme={lightTheme}>
      <Story {...context} />
    </ThemeProvider>
  );
};
