import { createBrowserRouter } from "react-router-dom"
import { Layout } from "./Layouts/Layout"
import { action as updateAvailabilityAction, Products, productsLoader } from "./Views/Products"
import { NewProduct, action as newProductAction } from "./Views/NewProduct"
import { EditProduct, loader as editProductLoader, action as EditProductAtion } from "./Views/EditProduct"
import { action as deleteProductAction } from "./components/ProductsDetails"

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Products />,
                loader: productsLoader,
                action: updateAvailabilityAction
            },
            {
                path: 'products/new',
                element: <NewProduct />,
                action: newProductAction
            },
            {
                path: 'products/:id/edit', // ROA pattern
                element: <EditProduct />,
                loader: editProductLoader,
                action: EditProductAtion
            },
            {
                path: 'products/:id/delete',
                action: deleteProductAction
            }

        ]
    }
])
