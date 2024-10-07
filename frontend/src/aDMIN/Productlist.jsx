import Left from "./Left";
import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';

function ProductList() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [rating, setRating] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false); 
    const [image, setImage] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);

        // Input validation
        if (price <= 0) {
            toast.error("Price must be greater than 0");
            setIsSubmitting(false);
            return;
        }
        
        if (rating < 1 || rating > 5) {
            toast.error("Rating must be between 1 and 5");
            setIsSubmitting(false);
            return;
        }

        const productData = new FormData();
        productData.append("title", title);
        productData.append("description", description);
        productData.append("price", price);
        productData.append("rating", rating);
        productData.append("imgUp", image);

        // Using toast.promise to streamline notifications
        try {
            await toast.promise(
                fetch("/api/adminProduct", {
                    method: "POST",
                    body: productData,
                }),
                {
                    loading: 'Sending data...',
                    success: 'Product added successfully!',
                    error: 'Failed to add product.',
                }
            );
            // Clear the form after successful submission
            setTitle('');
            setDescription('');
            setPrice('');
            setRating('');
            setImage(null);
        } catch (error) {
            toast.error("An error occurred: " + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col w-11/12 mx-auto mt-4">
            <Left />
            <div className="bg-gradient-to-r from-blue-100 to-blue-200 shadow-lg rounded-lg p-8 mt-4">
                <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Product List</h1>

                <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
                    <div>
                        <label htmlFor="title" className="block text-lg font-medium text-gray-700">Product Title</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            placeholder="Enter product title"
                            className="mt-2 block w-full border border-gray-300 rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                        />
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-lg font-medium text-gray-700">Product Description</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            placeholder="Describe the product"
                            className="mt-2 block w-full border border-gray-300 rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                        />
                    </div>
                    <div className="flex space-x-4">
                        <div className="flex-1">
                            <label htmlFor="price" className="block text-lg font-medium text-gray-700">Product Price</label>
                            <input
                                type="number"
                                id="price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                required
                                placeholder="Enter price"
                                className="mt-2 block w-full border border-gray-300 rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                            />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="rating" className="block text-lg font-medium text-gray-700">Product Rating</label>
                            <input
                                type="number"
                                id="rating"
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                                min="1"
                                max="5"
                                required
                                placeholder="1-5"
                                className="mt-2 block w-full border border-gray-300 rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                            />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="image" className="block text-lg font-medium text-gray-700">Product Image</label>
                            <input
                                type="file"
                                id="image"
                                accept="image/*"
                                required
                                className="mt-2 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                                onChange={(e) => setImage(e.target.files[0])}
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className={`w-full bg-blue-600 text-white font-bold py-4 rounded-md hover:bg-blue-700 transition duration-300 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Adding..." : "Add Product"}
                    </button>
                </form>
            </div>
            <Toaster /> {/* Toast notifications */}
        </div>
    );
}

export default ProductList;
