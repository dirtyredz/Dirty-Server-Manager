const express = require('express')
const app = express()
import localStorage from '../lib/localStorage'

localStorage.setItem('WebServerPid',process.pid)

app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(3000, () => console.log('Example app listening on port 3000!'))


process.on('beforeExit',()=>{
  localStorage.clear()
  process.exit(0)
})