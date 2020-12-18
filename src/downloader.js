const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const { response } = require('express');


module.exports = {
    download: (link, counter, parentPath) => {
        return new Promise((resolve, reject) => {

            let title = '';
            let video = ytdl(link, {                
                quality: 'highestaudio'
            })

            try {
                ytdl.getBasicInfo(link.trim()).then(data => {

                    title = data.videoDetails.title.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
                    let fullPath = `${parentPath}/${counter} - ${title}.mp3`

                    proc = new ffmpeg({
                        source: video
                    })
                    
                    proc.toFormat('mp3')
                        .on('error', reject)
                        .on('end', () => {
                            resolve(`${link} ~ ${title}`)
                        })
                        .save(fullPath)
                })
            } catch (e) {
                return {
                    cause: e,
                    element: title
                }
            }
        })
    }
}