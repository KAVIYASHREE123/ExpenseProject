/*const express=require('express')
const bodyParser=require('body-parser')
const {connectdb,getdb}=require('./dbconnections.cjs')
const app=express()
const {ObjectId}=require('mongodb')
app.use(bodyParser.json())
let db
connectdb(function(error){
    if(error){
        console.log("couldn't connect")
        console.log(error)
    }
    else{
        app.listen(8000)
        db=getdb()
        console.log("app is running ")

    }
    
})
/*app.get('/',function(request,response){                           //testing
    response.json({
        "hello":"hii"
    })
})
app.post('/add-entry',function(request,response)
{
    db.collection('expenses').insertOne(request.body).then(function(){
        response.status(200).json({
            "status":"entry added successfully"
        })
        }).catch(function(){
            response.status(501).json({
                "status":"entry not added"
            })
       
    })

})
app.get('/get-entry',function(request ,response){

    const entry_array=[]
    db.collection('expense').find().forEach(element => entry_array.push(element)
   // console.log("entry pushed") 
        
    ).then(function(){
        response.status(200).json(entry_array)
    }).catch(function(){
        response.status(500).json({
            "status": "not-found"
        })
    })
})

app.delete('/delete-entry',function(request,response){
    if(ObjectId.isValid(request.query.id))
    {
        db.collection('expenses').deleteOne({
         _id:new ObjectId(request.query.id)
          }).then(function(){
         response.status(200).json({
             "status":"entry deleted"})
        }).catch(function(){
             response.status(500).json({
                 "status":"entry not deleted" })
              })
    }
   else
   {
    response.json({
        "status":"id is not valid" })
    }

    
})

app.patch('/update-entry/:id',function(request,response){                    //instead of patch we can also use put
   
    db.collection('expenses').updateOne(
        { _id:new ObjectId(request.params.id)},
        {$set:request.body}
    ).then(function(){
        response.status(200).json({
            "status":"updated"
        }).catch(function(){
            response.status(500).json({
                "status":"not updated"
            })
        })
    })
 })*/

 const express = require('express')
const bodyParser = require('body-parser')
const {ObjectId} = require('mongodb')
// Importing required functions from dbConnection.cjs
const {connectToDb, getDb} = require('./dbconnections.cjs')
const cors=require('cors')
const app = express()
app.use(bodyParser.json())
app.use(cors())
let db
connectToDb(function(error) {
    if(error) {
        console.log('Could not establish connection...')
        console.log(error)
    } else { // if no error in establishing connection
        // process.env.PORT : cloud service
        // 8000 : local machine
        const port = process.env.PORT || 8000
        app.listen(port)
        db = getDb()
        console.log(`Listening on port ${port}...`)
    }
})

/**
 * Expense Tracker
 * Functionalities : adding entry, getting the summaries of previous entries, editing and deleting
 * Input fields : Category, Amount, Date
 * 
 * CRUD : Create, Read, Update and Delete
 * 
 * get-entries / get-data - GET
 * add-entry - POST
 * edit-entry - PATCH
 * delete-entry - DELETE
 */

app.post('/add-entry', function(request, response) {
    db.collection('expenses').insertOne(request.body).then(function() {
        response.status(201).json({
            "status" : "Entry added successfully"
        })
    }).catch(function () {
        response.status(500).json({
            "status" : "Entry not added"
        })
    })
})

app.get('/get-entry', function(request, response) {
    // Declaring an empty array
    const entries = []
    db.collection('expenses')
    .find()
    .forEach(entry => entries.push(entry))
    .then(function() {
        response.status(200).json(entries)
    }).catch(function() {
        response.status(500).json({
            "status" : "Could not fetch documents"
        })
    })
})

app.delete('/delete-entry', function(request, response) {
    if(ObjectId.isValid(request.query.id)) {
        db.collection('expenses').deleteOne({
            _id : new ObjectId(request.query.id)
        }).then(function() {
            response.status(200).json({
                "status" : "Entry successfully deleted"
            })
        }).catch(function() {
            response.status(500).json({
                "status" : "Entry not deleted"
            })
        })
    } else {
        response.status(500).json({
            "status" : "ObjectId not valid"
        })
    }
})

app.patch('/update-entry/:id', function(request, response) {
    if(ObjectId.isValid(request.params.id)) {
        db.collection('expenses').updateOne(
            { _id : new ObjectId(request.params.id) }, // identifier : selecting the document which we are going to update
            { $set : request.body } // The data to be updated
        ).then(function() {
            response.status(200).json({
                "status" : "Entry updated successfully"
            })
        }).catch(function() {
            response.status(500).json({
                "status" : "Unsuccessful on updating the entry"
            })
        })
    } else {
        response.status(500).json({
            "status" : "ObjectId not valid"
        })
    }
})


