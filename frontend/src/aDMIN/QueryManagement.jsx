import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

function QueryManagement() {
    const [queries, setQueries] = useState([]);

    // Fetch queries using .then instead of async/await
    useEffect(() => {
        fetch("/api/queries")
            .then((response) => response.json())
            .then((result) => {
                setQueries(result.data); // Assuming result.data contains the list of queries
            })
            .catch((error) => {
                console.error("Error fetching queries:", error);
                toast.error("Failed to load queries.");
            });
    }, []);

    // Handle query resolve using .then
    const handleResolve = (id) => {
        fetch(`/api/resolvequery/${id}`, { method: 'PUT' })
            .then((res) => res.json())
            .then((data) => {
                toast.success(`Query resolved: ${id}`);
                setQueries(queries.filter(query => query.id !== id)); // Remove resolved query
            })
            .catch((error) => {
                console.error("Error resolving query:", error);
                toast.error("Failed to resolve query.");
            });
    };

    // Handle query delete using .then
    const handleDelete = (id) => {
        fetch(`/api/deletequery/${id}`, { method: 'DELETE' })
            .then((res) => res.json())
            .then((data) => {
                toast.success(`Query deleted: ${id}`);
                setQueries(queries.filter(query => query.id !== id)); // Remove deleted query
            })
            .catch((error) => {
                console.error("Error deleting query:", error);
                toast.error("Failed to delete query.");
            });
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <h1 className="text-4xl font-bold mb-6 text-center text-blue-600">Query Management</h1>

            {queries.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow-md rounded-lg border">
                        <thead>
                            <tr className="bg-blue-100">
                                <th className="py-3 px-6 text-left text-blue-800">Name</th>
                                <th className="py-3 px-6 text-left text-blue-800">Query</th>
                                <th className="py-3 px-6 text-center text-blue-800">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {queries.map((query) => (
                                <tr key={query.id} className="bg-white border-b hover:bg-blue-50">
                                    <td className="py-3 px-6">{query.name}</td>
                                    <td className="py-3 px-6">{query.query}</td>
                                    <td className="py-3 px-6 text-center">
                                        <button
                                            onClick={() => handleResolve(query.id)}
                                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                                        >
                                            Resolve
                                        </button>
                                        <button
                                            onClick={() => handleDelete(query.id)}
                                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition ml-2"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-center text-gray-500 text-lg mt-6">No queries available.</p>
            )}
        </div>
    );
}

export default QueryManagement;
