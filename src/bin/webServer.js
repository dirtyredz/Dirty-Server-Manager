import express from 'express';
import localStorage from '../lib/localStorage'
import path from 'path'
import * as globals from '../lib/globals'

const server = express();
localStorage.setItem('WebServerPid',process.pid)

// server.use(express.static(path.join(__dirname, 'build')));
server.use( '/public', express.static( path.resolve(globals.InstallationDir() + '/dsm/public') ) );
server.get('/*', function(req, res){
  res.sendFile(path.resolve(globals.InstallationDir() + '/dsm/public/index.html'));
});

server.listen(3000, () => console.log('Example app listening on port 3000!'))

process.on('beforeExit',()=>{
  localStorage.clear()
  process.exit(0)
})





