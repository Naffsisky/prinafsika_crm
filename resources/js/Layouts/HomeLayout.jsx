import Navbar from "@/Components/Navbar";
import React from "react";
import Footer from "@/Components/Footer";

export default function HomeLayout({ children }) {
    return (
        <>
            <Navbar />
            <div className="bg-gray-100">{children}</div>
            <Footer />
        </>
    );
}
