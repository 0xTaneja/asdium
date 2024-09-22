import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode,verify,sign } from "hono/jwt";
import { signupinp,signininp } from "@rushabt11/common";






const user = new Hono<{
	Bindings: {
		DATABASE_URL: string,
		secret: string,
	}
}>();


user.post('/signup',async(c)=>{
  // console.log(c.env.DATABASE_URL);
  // console.log(c.env.secret);
  console.log(c.env);
  const body = await c.req.json();
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());
  const {success}=signupinp.safeParse(body);
  if(!success)
  {
      c.status(411);
      c.json({msg:"Incorrect User Details"})
  }



  try{
    const userd = await prisma.user.create({
      data:{
        name:body.name,
        email:body.username,
        password:body.password,
      }
    })
    console.log(userd);
  
    const token = await sign({id:userd.id},c.env.secret);
    console.log(token)
    return c.json({
      jwtToken:token
    })
  }
  catch(e)
  {

    console.error('Error creating user:', e);
    c.status(403);
		return c.json({ error: "error while signing up" });
  }
 
  
})

user.post('/signin',async (c)=>{
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body =  await c.req.json();
  const {success}=signininp.safeParse(body);
  if(!success)
  {
      c.status(411);
      c.json({msg:"Incorrect User Details"})
  }



  try{
    const user=await prisma.user.findUnique({
      where:{
        email:body.username,
        password:body.password
      }
    })
    if(!user)
    {
      c.status(403);
      return c.json({
      error:"User Not Found"
      })
    }
    const token= await sign({id:user.id},c.env.secret);
    return c.json({jwttoken:token});

  }
  catch(e)
  {
    return c.json({
      error:"Something went wrong"
    })
  }


  
})

export default user;