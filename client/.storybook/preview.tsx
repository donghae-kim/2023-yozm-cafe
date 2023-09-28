import type { Preview } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { AuthProvider } from '../src/context/AuthContext';
import GlobalStyle from '../src/styles/GlobalStyle';
import ResetStyle from '../src/styles/ResetStyle';
import theme from '../src/styles/theme';

const customViewports = {
  Default: {
    name: 'Default',
    styles: {
      width: '390px',
      height: '844px',
    },
  },
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    viewport: {
      viewports: { ...customViewports },
      defaultViewport: 'Default',
    },
  },

  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <ResetStyle />
          <GlobalStyle />
          <AuthProvider>
            <MemoryRouter initialEntries={['/']}>
              <Story />
            </MemoryRouter>
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    ),
  ],
};

export default preview;
