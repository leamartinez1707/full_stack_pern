import { createBrowserRouter } from "react-router-dom"
import { Layout } from "./Layouts/Layout"
import { Products, productsLoader } from "./Views/Products"
import { NewProduct, action as newProductAction } from "./Views/NewProduct"
import { EditProduct } from "./Views/EditProduct"

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Products />,
                loader: productsLoader
            },
            {
                path: 'products/new',
                element: <NewProduct />,
                action: newProductAction
            },
            {
                path: 'products/:id/edit', // ROA pattern
                element: <EditProduct />
            }
        ]
    }
])
