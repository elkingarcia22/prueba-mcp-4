import type { Preview } from '@storybook/nextjs-vite';
import { ChakraProvider } from '../src/components/ChakraProvider';
import '../src/styles/tokens.light.css';
import '../src/styles/tokens.dark.css';

export const decorators = [
  (Story) => (
    <ChakraProvider>
      <Story />
    </ChakraProvider>
  )
];

const preview: Preview = {
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    a11y: { config: { rules: [{ id: 'color-contrast', enabled: true }] } }
  }
};

export default preview;