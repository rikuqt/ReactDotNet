import "./App.css";
import SubmitForm from "./components/SubmitForm";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

// Tanstack queryclient
const queryClient = new QueryClient()

export default function App() {

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
          <SubmitForm />
      </QueryClientProvider>
    </div>
  );
}
