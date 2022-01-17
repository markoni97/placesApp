const HttpError = require('../modules/http-error');
const uuid = require('uuid').v4;

let DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world",
    location: {
      lat: 40.7484474,
      lng: -73.9871516,
    },
    address: "20 W 34th St, New York, NY 10001",
    creator: "u1",
  },
  {
    id: "p2",
    title: "Eifel Tower",
    description: "The most beautiful tower",
    location: {
      lat: 40.7484474,
      lng: -73.9871516,
    },
    address: "20 W 34th St, Paris, NY 10001",
    creator: "u2",
  }
];

const getPlaceById = (req, res, next) => {
  const placeId = req.params.pid; // params => {pid: p1}
  const place = DUMMY_PLACES.find((p) => {
    return p.id === placeId;
  });
  if(!place){
    throw new HttpError('Could not find a place with the given id', 404);
  }
  res.json({ place: place });
};

const getPlacesByUserId = (req, res, next) => {
  const userId = req.params.uid;
  const places = DUMMY_PLACES.filter(p => {
    return p.creator === userId;
  });
  if(places.length === 0){
    return next(new HttpError('Could not find a place with the given user id', 404));
  }
  res.json({places: places});
};

const createPlace = (req, res, next) => {
  const {title, description, coordinates, address, creator} = req.body;

  const createdPlace = {
    id: uuid(),
    title,
    description,
    location: coordinates,
    address,
    creator
  };

  DUMMY_PLACES.push(createdPlace);

  res.status(201).send({place: createdPlace});
};

const updatePlace = (req, res, next) => {
  const {title, description} = req.body;
  const placeId = req.params.pid;

  const updatedPlace = {...DUMMY_PLACES.find(p => p.id === placeId)};
  const updatedPlaceIndex = DUMMY_PLACES.findIndex(p => p.id === placeId);

  updatedPlace.title = title;
  updatedPlace.description = description;

  DUMMY_PLACES[updatedPlaceIndex] = updatedPlace

  res.status(200).json({place: updatedPlace});

};

const deletePlace = (req, res, next) => {
  const placeId = req.params.pid;
  DUMMY_PLACES = DUMMY_PLACES.filter(p => p.id !== placeId);
  res.status(200).json({message: 'Deleted place'});
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;