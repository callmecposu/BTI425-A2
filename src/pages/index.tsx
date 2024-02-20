import FullWeatherInfo from "@/components/fullWeatherInfo";
import { useEffect, useState } from "react";
import getCurrentLocInfo from "@/utils/getCurrentLocInfo";
import WeatherSearch from "@/components/weatherSearch";
import { useRouter } from "next/router";
import { useSearchResultsState } from "@/contexts/searchContext";

export default function Home() {
    const router = useRouter();

    const [curLocInfo, setCurLocInfo] = useState<any>(null);
    const [curLocErr, setCurLocErr] = useState<string | null>(null);

    const { searchResults, setSearchResults, curPage, setCurPage }: any = useSearchResultsState();
    // const [searchResults, setSearchResults] = useState([]);
    // const [curPage, setCurPage] = useState<number | null>(null);

    useEffect(() => {
        getCurrentLocInfo(setCurLocErr, setCurLocInfo);
    }, []);

    useEffect(() => {
        console.log('searchResults: ', searchResults)
    }, [searchResults]);

    return (
        <div>
            {curLocInfo ? (
                <FullWeatherInfo info={curLocInfo}></FullWeatherInfo>
            ) : (
                <div className="flex h-screen justify-center items-center">
                    <div className="w-16 loading loading-spinner text-primary"></div>
                </div>
            )}
            <WeatherSearch
            ></WeatherSearch>
            {/* Search Results Table */}
            {searchResults.length > 0 && (
                <div className="w-full md:w-3/4 mx-auto my-4 border-2">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>City</th>
                                <th>Weather</th>
                                <th>Temperature</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(searchResults[curPage as number] as any).map(
                                (res: any) => (
                                    <tr
                                        className=" transition-all hover:bg-gray-100 hover:cursor-pointer"
                                        onClick={() => {
                                            router.push(`/city/${res.id}`);
                                        }}
                                    >
                                        <td>
                                            {res.name}, {res.sys.country}{" "}
                                            {res.flag}
                                        </td>
                                        <td>{res.weather[0].description}</td>
                                        <td>{res.main.temp}&deg;C</td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                    {/* Pagination */}
                    <div className="my-4 flex justify-center">
                        <div className="join">
                            <button
                                className={
                                    "join-item btn " +
                                    (curPage == 0 ? "btn-disabled" : "")
                                }
                                onClick={() => {
                                    setCurPage((curPage as number) - 1);
                                }}
                            >
                                «
                            </button>
                            <button className="join-item btn">
                                Page {(curPage as number) + 1} /{" "}
                                {searchResults.length}
                            </button>
                            <button
                                className={
                                    "join-item btn " +
                                    (curPage == searchResults.length - 1
                                        ? "btn-disabled"
                                        : "")
                                }
                                onClick={() => {
                                    setCurPage((curPage as number) + 1);
                                }}
                            >
                                »
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
