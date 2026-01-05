const favourite = require("../models/favourites");
const home = require("../models/Home");

exports.homeList = (req, res, next) => {
  const registeredHomes = home.fetchAll((registeredHomes) => {
    res.render("store/index", {
      registeredHomes: registeredHomes,
      pageTitle: "Index",
      currentPage: "index",
    });
  });
};

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  home.findById(homeId, (home) => {
    console.log(home);
    if (!home) {
      res.redirect("/");
    } else {
      res.render("store/home-details", {
        home: home,
        pageTitle: "Home Details",
        currentPage: "index",
      });
    }
  });
};

exports.getAddToFavourites = (req, res, next) => {
  favourite.getFavourites((favourites) => {
    home.fetchAll((homes) => {
      const favouriteHomesWithDetails = favourites.map((homeId) => {
        return homes.find((home) => {
          return home.id === homeId;
        });
      });
      
      res.render("store/favourites", {
        registeredHomes: favouriteHomesWithDetails,
        pageTitle: "Favourites",
        currentPage: "favourites",
      });
    });
  });
};

exports.postAddToFavourites = (req, res, next) => {
  //   console.log("Came to ", req.body);
  favourite.addToFavourites(req.body.id, (err) => {
    // console.log("Error is", err);
    res.redirect("/favourites");
  });
};

exports.postDeleteFavourites = (req, res, next) => {
  const homeId = req.params.homeId;
  favourite.deleteFromFavourites(homeId, (err) => {
    if (err) {
      console.log("Error occured", err);
    }
    res.redirect("/favourites");
  });
};
