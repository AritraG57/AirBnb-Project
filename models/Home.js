const fs = require("fs");
const rootDir = require("../utils/rootDir");
const path = require("path");
const favourite = require("./favourites");
// const registeredHomes = [];
const homeData = path.join(rootDir, "data", "homes.json");
const filePath = path.join(rootDir, "data", "homes.json");

class Home {
  constructor(image, homename, rating, price, id) {
    this.homename = homename;
    this.price = price;
    this.image = image;
    this.rating = rating;
    this.id = id;
  }

  save() {
    Home.fetchAll((registeredHomes) => {
      if (this.id) {
        registeredHomes = registeredHomes.map((home) => {
          if (home.id === this.id) {
            return this;
          } else {
            return home;
          }
        });
      } else {
        this.id = Math.random().toString();
      }
      fs.writeFile(homeData, JSON.stringify(registeredHomes), (err) => {
        console.log("File writing concluded", err);
      });
    });
  }

  static fetchAll(callback) {
    fs.readFile(filePath, (err, data) => {
      if (!err) {
        callback(JSON.parse(data));
      } else {
        callback([]);
      }
    });
    // return registeredHomes;
  }

  static findById(homeId, callback) {
    this.fetchAll((homes) => {
      const homefound = homes.find((home) => home.id === homeId);
      callback(homefound);
    });
  }

  static deleteById(homeId, callback) {
    this.fetchAll((allHomes) => {
      favourite.deleteFromFavourites(homeId,err=> {
        
      })
      allHomes = allHomes.filter((home) => {
        if (home.id === homeId) {
          
          return false;
        } else {
          return true;
        }
      });
      fs.writeFile(homeData, JSON.stringify(allHomes), callback);
    });
  }
}

module.exports = Home;
