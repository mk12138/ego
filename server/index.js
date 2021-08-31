const  express = require('express')
const app = express()
//post 请求表单数据
app.use(express.urlencoded({ extended: true }))


 //配置资源共享
 const cors=require('cors')
 app.use(cors())

//静态文件托管 ----  访问：http:localhost:5000/图片.jpg
app.use(express.static('upload'))



//引入路由
const router = require('./router')





//路由
app.use('/',router)


app.listen(8888,()=>{
    console.log(8888);
})