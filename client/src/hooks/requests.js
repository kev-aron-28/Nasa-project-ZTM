const API = 'http://localhost:8080'

async function httpGetPlanets() {
    const response = await fetch(`${API}/planets`);
    return await response.json();
}

async function httpGetLaunches() {
    const response = await fetch(`${API}/launches`);
    const launches = await response.json();

    return launches.sort((a,b) => a.flightNumber - b.flightNumber);
}

async function httpSubmitLaunch(launch) {
   try {
        await fetch(`${API}/launches`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(launch)
        });

        return {
            ok: true,
        }

   } catch (error) {
       return {
           ok: false
       }
   }

}

async function httpAbortLaunch(id) {
  try {
    return await fetch(`${API}/launches/${id}`, {
        method: 'delete',
    })
  } catch (error) {
    return {
        ok: false
    }
  }
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};