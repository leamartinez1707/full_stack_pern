import { Link, Form, ActionFunctionArgs, redirect } from "react-router-dom"
import { Product } from "../types"
import { formatCurrency } from "../utils"
import { deleteProduct } from "../services/ProductService"

type ProductDetailProps = {
    product: Product
}

export const action = async ({ params }: ActionFunctionArgs) => {
    if (params.id !== undefined) {
        await deleteProduct(+params.id)
    }
    return redirect('/')
}
export const ProductsDetails = ({ product }: ProductDetailProps) => {

    const isAvailable = product.availability ? 'Disponible' : 'No disponible'
    return (
        <tr className="border-b">
            <td className="p-3 text-lg text-gray-800">{product.name}</td>
            <td className="p-3 text-lg text-gray-800">{formatCurrency(product.price)}</td>
            <td className="p-3 text-lg text-gray-800">{isAvailable}</td>
            <td className="p-3 text-lg text-gray-800">
                <div className="flex gap-2 items-center">
                    <Link className="bg-indigo-600 hover:bg-indigo-800 duration-200 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center"
                        to={`/products/${product.id}/edit`}
                        state={product}>
                        Editar
                    </Link>

                    <Form className="w-full"
                        method="POST"
                        action={`products/${product.id}/delete`}
                        onSubmit={(e) => {
                            if (!confirm('Eliminar?')) {
                                e.preventDefault()
                            }
                        }

                        }
                    >
                        <input type="submit" value={'Eliminar'}
                            className="bg-red-600 hover:bg-red-800 duration-200 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center"
                        />
                    </Form>

                </div>
            </td>
        </tr >
    )
}
