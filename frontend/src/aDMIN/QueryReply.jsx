import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

function QueryReply() {
    const { id } = useParams(); // Get the query ID from the route parameters

    // State to handle email input fields
    const [toEmail, setToEmail] = useState('');
    const [fromEmail, setFromEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');

    // Fetch the query details based on ID
    useEffect(() => {
        fetch(`/api/queryreply/${id}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data.data.UserMail); // Log the UserMail to confirm it is fetched
                setToEmail(data.data.UserMail); // Set toEmail with fetched UserMail
                setFromEmail(''); // Initialize fromEmail
                setSubject(''); // Initialize subject
                setBody(''); // Initialize body
            })
            .catch((error) => {
                console.error('Error fetching query details:', error);
                toast.error('Failed to load query details.');
            });
    }, [id]);

    // Email validation function
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Handle the reply submission
    const handleReplySubmit = () => {
        if (!toEmail || !fromEmail || !subject || !body) {
            toast.error('All fields are required!');
            return;
        }

        if (!isValidEmail(toEmail) || !isValidEmail(fromEmail)) {
            toast.error('Please enter a valid email address.');
            return;
        }

        // Simulate reply submission (e.g., API call)
        console.log("To:", toEmail);
        console.log("From:", fromEmail);
        console.log("Subject:", subject);
        console.log("Body:", body);
        toast.success('Reply sent successfully');

        // Clear the form fields after submission
        setToEmail('');
        setFromEmail('');
        setSubject('');
        setBody('');
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <h1 className="text-4xl font-bold mb-6 text-center text-blue-600">Reply to Query</h1>

            <div className="bg-white shadow-md rounded-lg p-6 max-w-xl mx-auto">
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="toEmail">
                        To <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="email"
                        value={toEmail} // Display the fetched user email here
                        onChange={(e) => setToEmail(e.target.value)}
                        placeholder="Enter customer's email"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="fromEmail">
                        From <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="email"
                        value={fromEmail}
                        onChange={(e) => setFromEmail(e.target.value)}
                        placeholder="Enter your email (admin)"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="subject">
                        Subject <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="Enter subject"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="body">
                        Body <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        placeholder="Type your reply..."
                        className="w-full h-28 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 resize-none"
                        required
                    />
                </div>

                <div className="text-center">
                    <button
                        onClick={handleReplySubmit}
                        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
                    >
                        Send Reply
                    </button>
                </div>
            </div>
        </div>
    );
}

export default QueryReply;
