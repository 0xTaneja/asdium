
import {z} from 'zod';
export const signupinp=z.object({
    username:z.string().email(),
    password:z.string().min(6),
    name:z.string().optional()
  })

  export const signininp=z.object({
    username:z.string().email(),
    password:z.string().min(6),
  })

export const createBloginput=z.object({
  title:z.string(),
  content:z.string()
})

export const updateBlogInput=z.object({
  title:z.string(),
  content:z.string(),
  id:z.string().uuid()
})


export type signupinput=z.infer<typeof signupinp>;
export type signininput=z.infer<typeof signininp>;
export type cbloginput=z.infer<typeof createBloginput>;
export type ubloginput=z.infer<typeof updateBlogInput>;
