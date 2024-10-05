import { Link, useLoaderData } from "react-router-dom"
import { getProducts } from "../services/ProductService"
import { ProductsDetails } from "../components/ProductsDetails"
import { Product } from "../types"


export const productsLoader = async () => {
    const products = await getProducts()
    return products
}
export const Products = () => {

    const productsLoaded = useLoaderData() as Product[]
    return (
        <>
            <div className="flex justify-between">
                <h2 className="text-4xl font-black text-slate-500">Productos</h2>
                <Link className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500 duration-500 transition-colors" to={'/products/new'}>
                    Agregar productos</Link>
            </div>
            <div className="p-2">
                <table className="w-full mt-5 table-auto">
                    <thead className="bg-slate-800 text-white">
                        <tr>
                            <th className="p-2">Productos</th>
                            <th className="p-2">Precio</th>
                            <th className="p-2">Disponibilidad</th>
                            <th className="p-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productsLoaded.length > 0 && productsLoaded.map((product) => (
                            <ProductsDetails
                                key={product.id}
                                product={product}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
