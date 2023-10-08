const locationController = require(`../controller/locationController`);
const route = require(`express`).Router();

route.get(`/`, locationController.getAll.bind(locationController));
route.get(
    `/allEvent`,
    locationController.getAllCurrentEventLocation.bind(locationController)
);
route.get(`/q`, locationController.getLocationByQuery.bind(locationController));

module.exports = route;
