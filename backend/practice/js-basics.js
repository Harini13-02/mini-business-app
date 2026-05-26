const products = [
    { id: 1, sku: "P001", name: "NoteBook", price:50, stockQty: 100},
    { id: 2, sku: "P002", name: "Pen", price:10, stockQty: 500},
    { id: 3, sku: "P003", name: "Marker", price:30, stockQty: 20}
];
function findProductBySku(products,sku){
    return products.find(product =>{
        return product.sku === sku;
    });   
}
const ProductBySku = findProductBySku(products,"P002");
console.log(ProductBySku);

function calculateStockValue(products){
    return products.reduce((sum,product)=>{
     return sum + product.price * product.stockQty;
    }, 0);
}

const StockvalueTotal = calculateStockValue(products);
console.log(StockvalueTotal);

function getLowStockProducts(products, threshold){
    return products.filter(product =>{
        return product.stockQty < threshold;
    });
}

const LowStockProducts = getLowStockProducts(products,50);
console.log(LowStockProducts);

function validateProduct(product){
    const errors=[]
    if(product.sku === ""){
        errors.push("SKU is required");
    }
    if(product.name === ""){
        errors.push("Name is required");
    }
    if(product.price < 0){
        errors.push("Price must be greater than zero");
    }
    if(product.stockQty < 0){
        errors.push("Stock must be greater than zero");
    }
return errors;
}
const result = validateProduct({
    sku: "",
    name: "",
    price: 0,
    stockQty: -1
});

console.log(result);

function calculateLineTotal(quantity, rate){
 if(quantity <0){
    return "Quantity must be greater then zero";
 }
 if(rate <0){
    return "Rate must be greater then zero";
 }
 return quantity * rate;
}
const result1 = calculateLineTotal(5,10);
console.log(result1);

const orderItems = [
{ productId: 1, quantity: 2, rate: 50 },
{ productId: 2, quantity: 5, rate: 10 }
];
 
function calculateOrderTotal(items){
    return items.reduce((total,items) =>{
        return total +  items.quantity * items.rate;
    },0);
}
const Totalitems = calculateOrderTotal(orderItems);
console.log(Totalitems);