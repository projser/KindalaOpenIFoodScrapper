const { insertProduct } = require('../Database/insertProduct'); // Adjust the path to the insertProduct module

class DrogariaDedicarStore {
  constructor(config) {
    this.config = config;
  }
  getFolderPath() {
    return this.config.location

  }

  async execute(data) {

    try {
      let obj = JSON.parse(data);
     // console.log(obj)

      if (typeof obj.data === 'undefined')
        return
      let products = [];

      for (let idx = 0; idx < obj.data.categoryMenu.itens.length; idx++) {

        if (typeof obj.data.categoryMenu.itens[idx].description !== 'undefined') {
          
          let productPriceDiscount = 0.0
          let qtyDiscount = 0
          if (typeof obj.data.categoryMenu.itens[idx].scalePrices !== 'undefined') {

            productPriceDiscount = obj.data.categoryMenu.itens[idx].scalePrices[0].price;
            qtyDiscount = obj.data.categoryMenu.itens[idx].scalePrices[0].minQuantity
          }

          //let metric = obj.data.components[0].resource.master_product_stores[idx].product.presentation.replaceAll("1 x",'').replaceAll("1 X",'').replaceAll(' ','').trim()
          let product = {
            "eanCode": '' + obj.data.categoryMenu.itens[idx].ean,
            "productName": obj.data.categoryMenu.itens[idx].description,
            "available_stock": true,
            "productCode": '',
            "productPrice": obj.data.categoryMenu.itens[idx].unitMinPrice,
            "productPromotion": "", "storeName": this.config.recipient, "storeId": "1", "contains": "",
            "brand": '',
            "productPriceDiscount": productPriceDiscount,
            "qtyDiscount": qtyDiscount

          }
          console.log(product)
          products.push(product);

         
         
        }
      }
      console.log(products.length)
      
      if (products.length > 0) {
        await insertProduct([products], this.config.recipient, 0);
      }


    }
    catch (err) {
      console.log(err)

    }


  }
}

module.exports = DrogariaDedicarStore;
