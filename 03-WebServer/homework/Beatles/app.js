var http = require('http');
var fs   = require('fs');





var beatles=[{
  name: "John Lennon",
  birthdate: "09/10/1940",
  profilePic:"https://blogs.correiobraziliense.com.br/trilhasonora/wp-content/uploads/sites/39/2020/10/CBNFOT081020100047-550x549.jpg"
},
{
  name: "Paul McCartney",
  birthdate: "18/06/1942",
  profilePic:"http://gazettereview.com/wp-content/uploads/2016/06/paul-mccartney.jpg"
},
{
  name: "George Harrison",
  birthdate: "25/02/1946",
  profilePic:"https://canaldosbeatles.files.wordpress.com/2012/02/george-george-harrison-8321345-438-600.jpg"
},
{
  name: "Richard Starkey",
  birthdate: "07/08/1940",
  profilePic:"http://cp91279.biography.com/BIO_Bio-Shorts_0_Ringo-Starr_SF_HD_768x432-16x9.jpg"
}
]

http.createServer((req, res) =>{
  if (req.url === '/api') { // el browser va
    res.writeHead(200, {'Content-Type':'application/json'}).end(JSON.stringify(beatles));// variante .end encadenado // aca se convierte el array de objetos beatles en un string Json para poder enviarlo
  }

  if (req.url.substring(0,5) === '/api/' && req.url.length > 5 ) { // aca verifico que la ruta sea /api/algo mas...
    let searchedBeatle = req.url.split('/').pop(); // john%20lennon
    let foundBeatle = beatles.find(beatle => searchedBeatle.toLowerCase() === encodeURI(beatle.name.toLowerCase())); //"John Lennon"

    if (foundBeatle) {
      res.writeHead(200, {'Content-Type':'application/json'}).end(JSON.stringify(foundBeatle));
    }else{
      res.writeHead(404, {'Content-Type':'text/plain'}).end('No se encontro un Beatle!');
    }
  }

  //home
  if (req.url === '/') {
    res.writeHead(200, {'Content-Type':'text/html'});
    let html = fs.readFileSync(__dirname + '/index.html');
    res.end(html);
  }

  let searchedBeatle = req.url.split('/').pop(); // Aca tengo que guardar en una variable
  // lo que escribieron despues de /api/ , x eso uso el metodo .split para separar el string de la url
  // en un array de strings e indico que lo separe cada vez haya una "/"
  // entonces me va quedar /api/john%20lennon --> ["api", "john%20lennon"] luego con el .pop
  // que devuelve el ultimo elemento de un array, va quedar guardado en searchedBeatle = "john%20lennon"
  // Como en nuestro array de objetos beatles, la propiedad name tiene como valor los nombres pero
  // escritos en mayusculas y sin el %20, debemos convertir nuesto searchBeatle en eso para poder buscarlo
  let foundBeatle = beatles.find(beatle => searchedBeatle.toLowerCase() === encodeURI(beatle.name.toLowerCase())); //"John Lennon" ---> "john%20lennon"
  // entonces creamos una nueva variable foundBeatle para guardar ahi el beatle que estoy buscando
  // con el metodo .find busco dentro del array beatles, digo que por cada elemento del array, se compare
  // lo que tengo guardado en searchBeatle pero en minusculas con lo que hay en la propiedad name pero en minusculas y a
  // su vez lo debo pasar al formato con el %20 asi quedan las dos variables iguales y se pueden comparar.
  // Para esto se usa el metodo encodeURI(beatle.name) -----> "john%20lennon" === "john%20lennon"
  if (foundBeatle) {
    res.writeHead(200, {'Content-Type':'text/html'});
    let html = fs.readFileSync(`${__dirname}/beatle.html`, 'utf-8')
    html = html.replace(/{name}/g, foundBeatle.name);
    html = html.replace('{birthdate}', foundBeatle.birthdate);
    html = html.replace('{profilePic}', foundBeatle.profilePic);
    res.end(html);
  }else{
    res.writeHead(404, {'Content-Type':'text/plain'})
    res.end('No se encontro un Beatle!');
  }


}).listen(3001, '127.0.0.1');

// Metodo .substring(posicion,cant de caracteres quiero extraer del string)