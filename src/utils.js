const fs = require('fs')
const colors = require('colors')

module.exports = {
    createPath: (path) => {

        if(!fs.existsSync(path)) {
            fs.mkdirSync(path, err => {
                if (err) { 
                    console.log(err);
                    throw 'Error al crear nuevo directorio'
                } 
            });
        }
        
    },

    displayBanner: async () => {
        fs.readFile(`${__dirname}/banner.txt`, 'utf8', function(err, data) {
            if (err) throw err;
            console.log(data.red.bgWhite)
            console.log('')
          });
    },

    appendToFile: (line, filename) => {
        console.log('appendToFile', line)
        fs.appendFile(`${__dirname}/${filename}.txt`, line, function(err) {
            if (err) throw err;
        });
    }
}