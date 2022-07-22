// CREAR LOS SIGUIENTES COMANDOS Y SUS FUNCIONALIDADES:
// pwd --> print working directory --> imprime el directorio actual
// date --> devuelve la fecha actual
// ls --> list --> lista todos los archivos del directorio actual
// echo --> me responde con la misma data que yo ingreso
// cat --> devuelve todo el contenido de un archivo
// head --> devuelve las primeras lineas de un archivo
// tail --> devuelve las últimas lineas de un archivo
// curl --> client url --> mostrar el contenido de una página 

const commands = require('./commands/index.js') // {}

function done(output) { // creo esta funcion para refactorizar mi codigo repetitivo
  process.stdout.write(output)
  process.stdout.write('\nprompt > ');
}

process.stdout.write('prompt > ');

process.stdin.on('data', function(data) { // curl https://www.google.com
  var args = data.toString().trim().split(' '); // [https://www.google.com]
  var cmd = args.shift(); // curl  --> saca el 1° elem del array

  if(!commands.hasOwnProperty(cmd)) {  // echo
    process.stdout.write('Comando no válido')
  }
  else {
    commands[cmd](args, done); // commands.cat ([bash.js])
  }
})