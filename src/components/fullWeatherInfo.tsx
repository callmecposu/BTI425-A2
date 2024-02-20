import { useEffect, useState } from "react";

export default function FullWeatherInfo({ info }: any) {
    const [sunrise, setSunrise] = useState<Date | null>(null);
    const [sunset, setSunset] = useState<Date | null>(null);

    useEffect(() => {
        setSunrise(new Date(info.sys.sunrise * 1000 + info.timezone));
        setSunset(new Date(info.sys.sunset * 1000 + info.timezone));
    }, []);

    return (
        <div>
            <div className="flex justify-center md:mt-8">
                <div className="hero h-screen md:h-auto md:w-3/4 md:rounded-3xl overflow-hidden bg-secondary-content">
                    <div className="hero-overlay bg-opacity-60"></div>
                    <div className="flex ">
                        <div
                            className="flex flex-wrap text-base-100 p-4 gap-2"
                            style={{ width: "80%" }}
                        >
                            {/* Loc Information */}
                            <h1 className="text-3xl w-full">
                                {info.name}, {info.sys.country} {info.flag}
                            </h1>
                            {/* Current Weather Condition */}
                            <h2 className="text-2xl font-light underline mb-3">
                                {info.weather[0].description}
                            </h2>
                            {/* Coordinates */}
                            <div className="flex items-center w-full gap-1 ms-2">
                                <img
                                    className="weatherInfoIcon"
                                    src="svgs/coordinates.svg"
                                    alt=""
                                />
                                <span className=" italic">
                                    {info.coord.lat}, {info.coord.lon}
                                </span>
                            </div>
                            {/* Temperature */}
                            <div className="flex items-center w-full gap-1 ms-2">
                                <img
                                    className="weatherInfoIcon"
                                    src="svgs/temperature.svg"
                                    alt=""
                                />
                                <span>
                                    Current:{" "}
                                    <div className="inline rounded-full bg-primary p-1.5">
                                        {info.main.temp} &deg;C
                                    </div>{" "}
                                    &nbsp; Min:{" "}
                                    <div className="inline rounded-full bg-secondary p-1.5">
                                        {info.main.temp_min} &deg;C
                                    </div>{" "}
                                    &nbsp; Max:{" "}
                                    <div className="inline rounded-full bg-error p-1.5">
                                        {info.main.temp_max} &deg;C
                                    </div>
                                </span>
                            </div>
                            {/* Humidity */}
                            <div className="flex items-center w-full gap-1 ms-2">
                                <img
                                    className="weatherInfoIcon"
                                    src="svgs/humidity.svg"
                                    alt=""
                                />
                                <span>
                                    Humidity:{" "}
                                    <div className="inline rounded-full bg-accent p-1.5">
                                        {info.main.humidity} %
                                    </div>
                                </span>
                            </div>
                            {/* Pressure */}
                            <div className="flex items-center w-full gap-1 ms-2">
                                <img
                                    className="weatherInfoIcon"
                                    src="svgs/pressure.svg"
                                    alt=""
                                />
                                <span>
                                    Pressure:{" "}
                                    <div className="inline rounded-full bg-neutral p-1.5">
                                        {info.main.pressure} hPa
                                    </div>
                                </span>
                            </div>
                            {/* Wind */}
                            <div className="flex items-center w-full gap-1 ms-2">
                                <img
                                    className="weatherInfoIcon"
                                    src="svgs/wind.svg"
                                    alt=""
                                />
                                <span>
                                    Wind Speed:{" "}
                                    <div className="inline rounded-full bg-green-800 p-1.5">
                                        {info.wind.speed} m/s
                                    </div>{" "}
                                    &nbsp;
                                </span>
                            </div>
                            {/* Sun set/rise */}
                            <div className="flex items-center w-full gap-1 ms-2">
                                <img
                                    className="weatherInfoIcon"
                                    src="svgs/sun.svg"
                                    alt=""
                                />
                                <span>
                                    SunRise:{" "}
                                    <div className="inline rounded-full bg-orange-700 p-1.5">
                                        {sunrise?.getHours()}:{" "}
                                        {sunrise?.getMinutes()}
                                    </div>{" "}
                                    &nbsp; SunSet:{" "}
                                    <div className="inline rounded-full bg-violet-700 p-1.5">
                                        {sunset?.getHours()}:{" "}
                                        {sunset?.getMinutes()}
                                    </div>{" "}
                                    &nbsp;
                                </span>
                            </div>
                        </div>
                        <div style={{ width: "20%" }}>
                            <img
                                className="w-full "
                                src={`https://openweathermap.org/img/wn/${info.weather[0].icon}.png`}
                                alt=""
                            />
                        </div>
                    </div>
                    {/* <div className="hero-content text-center text-neutral-content">
                        <div className="max-w-md">
                            <h1 className="mb-5 text-5xl font-bold">
                                Hello there
                            </h1>
                            <p className="mb-5">
                                Provident cupiditate voluptatem et in. Quaerat
                                fugiat ut assumenda excepturi exercitationem
                                quasi. In deleniti eaque aut repudiandae et a id
                                nisi.
                            </p>
                            <button className="btn btn-primary">
                                Get Started
                            </button>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    );
}
