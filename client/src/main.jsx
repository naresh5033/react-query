import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 1000 * 60 * 5 } }, //the default state/ behaviou is the stale state, and its 1ms, and we caa change it to 5mins. - means we don't want our data to go in stale, until its been in our cache for 5 mins.
})

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* wrap the app with the query client provider */}
    <QueryClientProvider client={queryClient}> 
      <App />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>
)
