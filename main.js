import './style.css'
import {createFFmpeg, fetchfile} from '@ffmpeg/ffmpeg'
const fileInput = document.querySelector("#uploader")
const ffmpeg = createFFmpeg({log: true})
const transcode = async ({ target: { files } }) => {
  if(crossOriginIsolated){
    const { name } = files[0];
    await ffmpeg.load();
    ffmpeg.FS('writeFile', name, await fetchFile(files[0]));
    await ffmpeg.run('-i', name, `-af "equalizer=f=1000:width_type=h:width=20000:g=30"`,'output.mp4');
    const data = ffmpeg.FS('readFile', 'output.mp4');
    const video = document.getElementById('player');
    video.src = URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }));
  }
  else{
    console.log("not gonner be working")
  }
}

fileInput.addEventListener("change", transcode)
