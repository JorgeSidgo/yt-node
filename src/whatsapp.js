const fs = require('fs');
const whatsapp = require('whatsapp-chat-parser');

const fileContents = fs.readFileSync('/home/sidgo/Downloads/chat2.txt', 'utf8');

whatsapp
    .parseString(fileContents)
    .then(messages => {

        let filtered = messages
                        .filter(
                            item => item.message.includes('https://youtu.be/')
                        )
                        .filter(
                            item => item.date >= new Date(2020, 8, 28)
                        )
                        .map(
                            x => x.message.concat('\n')
                        )

        // let printTo = JSON.stringify(filtered.replace('"', ''));
        
        // console.log(printTo)    

        fs.writeFile('/home/sidgo/Music/songs_octubre_noviembre.txt', filtered, 'utf8', function (err, data) {
            if (err) {
                return console.log(err);
            }
            console.log(data);
        });


    })
    .catch(err => {
        console.log('error', err);
    });