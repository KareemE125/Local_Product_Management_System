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


/////// FUNCTIONS ///////

function makeTableRow(index, product)
{
    return `<tr>
        <td></td>
        <td>${product.name}</td>
        <td>${product.price}</td>
        <td>${product.category}</td>
        <td>${product.description}</td>
        <td>
            <button onclick="updateProduct(${index})"  class="btn btn-outline-warning"><i class="fa-solid fa-edit"></i></button>
        </td>
        <td>
            <button onclick="deleteProduct(${index})" class="btn btn-outline-danger" ><i class="fa-solid fa-trash"></i></button>
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
        for (let i = 0; i < productsList.length; i++) 
        {
            productsRows += makeTableRow(i, productsList[i]);   
        }

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
    tableBody.insertAdjacentHTML('beforeend',makeTableRow(productsList.length-1, product));
}

function deleteProduct(index)
{
    productsList.splice(index,1);
    refresh()
  
}

function updateProduct(index)
{ 
    productName.value = productsList[index].name;
    productPrice.value = productsList[index].price;
    productCategory.value = productsList[index].category;
    productDescription.value = productsList[index].description;

    document.getElementById('addProductBtn').style.display = "none";
    document.getElementById('saveUpdate').style.display = "block";
    
    productToBeUpdated = index;
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


function search(word)
{
    if(!word.length)
    {
        init()
        return
    }

    let productsRows = ``;
    for(let i = 0; i < productsList.length; i++)
    {
        if( productsList[i].name.toLowerCase().includes(word.toLowerCase()) )
        {
            productsRows += makeTableRow(i, productsList[i]);   
        }
    }
    tableBody.innerHTML = productsRows;
}
