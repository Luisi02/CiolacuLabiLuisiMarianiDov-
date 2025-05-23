const express = require("express");
const http = require('http');
const path = require('path');
const app = express();
//const multer  = require('multer');
const database = require('./database.js');
app.use(express.json());

database.createTableType();
database.createTableBooking();

app.use("/", express.static(path.join(__dirname, "public")));

app.use("/files", express.static(path.join(__dirname, "files")));

app.post("/upload", async (req, res) => {
    //WEB SERVICE CHE PERMETTE DI AGGIUNGERE LE PRENOTAZIONI
    //console.log("UPLOAD REQ.BODY-> ", req);
    //console.log("REQ PARSED  -   ", JSON.parse(req.body))
    
    const booking = req.body.booking;
    console.log("REQQQQQQ - -   ", booking);
    try {
        await database.insert(booking);
        console.log("AGGIUNTO -> ", booking)
        res.json({result: "ok"});
    } catch (e) {
        console.log(e);
        res.json({result: "ko"});
    }
});

app.get('/get', async (req, res) => {
    //WEB SERVICE CHE RESTITUISCE L'ELENCO DI TUTTE LE PRENOTAZIONI
    const books = await database.select();
    res.json(books);
    console.log("PRENOTAZIONI -> ", books);
})

app.get('/gettips', async (req, res) => {
    const tips = await database.selectTips();
    res.json(tips);
    console.log("TIPOLOGIE -> ", tips);
})


app.delete('/delete/:id', async (req, res) => {
    await database.delete(req.params.id);
    res.json({result: "ok"});
    
})

const server = http.createServer(app);
server.listen(5500, () => {
  console.log("- server running");
});
