const express = require('express');
const app = express();
const fs = require('fs')
const PORT = 3000;
const cors = require('cors')
const canciones = JSON.parse(fs.readFileSync('repertorio.json'))


app.use(express.json())
app.listen(PORT, () => console.log(`Server escuchando al puerto: ${PORT}`));
app.use(cors())

app.use('/', express.static('public'));

app.get("/canciones", (req, res) => {
    const canciones = JSON.parse(fs.readFileSync("repertorio.json"));
    res.json(canciones);
});

app.put('/canciones/:id', (req, res) => {
    const cancion = req.body
    const { id } = req.params
    const index = canciones.findIndex(ind => ind.id == id)
    canciones[index] = cancion
    fs.writeFileSync('repertorio.json', JSON.stringify(canciones))
    res.send(`La canción ${cancion.titulo}, ha sido editada con exito!`)
})

app.post('/canciones', (req, res) => {
    const cancion = req.body
    canciones.push(cancion)
    fs.writeFileSync('repertorio.json', JSON.stringify(canciones))
    res.send(`Se ha agregado ${cancion.titulo} a tu repertorio!`)
})

app.delete('/canciones/:id', (req, res) => {
    const { id } = req.params
    const index = canciones.findIndex(ind => ind.id == id)
    const cancion = canciones[index]
    canciones.splice(index, 1)
    fs.writeFileSync('repertorio.json', JSON.stringify(canciones))
    res.send(`La canción ${cancion.titulo} ha sido eliminada de tu repertorio`)
})

app.use('*', (req, res) => {
    res.status(404).send('Por favor, verifique la ruta de acceso')
})






