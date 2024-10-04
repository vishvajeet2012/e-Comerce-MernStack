import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast'; 
import Left from './Left';

function ProductList() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [rating, setRating] = useState('');
    const [image, setImage] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);

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

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('rating', rating);
        if (image) formData.append('image', image);

        try {
            toast.loading("Sending data...");
            const response = await fetch("/api/adminProduct", {
                method: "POST",
                body: formData
            });

            if (response.ok) {
                toast.dismiss();
                toast.success("Product added successfully!");
                setTitle('');
                setDescription('');
                setPrice('');
                setRating('');
                setImage(null);
            } else {
                const errorData = await response.json();
                toast.dismiss();
                toast.error(errorData.message || "Failed to add product.");
            }
        } catch (error) {
            toast.dismiss();
            toast.error("An error occurred: " + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col w-full mx-auto mt-6 px-6 lg:px-8">
            <Left />
            <div className="bg-white shadow-lg rounded-lg p-8 mt-8 max-w-3xl mx-auto">
                <h1 className="text-4xl font-extrabold text-center text-blue-800 mb-10">Add New Product</h1>

                <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
                    <div>
                        <label htmlFor="title" className="block text-xl font-semibold text-gray-800">Product Title</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            placeholder="Enter product title"
                            className="mt-2 block w-full border border-gray-300 rounded-lg py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                        />
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-xl font-semibold text-gray-800">Product Description</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            placeholder="Describe the product"
                            className="mt-2 block w-full border border-gray-300 rounded-lg py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="price" className="block text-xl font-semibold text-gray-800">Product Price</label>
                            <input
                                type="number"
                                id="price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                required
                                placeholder="Enter price"
                                className="mt-2 block w-full border border-gray-300 rounded-lg py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                            />
                        </div>
                        <div>
                            <label htmlFor="rating" className="block text-xl font-semibold text-gray-800">Product Rating</label>
                            <input
                                type="number"
                                id="rating"
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                                min="1"
                                max="5"
                                required
                                placeholder="1-5"
                                className="mt-2 block w-full border border-gray-300 rounded-lg py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="image" className="block text-xl font-semibold text-gray-800">Upload Image</label>
                        <input
                            type="file"
                            id="image"
                            onChange={(e) => setImage(e.target.files[0])}
                            accept="image/*"
                            className="mt-2 block w-full border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                        />
                    </div>
                    <button
                        type="submit"
                        className={`w-full bg-blue-600 text-white font-bold py-4 rounded-lg hover:bg-blue-700 transition duration-300 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Adding..." : "Add Product"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ProductList;
