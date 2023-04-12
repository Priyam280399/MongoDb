const express= require ("express");
const request= require ("http");
const path= require ("path");
const port = 8000;


const db = require('./config/mongoose');
const Contact = require('./model/contact');

const app = express();
app.use(express.urlencoded());

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.post("/input-data", async function (request, response) {
    let newContact = await Contact.create({
      name: request.body.name,
      phone: request.body.phone,
    });
    console.log("******", newContact);
    return response.redirect("back");
  });

  app.get("/", async function (request, response) {
    let contacts = await Contact.find({});
  
    return response.render("index", {
      tittle: "My Contact List",
      contact_list: contacts,
    });
  })
  app.listen(port, function (err) {
    if (err) {
      console.log("Error in Running Server ", err);
    }
    console.log("Server is running on ", port);
  });