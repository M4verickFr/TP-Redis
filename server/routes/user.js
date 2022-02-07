//Access the router on Express 
const router = require('express').Router();

//Access the controllers
const controller = require('../controllers/user');


//CREATE
router.post("/user/create", (req, res) => {
    controller.create(req, res);

});

//UPDATE
router.put("/user/update/:id", (req, res) => {
    
    controller.update(req, res);

});

//DELETE
router.delete("/user/delete/:id", (req, res) => {
    
    controller.delete(req, res);

});


//READ

router.get("/", (req, res) => {
    
    controller.reads(req, res);

});

router.get("/users", (req, res) => {
    
    controller.reads(req, res);

});

router.get("/user/:id", (req, res) => {
    
    controller.read(req, res);

});

// LOGIN

router.post("/user/login", async (req, res) => {

    controller.login(req, res);

});

module.exports = router;

// LOGGED USER

// Middleware to verify jwt token
router.use((req, res, next) => {
    let token = req.headers["authorization"];
    if(token) {
        jwt.verify(token, 'info834', (err, decoded) => {
            if(err) {
                res.status(401).send({ message: "Invalid token" });
            } else {
                req.decoded = decoded;
                next();
            }
        }
    }
}