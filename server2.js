'use strict';

const Hapi = require('hapi');
const Bcrypt = require('bcrypt');

const users = {
    john:{
        username:'john',
        password: '$2a$10$iqJSHD.BGr0E2IxQwYgJmeP3NvhPrXAeLSaGCj6IR/XU5QtjVu5Tm',  
        name: 'John Doe',
        id: '2133d32a',
    }
}

(async() => {const validate = (request,username,password) => {
 const user = users[username];
 if(!user){
     return {credentials:null, isValid:false};
 }

 const isValid = await Bcrypt.compare(password,user.password);

 if(isValid){
 const credentials = {id:user.id,name:user.name};
}

 return {isValid,credentials};
};

{
    const server= Hapi.server({
        port:8000,
    });
    await server.register(require('hapi-auth-basic'));

    server.auth.strategy('simple', 'basic', { validate });

    server.route({
        method:'GET',
        path:'/',
        options:{
            auth:'simple',
        },
        handler:function(request,h){
            return 'welcome';
        }
    });

    try{
        await server.start();
    }
    catch(err){
        console.log(err);
    }
    console.log('server running');
}})();