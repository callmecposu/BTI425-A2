import getCityInfo from "@/utils/getCityInfo";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import FullWeatherInfo from "@/components/fullWeatherInfo";
import { useHistoryState } from "@/contexts/historyContext";

export default function City() {
    const router = useRouter();
    const cityId = router.query.id;

    const {citiesHistory, setCitiesHistory}: any = useHistoryState()

    const [cityInfo, setCityInfo] = useState<any>(null);
    const [cityErr, setCityErr] = useState<any>(null);

    useEffect(() => {
        const getInfo = async () => {
            const cityRes = await getCityInfo(cityId as string);
            if (cityRes.status != 200) {
                setCityErr({
                    status: cityRes.status,
                    message: cityRes.res.message,
                });
                return;
            }
            setCityInfo(cityRes.res)
            let newHistory = Array.from(citiesHistory)
            newHistory.unshift(cityRes.res)
            setCitiesHistory(newHistory.slice(0,10))
        };
        if (cityId) {
            console.log(cityId);
            getInfo();
        }
    }, [cityId]);

    return (
        <div>
            {!cityInfo && !cityErr && (
                <div className="flex h-screen justify-center items-center">
                    <div className="w-16 loading loading-spinner text-primary"></div>
                </div>
            )}
            {cityInfo && <FullWeatherInfo info={cityInfo}></FullWeatherInfo>}
            {cityErr && (
                <div className="hero min-h-screen bg-base-200">
                    <div className="hero-content text-center">
                        <div className="max-w-md">
                            <h1 className="text-5xl font-bold">
                                {cityErr.status}
                            </h1>
                            <p className="py-6">{cityErr.message}</p>
                            <button className="btn btn-primary" onClick={() => {router.push('/')}}>
                                Back to Home
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
