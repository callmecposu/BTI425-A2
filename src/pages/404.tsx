import { useRouter } from "next/router";


export default function Custom404() {
const router = useRouter()

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold">404</h1>
                    <p className="py-6">Page not found &#128532;</p>
                    <button
                        className="btn btn-primary"
                        onClick={() => {
                            router.push("/");
                        }}
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
}
