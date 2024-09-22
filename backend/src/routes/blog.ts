import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import { createBloginput,updateBlogInput } from "@rushabt11/common";


const blog = new Hono<{
	Bindings: {
		DATABASE_URL: string,
		secret: string,
	},
  Variables:{
    userId:string
  }
}>();

// blog.use('/*', async (c, next) => {
// 	const jwt = c.req.header('Authorization');
// 	if (!jwt) {
// 		c.status(401);
// 		return c.json({ error: "unauthorized" });
// 	}
// 	const token = jwt.split(' ')[1];
// 	const payload = await verify(token, c.env.secret);
// 	if (!payload) {
// 		c.status(401);
// 		return c.json({ error: "unauthorized" });
// 	}
	
// 	await next()
// })
blog.post('/',async(c)=>{
  const body=await c.req.json();
  const {success}=createBloginput.safeParse(body);

  const authId=c.get("userId");
  if(!success)
  {
     c.status(411);
     c.json({
      message:"Blog Data Not Valid"
     })
  }
  console.log(authId);
  const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());
  
  try{
    const blog=await prisma.post.create({
      data:{
       title:body.title,
       content:body.content,
       authorId:authId
  
      }
    })
  
   
    return c.json({
      blogId:blog.id
    })
  }
  catch(e){
    console.log(e);
    c.status(501);
    c.json({msg:"Some Error"})
  }
  

  })
blog.put('/',async (c)=>{
    const body=await c.req.json();
    const {success}=updateBlogInput.safeParse(body);
    if(!success)
    {
      c.status(411);
      c.json({
       message:"Blog Data Not Valid"
      })
    }
    const prisma= new PrismaClient({
      datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const updatedblog=await prisma.post.update({
      where:{
        id:body.id
      },
      data:{
        title:body.title,
        content:body.content
      }
    })
    return c.json({
      blogId:updatedblog.id
    })
  })

  blog.get('/bulk',async(c)=>{
    const prisma=new PrismaClient({
      datasourceUrl:c.env.DATABASE_URL,
     }).$extends(withAccelerate());
  
     const allblogs=await prisma.post.findMany({
      select:{
        id:true,
        title:true,
        content:true,
        author:{
          select:{
            name:true
          }
        }
      }
     });
     return c.json({
      allblogs
     })
    })
blog.get('/:id',async(c)=>{
    const id = c.req.param('id');
    // const body=await c.req.json();
    const prisma=new PrismaClient({
     datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    console.log(id);
     try{
       const resultblog=await prisma.post.findFirst({
        where:{
          id:id
        },
        select:{
          id:true,
          title:true,
          content:true,
          author:{
            select:{
              name:true
            }
          }
        }
       
       })
       return c.json({
        resultblog
       })


     }
     catch(e)
     {
       c.status(411);
       return c.json({
        message:"Error While Fetching blog post"
       })

     }
     
  })


export default blog;