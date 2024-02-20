import { useRouter } from "next/router";
import { useState } from "react";

export default function Header() {
    const router = useRouter();

    const [cityId, setCityId] = useState("");

    const handleCitySearch = () => {
        if (cityId.length == 0) {
            alert("City ID can't be empty!");
            return;
        }
        router.push(`/city/${cityId}`);
    };

    return (
        <div className="navbar bg-primary text-neutral-content flex">
            <button
                className="btn btn-ghost text-xl"
                onClick={() => {
                    router.push("/");
                }}
            >
                What's the weather like?
            </button>
            <div className="w-full flex justify-end">
                <input
                    type="text"
                    placeholder="Search By City ID"
                    className="input input-bordered w-full max-w-xs bg-purple-950"
                    onChange={(e) => {
                        setCityId(e.target.value);
                    }}
                />
                <div
                    className="mx-2 rounded-xl bg-purple-800 p-2 transition-all hover:rounded-3xl hover:bg-purple-950 hover:cursor-pointer"
                    onClick={handleCitySearch}
                >
                    <img className="h-8" src="/svgs/search2.svg" alt="" />
                </div>
            </div>
        </div>
    );
}
