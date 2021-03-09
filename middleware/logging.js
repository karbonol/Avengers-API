var sessionStatus = []
function logging(req,res,next){
    const session = sessionStatus.find(ss=>ss.ip==req.ip)
    if(session){
        const elapsedTime = (Date.now()-session.timestamp)/1000
        if(elapsedTime>7){
            //removing and reseting session....
            sessionStatus.splice(sessionStatus.findIndex(ss=>ss==session),1)
            return res.send('Session killed try again')
        }
        //update session timestamp to current system time
        session.timestamp = Date.now()
    }else{
        //create session if not exist
        sessionStatus.push({ip:req.ip,timestamp:Date.now()})
    }
    next()
}
module.exports = logging