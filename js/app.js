const productName = document.getElementById('productNameInput');
const productPrice = document.getElementById('productPriceInput');
const productCategory = document.getElementById('productCategoryInput');
const productDescription = document.getElementById('productDescriptionInput');
const tableBody = document.getElementById('tableBody');

let productsList = [
    // {
    //     name:'Samsung A50',
    //     price:'5500',
    //     category:'Mobile (Smart Phones)',
    //     description:'Good Quality'
    // },
    // {
    //     name:'Oppo F9',
    //     price:'9000',
    //     category:'Mobile (Smart Phones)',
    //     description:'Excellent Quality'
    // },
    // {
    //     name:'LG Ultra Wide Q-LED 8K',
    //     price:'62000',
    //     category:'TV Screens',
    //     description:'Great Quality'
    // },
];

//localStorage.setItem('productsList',JSON.stringify(productsList))

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
            <button onclick="updateProduct()"  class="btn btn-outline-warning"><i class="fa-solid fa-edit"></i></button>
        </td>
        <td>
            <button onclick="deleteProduct()" class="btn btn-outline-danger" ><i class="fa-solid fa-trash"></i></button>
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

function deleteProduct()
{
    console.log("Delete Function")
}

function updateProduct()
{ 
    console.log("Update Function")
}