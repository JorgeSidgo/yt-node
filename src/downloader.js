const ytdl = require('ytdl-core')
const ffmpeg = require('fluent-ffmpeg')
const { response } = require('express')


module.exports = {
    download: (link, counter) => {
        return new Promise((resolve, reject) => {

            const path = '/home/sidgo/Music/VIEJO/Musica/OcNov'
            let title = '';
            let video = ytdl(link, {                
                quality: 'highestaudio'
            })

            try {
                ytdl.getBasicInfo(link.trim()).then(data => {

                    // resolve(JSON.stringify(data.formats))

                    title = data.videoDetails.title
                  
                    let fullPath = `${path}/${counter} - ${title}.mp3`

                    proc = new ffmpeg({
                        source: video
                    })
                    proc.setFfmpegPath("/usr/bin/ffmpeg")
                    proc.toFormat('mp3')
                        .on('error', reject)
                        .on('end', () => {
                            resolve(`${link} ~ ${title}`)
                        })
                        .save(fullPath)


                })
            } catch (e) {
                reject([e, title])
            }


        })
    }
}