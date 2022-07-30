var fs  = require("fs")
var http  = require("http")

// Escribí acá tu servidor
http.createServer((req, res)=>{
    //crear ruta que revise el nombre de un archivo
    fs.readFile(`${__dirname}/images/${req.url}.jpg`,(err, data) => { // aca mando a leer lo que llegue por url
            if (err) {
                res.writeHead(404, {'Content-Type': 'text/plain'});
                res.end('Hubo un error!')
            }else{
                res.writeHead(200, {'Content-Type': 'image/jpg'});
                res.end(data)
            }
        }
    );
}).listen(3001, '127.0.0.1');

// NOTA: dentro del readFile voy a tener el path completo de mi archivo img, compuesto por
// __dirname que es la raiz donde estoy parado y lo concateno con la carpeta images/${archivo dinamico} , es
// dinamico porque dependa de lo que escriba el usuario en la url es el archivo que voy a buscar
// si lo que llega por url no coincide con mis archivos voy devolver un error, si coincide con
// mis archivos, voy devolver ese archivo a traves de data
// de esta manera no necesito hacer muchos if para ir chequeando cada url path que manda el user