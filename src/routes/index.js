const router = require("express").Router();
const db = require("../services/dbsqlite");

router.get("/", (req, res) => {
  const sql = "SELECT * FROM Todos ORDER BY Title";
  db.all(sql, [], (err, rows) => {
    if (err) return console.error(err.message);

    res.render("index", { model: rows });
  });
});

router.get("/create", (req, res) => {
  res.render("create", { model: {} });
});
router.post("/create", (req, res) => {
  const sql = "INSERT INTO Todos (Title) VALUES (?)";
  const todo = [req.body.Title];

  db.run(sql, todo, (err) => {
    if (err) return console.error(err.message);

    res.redirect("/");
  });
});

router.get("/edit/:id", (req, res) => {
  const params = req.params.id;
  const editData = `SELECT * FROM Todos WHERE ID = ?`;
  db.get(editData, params, (err, row) => {
    if (err) return console.error(err.message);

    res.render("edit", { model: row });
  });
});

router.post('/edit/:id', (req, res) => {
    const params = req.params.id;
    const sql = `UPDATE Todos SET Title = ? WHERE ID = ${params}`;
    const todo = [req.body.Title]

    db.run(sql, todo, (err) => {
        if(err) return console.error(err.message)
        
        res.redirect('/')
    })
})

router.get('/delete/:id', (req, res) => {
    const sql = "DELETE FROM Todos WHERE ID = ?";
    const params = req.params.id;
    
    db.run(sql, params, (err) => {
        if(err) return console.error(err.message)

        res.redirect('/')
    })
})

module.exports = router;
