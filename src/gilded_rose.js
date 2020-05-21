import Item from './item.js';

class NormalItem extends Item {
  
  constructor(name,sellIn,quality){
    super(name,sellIn,quality)
  }
  
  updateItem () {

    this.sellIn--;
    
    (this.sellIn > 0) ? this.quality-- : this.quality-=2;
      
    (this.quality < 1) ? this.quality = 0 : "nothing";
    
    return this
    
  }
  
}





class ItemWithValueIncrease extends Item {
  
  constructor(name,sellIn,quality){
    super(name,sellIn,quality)
  }
  
  updateItem () {
    this.sellIn--;
    
    this.sellIn < 0 ? this.quality = 0 : this.sellIn < 6 ? this.quality+=3  :  this.sellIn < 11 ? this.quality+=2 :  this.quality++  ;
    
    (this.quality > 50) ? this.quality = 50 : "nothing";
    
 
    
    
  }
  
}

class SulfuraItem extends Item {
  
  constructor(name,sellIn,quality){
    super(name,sellIn,quality)
  }
  
  updateItem () {
    
    return this.sellIn=undefined;
    
  }
  
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }
  
  updateQuality () {
    for (var i = 0; i < this.items.length; i++) {
      this.items[i].updateItem();
    }
    
    return this.items;
  }
  
  
  
  
}

module.exports = {
  Item,
  NormalItem,
  ItemWithValueIncrease,
  SulfuraItem,
  Shop
}
