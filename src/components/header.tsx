import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useHistoryState } from "@/contexts/historyContext";

export default function Header() {
    const router = useRouter();

    const { citiesHistory }: any = useHistoryState();

    const [cityId, setCityId] = useState("");

    const handleCitySearch = () => {
        if (cityId.length == 0) {
            alert("City ID can't be empty!");
            return;
        }
        setCityId('')
        router.push(`/city/${cityId}`);
    };

    useEffect(() => {
        console.log(citiesHistory);
    }, [citiesHistory]);

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
                    value={cityId}
                    onChange={(e) => {
                        setCityId(e.target.value);
                    }}
                />
                <div
                    className="mx-2 rounded-xl bg-purple-800 p-2 transition-all hover:rounded-3xl hover:bg-purple-950 hover:cursor-pointer"
                    onClick={handleCitySearch}
                >
                    <img
                        className="min-h-8 min-w-8"
                        src="/svgs/search2.svg"
                        alt=""
                    />
                </div>
                <div className="dropdown dropdown-bottom dropdown-end">
                    <div
                        className="ms-4 rounded-xl bg-purple-800 p-2 transition-all hover:rounded-3xl hover:bg-purple-950 hover:cursor-pointer"
                        tabIndex={0}
                        role="button"
                    >
                        <img
                            className="min-h-8 min-w-8"
                            src="/svgs/history.svg"
                            alt=""
                        />
                    </div>
                    <ul
                        tabIndex={0}
                        className="mt-2 dropdown-content z-[1] p-2 shadow-2xl"
                    >
                        {citiesHistory.map((city: any) => (
                            <li
                                className="m-2 p-2 rounded-xl hover:cursor-pointer hover:bg-purple-950 transition-all"
                                onClick={() => {
                                    router.push(`/city/${city.id}`);
                                }}
                            >
                                {city.name}, {city.sys.country} {`(${city.id})`}
                            </li>
                        ))}
                        {citiesHistory.length == 0 && (
                            <li className="m-2 p-2 rounded-xl">Visit a City's Page to populate your history!</li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}
