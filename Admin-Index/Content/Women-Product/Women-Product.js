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

const pageId="6893263679b46114ae7c0085";

async function fetchPage(id) {
  try{
    const res= await fetch(`${API}/${id}`);
    const data= await res.json();
    const sections= data.sections;

    const brandName= document.querySelector('[data-Brand-Name]');
    brandName.textContent= sections['Brand-Name-Body'].content;
    brandName.setAttribute('data-editable', 'true');
    brandName.setAttribute('data-key', 'Brand-Name-Body');

    const videoArea1= document.querySelector('[data-Video-Area1]');
    videoArea1.innerHTML=`<video id="Video" src="${sections['Video-Area1'].video}" loop muted playsinline></video>`;
    videoArea1.setAttribute('data-editable', 'true');
    videoArea1.setAttribute('data-key', 'Video-Area1');

    document.getElementById("Video").play();

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


document.addEventListener("DOMContentLoaded", () => {
    Checkadmin();
    include("/Admin-Index/Content/Header/Header.html", "header");
    include("/Admin-Index/Content/Footer/Footer.html", "footer");
    fetchPage(pageId);
});