import jwt from "jsonwebtoken";

//func to generate a token for user
export const generateToken = (userId)=>{
      console.log("Inside generateToken — userId:", userId); // 
    const token = jwt.sign({userId}, process.env.JWT_SECRET);
    return token;
}