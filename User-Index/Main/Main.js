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

const pageId = "6898bc9c1be788818af2847c"; 

async function fetchAndRenderPage(id) {
    try {
        const response = await fetch(`${API}/${id}`);
        const pageData = await response.json();
        const sections = pageData.sections;

        const brandName = document.querySelector('[data-Brand-Name]');
        brandName.textContent = sections['Brand-Name-Body'].content;

        const imgArea1 = document.querySelector('[data-Img-Area1]');
        imgArea1.innerHTML = `<img src="${sections['Img-Area1'].imageUrl}" alt="Img">`;

        const titleArea1 = document.querySelector('[data-Title-Area1]');
        titleArea1.innerHTML = `<h3>${sections['Title-Area1'].content}</h3>`;

        const contentArea1 = document.querySelector('[data-Content-Area1]');
        contentArea1.textContent = sections['Content-Area1'].content;

        const titleArea2 = document.querySelector('[data-Title-Area2]');
        titleArea2.innerHTML = `<h3>${sections['Title-Area2'].content}</h3>`;

        const contentArea2 = document.querySelector('[data-Content-Area2]');
        contentArea2.textContent = sections['Content-Area2'].content;

        const imgArea2 = document.querySelector('[data-Img-Area2]');
        imgArea2.innerHTML = `<img src="${sections['Img-Area2'].imageUrl}" alt="Img">`;

        const titleArea3 = document.querySelector('[data-Title-Area3]');
        titleArea3.innerHTML = `<h3>${sections['Title-Area3'].content}</h3>`;

        const content1Area3 = document.querySelector('[data-Content1-Area3]');
        content1Area3.textContent = sections['Content1-Area3'].content;

        const img1Area3 = document.querySelector('[data-Img1-Area3]');
        img1Area3.innerHTML = `<img src="${sections['Img1-Area3'].imageUrl}" alt="Img">`;

        const img2Area3 = document.querySelector('[data-Img2-Area3]');
        img2Area3.innerHTML = `<img src="${sections['Img2-Area3'].imageUrl}" alt="Img">`;

        const img3Area3 = document.querySelector('[data-Img3-Area3]');
        img3Area3.innerHTML = `<img src="${sections['Img3-Area3'].imageUrl}" alt="Img">`;

        const content2Area3 = document.querySelector('[data-Content2-Area3]');
        content2Area3.textContent = sections['Content2-Area3'].content;

        const img4Area3 = document.querySelector('[data-Img4-Area3]');
        img4Area3.innerHTML = `<img src="${sections['Img4-Area3'].imageUrl}" alt="Img">`;

        const img5Area3 = document.querySelector('[data-Img5-Area3]')
        img5Area3.innerHTML = `<img src="${sections['Img5-Area3'].imageUrl}" alt="Img">`;

        const videoArea3 = document.querySelector('[data-Video-Area3]');
        videoArea3.innerHTML = `<video id="Video" src="${sections['Video-Area3'].videoUrl}" loop muted playsinline></video>`;
        const video = document.getElementById("Video");
        video.play();
    } catch (error) {
        console.error("Không thể lấy hoặc hiển thị dữ liệu:", error);
    }
}

async function quantity() {
  const token= localStorage.getItem("token");
  if(!token){
    return;
  }else{
    const cart= await fetch("https://fashion-bsqk.onrender.com/Cart", {
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
    include("/User-Index/Header/Header.html", "header");
    include("/User-Index/Footer/Footer.html", "footer");
    fetchAndRenderPage(pageId);
    quantity();
});