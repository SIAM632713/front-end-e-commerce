import React, {useState} from "react";
import {useAllProductsQuery, useDeleteProductMutation} from "../../redux/feature/Product/productAPI.js";
import Loading from "../../component/loading/Loading.jsx";
import {Link} from "react-router-dom";
import {confirmDelete, showError, showSuccess} from "../../utilis/sweetAlertHelper.js";

const ManageProduct = () => {

    const {data,error,isLoading,refetch}=useAllProductsQuery()
    const [DeleteProduct]=useDeleteProductMutation()

    const [currentPage,setCurrentPage]=useState(1);
    const ProductperPage=15;

    if (isLoading) return (
        <div className="flex justify-center mt-10">
            <Loading />
        </div>
    );

    const productData= data?.data || []


    const HandleDeleteProduct=async (id) => {
        const result=await confirmDelete()
        if(result.isConfirmed){
            try {
               await DeleteProduct(id).unwrap()
               await showSuccess("Product deleted successfully!")
              await refetch()
            }catch(err){
                console.log(err)
                showError("Failed to delete product")
            }
        }
    }

    const indexOfLastProduct=currentPage * ProductperPage
    const indexOfFirstProduts=indexOfLastProduct - ProductperPage
    const currerentProducts= productData.slice(indexOfFirstProduts,indexOfLastProduct)
    const totalPages=Math.ceil(productData.length/ProductperPage)


    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const HandlecurrerentPage=(pageNumber)=>{
        if(pageNumber > 0 && pageNumber <= totalPages){
            setCurrentPage(pageNumber)
        }
    }

    return (
        <div className="font-sans">
            <h2 className="text-xl font-semibold mb-2">All Products</h2>
            <p className="mb-4">
                Showing {indexOfFirstProduts + 1} to {productData.length} of {productData.length} products
            </p>
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 text-sm">
                    <thead className="bg-gray-100 text-left">
                    <tr>
                        <th className="p-3 border">NO.</th>
                        <th className="p-3 border">PRODUCT NAME</th>
                        <th className="p-3 border">PUBLISHING DATE</th>
                        <th className="p-3 border">EDIT OR MANAGE</th>
                        <th className="p-3 border">DELETE</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currerentProducts.map((item, index) => (
                        <tr key={index} className="border-b">
                            <td className="p-3 border">{index + 1}</td>
                            <td className="p-3 border font-semibold">{item.name}</td>
                            <td className="p-3 border text-gray-600">{new Date(item.createdAt).toLocaleDateString()}</td>
                            <td className="p-3 border text-blue-600 cursor-pointer"><Link to={`/dashboard/update-product/${item?._id}`}>Edit</Link></td>
                            <td className="p-3 border">
                                <button onClick={() => HandleDeleteProduct(item?._id)}
                                        className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded cursor-pointer">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {
                currerentProducts.length > 0 && (
                    <div className="text-center mt-8 space-x-2">
                        <button
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                            className={`px-4 py-2 rounded-md border text-sm font-medium ${
                                currentPage === 1
                                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                    : "bg-white text-gray-700 hover:bg-gray-100"
                            }`}
                        >
                            Previous
                        </button>

                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                onClick={() => HandlecurrerentPage(index + 1)}
                                key={index}
                                className={`px-3 py-2 rounded-md border text-sm font-medium ${
                                    currentPage === index + 1
                                        ? "bg-blue-500 text-white"
                                        : "bg-white text-gray-700 hover:bg-gray-100"
                                }`}
                            >
                                {index + 1}
                            </button>
                        ))}

                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                            className={`px-4 py-2 rounded-md border text-sm font-medium ${
                                currentPage === totalPages
                                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                    : "bg-white text-gray-700 hover:bg-gray-100"
                            }`}
                        >
                            Next
                        </button>
                    </div>
                )
            }
        </div>
    );
};

export default ManageProduct;
