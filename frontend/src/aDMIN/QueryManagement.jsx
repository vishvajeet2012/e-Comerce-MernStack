import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

function QueryManagement() {
    const [queries, setQueries] = useState([]);

    // Fetching queries from the server
    useEffect(() => {
        fetch("/api/queries")
            .then((response) => response.json())
            .then((result) => {
                if (Array.isArray(result.data)) {
                    setQueries(result.data);
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

    // Handle marking query as read/unread
    const handleResolve = (queryId) => {
        fetch(`/api/queriesStatus/${queryId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                toast.success(`Query marked as ${data.data.queryStatus}.`);
                setQueries(queries.map(query => 
                    query._id === queryId ? { ...query, queryStatus: data.data.queryStatus } : query
                ));
            } else {
                toast.error('Failed to update query status.');
            }
        })
        .catch(error => {
            console.error('Error updating query:', error);
            toast.error('Failed to update query.');
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <h1 className="text-4xl font-bold mb-6 text-center text-blue-600">Query Management</h1>

            {queries && queries.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow-md rounded-lg border">
                        <thead>
                            <tr className="bg-blue-200">
                                <th className="py-3 px-6 text-left text-blue-800">User Mail</th>
                                <th className="py-3 px-6 text-left text-blue-800">User Query</th>
                                <th className="py-3 px-6 text-left text-blue-800">Status</th>
                                <th className="py-3 px-6 text-center text-blue-800">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {queries.map((query, index) => (
                                <tr key={index} className="bg-white border-b hover:bg-blue-50">
                                    <td className="py-3 px-6">{query.UserMail}</td>
                                    <td className="py-3 px-6">{query.userQuery}</td>
                                    <td className="py-3 px-6">
                                        {query.queryStatus === 'Unread' ? 'Un Read' : 'Read'}
                                    </td>
                                    <td className="py-3 px-6 text-center">
                                        <Link to={`/queryReply/${query._id}`}>
                                            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                                                Reply
                                            </button>
                                        </Link>
                                        {query.queryStatus === 'Unread' && (
                                            <button
                                                onClick={() => handleResolve(query._id)}
                                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition ml-2"
                                            >
                                                Mark as Read
                                            </button>
                                        )}
                                        {query.queryStatus === 'Read' && (
                                            <button
                                                onClick={() => handleResolve(query._id)}
                                                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition ml-2"
                                            >
                                                Mark as Unread
                                            </button>
                                        )}
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
