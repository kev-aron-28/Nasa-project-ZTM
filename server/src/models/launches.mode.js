const launches = new Map();

let latestFlightNumber = 100;
const launch = {
    flightNumber: 100,
    mission: 'Kepler exploration',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27, 2030'),
    target: 'Kepler-442 b',
    customer: ['NASA'],
    upcoming: true,
    success: true
};

launches.set(launch.flightNumber, launch);

const getAllLaunches = () => {
    return Array.from(launches.values());
}

const addNewLaunch = (launch) => {
    latestFlightNumber++;
    launches.set(
        latestFlightNumber, 
        Object.assign(launch, {
            flightNumber: latestFlightNumber,
            customer: ['NASA'],
            upcoming: true,
            success: true
        }
    ));
}

const existLaunchId = (id) => {
    return launches.has(id)
}

const abortLaunchById = (id) => {
    const aborted = launches.get(id);
    aborted.upcoming = false;
    aborted.success = false;
}

module.exports = {
    getAllLaunches,
    addNewLaunch,
    existLaunchId,
    abortLaunchById
}