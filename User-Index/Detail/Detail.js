async function include(file, elementId) {
const res = await fetch(file);
const html = await res.text();
document.getElementById(elementId).innerHTML = html;
if (elementId === "header") {
    fetchHeaderData();
    const header = document.querySelector("header");
    if (header) {
      header.classList.add("Hidden");

      window.addEventListener("scroll", () => {
        const Y = window.pageYOffset;
        if (Y > 0) {
          header.classList.remove("Hidden");
        } else {
          header.classList.add("Hidden");
        }
      });
}
}
if (elementId==="footer"){
    fetchFooterData();
}
}

const API = "https://fashion-bsqk.onrender.com/Page";
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

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

async function fetchProduct(){
  fetch(`https://fashion-bsqk.onrender.com/Product/${id}`)
    .then(res => res.json())
    .then(data => {
       document.getElementById("Img").innerHTML=`<img src="${data.image.imageUrl}" alt="Img">`
        document.getElementById("Name").innerHTML = data.name;
        document.getElementById("Price") .innerHTML = `${data.price}$`;
        document.getElementById("Description").innerHTML = data.description;
    })
    .catch(err => {
      console.error("Lỗi khi gọi API:", err);
    });
}

document.getElementById("Back").addEventListener("click",()=>{
  window.history.go(-1);
})

document.getElementById("Buy").addEventListener("click", async () => {
  const token= localStorage.getItem("token");
  const warning = document.querySelector(".warning");
  if(!token){
    warning.style.display = "flex";
    return;
  }else{
    const res= await fetch("https://fashion-bsqk.onrender.com/usertoken", {
      headers: {authorization:`Bearer ${token}`},
    });
    
    if (!res.ok) {
        warning.style.display = "flex";
      return;
    } else {
      warning.style.display = "none";
      await fetch(`https://fashion-bsqk.onrender.com/Cart/add/${id}`, {
        method: "POST",
        headers: {authorization: `Bearer ${token}`}
      })
    }
    quantity();
  }
});

async function quantity() {
  const token= localStorage.getItem("token");
  if(!token){
    return;
  }else{
    const cart= await fetch("https://fashion-imn4.onrender.com/Cart", {
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

document.addEventListener("DOMContentLoaded", ()=>{
  include("/User-Index/Header/Header.html", "header");
  include("/User-Index/Footer/Footer.html", "footer");
  fetchProduct();
  quantity();
})