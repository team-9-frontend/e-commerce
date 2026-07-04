import { ThemeProvider as NextThemesProvider } from "next-themes";

export default function Themeprovider({ children }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      forcedTheme={undefined}
      enableSystem={false}
      disableTransitionOnChange={false}
    >
      {children}
    </NextThemesProvider>
  );
}
