module.exports = (req, res, next) => {
    res.header('access-control-allow-origin', '*'); 
    res.header('access-control-allow-methods', 'GET, POST, PUT, DELETE'); 
    res.header('access-control-allow-headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');  

    next(); // this will let us move on to call the next function
};
// 1. this is basically telling your browser that it is coming from one source
// 2. telling the browser what methods we are sending
// 3. indicates which header can be used for the http requests 