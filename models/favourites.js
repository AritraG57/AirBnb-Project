const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/rootDir");
const favouriteDataPath = path.join(rootDir, "data", "favourite.json");

module.exports = class favourite {
  static addToFavourites = (homeId, callback) => {
    this.getFavourites((favourites) => {
      if (favourites.includes(homeId)) {
        // console.log("Already Exixts");
        callback(null);
      } else {
        favourites.push(homeId);
        fs.writeFile(favouriteDataPath, JSON.stringify(favourites), (err) => {
          // console.log("File Writting Concluded",err);
          callback(err);
        });
      }
    });
  };

  static getFavourites = (callback) => {
    fs.readFile(favouriteDataPath, (err, data) => {
      if (!err) {
        callback(JSON.parse(data));
      } else {
        callback([]);
      }
    });
  };

  static deleteFromFavourites = (homeId, callback) => {
    favourite.getFavourites((favouriteList) => {
      favouriteList = favouriteList.filter((fav) => {
        if ((fav === homeId)) {
          return false;
        } else {
          return true;
        }
      });
      fs.writeFile(favouriteDataPath, JSON.stringify(favouriteList), callback);
    });
  };
};
