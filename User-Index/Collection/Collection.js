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

const pageId="68932669c36e228eef3ea7e4";

async function fetchPage(id) {
  try{
    const res= await fetch(`${API}/${id}`);
    const data= await res.json();
    sections= data.sections;

    const title= document.querySelector('[data-Title]');
    title.innerHTML=`<h2>${sections['Title'].content}</h2>`;
    
    const descriptionVideo1= document.querySelector('[data-Description-Video1]');
    descriptionVideo1.innerHTML=`<h3>${sections['Description-Video1'].content}</h3>`;
   
    const video1= document.querySelector('[data-Video1]');
    video1.innerHTML=` <video id="video-1" src="${sections['Video1'].video}" loop muted playsinline></video>`;

    const content1= document.querySelector('[data-Content1]');
    content1.textContent= sections['Content1'].content;

    const video2= document.querySelector('[data-Video2]');
    video2.innerHTML=`<video id="video-2" src="${sections['Video2'].video}" loop muted playsinline></video>`;
  
    const title1= document.querySelector('[data-Title1]');
    title1.innerHTML=`<h3>${sections['Title1'].content}</h3>`;
  
    const img1= document.querySelector('[data-Img1]');
    img1.innerHTML=`<img src="${sections['Img1'].img}" alt="Img">`;
   
    const img2= document.querySelector('[data-Img2]');
    img2.innerHTML=`<img src="${sections['Img2'].img}" alt="Img">`;

    const img3= document.querySelector('[data-Img3]');
    img3.innerHTML=`<img src="${sections['Img3'].img}" alt="Img">`;

    const img4= document.querySelector('[data-Img4]');
    img4.innerHTML=`<img src="${sections['Img4'].img}" alt="Img">`;

    const img5= document.querySelector('[data-Img5]');
    img5.innerHTML=`<img src="${sections['Img5'].img}" alt="Img">`;

    const img6= document.querySelector('[data-Img6]');
    img6.innerHTML=`<img src="${sections['Img6'].img}" alt="Img">`

    const img7= document.querySelector('[data-Img7]');
    img7.innerHTML=`<img src="${sections['Img7'].img}" alt="Img">`;

    const img8= document.querySelector('[data-Img8]');
    img8.innerHTML=`<img src="${sections['Img8'].img}" alt="Img">`;

    const img9= document.querySelector('[data-Img9]');
    img9.innerHTML=`<img src="${sections['Img9'].img}" alt="Img">`;

    const video3= document.querySelector('[data-Video3]');
    video3.innerHTML=` <video id="video-3" src="${sections['Video3'].video}" loop muted playsinline></video>`;

    const content2= document.querySelector('[data-Content2]');
    content2.textContent= sections['Content2'].content;

    const title2= document.querySelector('[data-Title2]');
    title2.innerHTML=`<h3>${sections['Title2'].content}</h3>`;

    const img10= document.querySelector('[data-Img10]');
    img10.innerHTML=`<img src="${sections['Img10'].img}" alt="Img">`;

    const img11= document.querySelector('[data-Img11]');
    img11.innerHTML=`<img src="${sections['Img11'].img}" alt="Img">`;

    const img12= document.querySelector('[data-Img12]');
    img12.innerHTML=`<img src="${sections['Img12'].img}" alt="Img">`;

    const img13= document.querySelector('[data-Img13]');
    img13.innerHTML=`<img src="${sections['Img13'].img}" alt="Img">`;
  
    const img14= document.querySelector('[data-Img14]');
    img14.innerHTML=`<img src="${sections['Img14'].img}" alt="Img">`;
   
    const img15= document.querySelector('[data-Img15]');
    img15.innerHTML=`<img src="${sections['Img15'].img}" alt="Img">`;

    const img16= document.querySelector('[data-Img16]');
    img16.innerHTML=`<img src="${sections['Img16'].img}" alt="Img">`;
   
    const img17= document.querySelector('[data-Img17]');
    img17.innerHTML=`<img src="${sections['Img17'].img}" alt="Img">`;
  
    const img18= document.querySelector('[data-Img18]');
    img18.innerHTML=`<img src="${sections['Img18'].img}" alt="Img">`;

    const content3= document.querySelector('[data-Content3]');
    content3.textContent= sections['Content3'].content;

    const video4= document.querySelector('[data-Video4]');
    video4.innerHTML=`<video id="video-4" src="${sections['Video4'].video}" loop muted playsinline></video>`;
   
    document.getElementById("video-1").play();
    document.getElementById("video-2").play();
    document.getElementById("video-3").play();
    document.getElementById("video-4").play();
    
  }catch (error){
    console.error("Không thể lấy hoặc hiển thị dữ liệu:", error);
  }
}

async function quantity() {
  const token= localStorage.getItem("token");
  if(!token){
    return;
  }else{
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

document.addEventListener("DOMContentLoaded", ()=>{
  include("../Header/Header.html", "header");
  include("../Footer/Footer.html", "footer");
  fetchPage(pageId);
  quantity();
});