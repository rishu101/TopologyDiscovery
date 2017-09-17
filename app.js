var topology = require('fully-connected-topology');
var request = require('request');


//A->B,C,D
//B->A,C
//C->A,B
//D->A,E,F
//E->B,D
//F->D,G
//G->F
var A = topology('127.0.0.1:4001', ['127.0.0.1:4002', '127.0.0.1:4003', '127.0.0.1:4004']);
var B = topology('127.0.0.1:4002', ['127.0.0.1:4001', '127.0.0.1:4003']);
var C = topology('127.0.0.1:4003', ['127.0.0.1:4001', '127.0.0.1:4002']);
var D = topology('127.0.0.1:4004', ['127.0.0.1:4001', '127.0.0.1:4005', '127.0.0.1:4006']);
var E = topology('127.0.0.1:4005', ['127.0.0.1:4002', '127.0.0.1:4004']);
var F = topology('127.0.0.1:4006', ['127.0.0.1:4004', '127.0.0.1:4007']);
var G = topology('127.0.0.1:4007', ['127.0.0.1:4006']);

A.on('connection', function(connection, peer) {
    console.log('A is connected to', peer);
    // var socket = A.peer('127.0.0.1:4004')
    // console.log(A.peers)
    // console.log(socket)
});

B.on('connection', function(connection, peer) {
    console.log('B is connected to', peer);
    B.modifyName("B");
});


C.on('connection', function(connection, peer) {
    console.log('C is connected to', peer);
    C.modifyName("C");
});

D.on('connection', function(connection, peer) {
    console.log('D is connected to', peer);
});

E.on('connection', function(connection, peer) {
    console.log('E is connected to', peer);
});

F.on('connection', function(connection, peer) {
    console.log('F is connected to', peer);
});

G.on('connection', function(connection, peer) {
    console.log('G is connected to', peer);
});

// request('127.0.0.1:4001', function(error, response, body) {
//     console.log('error: ', error);
//     console.log('statusCode:', response && response.statusCode);
//     console.log('body:', body);
// });

var postData = {
    name: 'A',
    value: 'Message from A'
}

var postOptions = {
    method: 'post',
    body: postData,
    json: true,
    url: 'http://localhost:4002'
}

var getOptions = {
    method: 'post',
    body: postData,
    json: true,
    url: 'http://localhost:4002'
}

// request(postOptions, function(err, res, body) {
//     if (err) {
//         console.log('error posting json: ', err)
//         throw err
//     }
//     var headers = res.headers
//     var statusCode = res.statusCode
//     console.log('headers: ', headers)
//     console.log('status code: ', statusCode)
//     console.log('body: ', body)
// })

// A.listen(4001);
// A.on('listening', function(est) {
//     console.log("loggg", est)
// });
