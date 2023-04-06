const { Car } = require("../../../models");

module.exports = {
  list(req, res) {
    Car.findAll()
      .then((cars) => {
        res.status(200).json({
          status: "OK",
          data: {
            cars,
          },
        });
      })
      .catch((err) => {
        res.status(400).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  create(req, res) {
    Car.create({
        model: req.body.model,
        manufactur: req.body.manufactur,
        foto: req.body.foto,
        harga_sewa: req.body.harga_sewa,
        ukuran: req.body.ukuran
    })
      .then((car) => {
        res.status(201).json({
          status: "OK",
          data: car,
        });
      })
      .catch((err) => {
        res.status(201).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  update(req, res) {
    const car = req.car;

    car
      .update(req.body)
      .then(() => {
        res.status(200).json({
          status: "OK",
          data: car,
        });
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  show(req, res) {
    const car = req.car;

    res.status(200).json({
      status: "OK",
      data: car,
    });
  },

  destroy(req, res) {
    req.car
      .destroy()
      .then(() => {
        res.status(204).end();
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  setCar(req, res, next) {
    Car.findByPk(req.params.id)
      .then((car) => {
        if (!car) {
          res.status(404).json({
            status: "FAIL",
            message: "Car not found!",
          });

          return;
        }

        req.car = car;
        next()
      })
      .catch((err) => {
        res.status(404).json({
          status: "FAIL",
          message: "Car not found!",
        });
      });
  },
};
