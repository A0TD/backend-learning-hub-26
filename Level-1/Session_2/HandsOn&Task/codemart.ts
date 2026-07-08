
interface Product { id: string; name: string; price: number; costPrice:number;}

interface Customer { id: string; name: string; phone: number ;}

interface OrderItem {
  product:Product,
  qty:number
}

interface OrderObject {
  id:string,
  customer:string,
  items:OrderItem[],
  status:OrderStatus,
  shippedAt?:string,
  readonly createdAt:string;
}

class Repository<T extends { id: string }> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  findById(id: string): T | undefined {
    return this.items.find((item) => item.id === id);
  }
}

type OrderStatus = "pending" | "shipped" | "delivered" | "cancelled";

type WarehouseBin = [aisle: number, shelf: number];
// PART 3A: if const badBin: WarehouseBin = [4, 12, "extra"] were to be typed it would simply fail because the tuple expects only 2 values, so sending 3 values would result in an error
const binForOrder: WarehouseBin = [4, 12];

// What the customer-facing API is allowed to return — never leak costPrice
type PublicProduct = Omit<Product, "costPrice">;

// What's required to create a new product — no id yet, the DB assigns it
type CreateProductInput = Omit<Product, "id">;

// What's allowed when editing a product — any subset of fields
type UpdateProductInput = Partial<Product>;

// A fast lookup table by product id
type ProductCatalog = Record<string, Product>;

// =============================================================================================

function canCancelOrder(status:OrderStatus):boolean { // PART 2:
if (status === "pending" || status === "shipped")
    return true;
  else
    return false;
}

function calculateOrderTotal(items:OrderItem[], discount:number) {
  let total:number = 0;
  for (const item of items) {
    total += item.product.price * item.qty;
  }
  return total - discount;
}

function shipOrder(order:OrderObject) : OrderObject {
  let newOrder:OrderObject = {...order};
  newOrder.status = "shipped";
  newOrder.shippedAt = new Date().toISOString();
  // attempting newOrder.createdAt = "new date" would result in a compilation error because that attribute is read-only meaning it cannot be modified.
  return newOrder;
}


// PART 5: --------------
function toPublicProduct(product:Product): PublicProduct {
  let {costPrice, ...strippedProduct} = product;
  return strippedProduct;
}

function createProduct(input:CreateProductInput):Product {
  let newProduct:Product = {id:crypto.randomUUID() , ...input}
  return newProduct;
}

function updateProduct(product:Product, changes: UpdateProductInput):Product {
  let newProduct:Product = {...product,...changes};
  return newProduct;
}

// ==============================================================================================

//by the frontend team
const order:{customer:string,
  items:[{price:number,qty:number}]} = {
  customer: "Layla",
  items: [ // PART 1: Now the developer sees that there's an error, trying to assign the string "250 EGP" to a variable of type number results in an error
    // { price: "250 EGP", qty: 2 },   <--- this part is commented because it causes compilation errors
    { price: 100, qty: 1 },
  ],
};
// PART 1: same idea here, trying to send "50" as the discount parameter that is of type number, which results in a compilation error
// console.log(calculateOrderTotal(order.items, "50")); <--- code is commented because it produces compilation errors
// console.log(order.shippingAddress.city); <--- code is commented because it produces compilation errors
/* PART 0:
1. js fails to coerce 250 EGP so it produces a NaN
2. trying to access an attribute of a nonexistent attribute inside an object
3. in the first bug, the customer wouldn't be able to see their order's total
in the second bug, the website will show an error instead of showing the address
*/

// PART 2: this clearly indicates a compilation error, notifying the developer that "refunded" is not a valid type of OrderStatus,
//  which could save developers if they were to accidentally typo "deliverd" in an old codebase saving them multiple hours of looking for the errors
// canCancelOrder("refunded"); <-- code is commented because it would cause a compilation error


const productRepo = new Repository<Product>()
productRepo.add({id:"1", name:"phone",price:1000,costPrice:600})
productRepo.add({id:"2", name:"pizza",price:100,costPrice:50})
productRepo.findById("2")

const CustomerRepo = new Repository<Customer>()

// PART 3B: making a generic class helps us use the same class for different data type saving us from copy-pasting the same function 3 times with different types
// if we try .add() on an object missing the id field, it would result in a compilation error because the object type strictly requires 3 attributes


const newOrder:OrderObject = {
  id: "1",
  customer: "Mohammed",
  items: [{product:{id:"1", name:"phone",price:1000,costPrice:600},qty:1},
    {product:{id:"2", name:"pizza",price:100,costPrice:50},qty:2}],
  status:"delivered",
  createdAt: "7-7-26",
}

let productCatalog:ProductCatalog = {
  'prod1': {id:'prod1',name:'phone',price:6000,costPrice:2000},
  'prod2': {id:'prod2',name:'monitor',price:16000,costPrice:8000}
};

console.log(productCatalog['p1']);

/*PART 5:
in an old js codebase if someone were to add a discountPercent attribute to Product but forgot to add it to PublicProduct
 the change would not occur in PublicProduct leading to comptability issues between the two types
 typescript fixes that by adding types and allowing modifying already existing types
 so if you were to modify Product only, the change would also occur in PublicProduct and any other types derived from Product
*/


/* PART 6:
 for a small team it's better to have all the type declarations in the same file, so that its easier to see the whole project without jumping between files
 while having many developers across multiple teams would require the types to be strictly placed in their own dedicated files to ease the finding process
*/



// PART 7 ----------------------------------------------------------

function getExternalWarehouseData() {
  return { id: "w-99", name: "Desk Lamp", price: 150, costPrice: 60, extra: "ignored" };
}

function receiveFromWarehouse(product:Product):void {
  console.log(product.name)
}

receiveFromWarehouse(getExternalWarehouseData()) // the object will take all the attributes sent from the warehouse but you will only be able to access the ones declared in Product, therefore, no errors occur

// receiveFromWarehouse({ id: "w-1", name: "Chair", price: 90, costPrice: 40, extra: "oops" }) // this happens because tpyescript makes sure you don't explicity send more attributes than required
// unlike if an object containing many types was sent



// FINAL BOSS ---------------------------------------------------------

type Result<T> =
  | { success: true; data: T }
  | { success: false; error: string };


function placeOrder(customer: string, items: OrderItem[]): Result<OrderObject> {

  if (items.length === 0) {
    return {success:false,error:"Order must contain at least one item"};
  }

  if (calculateOrderTotal(items,0) <= 0) 
    return {success:false,error:"Order total must be greater than zero!"};


  let order:OrderObject = {
    id: crypto.randomUUID(),
    customer,
    items,
    status: "pending",
    createdAt: new Date().toISOString()
  }

  return {success:true,data:order}
  }


  let validOrderItems:OrderItem[] = [
    {product:{id:'1',name: 'tablet',price:2200, costPrice:1000},qty:1},
    {product:{id:'2',name: 'apple',price:200, costPrice:100},qty:2}
  ]

  let placedOrder1Result = placeOrder("mohamed" , []);

  let placedOrder2Result = placeOrder("mohamed" , validOrderItems);

  if(placedOrder1Result.success === true) {
    console.log("Order Placed")
  }
  else {
    console.log("Error")
  }

  if(placedOrder2Result.success === true) {
    console.log("Order Placed")
  }
  else {
    console.log("Error")
  }

