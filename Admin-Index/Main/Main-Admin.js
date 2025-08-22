async function checkadmin() {
    const token= localStorage.getItem("token");
    const res= await fetch("http://localhost:3000/admin",{
        headers: {authorization:`Bearer ${token}`},
    });
    if(!res.ok){
        alert("You do not have enough Admin access rights!");
        window.location.href="/User-Index/Login/Admin-Login/Admin-Login.html";
    }else{
        const data= await res.json();
        console.log(data);
    } 
};


function Product(){
    const product= document.querySelector(".Product");
    product.addEventListener("click", ()=>{
        window.location.href="/Admin-Index/Products/Product-Admin.html";
    });
}

function Category(){
    const category= document.querySelector(".Category");
    category.addEventListener("click", ()=>{
        window.location.href="/Admin-Index/Category/Category.html";
    });
}

function Order(){
    const order= document.querySelector(".Order");
    order.addEventListener("click", ()=>{
        window.location.href="/Admin-Index/Order/Order.html";
    });
}

function User(){
    const user= document.querySelector(".User");
    user.addEventListener("click", ()=>{
        window.location.href="/Admin-Index/User/User.html";
    });
}

function Question(){
    const question= document.querySelector(".Question");
    question.addEventListener("click", ()=>{
        window.location.href="/Admin-Index/Question/Question.html";
    })
}

function Voucher(){
    const voucher= document.querySelector(".Voucher");
    voucher.addEventListener("click", ()=>{
    window.location.href="/Admin-Index/Voucher/Voucher.html";
    });
}

function Content(){
    const content= document.querySelector(".Content");
    content.addEventListener("click", ()=>{
        window.location.href="/Admin-Index/Content/Main/Main.html";
    });
}

document.addEventListener("DOMContentLoaded",()=>{
    checkadmin();
    Product();
    Category();
    Order();
    User();
    Voucher(); 
    Question();
    Content();
});