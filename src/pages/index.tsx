import Header from "@/components/header";
import FullWeatherInfo from "@/components/fullWeatherInfo";
import { useEffect, useState } from "react";
import getCurrentLocInfo from "@/utils/getCurrentLocInfo";

export default function Home() {
    const [curLocInfo, setCurLocInfo] = useState<any>(null);
    const [curLocErr, setCurLocErr] = useState<string | null>(null);

    useEffect(() => {
        getCurrentLocInfo(setCurLocErr, setCurLocInfo);
    }, []);

    return (
        <div>
            <Header></Header>
            {curLocInfo ? (
                <FullWeatherInfo info={curLocInfo}></FullWeatherInfo>
            ) : (
                <div className="flex h-screen justify-center items-center">
                    <div className="w-16 loading loading-spinner text-primary"></div>
                </div>
            )}
        </div>
    );
}
