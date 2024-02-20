import getFlag from "./getFlag";

export default async function searchByQuery(q: string) {
    // check if the query has already been done by a user
    let cachedRes = localStorage.getItem(`sq:${q}`);
    let qRes;
    if (cachedRes) {
        qRes = JSON.parse(cachedRes);
        // if the search has been done more than 10 mins ago, it is invalid
        if (qRes && isCachedSearchResultValid(qRes)) {
            console.log(`Pulling search result for \'${q}\' from cache!`)
            return qRes
        }
    }
    // fetch the query
    console.log(`Fetching the search result for \'${q}\'...`)
    const resp = await fetch(
        `https://api.openweathermap.org/data/2.5/find?appid=${
            process.env.NEXT_PUBLIC_API_KEY
        }&units=metric&cnt=50&q=${encodeURIComponent(q)}`
    );
    let res = await resp.json();
    console.log(res);
    if (resp.status == 200) {
        for (let i = 0; i < res.count; i++) {
            res.list[i].flag = await getFlag(res.list[i].sys.country);
        }
    }
    // cache the query result
    res.timestamp = new Date();
    const result = {status: resp.status, res:res}
    localStorage.setItem(`sq:${q}`, JSON.stringify(result));
    return result
}

const isCachedSearchResultValid = (cachedRes: any) => {
    const timestamp = new Date(cachedRes.res.timestamp);
    const rn = new Date();
    if ((rn.getTime() - timestamp.getTime()) / 1000 / 60 >= 10) {
        return false;
    }
    return true;
};
