const { Car } = require('./models')

class CarController {
    static records = [];
  
    constructor(params) {
      this.manufactur = params.manufactur;
      this.model = params.model;
      this.foto = params.foto;
      this.harga_sewa = params.harga_sewa;
    }

    static create(params) {
        const obj = new this(params);
        const result = Car.create(obj)
    
        return result;
    }

    static list() {
        const result = Car.findAll()
        return result;
    }

    static find(id) {
        const result = Car.findByPk(id)
    
        return result;
    }
    
    static update(id, params) {
      const result = Car.update(params, 
        {
          where:{
            id:id
          }
        }
      )
  
      return result;
    }
  
    static delete(id) {
      const result = Car.destroy({
        where: { id:id }
      })

      return result
    }
  
  }
  
module.exports = CarController;