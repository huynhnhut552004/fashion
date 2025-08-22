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

const pageId= "689b4ae4be6f8acd1fed65f6";

async function fectPage(id) {
    try{
        const res= await fetch(`${API}/${id}`);
        const data= await res.json();
        const sections= data.sections;

        const brandName= document.querySelector('[data-Brand-Name]');
        brandName.textContent= sections['Brand-Name-Body'].content;
        brandName.setAttribute('data-editable', 'true');
        brandName.setAttribute('data-key', 'Brand-Name-Body');

        const video1Area1= document.querySelector('[data-Video1-Area1]')
        video1Area1.innerHTML= `<video id="Video-1" src="${sections['Video1-Area1'].video}" loop muted playsinline></video>`;
        video1Area1.setAttribute('data-editable', 'true');
        video1Area1.setAttribute('data-key', 'Video1-Area1');

        const video2Area1= document.querySelector('[data-Video2-Area1]');
        video2Area1.innerHTML=`<video id="Video-2" src="${sections['Video2-Area1'].video}" loop muted playsinline></video>`;
        video2Area1.setAttribute('data-editable', 'true');
        video2Area1.setAttribute('data-key', 'Video2-Area1');

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

        const imgArea2= document.querySelector('[data-Img-Area2]');
        imgArea2.innerHTML= `<img src="${sections['Img-Area2'].img}" alt="Img">`;
        imgArea2.setAttribute('data-editable', 'true');
        imgArea2.setAttribute('data-key', 'Img-Area2');

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

        const content4Area3= document.querySelector('[data-Content4-Area3]');
        content4Area3.innerHTML=`<i>${sections['Content4-Area3'].content}</i>`;
        content4Area3.setAttribute('data-editable', 'true');
        content4Area3.setAttribute('data-key', 'Content4-Area3');

        const video1 = document.getElementById("Video-1");
        const video2 = document.getElementById("Video-2");
        video1.play();
        video2.play();
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

document.addEventListener('dblclick', async (e) => {
    const target = e.target;
    if (target.tagName === 'VIDEO' && target.parentElement.dataset.editable === 'true') {
        const sectionKey = target.parentElement.dataset.key;
        const token = localStorage.getItem("token");
        const oldVideoUrl = target.src;
        const oldFilename = oldVideoUrl.split('/').pop();

        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'video/*';
        input.style.display = 'none';

        input.addEventListener('change', async () => {
            const file = input.files[0];
            if (!file) return;

            const formData = new FormData();
            formData.append('video', file);

            try {
                await fetch(`https://fashion-bsqk.onrender.com/deletePageVideo/${oldFilename}`, {
                    method: 'DELETE'
                });

                const res = await fetch('https://fashion-bsqk.onrender.com/videoPage', {
                    method: 'POST',
                    body: formData
                });

                const data = await res.json();
                const newVideoUrl = data.videoUrl;

                target.src = newVideoUrl;
 
                await fetch(`${API}/${pageId}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        [`sections.${sectionKey}.video`]: newVideoUrl
                    })
                });
            } catch (err) {
                console.error("Lỗi khi thay video:", err);
                alert("Unable to update video.");
            }
        });

        document.body.appendChild(input);
        input.click();
        document.body.removeChild(input);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    fectPage(pageId);
    include("/Admin-Index/Content/Header/Header.html", "header");
    include("/Admin-Index/Content/Footer/Footer.html", "footer");
}); 