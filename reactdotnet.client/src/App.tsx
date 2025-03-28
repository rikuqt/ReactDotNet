import "./App.css";
import SubmitForm from "./components/SubmitForm";
import PersonList from "./components/PersonList";
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
          <PersonList/>
      </QueryClientProvider>
      <SubmitForm />
      
    </div>
  );
}
