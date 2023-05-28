const {exec} = require('child_process');
const {promisify} = require('util');
const tar = require('tar');
const execAsync = promisify(exec);
const fs = require('fs');


const videoProcessor = async (videoPath) => {
    
    const frameCount = await videoFrameCount(videoPath);
    const digitCount = "0" + frameCount.toString().trim().length;
    
    const ffmpegCommand = `ffmpeg -i ${videoPath} ./frames/%${digitCount}d.jpg`
    const {stdout} = await execAsync(ffmpegCommand);
    return stdout;
    };

const videoFrameCount = async (videoPath) => {
    const {stdout} = await execAsync(`ffprobe -v error -select_streams v:0 -count_packets -show_entries stream=nb_read_packets -of csv=p=0 ${videoPath}`);
    return stdout;
    };


(async () => {
    try {
        const allFrameFileNames = await fs.promises.readdir('./frames');
        //await videoProcessor('BookFlipping.mov');
        tar.c({
            gzip: false,
            file: '../assets/frames.tar',
            cwd: './frames/'
        },
            allFrameFileNames);
        
    } catch (error) {
        console.error(error);
    }
} 
)();

