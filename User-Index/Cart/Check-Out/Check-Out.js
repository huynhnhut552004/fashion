document.addEventListener("DOMContentLoaded", ()=>{
    fetchPage(pageId);
    const Payment= document.querySelector(".Payment");
    const edit1= document.getElementById("Edit-1");
    const edit2= document.getElementById("Edit-2");
    Payment.classList.add("Hidden");
    edit1.classList.add("Hidden");
    edit2.classList.add("Hidden");
    fetchProduct();
    CheckImformation();
    editImformation();
    checkPayment();
    editPayment();
})

function CheckImformation(){
    const next= document.getElementById("Continue-1");
    next.addEventListener("click", (e)=>{
        e.preventDefault();
        const phone= document.getElementById("Phone-Number").value;
        const address= document.getElementById("Address").value;
        const detail= document.getElementById("Detailed").value;
        const error= document.querySelector(".Error-1");
        if(!phone || !address || !detail){
            if(error.style.display=="none" || error.style.display==""){
                error.style.display="flex";
                return;
            }
        }else{
            const Imformation= document.querySelector(".Imformation");
            const Payment= document.querySelector(".Payment");
            const edit= document.getElementById("Edit-1");
            Imformation.classList.add("Hidden");
            Payment.classList.remove("Hidden");
            edit.classList.remove("Hidden");
        }
    })
}

function editImformation(){
    const edit= document.getElementById("Edit-1");
    edit.addEventListener("click", (e)=>{
        const Imformation= document.querySelector(".Imformation");
        const Payment= document.querySelector(".Payment");
        const error= document.querySelector(".Error-1");
        Imformation.classList.remove("Hidden");
        Payment.classList.add("Hidden");
        edit.classList.add("Hidden");
        if(error.style.display=="flex" || error.style.display==""){
            error.style.display="none";
        }
    })
}

function checkPayment(){
    const next= document.getElementById("Continue-2");
    next.addEventListener("click", (e)=>{
        e.preventDefault();
        const Cardnumber= document.getElementById("Card-Number").value;
        const Month= document.getElementById("Month").value;
        const Year= document.getElementById("Year").value;
        const Securitycode= document.getElementById("Security-Code").value;
        const First= document.getElementById("First").value;
        const Last= document.getElementById("Last").value;
        const City= document.getElementById("City").value;
        const Billingaddress= document.getElementById("Billing-Address").value;
        const Postacode= document.getElementById("Posta-Code").value;
        const Nation= document.getElementById("Nation").value;
        const Phone= document.getElementById("Phone-Number-Payment").value;
        const error= document.querySelector(".Error-2");
        if(!Cardnumber || !Month || !Year || !Securitycode || !First || !Last || !City || !Billingaddress || !Postacode || !Nation || !Phone){
            if(error.style.display=="none" || error.style.display==""){
                error.style.display="flex";
                return;
            }
        }else{
            const Payment= document.querySelector(".Payment");
            const edit= document.getElementById("Edit-2");
            const Complete= document.getElementById("Complete");
            Payment.classList.add("Hidden");
            edit.classList.remove("Hidden");
            if(Complete.style.display=="none"||Complete.style.display==""){
                Complete.style.display="block";
            }
        }
    })
}

function editPayment(){
    const edit= document.getElementById("Edit-2");
    edit.addEventListener("click", (e)=>{
        const Imformation= document.querySelector(".Imformation");
        const Payment= document.querySelector(".Payment");
        const error= document.querySelector(".Error-2");
        Imformation.classList.add("Hidden");
        Payment.classList.remove("Hidden");
        edit.classList.add("Hidden");
        if(error.style.display=="flex" || error.style.display==""){
            error.style.display="none";
        }
    })
}

const API= "https://fashion-imn4.onrender.com/Page";
const pageId="689326c62b865f43c08fdb73";

async function  fetchPage(id){
    try{
        const res= await fetch(`${API}/${id}`);
        const data= await res.json();
        const sections= data.sections;

        const headerCheckout= document.querySelector('[data-Header-Checkout]');
        headerCheckout.innerHTML=`<h2>${sections['Header-Checkout'].content}</h2>`;
    }catch (error) {
        console.error("Không thể lấy hoặc hiển thị dữ liệu:", error);
    }
}

async function fetchProduct() {
    const token= localStorage.getItem("token");
    const res= await fetch("https://fashion-imn4.onrender.com/Cart",{
        headers:{"Content-Type":"application/json",
            authorization:`Bearer ${token}`
        }
    });
    const data= await res.json();
    const list= document.getElementById("List");
    const vouchername= document.getElementById("Vouchername");
    const discount= document.getElementById("Discount");
    const total= document.getElementById("Total");
    data.items.forEach(p=>{
        const quantity= document.createElement("div");
        quantity.className="Quantity";
        quantity.innerText=`${p.quantity} ✕`;
        const img= document.createElement("div");
        img.className="Img";
        img.innerHTML=`<img src="${p.productId.image}" alt="Img">`;
        const name= document.createElement("div");
        name.className="Name";
        name.textContent=p.productId.name;
        const price= document.createElement("div");
        price.className="Price";
        price.textContent=`${p.productId.price}$`;
        const div= document.createElement("div");
        div.className="Line";
        div.appendChild(quantity);
        div.appendChild(img);
        div.appendChild(name);
        div.appendChild(price);
        list.appendChild(div);
    });
    total.textContent=`${data.total}`;
    discount.innerText=`${data.voucher.discount}%`;
    vouchername.innerText=data.voucher.name;
}

document.getElementById("Complete").addEventListener("click", async () => {
    const token = localStorage.getItem("token");
    const payloadBase64 = token.split('.')[1];
    const payloadJson = atob(payloadBase64);
    const payload = JSON.parse(payloadJson);
    const userId = payload.userId;
    console.log("User ID:", userId);

    const res = await fetch("https://fashion-imn4.onrender.com/Cart", {
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`
        }
    });
    const data = await res.json();
    const id= userId;
    const voucher = data.voucher;
    const orderItems = data.items.map(item => ({
        productId: item.productId,
        quantity: item.quantity
    }));
    const subtotal= data.total;
    await fetch("https://fashion-imn4.onrender.com/Order", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            userId: id,
            items: orderItems,
            voucher: voucher,
            subtotal: subtotal
        })
    });
    await fetch("https://fashion-imn4.onrender.com/Cart/clear", {
        method:"DELETE",
        headers:{"Content-Type":"application/json",
            authorization:`Bearer ${token}`
        },
    });
    window.location.href = "/User-Index/Cart/Success/Success.html";
});