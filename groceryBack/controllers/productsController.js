const BaseController = require("./baseController");

class ProductsController extends BaseController {
  constructor(model) {
    super(model);
  }

  async insertOne(req, res) {
    const { name, price } = req.body;
    try {
      const newProduct = await this.model.create({
        updated_at: new Date(),
        created_at: new Date(),
        name: name,
        price: price,
      });
      return res.json(newProduct);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async getOne(req, res) {
    const id = req.params.productId;
    try {
      const output = await this.model.findByPk(id);
      return res.json(output);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async updateOne(req, res) {
    const id = req.params.productId; //get the product id
    const { name, price } = req.body; //manage the post request
    try {
      const product = await this.model.findByPk(id); //find this product ID
      if (product) { //if found, see if there's updates to be done based on req.body
        await product.update({
            name,
            price,
        });
    } 
    
    else {
      return res.status(404).json({ error: true, msg: 'Product not found. Test' });
    }
    return res.json(product);
  } 
    catch (err) {
      console.log(err);
      return res.status(400).json({ error: true, msg: err });
    }
  }

}

module.exports = ProductsController;
