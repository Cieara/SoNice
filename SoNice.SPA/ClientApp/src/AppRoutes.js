import ApiAuthorzationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import FrontPage from './pages/FrontPage/FrontPage';
import  Products  from "./pages/Products/Products";
import ProductDetailViewPage from './pages/Product/ProductDetailViewPage';
import Checkout from './pages/Checkout/Index';


const AppRoutes = [
    {
        index: true,
        element: <FrontPage />
    },
    {
        path: '/products',
        element: <Products />
    },
    {
        path: '/productdetail/:slug',
        element: <ProductDetailViewPage />
    },
    {
        path: '/checkout',
        element: <Checkout/>
    },
    ...ApiAuthorzationRoutes
];

export default AppRoutes;
