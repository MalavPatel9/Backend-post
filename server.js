const http= require('http')
const app= require('./backend/app');
const debug= require('debug')('node-angular');



const normalizeport= val=>{
    var port= parseInt(val,10);

    if(isNaN(port)){
        //named pipe
        return val
    };

    if(port >= 0){
        //port number
        return port
    };
    return false
};

const OnError = error=>{
    if(error.syscall !=='listen'){
        throw error
    }
    const bind = typeof addr === 'string' ? 'pipe' + addr:'port'+port;
switch(error.code){
    case'EACCESS':
    console.error(bind+'require elivated privileges');
    process.exit(1);
    break;
    case'EADDRINUSE':
    console.error(bind+'already in use');
    process.exit(1);
    break;
    default:
        throw error

}

};

const OnListening=()=>{
    const addr= server.address()
    const bind = typeof addr === 'string'?'pipe'+ addr:'port'+port;
    debug('listening on'+bind);
}


const port = normalizeport(process.env.PORT||'3000');
app.set('port',port)

const server = http.createServer(app);
server.on('error', OnError);
server.on('listening', OnListening)
server.listen(port)


