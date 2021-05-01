const getAllMovies = async(request, h) => {
    const db = request.mongo.db;
    const offset = Number(request.query.offset) || 0;

    const result = await db.collection('movies').find({}).sort({metacritic:-1}).skip(offset).limit(580).toArray();
    return result;
};

const addMovie = async (request, h) => {
    const db = request.mongo.db;
    const payload = request.payload;

    const result = await db.collection('movies').insertOne(payload);
    return result;
};

const getMoviesById = async(request, h) => {
    const db = request.mongo.db;
    const ObjectID = request.mongo.ObjectID;

    const result = await db.collection('movies').findOne({  _id: new ObjectID(request.params.id) }, {projection: {plot: 1, genres: 1, title: 1, year: 1}});
    return result;
};

const updateMovies = async(request, h) => {
    const db = request.mongo.db;
    const id = request.params.id;
    const ObjectID = request.mongo.ObjectID;
    const payload = request.payload;

    const result = await db.collection('movies').updateOne({_id: new ObjectID(id)}, {$set: payload});
    return result;
};

const deleteMovie = async(request, h) => {
    const db = request.mongo.db;
    const id = request.params.id;
    const ObjectID = request.mongo.ObjectID;

    const result = await db.collection('movies').deleteOne({_id: new ObjectID(id)});
    return result;
};

module.exports = {
    getAllMovies,
    getMoviesById,
    addMovie,
    updateMovies,
    deleteMovie,
};