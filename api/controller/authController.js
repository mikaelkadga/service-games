const { User } = require('../../models')

module.exports = {
    register : (req, res, next) => {
        console.log(req.body)
      User.register(req.body)
        .then(() => {
            res.json("Register berhasil, silahkan login")
        })
        .catch(err =>  next(res.json("Periksa kembali data data login anda")))
    },
}