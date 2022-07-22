var fs = require('fs');
const axios = require('axios');

module.exports = {
    pwd: function(args, done) {
        //process.stdout.write(process.cwd())
        done(process.cwd()) // esto reemplaza lo comentado arriba xq refactorizo
    },
    date: function(args, done) {
        //process.stdout.write(Date());
        done(Date())
    },
    ls: function(args, done) {
        fs.readdir('.', 'utf-8', function(err, files) { //[file, file, ...]
            if(err) throw err;
            let lines = '';
            process.stdout.write('\n');
            files.forEach(file => {
                //process.stdout.write(file + '\n');
                lines = lines + file + '\n';
            })
            done(lines)
            //process.stdout.write('\nprompt > ');
        })
    },
    echo: function(args, done) { //[]
        //process.stdout.write(args.join(' ')); // 'hola mundo'
        done(args.join(' '))
    },
    cat: function(args, done) { // [bash.js]
        fs.readFile(args[0], 'utf-8', function(err, file) {
            if(err) throw err;
            // process.stdout.write(file);
            // process.stdout.write('\nprompt > ');
            done(file)
        })
    },
    head: function(args, done) { // [bash.js]
        fs.readFile(args[0], 'utf-8', function(err, file) {
            if(err) throw err;
            const lines = file.split('\n').slice(0, 3) // [linea1, linea2, ...]
            // process.stdout.write(lines.join('\n'));
            // process.stdout.write('\nprompt > ');
            done(lines.join('\n'))
        })
    },
    tail: function(args, done) {
        fs.readFile(args[0], 'utf-8', function(err, file) {
            if(err) throw err;
            const lines = file.split('\n').slice(-3) // [linea1, linea2, ...]
            // process.stdout.write(lines.join('\n'));
            // process.stdout.write('\nprompt > ');
            done(lines.join('\n'))
        })
    },
    curl: function(args, done) { // [url]
        axios(args[0])
        .then(data => {
            // process.stdout.write(data.data.toString());
            // process.stdout.write('\nprompt > '); 
            done(data.data.toString())
        })
        .catch(err => {
            console.log(err)
        })
    },
}

// DRY --> don't repeat yourself 

