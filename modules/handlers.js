var fs = require("fs");
var formidable = require("formidable");

exports.upload = function(request, response) {
    console.log("Rozpoczynam obsługę żądania upload.");
    var form = new formidable.IncomingForm();
    form.parse(request, function(err, fields, files) {
        fs.renameSync(files.upload.path, "test.png");
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write("received image:<br/>");
        response.write("<img src='/show' />");
        response.end();
    });
}

exports.welcome = function(request, response) {
    console.log("Rozpoczynam obsługę żądania welcome.");
    fs.readFile("templates/start.html", function(err, http) {
        response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
        response.write(http);
        response.end();
    });    
}

exports.error = function(request, response) {
    console.log("Nie wiem co robić.");
    response.write("404 :(");
    response.end();
}

exports.show = function(request, response) {
    console.log("Przekazuję obraz.");
    fs.readFile("test.png","binary", function(err, image) {
        response.writeHead(200, {"Content-Type": "image-png"});
        response.write(image, "binary");
        response.end();
    })
}