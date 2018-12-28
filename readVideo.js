const fs = require('fs')
let data = ''

const myStream = fs.createReadStream('file.txt')
myStream.setEncoding('UTF8')

myStream.on('data', chunk => {
    data += chunk +'\n'
})

myStream.on('end', () => {
    console.log(data)
    console.log('---End of the data---')
})


myStream.emit('data', 'Hi im the data')


