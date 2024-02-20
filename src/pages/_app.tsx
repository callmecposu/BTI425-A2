import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Header from "@/components/header";
import { HistoryProvider } from "@/contexts/historyContext";
import { SearchProvider } from "@/contexts/searchContext";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <HistoryProvider>
            <SearchProvider>
                <Header></Header>
                <Component {...pageProps} />
            </SearchProvider>
        </HistoryProvider>
    );
}
