var { Shop, Item, NormalItem, ItemWithValueIncrease, SulfuraItem } = require('../src/gilded_rose.js');
describe("GildedRose shop manager", function () {
  var listItems;

  beforeEach(function () {
    listItems = [];
  });


  it("Baisser de 1 la qualité et sellIn d'item normaux", function () {
    listItems.push(new NormalItem("+5 Dexterity Vest", 10, 20));
    listItems.push(new NormalItem("Mana Cake", 3, 6));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: 9, quality: 19 },
      { sellIn: 2, quality: 5 }
    ];
    expected.forEach( (testCase, idx) => {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Augmenter la qualité de 1 pour Aged Brie et Backstage passes", function () {
    listItems.push(new ItemWithValueIncrease("Aged Brie", 20, 30));
    listItems.push(new ItemWithValueIncrease("Backstage passes to a TAFKAL80ETC concert", 20, 30));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: 19, quality: 31 },
      { sellIn: 19, quality: 31 },
    ];
    expected.forEach( (testCase, idx) => {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });
  
  it("Laisser la quality à 80 pour Sulfuras, Hand of Ragnaros", function () {
    listItems.push(new SulfuraItem("Sulfuras, Hand of Ragnaros", 10, 80));
    listItems.push(new SulfuraItem("Sulfuras, Hand of Ragnaros", 0, 80));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: undefined, quality: 80 },
      { sellIn: undefined, quality: 80 },
    ];
    
    expected.forEach( (testCase, idx) => {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });
  
  it("Augmenter la qualité de 2 pour Aged Brie et Backstage passes pour 5 < sellIn < 11", function () {
    listItems.push(new ItemWithValueIncrease("Aged Brie", 7, 10));
    listItems.push(new ItemWithValueIncrease("Backstage passes to a TAFKAL80ETC concert", 9, 10));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: 6, quality: 12 },
      { sellIn: 8, quality: 12 },
    ];
    
    expected.forEach( (testCase, idx) => {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });
  
  it("Augmenter la qualité de 3 pour Aged Brie et Backstage passes pour sellIn < 6", function () {
    listItems.push(new ItemWithValueIncrease("Aged Brie", 4, 10));
    listItems.push(new ItemWithValueIncrease("Backstage passes to a TAFKAL80ETC concert", 2, 10));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: 3, quality: 13 },
      { sellIn: 1, quality: 13 },
    ];
    
    expected.forEach( (testCase, idx) => {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });

  });
  
  it("La qualité ne depasse jamais 50", function () {
    listItems.push(new ItemWithValueIncrease("aged Brie", 4, 50));
    listItems.push(new ItemWithValueIncrease("Backstage passes to a TAFKAL80ETC concert", 2, 50));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: 3, quality: 50 },
      { sellIn: 1, quality: 50 },
    ];
    
    expected.forEach( (testCase, idx) => {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });

  });
  
  it("La qualité à 0 après la date d'expiration", function () {
    listItems.push(new ItemWithValueIncrease("Aged Brie", 0, 50));
    listItems.push(new ItemWithValueIncrease("Backstage passes to a TAFKAL80ETC concert", 0, 50));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: -1, quality: 0 },
      { sellIn: -1, quality: 0 },
    ];
    
    expected.forEach( (testCase, idx) => {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });

  });
  
  
});