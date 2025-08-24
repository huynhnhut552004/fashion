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

const pageId= "68aabe1d13bc0097de9b3895";

async function fectPage(id) {
    try {
        const res = await fetch(`${API}/${id}`);
        const data = await res.json();
        const sections = data.sections;

        const brandName = document.querySelector('[data-Brand-Name]');
        brandName.textContent = sections['Brand-Name-Body'].content;

        const video1Area1 = document.querySelector('[data-Video1-Area1]')
        video1Area1.innerHTML = `<video id="Video-1" src="${sections['Video1-Area1'].videoUrl}" loop muted playsinline></video> <div class="video-overlay"></div>`;

        const video2Area1 = document.querySelector('[data-Video2-Area1]');
        video2Area1.innerHTML = `<video id="Video-2" src="${sections['Video2-Area1'].videoUrl}" loop muted playsinline></video> <div class="video-overlay"></div>`;

        const content1Area2 = document.querySelector('[data-Content1-Area2]');
        content1Area2.textContent = sections['Content1-Area2'].content;

        const content2Area2 = document.querySelector('[data-Content2-Area2]');
        content2Area2.textContent = sections['Content2-Area2'].content;


        const content3Area2 = document.querySelector('[data-Content3-Area2]');
        content3Area2.textContent = sections['Content3-Area2'].content;

        const imgArea2 = document.querySelector('[data-Img-Area2]');
        imgArea2.innerHTML = `<img src="${sections['Img-Area2'].imageUrl}" alt="Img">`;

        const content1Area3 = document.querySelector('[data-Content1-Area3]');
        content1Area3.textContent = sections['Content1-Area3'].content;

        const content2Area3 = document.querySelector('[data-Content2-Area3]');
        content2Area3.textContent = sections['Content2-Area3'].content;

        const content3Area3 = document.querySelector('[data-Content3-Area3]');
        content3Area3.textContent = sections['Content3-Area3'].content;

        const content4Area3 = document.querySelector('[data-Content4-Area3]');
        content4Area3.innerHTML = `<i>${sections['Content4-Area3'].content}</i>`;

        const video1 = document.getElementById("Video-1");
        const video2 = document.getElementById("Video-2");
        const videoContainer1 = video1.closest('.Video-1');
        const videoContainer2 = video2.closest('.Video-2');

        const handleMouseEnter1 = () => {
            video1.play().catch(e => console.error("Video 1 play error:", e));
            videoContainer1.classList.remove('paused');
            video2.pause();
            videoContainer2.classList.add('paused');
        };

        const handleMouseEnter2 = () => {
            video2.play().catch(e => console.error("Video 2 play error:", e));
            videoContainer2.classList.remove('paused');
            video1.pause();
            videoContainer1.classList.add('paused');
        };

        const setupDesktopBehavior = () => {
            video1.pause();
            videoContainer1.classList.add('paused');
            video2.pause();
            videoContainer2.classList.add('paused');
            video1.addEventListener("mouseenter", handleMouseEnter1);
            video2.addEventListener("mouseenter", handleMouseEnter2);
        };

        const setupMobileBehavior = () => {
            video1.removeEventListener("mouseenter", handleMouseEnter1);
            video2.removeEventListener("mouseenter", handleMouseEnter2);
            video1.play().catch(e => console.error("Video 1 play error:", e));
            videoContainer1.classList.remove('paused');
            video2.play().catch(e => console.error("Video 2 play error:", e));
            videoContainer2.classList.remove('paused');
        };

        const isMobile = window.matchMedia("(max-width: 480px)");

        const handleScreenChange = (e) => {
            if (e.matches) {
                setupMobileBehavior();
            } else {
                setupDesktopBehavior();
            }
        };

        handleScreenChange(isMobile);
        isMobile.addEventListener("change", handleScreenChange);
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



document.addEventListener('DOMContentLoaded', () => {
    include("/User-Index/Header/Header.html", "header");
    include("/User-Index/Footer/Footer.html", "footer");
    fectPage(pageId);
    quantity();
});