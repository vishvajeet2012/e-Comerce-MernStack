import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Link, useParams } from 'react-router-dom';

function QueryManagement() {
    const [queries, setQueries] = useState([]);
       
    useEffect(() => {
        fetch("/api/queries")
            .then((response) => response.json())
            .then((result) => {
                console.log(result.data);
                if (Array.isArray(result.data)) {
                    setQueries(result.data); // Set the queries state if it's an array
                } else {
                    console.error('Expected an array of queries, got:', result.data);
                    toast.error("Unexpected data format.");
                }
            })
            .catch((error) => {
                console.error("Error fetching queries:", error);
                toast.error("Failed to load queries.");
            });
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <h1 className="text-4xl font-bold mb-6 text-center text-blue-600">Query Management</h1>

            {queries && queries.length > 0 ? (  // Ensure the array exists and has length
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow-md rounded-lg border">
                        <thead>
                            <tr className="bg-blue-200">
                                <th className="py-3 px-6 text-left text-blue-800">User Mail</th>
                                <th className="py-3 px-6 text-left text-blue-800">User Query</th>
                                <th className="py-3 px-6 text-center text-blue-800">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {queries.map((query, index) => (
                                <tr key={index} className="bg-white border-b hover:bg-blue-50">
                                    <td className="py-3 px-6">{query.UserMail}</td>
                                    <td className="py-3 px-6">{query.userQuery}</td>
                                    <td className="py-3 px-6 text-center">
                                      <Link to={`/queryReply/${query._id}`}> <button
                                            onClick={() => handleResolve(index)}
                                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                                        >
                                            Resolve
                                        </button> </Link>
                                        <button
                                            onClick={() => handleDelete(index)}
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
