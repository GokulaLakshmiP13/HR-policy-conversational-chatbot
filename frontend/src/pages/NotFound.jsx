import { useNavigate } from "react-router-dom";

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6 text-center">
            <h1 className="text-9xl font-bold text-gray-200">404</h1>
            <h2 className="mt-4 text-2xl font-bold text-gray-900">Page isn't found</h2>
            <p className="mt-2 text-gray-600">
                We couldn't find the page you were looking for.
            </p>

            <button
                onClick={() => navigate("/")}
                className="mt-8 px-6 py-2.5 bg-black text-white rounded-xl text-sm font-medium hover:bg-gray-800 transition"
            >
                Go back home
            </button>
        </div>
    );
}
