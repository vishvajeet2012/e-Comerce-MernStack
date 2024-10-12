import Left from "./Left";
import { useEffect, useState } from "react";

function Admin() {
    // State to handle the fade-in effect
    const [isVisible, setIsVisible] = useState(false);

    // Trigger the fade-in effect when the component is mounted
    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className={`min-h-screen bg-gray-100 transition-opacity duration-700 ease-in ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            {/* Page Header */}
            <header className="bg-blue-600 text-white py-4">
                <h1 className="text-4xl font-bold text-center">Admin Dashboard</h1>
            </header>
            
            <div className="w-11/12  md:flex-row justify-between mx-auto mt-8">
            <div className=" flex justify-center items-center">
            <div className="w-full md:w-3/4 bg-white shadow-md p-8 rounded-md mt-6 md:mt-0">
                    <h2 className="text-3xl font-semibold text-gray-700 mb-5 text-center">Welcome to the Admin Page</h2>
                    <p className="text-lg text-gray-500 text-center">Manage your products, queries, and more from here.</p>
                </div>
            </div>
            </div>
            <div className=" flex justify-center items-center mt-3 mb-5">
    <div className="w-full md:w-1/2 bg-white shadow-lg p-6 rounded-lg">
        <Left />
    </div>
</div>

        </div>
    );
}

export default Admin;
