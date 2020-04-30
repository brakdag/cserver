/*
Convert JS
*/

const exec = require('child_process').spawn
const fs = require('fs')


var ruta = '/var/www/html/pelis/'


var config = function(){
  var buffer = fs.readFileSync("./data/config.json");
 this.ruta = JSON.parse(buffer).path
}
config.prototype.getRuta= function(){
  return this.ruta
}
config.prototype.setRuta= function (path){
  this.ruta = path;
}


var status = 'idle'

var setStatus =function(st){
  status = st;
}

var getStatus =function(){
  return status;
}

var addStatus = function(st){
  status+=st 
}


function getlist(cb){
    var a = new config;
    console.log(a)
    fs.readdir(a.getRuta(), function(err,data){cb(data)})
}


/**
  @param filename: Borra el archivo y el torrent correspondiente en la subcarpeta torrents.
*/

function delfile(filename){
  //Borra el archivo.
  setStatus(`borrando:${filename}`)
   var borrar= exec('/bin/rm',[ruta+filename],{stdio:'inherit'})
   borrar.on('exit',function(){
    addStatus(` FILE OK`)
   });
 //borra el torrent.
   var borrartorrent= exec('/bin/rm',[ruta+"torrents/"+filename+".torrent"],{stdio:'inherit'})
   borrartorrent.on('exit',function(){
    addStatus(` TORRENT OK`)
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