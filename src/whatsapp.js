const fs = require('fs');
const whatsapp = require('whatsapp-chat-parser');

const fileContents = fs.readFileSync('/home/bestand/Downloads/chat2.txt', 'utf8');

whatsapp
    .parseString(fileContents)
    .then(messages => {

        let filtered = messages
                        .filter(
                            item => item.date >= new Date(2020, 9, 8)
                        )
                        .map(
                            x => x.message.concat('\n')
                        )

        let printTo = JSON.stringify(filtered.length);
        
        console.log(printTo)    

        // fs.writeFile('/home/bestand/Music/songsdef.txt', filtered.toString(), 'utf8', function (err, data) {
        //     if (err) {
        //         return console.log('err', err);
        //     }
        //     console.log(data);
        // });


    })
    .catch(err => {
        console.log('error', err);
    });