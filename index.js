const {
    program
} = require('commander');
const cmd = require('commander')

const orch = require('./src/orchestra')


cmd.command('blk')
    .requiredOption('-f, --file <file>', 'Ruta de archivo con lista de videos')
    // .option('-p, --parse <parse>', 'Parsea export de chat en una lista de links para ser descargados')
    .action(async (cmObj) => {
        const filePath = cmObj.file;
        const fetch = cmObj.fetch;
        try {
            let download = await orch.download(filePath)    
        } catch (error) {
            console.log(error)
        }
        
    })

program.parse(process.argv)