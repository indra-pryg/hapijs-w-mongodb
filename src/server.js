const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async() => {
    
    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });
    
    await server.register({
        plugin: require('hapi-mongodb'),
        options: {
            url: 'mongodb://localhost:27017/sample',
            settings: {
                poolSize: 10,
                useUnifiedTopology: true
            },
            decorate: true
        }
    });

    server.route(routes);

    await server.start();
    console.log(`Server started at ${server.info.uri}`);
};

module.exports = init();