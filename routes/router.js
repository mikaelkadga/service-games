const router = require('express' ).Router()

const authController = require("../api/controller/authController");

router.post('/api/v1/auth/register', authController.register)

module.exports = router;
