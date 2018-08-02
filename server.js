'use strict';

const Hapi = require('hapi');
const Inhert = require('Inhert');
const server =  Hapi.server({
    host:'localhost',
    port:8000,
});

(async()=> {server.route({
    method:'GET',
    path:'/',
    handler:(request,reply) => {
        return 'hello';
    }
});

await server.register({
    Inhert,
});

try{
    await server.start();
}
catch(err){
    console.log(err);
}
console.log('server running')
})();

start();