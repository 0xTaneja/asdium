import { Hono } from 'hono'
import user from './routes/user'
import blog from './routes/blog'
import { authMiddleware } from './middlewares/authmiddleware';
import { cors } from 'hono/cors'
const app = new Hono<{
    Bindings:{
        DATABASE_URL:string,
        secret:string
       }
}>();

// app.get('/', (c) => {
//   return c.text('Hello Hono!')
// })
app.use('/*', cors())
app.use('/api/v1/blog/*',authMiddleware)

app.route('/api/v1/user',user);
app.route('/api/v1/blog',blog);



export default app
