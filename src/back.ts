import express from 'express';
import users from './userClass';
import products from './productsClass';
import mongo, { MongoClient } from "mongodb";
import { count } from 'console';
const app = express()
const cors = require('cors');
app.use(express.json());
app.use(cors());
const dbClient =new  MongoClient('mongodb://localhost:27017');
//const db = dbClient.db('usersShop');
//const collection = db.collection('users');
//collection.deleteMany({});
const addToDb = async(user: users) => {
    try{
        await dbClient.connect();
        console.log('connected')
        const db = dbClient.db('usersShop');
        const collection = db.collection('users');
        await collection.insertOne(user)
    }
    catch(err){
        console.log(err)
    }
    finally{
        await dbClient.close()
    }
    
}


const findInDb =async (req: Request ,req2: Request) => {
    
    try{
        await dbClient.connect()
        console.log('connected2')
        const db =dbClient.db('usersShop')
        const collection = db.collection('users')
        let exist = await collection.findOne({login:req,password:req2})
        if(exist){
            return(true)
           
        }
        else{
            return false
        }
    }
    catch(err){
        console.log(err)
    }
    finally{
        await dbClient.close()
    }
}


const logDb=async () =>{
    try{
        await dbClient.connect()
        const db =dbClient.db("usersShop")
        const collection = db.collection("users")
        const arr = await collection.find({}).toArray()
        arr.forEach((el)=>{
            console.log('{login: '+ el.login + ', password: ' +el.password+'}')
        })

        
    }
    catch(err){
        console.log(err)
    }
    finally{
        await dbClient.close()
    }
} 


const addProductIndB=async(product:products,login:string)=>{
    try{
        await dbClient.connect()
        const db =dbClient.db("usersShop")
        const collection = db.collection(`products/${login}`)
        const exist = await collection.findOne({name:product.name})
        console.log(product)
        if(exist){
            await collection.updateOne({name:product.name},{$set:{count:(product.count+exist.count)}})
        }
        else{
            await collection.insertOne(product)
        }
    }
    catch(error){
        console.log(error)
    }
    finally{
        await dbClient.close()
    }
}


const deleteProductIndB=async(product:products,login:string)=>{
    try{
        await dbClient.connect()
        const db = dbClient.db('usersShop')
        const collection = db.collection(`products/${login}`)
        console.log(login)
        console.log(product)
        const delete1 = await collection.deleteOne({
            id:product.id,
            name:product.name,
            price:product.price,
            count:count
        })
        
    }
    catch(err){
        console.log(err)
    }
    finally{
        await dbClient.close()
    }
}

const PrintProdactsFromDb=async(login:string)=>{
    try{
        await dbClient.connect()
        const db =dbClient.db("usersShop")
        const collection = db.collection(`products/${login}`)
        const arrProduct = await collection.find({}).toArray()
        return arrProduct
    }
    catch(err){
        console.log(err)
    }
    finally{
       await dbClient.close()
    }
    
}

app.post('/reg',async(req, res) => {
    let user =  new users(req.body.login1, req.body.password1)
    const exist1 = await findInDb(req.body.login1,req.body.password1)
    if(!exist1 && user.login!=''){
        await addToDb(user)
    }else{
        console.log('CУЩЕСТВУЕТ')
    }
})

app.post('/enter',async(req,res)=>{
    
    let user = new users(req.body.login , req.body.password)
    const exist = await findInDb(req.body.login,req.body.password)
    
    if(exist){
        console.log(user.login)
        res.send(user.login)
    }
    else{
        console.log('-')
        return(false)
    }

})

app.post('/cart',async(req,res)=>{
    const arr = await PrintProdactsFromDb(req.body.login)
    res.send(arr)
})

app.post('/cart/add',async(req,res)=>{
    const product = new products(req.body.id,req.body.name,req.body.price,req.body.count) 
    await addProductIndB(product,req.body.login)
})




app.delete('/cart/delete',async (req,res)=>{
    const product = new products(req.body.id,req.body.name,req.body.price,req.body.count)
    await deleteProductIndB(product,req.body.user)
    res.send(true)
})

app.listen(5000, () => {
    logDb()
    console.log('Server is running on port 5000')
})