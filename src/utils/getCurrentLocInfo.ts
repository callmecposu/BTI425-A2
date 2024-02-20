import getFlag from "./getFlag"

export default function getCurrentLocInfo(setErr: any, setInfo: any){
    // check if the current location is cached
    let cachedLocInfo = localStorage.getItem('curLoc')
    let curLocInfo
    if (cachedLocInfo){
        curLocInfo = JSON.parse(cachedLocInfo)
        if(curLocInfo && isCachedLocationValid(curLocInfo)){
            curLocInfo.lastUpdated = new Date(curLocInfo.lastUpdated)
            setInfo(curLocInfo)
            return
        }
    }
    // fetch the current weather for the location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                console.log(pos.coords.latitude, pos.coords.longitude);
                // fetch the current weather for the loc
                fetch(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&appid=${process.env.NEXT_PUBLIC_API_KEY}&units=metric`
                )
                    .then((resp) => resp.json())
                    .then(async (res) => {
                        console.log(res);
                        const flag = await getFlag(res.sys.country);
                        res.flag = flag;
                        res.lastUpdated = new Date();
                        // save the curLoc in the localStorage
                        localStorage.setItem('curLoc', JSON.stringify(res))
                        setInfo(res)
                    });
            },
            (error) => {
                setErr(error.message)
            }
        );
    } else {
        setErr('The GeoLocation is not supoprted by your browser.')
    }
}

function isCachedLocationValid(cachedLoc: any) {
    // function will return false if cached location is no longer valid
    // if it's been 10 minutes since last fetch for the current location
    const rn = new Date();
    const timestamp = new Date(cachedLoc.lastUpdated);
    if ((rn.getTime() - timestamp.getTime()) / 1000 / 60  >= 10) {
      return false;
    }
    return true;
  }
