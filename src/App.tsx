import './App.css'
import DemoForm from "./components/Form";
import {QueryClient, QueryClientProvider} from "react-query";

function App() {
    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            <DemoForm/>
        </QueryClientProvider>
    )
}

export default App
