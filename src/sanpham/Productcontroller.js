async function insert(name, price, quantity, description, image, catId, status){
    try {
        let pro = new Product(name,price,quantity,description,image,catId,status);
        await pro.save();
        console.log("Insert Success!!!!!");
    } catch (error) {
        console.log(error);
    }
 }
 