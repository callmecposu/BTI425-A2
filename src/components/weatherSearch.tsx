import getFlag from "@/utils/getFlag";
import { useState } from "react";
import _ from "lodash";
import searchByQuery from "@/utils/searchByQuery";
import { useSearchResultsState } from "@/contexts/searchContext";

export default function WeatherSearch() {
    const [query, setQuery] = useState("");
    const [qErr, setQErr] = useState<string | null>(null);

    const {setSearchResults, setCurPage}: any = useSearchResultsState()

    const search = async () => {
        setQErr(null);
        setSearchResults([]);
        if (query.length == 0) {
            setQErr("Query can't be empty!");
            return;
        }
        const sRes = await searchByQuery(query);
        console.log("sRes: ", sRes);
        if (sRes.status != 200) {
            setQErr(sRes.res.message);
            return;
        }
        if (sRes.res.count == 0) {
            setQErr(`No results found for \'${query}\'`);
            return;
        }

        setCurPage(0);
        setSearchResults(_.chunk(sRes.res.list, 3));
    };

    return (
        <div className="w-full md:w-3/4 mx-auto mt-4 p-4">
            <div className="flex flex-wrap justify-center items-center">
                <h1 className="text-4xl mb-4">
                    Search for weather in any city.
                </h1>
                <div className="w-full flex items-center justify-center">
                    <input
                        type="text"
                        placeholder="CityName, CountryCode"
                        className="input input-bordered w-full max-w-xs"
                        onChange={(e) => {
                            setQuery(e.target.value);
                        }}
                    />
                    <img
                        className="inline h-14 transition-all hover:rotate-90"
                        src="svgs/search.svg"
                        alt=""
                        onClick={search}
                    />
                </div>
                <div className="w-full text-center text-error">{qErr}</div>
            </div>
        </div>
    );
}
