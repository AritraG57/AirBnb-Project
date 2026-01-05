//importing the modules
const Home = require("../models/Home");

exports.getAddHome = (req, res, next) => {
  res.render("host/edit-home", {
    pageTitle: "Add Home",
    currentPage: "add-home",
    editing : false
  });
};

exports.postAddHome = (req, res, next) => {
  const home = new Home(
    req.body.image,
    req.body.homename,
    req.body.rating,
    req.body.price,
    req.body.id
  );

  home.save();
  res.render("host/home-added", {
    pageTitle: "Home Added",
    currentPage: "home-added",
    
  });
};

exports.getHostHomes = (req, res, next) => {
  const registeredHomes = Home.fetchAll((registeredHomes) => {
    res.render("host/host-homes", {
      registeredHomes: registeredHomes,
      pageTitle: "Host Homes",
      currentPage: "host-homes",
    });
  });
};

exports.hostGetEditHomes = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true";
  Home.findById(homeId,(home)=> {
    console.log(home);
  res.render("host/edit-home", {
    home : home,
    editing : editing,
    pageTitle: "Add Home",
    currentPage: "add-home",
  });
  });
  
};

exports.postEditHomes = (req,res,next) => {
  const home = new Home(
    req.body.image,
    req.body.homename,
    req.body.rating,
    req.body.price,
    req.body.id
  );
  home.save();
  res.redirect("/host/host-homes");
};

exports.postDeleteHome = (req,res,next)=> {
  const homeId = req.params.homeId;
  Home.deleteById(homeId,(err)=> {
    if(err) {
      console.log("Error occured",err);
    }
    res.redirect('/host/host-homes');
  })
}
