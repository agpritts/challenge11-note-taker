const router = require('express').Router();
const fs = require('fs');
let uniqid = require('uniqid'); 

router.get("/notes", function(req, res) {
    fs.readFile("./db/db.json", "utf8", function (err, data) {
        if (err) {
            console.log(err);
            return;
        }
        res.json(JSON.parse(data));
    });
})

router.post("/notes", function(req, res) {
    let id = uniqid();
    let newNote = {
        id: id,
        title: req.body.title,
        text: req.body.text,
    };

    fs.readFile("./db/db.json", "utf8", function(err, data) {
        if (err) {
            console.log(err);
            return;
        }
        const notesArray = JSON.parse(data);
        notesArray.push(newNote);
        const stringifyNote = JSON.stringify(notesArray);
        fs.writeFile("./db/db.json", stringifyNote, (err) => {
            if (err) console.log(err);
            else {
                console.log("Note saved");
                res.json('added note')
            }
        });
    });
});

router.delete('/notes/:id', (req, res) => {
    const idToDelete = req.params.id;
    fs.readFile("./db/db.json", "utf8", function (err, data) {
        if (err) {
            console.log(err);
            return;
        }
        const noteArray = JSON.parse(data);
        const filterArray = noteArray.filter(note => note.id !== idToDelete)
        fs.writeFile("./db/db.json", JSON.stringify(filterArray), (err) => {
            if (err) console.log(err);
            else {
                console.log("Note deleted");
                res.json(filterArray)
            }
        });
    });

})


module.exports = router;