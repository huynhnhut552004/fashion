const API= "https://fashion-bsqk.onrender.com/Order";
async function checkadmin() {
    const token= localStorage.getItem("token");
    const res= await fetch("https://fashion-bsqk.onrender.com/admin",{
        headers: {authorization: `Bearer ${token}`},
    });
    if(!res.ok){
        alert("You do not have enough Admin access rights!");
        window.location.href="/User-Index/Login/Admin-Login/Admin-Login.html";
    }else{
        const data= await res.json();
        console.log(data);
    }
}

selectOder = null;

async function fetchOrder() {
    const token = localStorage.getItem("token");
    const res = await fetch(API, {
        headers: { authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    const order = document.getElementById("Order"); 
    order.innerHTML = "";
    for(const o of data){
        const wrapper= document.createElement("div");
        wrapper.style.marginBottom = "20px";
        wrapper.style.border = "1px solid #ccc";
        const title= document.createElement("div");
        title.className="Title";
        const createdDate = new Date(o.creatAt);
        const formattedDate = createdDate.toLocaleString("vi-VN", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit"
        });
       title.innerHTML = `
        <span>${o.code}</span>
        <span>${formattedDate}</span>
        <span>${o.userId.username}</span>
        <span>${o.voucher?.name || "None"}</span>
        <span>${o.voucher?.discount || 0}%</span>
        <span>${o.subtotal}$</span>
        `;
        title.querySelectorAll("span").forEach(span => {
        span.style.marginRight = "9%"; 
        });
        title.style.cursor="pointer";
        title.addEventListener("click", ()=>{
            selectOder= o;
            if(orderTable.style.display=="none"){
                orderTable.style.removeProperty("display");
            }else{
                orderTable.style.display="none";
            }
        });
        wrapper.appendChild(title);
        wrapper.style.padding = "10px";
        const orderTable= document.createElement("table");
        orderTable.style.display="none";
        orderTable.style.paddingLeft="4%";
    o.items.forEach(or=>{
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${or.quantity}✕</td>
        <td>${or.productId.name}</td>
        <td><img src="${or.productId.image}" alt="Img" width="60"></td>
        <td>${or.productId.price}$</td>
        `;
        orderTable.appendChild(row);
    });
    wrapper.appendChild(orderTable);
    order.appendChild(wrapper);
}
}    
        

document.getElementById("Complete").addEventListener("click", async ()=>{
    const token= localStorage.getItem("token");
    await fetch(`${API}/${selectOder.userId._id}`,{
        method:"DELETE",
        headers: {authorization:`Bearer ${token}`}
    });
    selectOder=null;
    fetchOrder();
});

document.getElementById("Cancel").addEventListener("click", async ()=>{
    const token= localStorage.getItem("token");
    await fetch(`${API}/${selectOder.userId._id}`,{
        method:"DELETE",
        headers: {authorization:`Bearer ${token}`}
    });
    selectOder=null;
    fetchOrder();
});


document.addEventListener("DOMContentLoaded", ()=>{
    checkadmin();
    fetchOrder();
})