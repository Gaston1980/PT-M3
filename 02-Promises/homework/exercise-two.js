'use strict';

var Promise = require('bluebird'),
    async = require('async'),
    exerciseUtils = require('./utils');

var readFile = exerciseUtils.readFile,
    promisifiedReadFile = exerciseUtils.promisifiedReadFile,
    blue = exerciseUtils.blue,
    magenta = exerciseUtils.magenta;

var args = process.argv.slice(2).map(function(st){ return st.toUpperCase(); });

module.exports = {
  problemA: problemA,
  problemB: problemB,
  problemC: problemC,
  problemD: problemD,
  problemE: problemE
};

// corre cada problema dado como un argumento del command-line para procesar
args.forEach(function(arg){
  var problem = module.exports['problem' + arg];
  if (problem) problem();
});

function problemA () {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * A. loggea el poema dos stanza uno y stanza dos en cualquier orden
   *    pero loggea 'done' cuando ambos hayan terminado
   *    (ignora errores)
   *    nota: lecturas ocurriendo paralelamente (en simultaneo)
   *
   */

  // callback version
 /* async.each(['poem-two/stanza-01.txt', 'poem-two/stanza-02.txt'],
    function (filename, eachDone) {
      readFile(filename, function (err, stanza) {
        console.log('-- A. callback version --');
        blue(stanza);
        eachDone();
      });
    },
    function (err) {
      console.log('-- A. callback version done --');
    }
  );
*/
  // promise version:
  
//PARALELO
  // promise version
  const p1 = promisifiedReadFile('poem-two/stanza-01.txt').then(stanza1 => blue(stanza1))
  // p1 = {status: 'pending', result: undefined} al principio se crea asi la promesa
  // p1 = {status: 'fulfilled', result: stanza1} una vez se resuelve exitosamente se manda lo que hay en result al successHandler
  //successHandler p1: stanza => blue(stanza)
  const p2 = promisifiedReadFile('poem-two/stanza-02.txt').then(stanza2 => blue(stanza2))
  // p2 = {status: 'pending', result: undefined} al principio se crea asi la promesa
  // p2 = {status: 'fulfilled', result: stanza2}
  //successHandler p2: stanza => blue(stanza)

 //Promise.all([{status: 'pending', res: undefined}, {status: 'pending', res: undefined}]) recibe las 2 promesas y espera a que se resuelvan todas
  Promise.all([p1, p2]) // Retorna una nueva promesa --> 
  .then((iterable) => { // la funcion succesHandler recibe x arg un array con la data de cada result de cada promesa [stanza1, stanza2]
    // blue(iterable[0])
    // blue(iterable[1])
    //interable.forEach(s => blue(s))
    console.log('done')})




}

function problemB () {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * B. loggea todas las stanzas en poema dos, en cualquier orden y loggea
   *    'done' cuando todas hayan terminado
   *    (ignora errores)
   *    nota: las lecturas ocurren en paralelo (en simultaneo)
   *
   */

  var filenames = [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) { 
    return 'poem-two/' + 'stanza-0' + n + '.txt';
  });
  // esto devuelve: 

  /* filename = [
    'poem-two/stanza-01.txt',
    'poem-two/stanza-02.txt',
    'poem-two/stanza-03.txt',
    'poem-two/stanza-04.txt',
    'poem-two/stanza-05.txt',
    'poem-two/stanza-06.txt',
    'poem-two/stanza-07.txt',
    'poem-two/stanza-08.txt'
    ]

  */
  /*// callback version
  async.each(filenames,
    function (filename, eachDone) {
      readFile(filename, function (err, stanza) {
        console.log('-- B. callback version --');
        blue(stanza);
        eachDone();
      });
    },
    function (err) {
      console.log('-- B. callback version done --');
    }
  );
*/
  // promise version:
  const promises = filenames.map(filename => promisifiedReadFile(filename).then(stanza => blue(stanza)))
  // promises = [{status: "pend", result: undefined}, {}, {}, {}, {}, {}, {}, {}] un array con 8 promesas

  Promise.all(promises) // recibe x argumento el array de promesas y devuelve una nueva promesa
  .then(() => console.log('done')) // una vez se resolvieron todas las promesas, la nueva promesa se resuelve en positivo y se ejecuta el success Handler

}
  



function problemC () {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * C. Lee y loggea todas las stanzas en el poema dos, *en orden* y
   *    loggea 'done cuando hayan terminado todas
   *    (ignorá errores)
   *    nota: las lecturas ocurren en serie (solo cuando las previas
   *    hayan terminado)
   *
   */

  var filenames = [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) {
    return 'poem-two/' + 'stanza-0' + n + '.txt';
  });
  // esto devuelve: 

  /* filename = [
    'poem-two/stanza-01.txt',
    'poem-two/stanza-02.txt',
    'poem-two/stanza-03.txt',
    'poem-two/stanza-04.txt',
    'poem-two/stanza-05.txt',
    'poem-two/stanza-06.txt',
    'poem-two/stanza-07.txt',
    'poem-two/stanza-08.txt'
    ]

  */
  // callback version
  /*async.eachSeries(filenames,
    function (filename, eachDone) {
      readFile(filename, function (err, stanza) {
        console.log('-- C. callback version --');
        blue(stanza);
        eachDone();
      });
    },
    function (err) {
      console.log('-- C. callback version done --');
    }
  );
*/
  // promise version
  // Usamos el metodo .each de la libreria de bluebird (libreria con metodos para usar en promesas, se debe hacer el require)
  Promise.each(filenames, function(file) {
    return promisifiedReadFile(file).then(stanza => blue(stanza))
  })
  .then(() => console.log('done'))

}

function problemD () {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * D. loggea todas las stanzas en el poema dos *en orden* asegurandote
   *    de fallar para cualquier error y logueando un 'done cuando todas
   *    hayan terminado
   *    nota: las lecturas ocurren en serie (solo cuando las previas
   *    hayan terminado)
   *
   */

  var filenames = [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) {
    return 'poem-two/' + 'stanza-0' + n + '.txt';
  });
  var randIdx = Math.floor(Math.random() * filenames.length);
  filenames[randIdx] = 'wrong-file-name-' + (randIdx + 1) + '.txt';

  // callback version
 /* async.eachSeries(filenames,
    function (filename, eachDone) {
      readFile(filename, function (err, stanza) {
        console.log('-- D. callback version --');
        if (err) return eachDone(err);
        blue(stanza);
        eachDone();
      });
    },
    function (err) {
      if (err) magenta(new Error(err));
      console.log('-- D. callback version done --');
    }
  );
*/
  // promise version con metodo.each de la libreria de Bluebird
  Promise.each(filenames, function(file) {
    return promisifiedReadFile(file).then(stanza => blue(stanza))
  })
  .then(() => console.log('done'))
  .catch(err => { 
    magenta(new Error(err))
    console.log('done')
  })



}

function problemE () {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * E. Haz una versión promisificada de fs.writeFile
   *
   */

  var fs = require('fs');  // utilizamos el metodo .writeFile del modulo de file system, permite escribir en un archivo 

    function promisifiedWriteFile (filename, str) {
      return new Promise((resolve, reject) => {
        fs.writeFile(filename, str, 'utf-8', function(err, data) {
           if (err) return reject(err) // la promesa se resuleve como {status: "rejected" result: err}
           resolve(data) // la promesa se resuelve como {status: "fullfilled" result: data}
        })
      })
    }
  }

    
    promisifiedWriteFile('./index.pdf', "Agrega esto al file: ciudad New York") // se crea la preomesa {status: "pending" result: undefined}
    .then(data => console.log('Se escribió ok', data)) // se resolvio bien {status: "fullfilled" result: data}
    .catch(err => console.log('Hay Error', err)) // se resolvio mal {status: "rejected" result: err}
    
    