import React, { useState } from 'react';
import toast from 'react-hot-toast';

function Query() {
    const [name, setName] = useState('');
    const [yourQuery, setYourQuery] = useState('');

    const fromdata = { name, yourQuery };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch("/api/querydata", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(fromdata)
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.message) {
                toast.success(data.message);
            } else {
                toast.error("Query not sent");
            }
        })
        .catch((error) => {
            toast.error("An error occurred");
            console.error("Error:", error);
        });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-white">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h1 className="text-2xl font-bold text-center mb-6">Query Form</h1>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="name">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="query">
                        Your Query
                    </label>
                    <textarea
                        id="query"
                        value={yourQuery}
                        onChange={(e) => setYourQuery(e.target.value)}
                        className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        rows="4"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

export default Query;
