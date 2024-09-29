import React, { useState } from 'react';
import toast from 'react-hot-toast';

function QueryReply() {
    // State to handle email input fields
    const [toEmail, setToEmail] = useState('');
    const [fromEmail, setFromEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');

    // Handle input changes
    const handleToEmailChange = (e) => setToEmail(e.target.value);
    const handleFromEmailChange = (e) => setFromEmail(e.target.value);
    const handleSubjectChange = (e) => setSubject(e.target.value);
    const handleBodyChange = (e) => setBody(e.target.value);

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
                        To (Customer Email) <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="email"
                        value={toEmail}
                        onChange={handleToEmailChange}
                        placeholder="Enter customer's email"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="fromEmail">
                        From (Admin Email) <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="email"
                        value={fromEmail}
                        onChange={handleFromEmailChange}
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
                        onChange={handleSubjectChange}
                        placeholder="Enter subject"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="body">
                        Body (Reply) <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        value={body}
                        onChange={handleBodyChange}
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
