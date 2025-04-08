import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";

export default function GuestLayout({ children }) {
    return (
        <>
            <Navbar />
            <div className="flex min-h-screen flex-col items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0">
                <div className="pt-24 px-4 sm:px-6 lg:px-8">
                    <Link href="/">
                        {/* <ApplicationLogo className="h-20 w-20 fill-current text-gray-500" /> */}
                        <h1 className="text-3xl text-center font-bold text-purple-600">
                            Smart ISP Best Internet Provider 🚀
                        </h1>
                    </Link>
                </div>

                <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
                    {children}
                </div>
            </div>
        </>
    );
}
