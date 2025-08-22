async function include(file, elementId) {
const res = await fetch(file);
const html = await res.text();
document.getElementById(elementId).innerHTML = html;
if (elementId === "header") {
    fetchHeaderData();
}
if (elementId==="footer"){
    fetchFooterData();
}
}

const API = "http://localhost:3000/Page";
const headerId = "68932692d62cb86cdd957f92";

async function fetchHeaderData() {
try {
    const res = await fetch(`${API}/${headerId}`);
    const pageData = await res.json();
    const sections = pageData.sections;
    const title = document.querySelector('[data-Header-Site]');
    title.innerHTML = `<a href="/User-Index/Main/Main.html">${sections['Header-Site'].content}</a>`;
} catch (error) {
    console.error("Không thể lấy hoặc hiển thị dữ liệu:", error);
}
}

const footerId="689326a6c52779c23722b093";

async function fetchFooterData() {
    try{ 
        const res= await fetch(`${API}/${footerId}`);
        const pageData= await res.json();
        const sections= pageData.sections;
        const brandName= document.querySelector('[data-Brand-Name-Footer]');
        brandName.textContent= sections['Brand-Name-Footer'].content;
}catch (error) {
    console.error("Không thể lấy hoặc hiển thị dữ liệu:", error);
}
}

async function fetchProduct() {
    const token= localStorage.getItem("token");
    if(!token){
        return;
    }else{
        const res= await fetch("http://localhost:3000/Cart", {
        headers:{authorization: `Bearer ${token}`}
        });
        const data= await res.json();
        let subtotal=0;
        const list= document.getElementById("List");
        list.innerHTML="";
        data.items.forEach(p => {
        const img = document.createElement("div");
        img.className = "Img";
        img.innerHTML = `<img src="${p.productId.image}" alt="Img">`;

        const name = document.createElement("div");
        name.className = "Name";
        name.innerHTML = p.productId.name;

        const quantity = document.createElement("div");
        quantity.className = "Quantity";
        const input = document.createElement("input");
        input.value = p.quantity;
        input.type = "number";

        const up = document.createElement("button");
        up.innerText = "+";
        up.addEventListener("click", async () => {
            const newQuantity = parseInt(input.value) + 1;
            const id= p.productId._id;
            try{
                await fetch(`http://localhost:3000/Cart/update`,{
                    method:"PATCH",
                    headers:{"Content-Type": "application/json",
                        authorization:`Bearer ${token}`},
                    body: JSON.stringify({productId: id, quantity:newQuantity}),
                })
            }catch(err){
                console.error("Lỗi update!");
            }
            fetchProduct(); 
        });

        const down = document.createElement("button");
        down.innerText = "–";
        down.addEventListener("click", async () => {
        const currentQuantity = parseInt(input.value);
        if (currentQuantity <= 1) return; 

        const newQuantity = currentQuantity - 1;
        const productId = p.productId._id;

        try {
            await fetch(`http://localhost:3000/Cart/update`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ productId, quantity: newQuantity }),
            });
        } catch (err) {
            console.error("Lỗi update!", err);
        }

        fetchProduct(); 
        });

            quantity.appendChild(down);
            quantity.appendChild(input);
            quantity.appendChild(up);

            const price = document.createElement("div");
            price.className = "Price";
            price.innerHTML = `${p.productId.price}$`;

            const del= document.createElement("div");
            del.className="Delete";
            const deleted= document.createElement("button");
            deleted.innerText="✕";
            deleted.addEventListener("click", async ()=>{
                const id= p.productId._id;
                try{
                    await fetch(`http://localhost:3000/Cart/remove`,{
                        method:"DELETE",
                        headers:{"Content-Type": "application/json",
                            authorization:`Bearer ${token}`},
                        body: JSON.stringify({productId: id}),
                    })
                }catch(err){
                    console.error("Lỗi update!");
                }
                fetchProduct(); 
            });
            del.appendChild(deleted);
            const div= document.createElement("div");
            div.className="Product"; 
            div.appendChild(img);
            div.appendChild(name);
            div.appendChild(quantity);
            div.appendChild(price);
            div.appendChild(del);
            list.appendChild(div);
            subtotal +=p.productId.price * p.quantity;
        });
            const subtotalDiv = document.getElementById("Total");
            subtotalDiv.innerHTML =subtotal.toFixed(2);
            quantity();
    }
}

voucherchoose=null;

function applyVoucher() {
    const voucherInput = document.getElementById("Voucher");
    const discountDisplay = document.getElementById("Discount");
    const totalDisplay = document.getElementById("Total");
    const okButton = document.getElementById("Ok");
    const error = document.querySelector(".Err");
    let lastAppliedCode = null;
    okButton.addEventListener("click", async () => {
        const code = voucherInput.value.trim();
        if (code === lastAppliedCode) {
            return; 
        }
        const originalTotal = parseFloat(totalDisplay.innerText);
        try {
            const res = await fetch(`http://localhost:3000/Voucher/${code}`);
            if (res.status === 404) {
                error.style.display = "flex";
                lastAppliedCode = null; 
                return;
            } else {
                const data = await res.json();
                const voucher = data[0]; 
                if (voucher) {
                    const discountRate = voucher.discount;
                    voucherchoose= voucher._id;
                    const discountedTotal = originalTotal - (originalTotal * discountRate / 100);
                    discountDisplay.innerText = `${discountRate}`;
                    totalDisplay.innerText = discountedTotal.toFixed(2);
                    error.style.display = "none";
                    lastAppliedCode = code; 
                }
            }
        } catch (err) {
            console.error("Lỗi khi kiểm tra voucher:", err);
            error.style.display = "flex";
            lastAppliedCode = null; 
        }
    });
}

document.getElementById("Checkout").addEventListener("click", async ()=>{
    const token= localStorage.getItem("token");
    if(voucherchoose==null){
        await fetch("http://localhost:3000/Cart/updatesubtotal",{
                method:"PATCH",
                headers:{"Content-Type" : "application/json",
                    authorization:`Bearer ${token}`
                },
                body: JSON.stringify({voucherId:null})
            });
            window.location.href="/User-Index/Cart/Check-out/Check-Out.html";
    }else{
        try {
            await fetch("http://localhost:3000/Cart/updatesubtotal",{
                method:"PATCH",
                headers:{"Content-Type" : "application/json",
                    authorization:`Bearer ${token}`
                },
                body: JSON.stringify({voucherId: voucherchoose})
            });
            window.location.href="/User-Index/Cart/Check-out/Check-Out.html";
        } catch (error) {
            console.error("Lỗi khi tải voucher!", err);
        }
    }
});

async function quantity() {
  const token= localStorage.getItem("token");
  const no= document.querySelector(".No-Product");
    const have= document.querySelector(".Have-Product");
  if(!token){
            have.style.display="none";
            no.style.display="block";
        return;
  }else{
        no.style.display="none";
        have.style.display="block";
        const cart= await fetch("http://localhost:3000/Cart", {
        headers:{"Content-Type": "application/json",
                authorization: `Bearer ${token}`}
        });
        const data = await cart.json();
        const quantity = document.getElementById("cartCount");
        let totalQuantity = 0;
        data.items.forEach(item => {
        totalQuantity += item.quantity;
        });
        quantity.textContent = totalQuantity;
    }
}

document.addEventListener("DOMContentLoaded",()=>{
    include("/User-Index/Header/Header.html", "header");
    include("/User-Index/Footer/Footer.html", "footer");
    fetchProduct();
    quantity();
    applyVoucher();
})