const config = {
    SECRET_KEY : process.env.SECRET_KEY || "JSNKFNKSDNNFDS"
}
console.log("secret key" + config.SECRET_KEY)
module.exports = config