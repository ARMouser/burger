var db = require('../models')

module.exports = (function(app) {
    app.get('/api/burgers', function(req, res) {
        db.Burger.findAll({})
        .then(function(burgerTime) {
            res.json(burgerTime);
        });
    });

    app.post('/api/burgers', function(req, res) {
        db.Burger.create({
            burger_name: req.body.bName,
            burger_type: req.body.bType,
        }).then(function(burgerTime) {
            res.json(burgerTime);
        });
    });

    app.delete("/api/burgers/:id", function(req, res) {
        db.Burger.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(burgerTime) {
            res.json(burgerTime);
        });
    });

    app.put("/api/burgers", function(req, res) {
        
        db.Burger.update(req.body.devoured, {
            where: {
                id: req.body.id
            }
        }).then(function(burgerTime) {
            res.json(dbPost);
        });
    });
})