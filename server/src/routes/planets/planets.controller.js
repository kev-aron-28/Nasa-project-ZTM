const { getAllPlanets } = require('../../models/planets.model');

const httpGetAllPlanets = (req, res) => {
    return res.json(getAllPlanets());
}

module.exports = {
    httpGetAllPlanets
};