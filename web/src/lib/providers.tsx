import {QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools/production";
import { NuqsAdapter } from 'nuqs/adapters/tanstack-router'
import { Toaster } from "@/components/ui/sonner";

export function Providers({ children }: { children: React.ReactNode }) {
    const queryClient = new QueryClient();
    return (
        <NuqsAdapter>
            <QueryClientProvider client={queryClient}>
                {children}
                <Toaster />
                {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
            </QueryClientProvider>
            {/* <Toaster /> */}
        </NuqsAdapter>
    );
}