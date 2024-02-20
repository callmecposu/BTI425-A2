import getFlag from "./getFlag";

export default async function getCityInfo(id: string) {
    // check if there is cached city info
    let cachedCityInfo = localStorage.getItem(`city:${id}`);
    let cityInfo;
    if (cachedCityInfo) {
        cityInfo = JSON.parse(cachedCityInfo);
        if (cityInfo && isCachedCityInfoValid(cityInfo)) {
            console.log(`Pulling infromation for city ${id} from cache!`);
            cityInfo.res.lastUpdated = new Date(cityInfo.res.lastUpdated)
            return cityInfo;
        }
    }
    // fetch the city's info
    console.log(`Fetching the information for city ${id}...`);
    const resp = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?appid=${
            process.env.NEXT_PUBLIC_API_KEY
        }&units=metric&id=${encodeURIComponent(id)}`
    );
    let res = await resp.json();
    console.log(res);
    if (resp.status == 200) {
        res.flag = await getFlag(res.sys.country);
        res.lastUpdated = new Date()
    }
    // cache the result
    res.timestamp = new Date()
    const result = { status: resp.status, res: res };
    localStorage.setItem(`city:${id}`, JSON.stringify(result));
    return result;
}

const isCachedCityInfoValid = (cachedInfo: any) => {
    const timestamp = new Date(cachedInfo.res.timestamp);
    const rn = new Date();
    if ((rn.getTime() - timestamp.getTime()) / 1000 / 60 >= 10) {
        return false;
    }
    return true;
};
