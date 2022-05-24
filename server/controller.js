const houses = require("./db.json");
let globalID = 4;

module.exports = {
  getHouses: (req, res) => {
    res.status(200).send(houses);
    // console.log(houses);
  },
  deleteHouse: (req, res) => {
    let index = houses.findIndex((elem) => elem.id === +req.params.id);
    houses.splice(index, 1);
    res.status(200).send(houses);
    // console.log(houses);
  },
  createHouse: (req, res) => {
    let { address, price, imageURL } = req.body;

    let newHouse = {
      id: globalID,
      address,
      price,
      imageURL,
    };

    houses.push(newHouse);
    globalID++; // adds 1 to new id
    res.status(200).send(houses);
  },
  updateHouse: (req, res) => {
    let id = req.params.id;
    let type = req.body.type;

    let index = houses.findIndex((elem) => +elem.id === +id);

    if (houses[index].price <= 0 && type === "minus") {
      res.status(400).send("Cannot set a price below zero");
    } else if (type === "plus") {
      houses[index].price += 10000;
      res.status(200).send(houses);
    } else if (type === "minus") {
      houses[index].price -= 10000;
      if (houses[index].price <= 0) {
        houses[index].price = 0;
      }
      res.status(200).send(houses);
    } else {
      res.sendStatus(400);
    }
  },
};
