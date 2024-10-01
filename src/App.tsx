import '@mantine/core/styles.css';

import { ApolloProvider } from '@apollo/client';
import { MantineProvider } from '@mantine/core';
import { client } from './apolloClient';
import { Router } from './Router';
import { theme } from './theme';

export default function App() {
  return (
    <ApolloProvider client={client}>
      <MantineProvider theme={theme}>
        <Router />
      </MantineProvider>
    </ApolloProvider>
  );
}
