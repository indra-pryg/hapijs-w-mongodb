const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi)
const { getAllMovies, getMoviesById, addMovie, updateMovies, deleteMovie } = require("./handler");


const routes = [
    {
        method: 'GET',
        path: '/movies',
        handler: getAllMovies,
    },
    {
        method: 'POST',
        path: '/movies',
        handler: addMovie,
    },
    {
        method: 'GET',
        path: '/movies/{id}',
        handler: getMoviesById,
    },
    {
        method: 'PUT',
        path: '/movies/{id}',
        options: {
            validate: {
                params: Joi.object({
                    id: Joi.objectId()
                }),
            }
        },
        handler: updateMovies,
    },
    {
        method: 'DELETE',
        path: '/movies/{id}',
        options: {
            validate: {
                params: Joi.object({
                    id: Joi.objectId()
                }),
            }
        },
        handler: deleteMovie,
    }
];

module.exports = routes;