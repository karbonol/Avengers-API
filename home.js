const router = require('express').Router()
const homeRoute = (req,res)=>{
    res.send('welcome to avengers')
}
module.exports = homeRoute