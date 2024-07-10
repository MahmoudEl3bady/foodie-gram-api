import bcrypt from 'bcrypt';

const users =[];


export const signup = async(req,res)=>{
    const {fName,lName,pass,usrName}= req.body;
    try{
    const newUser={
        fName : fName,
        lName : lName,
        pass  : await bcrypt.hash(pass,10),
        usrName : usrName,
    }
    users.push(newUser);
    res.status(201).json(users);
}catch(err){
    res.status(401).json({msg:err});
}
}



export const signIn = async (req,res,next)=>{
    const {usrName,pass}=req.body;
    const user = users.find(user=>user.usrName===usrName);
    if(!user){
        return next(); 
    }
    try{
    if (await bcrypt.compare(pass,user.pass)){
     return res.status(200).json({msg:'signedin'});
    }
    return res.status(400).json({msg:'invalid credantials'});
}catch (err){
    res.status(400).json({masg:err});
}
}