const API= "http://localhost:3000/Voucher";
async function checkadmin() {
    const token= localStorage.getItem("token");
    const res= await fetch("http://localhost:3000/admin",{
        headers:{authorization: `Bearer ${token}`}
    });
    if(!res.ok){
        alert("You do not have enough Admin access rights!");
        window.location.href="/Use-Index/Login/Admin-Login/Admin-Login.html";
    }else{
        const data= await res.json();
        console.log(data);
    }
}

selectVoucher=null;

async function fetchVoucer() {
    const res= await fetch(API);
    const data= await res.json();
    const table= document.getElementById("VoucherTable");
    table.innerHTML="";
    data.forEach(v=>{
        const row= document.createElement("tr");
        row.addEventListener("click", ()=>{
            selectVoucher= v;
            document.getElementById("Name").value= v.name;
            document.getElementById("Discount").value= v.discount;
            document.getElementById("Description").value= v.description;
        });
        const createdDate = new Date(v.creatAt);
        const formattedDate = createdDate.toLocaleString("vi-VN", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit"
        });
        row.innerHTML=`
        <td>${formattedDate}</td>
        <td>${v.name}</td>
        <td>${v.discount}%</td>
        <td>${v.description}</td>
        `;
        table.appendChild(row);
    });
}

document.getElementById("Confirm").addEventListener("click", async ()=>{
    const name= document.getElementById("Name").value;
    const discount= document.getElementById("Discount").value;
    const description= document.getElementById("Description").value;
    const token= localStorage.getItem("token");
    await fetch(API, {
        method: "POST",
        headers:{"Content-Type": "application/json",
            authorization:`Bearer ${token}`
        },
        body: JSON.stringify({name, discount, description})
    });
    fetchVoucer();
    clearInputs();
});

document.getElementById("Edit").addEventListener("click", async ()=>{
    const token= localStorage.getItem("token");
    const updateName= document.getElementById("Name").value;
    const updateDiscount= document.getElementById("Discount").value;
    const updateDescription= document.getElementById("Description").value;
    const res= await fetch(`${API}/${selectVoucher._id}`,{
        method:"PATCH",
        headers:{"Content-Type":"application/json",
            authorization:`Bearer ${token}`
        },
        body: JSON.stringify({
            name: updateName,
            discount: updateDiscount,
            description: updateDescription
        })
    });
    fetchVoucer();
    clearInputs();
    selectVoucher=null;
});

document.getElementById("Delete").addEventListener("click", async ()=>{
    const token= localStorage.getItem("token");
    const res= await fetch(`${API}/${selectVoucher._id}`,{
        method: "DELETE",
        headers: {authorization: `Bearer ${token}`}
    });
    fetchVoucer();
    selectVoucher=null;
});

function clearInputs(){
    document.getElementById("Name").value="";
    document.getElementById("Discount").value="";
    document.getElementById("Description").value="";
}

document.addEventListener("DOMContentLoaded", ()=>{
    checkadmin();
    fetchVoucer();
})