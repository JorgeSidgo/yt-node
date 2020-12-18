const readline = require('readline');
const downloader = require('./downloader');
const ora = require('ora');
const spinner = ora('');
const utils = require('./utils');
const fs = require('fs')
const ytlist = require('youtube-playlist');
const ytpl = require('ytpl');

module.exports = {

    fileDownload: (path, sourceFile) => {
        return new Promise(async (resolve, reject) => {
            utils.createPath(path)

            const file = fs.createReadStream(sourceFile)

            const rl = readline.createInterface({
                input: file,
                crlfDelay: Infinity
            })

            counter = 378

            for await (const line of rl) {

                if (line == 'STOP') {
                    spinner.succeed('[Descarga finalizada] ')
                } else {
                    let item;
                    try {
                        let currentLink = line.replace(',', '')

                        if (counter === 1) {
                            setTimeout(() => {
                                spinner.text = `[Descargando] - ${counter} - ${currentLink}`
                                spinner.start()
                            }, 500);
                        } else {
                            spinner.text = `[Descargando] - ${counter} - ${currentLink}`
                            spinner.start()
                        }

                        item = await downloader.download(currentLink, counter, path).catch(e => {
                            utils.appendToFile(currentLink, 'failed');
                            spinner.fail('[Error al descargar] ' + JSON.stringify(e))
                            reject(e)
                        })

                        spinner.succeed(`[Descargado] - ${counter} - ${item}`)
                        counter++
                    } catch (e) {
                        spinner.fail('[Error al descargar] ' + e)
                        utils.appendToFile(currentLink, 'failed');
                        reject(e)
                    }

                }
            }
        })

    },

    playlistDownload: (path, listLink) => {
        return new Promise(async (resolve, reject) => {

            utils.createPath(path)

            const pl = await ytpl(listLink, {
                limit: Infinity
            });

            let links = pl.items.map(x => x.shortUrl);

            counter = 1

            for await (let link of links) {
                let item;
                try {
                    let currentLink = link

                    if (counter === 1) {
                        setTimeout(() => {
                            spinner.text = `[Descargando] - ${counter} - ${currentLink}`
                            spinner.start()
                        }, 500);
                    } else {
                        spinner.text = `[Descargando] - ${counter} - ${currentLink}`
                        spinner.start()
                    }

                    item = await downloader.download(currentLink, counter, path).catch(e => {
                        utils.appendToFile(currentLink, 'failedFromList');
                        spinner.fail('[Error al descargar] ' + JSON.stringify(e))
                        reject(e)
                    })

                    spinner.succeed(`[Descargado] - ${counter} - ${item}`)
                    counter++
                } catch (e) {
                    spinner.fail('[Error al descargar] ' + e)
                    utils.appendToFile(currentLink, 'failedFromList');
                    reject(e)
                }


            }
        })
    },

    failedDownloads: (link, title) => {

    }
}