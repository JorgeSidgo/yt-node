const fs = require('fs')
const readline = require('readline')
const downloader = require('./downloader')
const ora = require('ora')
const spinner = ora('')

module.exports = {

    download: function (path) {

        return new Promise(async (resolve, reject) => {

            spinner.color = 'green'
            spinner.text = '[Descargando]'
            let paths = []

            const file = fs.createReadStream(path)

            const rl = readline.createInterface({
                input: file,
                crlfDelay: Infinity
            })

            let counter = 57

            for await (const line of rl) {

                if(line == 'STOP') {
                    spinner.succeed('[Descarga finalizada] ')
                    resolve(paths)
                } else {
                    let res;
                    try {
                        let currentLink = line.replace(',', '')
                        spinner.text = `[Descargando] - ${counter} - ${currentLink}`
                        spinner.start()
                        res = await downloader.download(line.replace(',', ''), counter)
                        spinner.succeed(`[Descargado] - ${counter} - ${res}`)
                        counter++
                    } catch(e) {
                        spinner.fail('[Error al descargar] ' + e[1])
                        reject(e[0])
                    }
                    
                }


                
            }
        })

    }
}