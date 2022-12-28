const express=require('express')
const app=express()
app.use('/public', express.static('public2'));
app.use(express.urlencoded({extended:true}))
var methodOverride=require('method-override')
app.use(methodOverride('_method'))
app.set('view engine','ejs')
let arr=[]
app.get('/',(req,res)=>{

    res.render('todo',{arr})
})

app.post('/', (req, res)=>{
    arr.push(req.body.data);
    res.redirect('/');
    
    
})
app.get('/edit/:id',(req,res)=>{
    const idu=req.params.id;
    console.log(idu)
    res.render('edittodo',{idu,val:arr[idu]});
})
app.put('/edit',(req,res)=>{
    const index=req.body.toedit
    const str=req.body.editlist
    arr[index]=str
    res.redirect('/')
})

app.delete('/delete/:id',(req,res)=>{
    const idx=req.params.id
    console.log(arr[idx])
    const deleted=arr.filter((c,d)=>{
        return d!==Number(idx)
    } )
    console.log(deleted)
    arr=deleted
    res.redirect('/')
})



app.listen(2112,()=>{
    console.log("server runnig at 2112")
})