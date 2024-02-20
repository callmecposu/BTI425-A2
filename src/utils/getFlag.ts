export default async function getFlag(countryCode: string) {
    // check if the country flag is cached
    let flag = localStorage.getItem(countryCode)
    if (flag){
        return flag
    }
    // fetch the country flag
    const resp = await fetch(
        `https://restcountries.com/v3.1/alpha/${countryCode}`
    )
    const res = await resp.json()
    console.log('flag: ', res)
    // save the flag in local storage
    localStorage.setItem(countryCode, res[0].flag)
    return res[0].flag
}