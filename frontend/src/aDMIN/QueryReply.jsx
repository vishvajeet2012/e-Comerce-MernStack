import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

function QueryReply() {
    const { id } = useParams(); 
    const navigate = useNavigate();

    const [toEmail, setToEmail] = useState('');
    const [fromEmail, setFromEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');
    const [isSending, setIsSending] = useState(false); // New state for disabling the button

    useEffect(() => {
        fetch(`/api/queryreply/${id}`)
            .then((res) => res.json())
            .then((data) => {
                if (data && data.data && data.data.UserMail) {
                    setToEmail(data.data.UserMail);
                } else {
                    console.error('UserMail is not defined');
                    toast.error('User email not found.');
                }
            })
            .catch((error) => {
                console.error('Error fetching query details:', error);
                toast.error('Failed to load query details.');
            });
    }, [id]);

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleReplySubmit = () => {
        if (!toEmail || !fromEmail || !subject || !body) {
            toast.error('All fields are required!');
            return;
        }

        if (!isValidEmail(toEmail) || !isValidEmail(fromEmail)) {
            toast.error('Please enter a valid email address.');
            return;
        }

        setIsSending(true); // Disable the button

        const replyData = {
            toEmail,
            fromEmail,
            subject,
            body,
        };

        fetch('/api/sendreply', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(replyData),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    toast.success('Reply sent successfully');
                    navigate("/queryManagement");
                    setToEmail('');
                    setFromEmail('');
                    setSubject('');
                    setBody('');
                } else {
                    toast.error('Failed to send reply');
                }
            })
            .catch((error) => {
                console.error('Error sending reply:', error);
                toast.error('An error occurred while sending the reply.');
            })
            .finally(() => setIsSending(false)); // Re-enable the button after submission
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
                        value={toEmail}
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
                        className="w-full h-40 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 resize-none"
                        required
                    />
                </div>

                <div className="text-center">
                    <button
                        onClick={handleReplySubmit}
                        className={`bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition ${isSending && 'opacity-50 cursor-not-allowed'}`}
                        disabled={isSending}
                    >
                        {isSending ? 'Sending...' : 'Send Reply'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default QueryReply;
