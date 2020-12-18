const { program } = require('commander');

const orch = require('./src/orchestra')

const utils = require('./src/utils')

program
    .option('-f, --file <file>', 'Ruta de archivo con lista de videos')
    // .option('-p, --parser <parser>', 'Parsea export de chat en una lista de links para ser descargados')
    .option('-p, --path <path>', 'Parsea export de chat en una lista de links para ser descargados')
    .option('-l, --list <list>', 'link de playlist para descargar elementos individuales')
    .action(async (dir, cmdObj) => {

        await utils.displayBanner()

        if (dir.file) {
            if (!dir.path) {
                console.log('Especifique la ruta de exportación')
                return 1;
            }
            try {
                let download = await orch.fileDownload(dir.path, dir.file)
            } catch (error) {
                console.log('index error' ,error)
            }
        }

        if (dir.parser) {

        }

        if (dir.list) {
            // if (!dir.path) {
            //     console.log('Especifique la ruta de exportación')
            //     return 1;
            // }
            try {
                let list = await orch.playlistDownload(dir.path, dir.list)
            } catch (error) {
                console.log('index error' ,error)
            }
        }
    });

program
    .parse(process.argv)



