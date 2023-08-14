const express=require('express');
const cors=require('cors');
const bodyparser=require('body-parser');
const mysql=require('mysql');

const add=express();
add.use(cors());
add.use(bodyparser.json());
add.use(express.json());
add.use(bodyparser.urlencoded({extended:true}));
add.use(express.static('public'));


let con=mysql.createConnection({
  host:"localhost",
  port:"3306",
  user:"root",
  password:"Naveen143@",
  database:"node1"
})

con.connect((error)=>{
  if(error){
    console.log(error);
  }
  else{
    console.log("data base is connected sucessfully");
  }
})


add.get('/getdata',(request,response)=>{
  let sql='select * from example';
  con.query(sql,(error,result)=>{
    if(error){
      response.send(error);
    }
    else{
      response.send(result);

    }
  })
})

add.post('/delete',(request,response)=>{
  let {si_no}=request.body;
  let sql='delete from example where si_no=?'
  con.query(sql,[si_no],(error,result)=>{
    if(error){
      let a={"status":"error"}
      response.send(a);
    }
    else{
      let a={"status":"success"}
      response.send(a)
    }
  })
})

add.post('/inserdata',(request,response)=>{
  let {name,phone_number,image}=request.body;
  let sql='insert into example values(?,?,?)';
  con.query(sql,[name,phone_number,image],(error,result)=>{
    if(error){
      let a={"status":"error"}
      response.send(a)
    }
    else{
      let a={"status":"success"}
      response.send(a)
    }
  })
})


add.listen(3005,()=>{
  console.log("the port is running in 3005");
})