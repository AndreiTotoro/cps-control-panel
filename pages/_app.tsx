import {
  ChakraBaseProvider,
  ChakraProvider,
  extendTheme,
} from "@chakra-ui/react";
import type { AppProps } from "next/app";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        color: "white",
        backgroundColor: "black", // Set the default background color
        margin: 0,
        padding: 0,
        fontFamily: "sans-serif",
      },
    },
  },
  // Your other Chakra UI theme settings go here
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
