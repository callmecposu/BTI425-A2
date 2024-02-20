import Header from "@/components/header";
import FullWeatherInfo from "@/components/fullWeatherInfo";
import { useEffect, useState } from "react";

export default function Home() {
    const [curLocInfo, setCurLocInfo] = useState<any>(null);
    const [curLocErr, setCurLocErr] = useState<string | null>(null);

    useEffect(() => {
        const getLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (pos) => {
                        console.log(pos.coords.latitude, pos.coords.longitude);
                        // fetch the current weather for the loc
                        fetch(
                            `https://api.openweathermap.org/data/2.5/weather?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&appid=${process.env.NEXT_PUBLIC_API_KEY}&units=metric`
                        )
                            .then((resp) => resp.json())
                            .then((res) => {
                                console.log(res);
                                // fetch the country's flag
                                fetch(
                                    `https://restcountries.com/v3.1/alpha/${res.sys.country}`
                                )
                                    .then((flagResp) => flagResp.json())
                                    .then((flagRes) => {
                                        console.log("flag: ", flagRes);
                                        res.flag = flagRes[0].flag
                                        setCurLocInfo(res)
                                    });
                            });
                    },
                    (error) => {
                        setCurLocErr(error.message);
                    }
                );
            } else {
                setCurLocErr("Geolocation is not supported by the client.");
            }
        };

        getLocation();
    }, []);

    return (
        <div>
            <Header></Header>
            {curLocInfo && (
                <FullWeatherInfo info={curLocInfo}></FullWeatherInfo>
            )}
        </div>
    );
}
