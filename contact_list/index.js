const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');

const Contact = require('./models/contact');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
var contactList = [
    {
        name: "Arpan",
        phone: "1111111111"
    },
    {
        name: "Tony Stark",
        phone: "1234567890"
    },
    {
        name: "Coding Ninjas",
        phone: "12131321321"
    }
]

app.get('/', function(req, res){

    Contact.find()
    .then((contacts)=>{
        return res.render('home',{
            title: "Contact List",
            contact_list: contacts
        });
    })
    .catch((err)=>{
        console.error(err);
    })
    
})

app.get('/practice', function(req, res){
    return res.render('practice',{
        title: "Contact List",
        contact_list: contactList
    });
})

app.post('/create-contact', function(req, res){

    Contact.create(req.body).then((newContact) =>{
        // console.log('Object saved successfully:', newContact);
        return res.redirect('back');
    }).catch((err) =>{
        console.error(err);
        return res.redirect('back');
    })
    
})


app.listen(port, function(err){
    if (err) {
        console.log("Error in running the server", err);
    }
    console.log('Yup!My Server is running on Port', port);
});

app.get('/delete-contact', function(req, res){
  // console.log(req.query);
    let id = req.query.id

    // let contactindex = contactList.findIndex(contact => contact.phone == phone);

    // if(contactindex != -1){
    //     contactList.splice(contactindex, 1);
    // }

    Contact.findByIdAndDelete(id)
    .then((data)=>{
        console.log('deleted data is ',data);
        return res.redirect('back');
    }).catch((err) =>{
        console.error(err);
        return res.redirect('back');
    })

    
});