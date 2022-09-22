const productName = document.getElementById('productNameInput');
const productPrice = document.getElementById('productPriceInput');
const productCategory = document.getElementById('productCategoryInput');
const productDescription = document.getElementById('productDescriptionInput');
const tableBody = document.getElementById('tableBody');

// uncomment the products list content and the localStorage setItem line to populate the list
// then comment the localStorage setItem
// then comment the products list content

let productsList = [
    // {"name":"Samsung A50","price":"5500","category":"Mobile","description":"Good Quality"},
    // {"name":"Oppo F9","price":"9000","category":"Mobile (Smart Phones)","description":"Excellent Quality"},
    // {"name":"ISOtunes PRO","price":"2794","category":"Headphones","description":"Bluetooth, Hearing Protection"},
    // {"name":"Xiaomi Mi 10T","price":"7000","category":"Smart Phones","description":"Great"},
    // {"name":"Height Adjustable Standing Desk","price":"6588","category":"Office Furniture","description":"Electric Dual Motor - Black"}
];

// localStorage.setItem('productsList',JSON.stringify(productsList))

let productToBeUpdated = -1;


init();

function makeTableRow(product)
{
    return `<tr>
        <td></td>
        <td>${product.name}</td>
        <td>${product.price}</td>
        <td>${product.category}</td>
        <td>${product.description}</td>
        <td>
            <button onclick="updateProduct(this)"  class="btn btn-outline-warning"><i class="fa-solid fa-edit"></i></button>
        </td>
        <td>
            <button onclick="deleteProduct(this)" class="btn btn-outline-danger" ><i class="fa-solid fa-trash"></i></button>
        </td>
    </tr>`
}

function init()
{
    const storageList = localStorage.getItem('productsList')

    if( storageList != null )
    {
        productsList = JSON.parse(storageList);

        let productsRows = ``;
        productsList.forEach(product => {
            productsRows += makeTableRow(product);
        });

        tableBody.innerHTML = productsRows;
    }
}

function clearInputFields()
{
    productName.value = '';
    productPrice.value = '';
    productCategory.value = '';
    productDescription.value ='';
}

function refresh()
{
    // add to local storage
    localStorage.setItem('productsList',JSON.stringify(productsList));

    // call init()
    init()
}

function addProduct()
{
    const product = {
        name: productName.value,
        price: productPrice.value,
        category: productCategory.value,
        description: productDescription.value
    };

    clearInputFields()

    // add to products list
    productsList.push(product);

    // add to local storage
    localStorage.setItem('productsList',JSON.stringify(productsList));

    // add to GUI (table)
    tableBody.innerHTML += makeTableRow(product);

}

function deleteProduct(elem)
{
    const childern = elem.parentElement.parentElement.childNodes;

    let product = {
        name : childern[3].innerHTML,
        price : childern[5].innerHTML,
        category : childern[7].innerHTML,
        description : childern[9].innerHTML
    }
    
    for (let i = 0; i < productsList.length; i++) 
    {
        if(
            productsList[i].name == product.name && 
            productsList[i].price == product.price && 
            productsList[i].category == product.category && 
            productsList[i].description == product.description 
        )
        {
            productsList.splice(i,1);
            refresh()
            return
        } 
    }   
}

function updateProduct(elem)
{ 
    console.log("Update Function")

    const childern = elem.parentElement.parentElement.childNodes;

    let product = {
        name : childern[3].innerHTML,
        price : childern[5].innerHTML,
        category : childern[7].innerHTML,
        description : childern[9].innerHTML
    }

    productName.value = product.name;
    productPrice.value = product.price;
    productCategory.value = product.category;
    productDescription.value = product.description;

    document.getElementById('addProductBtn').style.display = "none";
    document.getElementById('saveUpdate').style.display = "block";
    

    for (let i = 0; i < productsList.length; i++) 
    {
        if(
            productsList[i].name == product.name && 
            productsList[i].price == product.price && 
            productsList[i].category == product.category && 
            productsList[i].description == product.description 
        )
        {
            productToBeUpdated = i;
            return
        } 
    }   
}

function cancelUpdateProduct()
{
    clearInputFields()
    document.getElementById('addProductBtn').style.display = "inline-block";
    document.getElementById('saveUpdate').style.display = "none";
}

function saveUpdateProduct()
{
    productsList[productToBeUpdated].name = productName.value
    productsList[productToBeUpdated].price = productPrice.value 
    productsList[productToBeUpdated].category = productCategory.value
    productsList[productToBeUpdated].description = productDescription.value

    cancelUpdateProduct()
    refresh()
}
