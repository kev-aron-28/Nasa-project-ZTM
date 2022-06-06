const { 
    getAllLaunches, 
    addNewLaunch, 
    existLaunchId,
    abortLaunchById
} = require('../../models/launches.mode');

const httpGetAllLaunches = (req, res) => {
    return res.json(getAllLaunches());
}

const httpAddNewLaunch = (req, res) => {
    const launch = req.body;

    if(!launch.mission || !launch.rocket || !launch.launchDate || !launch.target) {
        return res.status(400).json({
            error: 'Invalid launch'
        });
    }
    launch.launchDate = new Date(launch.launchDate);
    if(launch.launchDate.toString() === 'Invalid Date') {
        return res.status(400).json({
            msg: 'Invalid launch date'
        })
    }

    addNewLaunch(launch);
    return res.status(201).json(launch);
}

const httpAbortLaunch = (req, res) => {
    const id = Number(req.params.id);
    if(!existLaunchId(id)) {
        return res.status(404).json({
            error: 'launch not found'
        })
    }

    const aborted = abortLaunchById(id);
    return res.json({
        aborted,
        ok: true,
    })
}


module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch
}