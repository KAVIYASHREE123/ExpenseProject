/*const {MongoClient}=require('mongodb')
let dbconnections
function connectdb(callback){
  MongoClient.connect('mongodb+srv://Kaviya:Kaviyapass@cluster0.2mkp92j.mongodb.net/ExpenseData?retryWrites=true&w=majority')
  // mongodb+srv://Kaviya:<password>@cluster0.2mkp92j.mongodb.net/?retryWrites=true&w=majority
  .then(function(client){    //127.0.0.1
    dbconnections= client.db()
    callback()
  }).catch(function(error){
    callback(error)
  })
 
}
function getdb(){
   return dbconnections
}
module.exports={connectdb,getdb}*/

const {MongoClient} = require('mongodb')

let dbConnection
function connectToDb(callBack) {
    MongoClient.connect('mongodb+srv://Kaviya:Kaviyapass@cluster0.2mkp92j.mongodb.net/ExpenseData?retryWrites=true&w=majority').then(function(client) {
        dbConnection = client.db()
        callBack()
    }).catch(function(error) {
        callBack(error)
    })
}

function getDb() {
    return dbConnection
}

// Exporting required functions
module.exports = {connectToDb, getDb}