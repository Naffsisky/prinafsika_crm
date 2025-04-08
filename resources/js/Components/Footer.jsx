import React from "react";

export default function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <div className="bg-purple-600 text-white text-center font-bold py-4">
            <p>Copyright by Prinafsika {currentYear}</p>
        </div>
    );
}
