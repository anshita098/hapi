'use strict';

const Hapi = require('hapi');
const Inert = require('Inert');
const server =  Hapi.server({
    host:'localhost',
    port:8000,
});

(async()=> {server.route({
    method:'GET',
    path:'/',
    handler:(request,h) => {
        return h.file('./public/hello.html');
    }
});

await server.register(
    Inert
);

try{
    await server.start();
}
catch(err){
    console.log(err);
}
console.log('server running')
})();
