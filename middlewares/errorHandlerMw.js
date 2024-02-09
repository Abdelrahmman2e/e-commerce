module.exports=(err,req,res,nxt)=>{
    err.statusCode = err.statusCode ||500;
    err.status = err.status || "error";
    if(process.env.NODE_ENV ==='development'){
        sendErrorforDev(err,res)
    }else{
        sendErrorforProd(err,res)
    }
};

let sendErrorforDev=(err,res)=>{
    res.status(err.statusCode).json({
        status:err.status,
        error:err,
        msg:err.message,
        stack:err.stack
    });
};

let sendErrorforProd=(err,res)=>{
    
    res.status(err.statusCode).json({
        status:err.status,
        msg:err.message,
    });
}

