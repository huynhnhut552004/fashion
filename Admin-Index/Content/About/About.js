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
    title.innerHTML = `<a href="/Admin-Index/Content/Main/Main.html">${sections['Header-Site'].content}</a>`;
    title.setAttribute('data-editable', 'header');
    title.setAttribute('data-key', 'Header-Site');
} catch (error) {
    console.error("Không thể lấy hoặc hiển thị dữ liệu:", error);
}
}

document.addEventListener('dblclick', async (e) => {
    const target = e.target;
    if (target.dataset.editable === 'header') {
        const originalText = target.textContent;
        const sectionKey = target.dataset.key;
        const token= localStorage.getItem("token");
        const textarea = document.createElement('textarea');
        const originalClasses = target.className;
        const originalStyles = target.getAttribute('style');
        textarea.value = originalText;
        textarea.style.width = '100%';
        textarea.style.height = 'auto';
        target.replaceWith(textarea);
        textarea.focus();
        textarea.addEventListener('blur', async () => {
            const newText = textarea.value;
            try {
               await fetch(`${API}/${headerId}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        [`sections.${sectionKey}.content`]: newText
                    })
                });
                const newDiv = document.createElement('div');
                newDiv.textContent = newText;
                newDiv.setAttribute('data-editable', 'true');
                newDiv.setAttribute('data-key', sectionKey);
                newDiv.className = originalClasses;
                if (originalStyles) newDiv.setAttribute('style', originalStyles);
                textarea.replaceWith(newDiv);
            } catch (err) {
                console.error("Lỗi khi cập nhật nội dung:", err);
                alert("Unable to update content!");
                textarea.replaceWith(target);
            }
        });
    }
});

const footerId="689326a6c52779c23722b093";

async function fetchFooterData() {
    try{
        const res= await fetch(`${API}/${footerId}`);
        const pageData= await res.json();
        const sections= pageData.sections;
        const brandName= document.querySelector('[data-Brand-Name-Footer]');
        brandName.textContent= sections['Brand-Name-Footer'].content;
        brandName.setAttribute('data-editable', 'footer');
        brandName.setAttribute('data-key', 'Brand-Name-Footer');
}catch (error) {
    console.error("Không thể lấy hoặc hiển thị dữ liệu:", error);
}
}

document.addEventListener('dblclick', async (e) => {
    const target = e.target;
    if (target.dataset.editable === 'footer') {
        const originalText = target.textContent;
        const sectionKey = target.dataset.key;
        const token= localStorage.getItem("token");
        const textarea = document.createElement('textarea');
        const originalClasses = target.className;
        const originalStyles = target.getAttribute('style');
        textarea.value = originalText;
        textarea.style.width = '100%';
        textarea.style.height = 'auto';
        target.replaceWith(textarea);
        textarea.focus();
        textarea.addEventListener('blur', async () => {
            const newText = textarea.value;
            try {
               await fetch(`${API}/${footerId}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        [`sections.${sectionKey}.content`]: newText
                    })
                });
                const newDiv = document.createElement('div');
                newDiv.textContent = newText;
                newDiv.setAttribute('data-editable', 'true');
                newDiv.setAttribute('data-key', sectionKey);
                newDiv.className = originalClasses;
                if (originalStyles) newDiv.setAttribute('style', originalStyles);
                textarea.replaceWith(newDiv);
            } catch (err) {
                console.error("Lỗi khi cập nhật nội dung:", err);
                alert("Unable to update content!");
                textarea.replaceWith(target);
            }
        });
    }
});


async function Checkadmin() {
    const token= localStorage.getItem("token");
    const res= await fetch("https://fashion-bsqk.onrender.com/admin",{
        headers: {authorization:`Bearer ${token}`},
    });
    if(!res.ok){
        alert("You do not have enough Admin access rights!");
        window.location.href="/User-Index/Login/Admin-Login/Admin-Login.html";
    }else{
        const data= await res.json();
        console.log(data);
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
    imgArea1.setAttribute('data-editable', 'true');
    imgArea1.setAttribute('data-key', 'Img-Area1');

    const brandName= document.querySelector('[data-Brand-Name]');
    brandName.textContent= sections['Brand-Name-Body'].content;
    brandName.setAttribute('data-editable', 'true');
    brandName.setAttribute('data-key', 'Brand-Name-Body');
    
    const titleArea2= document.querySelector('[data-Title-Area2]');
    titleArea2.innerHTML=`<h3>${sections['Title-Area2'].content}</h3>`;
    titleArea2.setAttribute('data-editable', 'true');
    titleArea2.setAttribute('data-key', 'Title-Area2');

    const contentArea2= document.querySelector('[data-Content-Area2]');
    contentArea2.textContent= sections['Content-Area2'].content;
    contentArea2.setAttribute('data-editable', 'true');
    contentArea2.setAttribute('data-key', 'Content-Area2');

    const content1Area2= document.querySelector('[data-Content1-Area2]');
    content1Area2.textContent= sections['Content1-Area2'].content;
    content1Area2.setAttribute('data-editable', 'true');
    content1Area2.setAttribute('data-key', 'Content1-Area2');

    const content2Area2= document.querySelector('[data-Content2-Area2]');
    content2Area2.textContent= sections['Content2-Area2'].content;
    content2Area2.setAttribute('data-editable', 'true');
    content2Area2.setAttribute('data-key', 'Content2-Area2');

    const content3Area2= document.querySelector('[data-Content3-Area2]');
    content3Area2.textContent= sections['Content3-Area2'].content;
    content3Area2.setAttribute('data-editable', 'true');
    content3Area2.setAttribute('data-key', 'Content3-Area2');

    const titleArea3= document.querySelector('[data-Title-Area3]');
    titleArea3.innerHTML=`<h3>${sections['Title-Area3'].content}</h3>`;
    titleArea3.setAttribute('data-editable', 'true');
    titleArea3.setAttribute('data-key', 'Title-Area3');

    const content1Area3= document.querySelector('[data-Content1-Area3]');
    content1Area3.textContent= sections['Content1-Area3'].content;
    content1Area3.setAttribute('data-editable', 'true');
    content1Area3.setAttribute('data-key', 'Content1-Area3');

    const content2Area3= document.querySelector('[data-Content2-Area3]');
    content2Area3.textContent= sections['Content2-Area3'].content;
    content2Area3.setAttribute('data-editable', 'true');
    content2Area3.setAttribute('data-key', 'Content2-Area3');

    const content3Area3= document.querySelector('[data-Content3-Area3]');
    content3Area3.textContent= sections['Content3-Area3'].content;
    content3Area3.setAttribute('data-editable', 'true');
    content3Area3.setAttribute('data-key', 'Content3-Area3');

    const titleArea4= document.querySelector('[data-Title-Area4]');
    titleArea4.innerHTML=`<h3>${sections['Title-Area4'].content}</h3>`;
    titleArea4.setAttribute('data-editable', 'true');
    titleArea4.setAttribute('data-key', 'Title-Area4');

    const content1Area4= document.querySelector('[data-Content1-Area4]');
    content1Area4.textContent= sections['Content1-Area4'].content;
    content1Area4.setAttribute('data-editable', 'true');
    content1Area4.setAttribute('data-key', 'Content1-Area');

    const content2Area4= document.querySelector('[data-Content2-Area4]');
    content2Area4.textContent= sections['Content2-Area4'].content;
    content2Area4.setAttribute('data-editable', 'true');
    content2Area4.setAttribute('data-key', 'Content2-Area4');

  }catch (error) {
        console.error("Không thể lấy hoặc hiển thị dữ liệu:", error);
  }
}

document.addEventListener('dblclick', async (e) => {
    const target = e.target;
    if (target.dataset.editable === 'true') {
        const originalText = target.textContent;
        const sectionKey = target.dataset.key;
        const token= localStorage.getItem("token");
        const textarea = document.createElement('textarea');
        const originalClasses = target.className;
        const originalStyles = target.getAttribute('style');
        textarea.value = originalText;
        textarea.style.width = '100%';
        textarea.style.height = 'auto';
        target.replaceWith(textarea);
        textarea.focus();
        textarea.addEventListener('blur', async () => {
            const newText = textarea.value;
            try {
               await fetch(`${API}/${pageId}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        [`sections.${sectionKey}.content`]: newText
                    })
                });
                const newDiv = document.createElement('div');
                newDiv.textContent = newText;
                newDiv.setAttribute('data-editable', 'true');
                newDiv.setAttribute('data-key', sectionKey);
                newDiv.className = originalClasses;
                if (originalStyles) newDiv.setAttribute('style', originalStyles);
                textarea.replaceWith(newDiv);
            } catch (err) {
                console.error("Lỗi khi cập nhật nội dung:", err);
                alert("Unable to update content!");
                textarea.replaceWith(target);
            }
        });
    }
});

document.addEventListener('dblclick', async (e) => {
    const target = e.target;
    if (target.tagName === 'IMG' && target.parentElement.dataset.editable === 'true') {
        const sectionKey = target.parentElement.dataset.key;
        const token = localStorage.getItem("token");
        const oldImageUrl = target.src;
        const oldFilename = oldImageUrl.split('/').pop();
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.style.display = 'none';
        input.addEventListener('change', async () => {
            const file = input.files[0];
            if (!file) return;
            const formData = new FormData();
            formData.append('image', file);
            try {
                await fetch(`https://fashion-bsqk.onrender.com/deletePageImage/${oldFilename}`, {
                    method: 'DELETE'
                });
                const res = await fetch('https://fashion-bsqk.onrender.com/imgPage', {
                    method: 'POST',
                    body: formData
                });
                const data = await res.json();
                const newImageUrl = data.imageUrl;
                target.src = newImageUrl;
                await fetch(`${API}/${pageId}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        [`sections.${sectionKey}.img`]: newImageUrl
                    })
                });

            } catch (err) {
                console.error("Lỗi khi thay ảnh:", err);
                alert("Unable to update photo.");
            }
        });

        document.body.appendChild(input);
        input.click();
        document.body.removeChild(input);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    Checkadmin();
    include("/Admin-Index/Content/Header/Header.html", "header");
    include("/Admin-Index/Content/Footer/Footer.html", "footer");
    fetchPage(pageId);
});