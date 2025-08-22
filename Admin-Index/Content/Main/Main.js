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
    const res= await fetch("http://localhost:3000/admin",{
        headers: {authorization:`Bearer ${token}`},
    });
    if(!res.ok){
        alert("BYou do not have enough Admin access rights!");
        window.location.href="/User-Index/Login/Admin-Login/Admin-Login.html";
    }else{
        const data= await res.json();
        console.log(data);
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
        brandName.setAttribute('data-editable', 'true');
        brandName.setAttribute('data-key', 'Brand-Name-Body');

        const imgArea1 = document.querySelector('[data-Img-Area1]');
        imgArea1.innerHTML = `<img src="${sections['Img-Area1'].img}" alt="Img">`;
        imgArea1.setAttribute('data-editable', 'true');
        imgArea1.setAttribute('data-key', 'Img-Area1');

        const titleArea1= document.querySelector('[data-Title-Area1]');
        titleArea1.innerHTML= `<h3>${sections['Title-Area1'].content}</h3>`;
        titleArea1.setAttribute('data-editable', 'true');
        titleArea1.setAttribute('data-key', 'Title-Area1');

        const contentArea1= document.querySelector('[data-Content-Area1]');
        contentArea1.textContent= sections['Content-Area1'].content;
        contentArea1.setAttribute('data-editable', 'true');
        contentArea1.setAttribute('data-key', 'Content-Area1');

        const titleArea2= document.querySelector('[data-Title-Area2]');
        titleArea2.innerHTML=`<h3>${sections['Title-Area2'].content}</h3>`;
        titleArea2.setAttribute('data-editable', 'true');
        titleArea2.setAttribute('data-key', 'Title-Area2');

        const contentArea2= document.querySelector('[data-Content-Area2]');
        contentArea2.textContent= sections['Content-Area2'].content;
        contentArea2.setAttribute('data-editable', 'true');
        contentArea2.setAttribute('data-key', 'Content-Area2');

        const imgArea2= document.querySelector('[data-Img-Area2]');
        imgArea2.innerHTML= `<img src="${sections['Img-Area2'].img}" alt="Img">`;
        imgArea2.setAttribute('data-editable', 'true');
        imgArea2.setAttribute('data-key', 'Img-Area2');

        const titleArea3= document.querySelector('[data-Title-Area3]');
        titleArea3.innerHTML=`<h3>${sections['Title-Area3'].content}</h3>`;
        titleArea3.setAttribute('data-editable', 'true');
        titleArea3.setAttribute('data-key', 'Title-Area3');

        const content1Area3= document.querySelector('[data-Content1-Area3]');
        content1Area3.textContent=sections['Content1-Area3'].content;
        content1Area3.setAttribute('data-editable', 'true');
        content1Area3.setAttribute('data-key', 'Content1-Area3');

        const img1Area3= document.querySelector('[data-Img1-Area3]');
        img1Area3.innerHTML= `<img src="${sections['Img1-Area3'].img}" alt="Img">`;
        img1Area3.setAttribute('data-editable', 'true');
        img1Area3.setAttribute('data-key', 'Img1-Area3');

        const img2Area3= document.querySelector('[data-Img2-Area3]');
        img2Area3.innerHTML= `<img src="${sections['Img2-Area3'].img}" alt="Img">`;
        img2Area3.setAttribute('data-editable', 'true');
        img2Area3.setAttribute('data-key', 'Img2-Area3');

        const img3Area3= document.querySelector('[data-Img3-Area3]');
        img3Area3.innerHTML=`<img src="${sections['Img3-Area3'].img}" alt="Img">`;
        img3Area3.setAttribute('data-editable', 'true');
        img3Area3.setAttribute('data-key', 'Img3-Area3');

        const content2Area3= document.querySelector('[data-Content2-Area3]');
        content2Area3.textContent= sections['Content2-Area3'].content;
        content2Area3.setAttribute('data-editable', 'true');
        content2Area3.setAttribute('data-key', 'Content2-Area3');

        const img4Area3= document.querySelector('[data-Img4-Area3]');
        img4Area3.innerHTML= `<img src="${sections['Img4-Area3'].img}" alt="Img">`;
        img4Area3.setAttribute('data-editable', 'true');
        img4Area3.setAttribute('data-key', 'Img4-Area3');

        const img5Area3= document.querySelector('[data-Img5-Area3]');
        img5Area3.innerHTML= `<img src="${sections['Img5-Area3'].img}" alt="Img">`;
        img5Area3.setAttribute('data-editable', 'true');
        img5Area3.setAttribute('data-key', 'Img5-Area3');

        const videoArea3= document.querySelector('[data-Video-Area3]');
        videoArea3.innerHTML=`<video id="Video" src="${sections['Video-Area3'].video}" loop muted playsinline></video>`;
        videoArea3.setAttribute('data-editable', 'true');
        videoArea3.setAttribute('data-key', 'Video-Area3');
        const video= document.getElementById("Video");
        video.play();
    } catch (error) {
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
                await fetch(`http://localhost:3000/deletePageImage/${oldFilename}`, {
                    method: 'DELETE'
                });
                const res = await fetch('http://localhost:3000/imgPage', {
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
                await fetch(`http://localhost:3000/deletePageVideo/${oldFilename}`, {
                    method: 'DELETE'
                });

                const res = await fetch('http://localhost:3000/videoPage', {
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

document.addEventListener("DOMContentLoaded", () => {
    Checkadmin();
    include("../Header/Header.html", "header");
    include("../Footer/Footer.html", "footer");
    fetchAndRenderPage(pageId);
});