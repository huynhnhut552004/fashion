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

const pageId="68932613d50d7f9f5c7d293f";

async function fetchPage(id) {
  try{
    const res= await fetch(`${API}/${id}`);
    const data= await res.json();
    const sections= data.sections;

    const brandName= document.querySelector('[data-Brand-Name]');
    brandName.textContent= sections['Brand-Name-Body'].content;
  
    const videoArea1= document.querySelector('[data-Video-Area1]');
    videoArea1.innerHTML=`<video id="Video" src="${sections['Video-Area1'].video}" loop muted playsinline></video>`;
   
    document.getElementById("Video").play();

  }catch (error) {
        console.error("Không thể lấy hoặc hiển thị dữ liệu:", error);
  }
}

async function fetchCategory() {
  const res= await fetch("https://fashion-imn4.onrender.com/Category");
  const data= await res.json();
  const select= document.getElementById("Category");
  data.forEach(cat=>{
    const option= document.createElement("option");
    option.value=cat._id;
    option.textContent=cat.name;
    select.appendChild(option);
  })
}

const APIproduct= "https://fashion-imn4.onrender.com/Product/Menproduct";

async function fetchProduct() {
    const res= await fetch(APIproduct);
    const data= await res.json();
    const product= document.getElementById("Area-Product");
    product.innerHTML=""; 
    data.forEach(p =>{
        const div= document.createElement("div");
        div.addEventListener("click", ()=>{
          window.location.href = `/User-Index/Detail/Detail.html?id=${p._id}`;
        });
        div.className="Product";
        div.innerHTML=`
        <img src="${p.image}" width="120"><br>
        ${p.name}<br>
        ${p.price}$<br>
        `;
        product.appendChild(div);
    });
}

const APICategory= "https://fashion-imn4.onrender.com/Product/category";

document.getElementById("Category").addEventListener("change", async ()=>{
  const category= document.getElementById("Category").value;
  if(category=="All"){
    fetchProduct();
  }else{
  const res= await fetch(`${APICategory}/${category}/gender/Men`);
  const data= await res.json();
  const product= document.getElementById("Area-Product");
  product.innerHTML="";
  data.forEach(p=>{
     const div= document.createElement("div");
        div.className="Product";
        div.innerHTML=`
        <img src="${p.image}" width="120"><br>
        ${p.name}<br>
        ${p.price}$<br>
        `;
        product.appendChild(div);
  });
  }
})

const input= document.getElementById("searchInput");
const suggestions= document.getElementById("suggestions");
let timer;
async function search() {
  const query= input.value.trim();
    clearTimeout(timer);
    if (query===""){
        suggestions.innerHTML=""
        return;
    }
    timer= setTimeout(()=>{
        fetch(`https://fashion-imn4.onrender.com/Product/searchMen?search=${encodeURIComponent(query)}`)
        .then(res => {
    if (!res.ok) throw new Error("Lỗi tìm kiếm");
    return res.json();
  })
  .then(data => {
            suggestions.innerHTML="";
            data.forEach(product=>{
                const li= document.createElement("li"); 
                li.style.listStyle="none";
                li.innerHTML = `
                <a href="#" class="suggest-item">
                    <img src="${product.image}" alt="Img" />
                    <div class="info">
                        <h4>${product.name}</h4>
                        <p>${product.price}$</p>
                    </div>
                </a>
                `;
                suggestions.appendChild(li);
            });
        })
            .catch(err => {
            console.error("Lỗi tìm kiếm:", err.message);
        });
    },300);
}
input.addEventListener("input",search);

input.addEventListener("blur",()=>{
  const value=document.getElementById("searchInput").value="";
  search();
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



document.addEventListener("DOMContentLoaded", () => {
  include("../Header/Header.html", "header");
  include("../Footer/Footer.html", "footer");
  fetchPage(pageId);
  fetchCategory();
  fetchProduct();
  quantity();
});