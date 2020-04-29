/*
Convert JS

*/
const exec = require('child_process').spawn
const fs = require('fs')
const ruta = '/var/www/html/pelis/'

var status = 'idle'

var setStatus =function(st){
  status = st;
}

var getStatus =function(){
  return status;
}


function getlist(cb){
    fs.readdir(ruta, function(err,data){cb(data)})
}



function delfile(filename){
    setStatus(`borrando:${filename}`)
   var borrar= exec('/bin/rm',[ruta+filename],{stdio:'inherit'})
   borrar.on('exit',function(){
    setStatus(`borrado:${filename}`)
   });
}

function convert(archivo){
    setStatus(`Convirtiendo: ${archivo}`)
    var archivo = archivo.substr(0,archivo.length-4)
    var child = exec('/usr/bin/ffmpeg',['-i',`${ruta+archivo}.mkv`,'-c:v','copy','-c:a','copy',`${ruta+archivo}.mp4` ],{stdio:'inherit'});
    child.on('exit',code=>{
    setStatus(`Finalizado: ${archivo}`)
    });

}

module.exports={getlist,delfile,convert,setStatus,getStatus}