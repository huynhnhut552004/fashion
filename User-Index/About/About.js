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

const API = "https://fashion-imn4.onrender.com/Page";
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

const pageId="689325da39944a9f3a696f48";

async function fetchPage(id) {
  try{
    const res= await fetch(`${API}/${id}`);
    const data= await res.json();
    const sections= data.sections;

    const imgArea1= document.querySelector('[data-Img-Area1]');
    imgArea1.innerHTML=`<img src="${sections['Img-Area1'].img}" alt="Img">`;

    const brandName= document.querySelector('[data-Brand-Name]');
    brandName.textContent= sections['Brand-Name-Body'].content;
    
    const titleArea2= document.querySelector('[data-Title-Area2]');
    titleArea2.innerHTML=`<h3>${sections['Title-Area2'].content}</h3>`;

    const contentArea2= document.querySelector('[data-Content-Area2]');
    contentArea2.textContent= sections['Content-Area2'].content;

    const content1Area2= document.querySelector('[data-Content1-Area2]');
    content1Area2.textContent= sections['Content1-Area2'].content;

    const content2Area2= document.querySelector('[data-Content2-Area2]');
    content2Area2.textContent= sections['Content2-Area2'].content;

    const content3Area2= document.querySelector('[data-Content3-Area2]');
    content3Area2.textContent= sections['Content3-Area2'].content;

    const titleArea3= document.querySelector('[data-Title-Area3]');
    titleArea3.innerHTML=`<h3>${sections['Title-Area3'].content}</h3>`;

    const content1Area3= document.querySelector('[data-Content1-Area3]');
    content1Area3.textContent= sections['Content1-Area3'].content;

    const content2Area3= document.querySelector('[data-Content2-Area3]');
    content2Area3.textContent= sections['Content2-Area3'].content;

    const content3Area3= document.querySelector('[data-Content3-Area3]');
    content3Area3.textContent= sections['Content3-Area3'].content;

    const titleArea4= document.querySelector('[data-Title-Area4]');
    titleArea4.innerHTML=`<h3>${sections['Title-Area4'].content}</h3>`;
  
    const content1Area4= document.querySelector('[data-Content1-Area4]');
    content1Area4.textContent= sections['Content1-Area4'].content;

    const content2Area4= document.querySelector('[data-Content2-Area4]');
    content2Area4.textContent= sections['Content2-Area4'].content;

  }catch (error) {
        console.error("Không thể lấy hoặc hiển thị dữ liệu:", error);
  }
}


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

document.addEventListener("DOMContentLoaded", () => {
    include("../Header/Header.html", "header");
    include("../Footer/Footer.html", "footer");
    fetchPage(pageId);
    quantity();
});