import { BrowserRouter } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import AppRoutes from './routes/AppRoutes';
import ProductFormPage from "./pages/ProductFormPage";
function App() {
return (
<BrowserRouter>
<AppLayout>
<AppRoutes />
</AppLayout>
</BrowserRouter>
);
}
export default App;