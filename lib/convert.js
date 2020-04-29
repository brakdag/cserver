const exec = require('child_process').spawn
const fs = require('fs')
const ruta = '/var/www/html/pelis/'

function delfile(filename,callback){
   var borrar= exec('/bin/rm',[ruta+filename],{stdio:'inherit'})
   borrar.on('exit',function(){
       callback('borrado')
   });
}

function getlist(callback ){
fs.readdir(ruta, function(err,data){callback(data)})
}

function convert(archivo,callback){
    var child = exec('/usr/bin/ffmpeg',['-i',`${ruta+archivo}.mkv`,'-c:v','copy','-c:a','copy',`${ruta+archivo}.mp4` ],{stdio:'inherit'});
    child.on('exit',code=>{
    callback("finalizado")
    })

}


module.export={getlist,delfile,convert}