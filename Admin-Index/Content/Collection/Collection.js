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

const pageId="68aabe5cb93bcf62915209f7";

async function fetchPage(id) {
  try{
    const res= await fetch(`${API}/${id}`);
    const data= await res.json();
    sections= data.sections;

    const title= document.querySelector('[data-Title]');
    title.innerHTML=`<h2>${sections['Title'].content}</h2>`;
    title.setAttribute('data-editable', 'true');
    title.setAttribute('data-key', 'Title');

    const descriptionVideo1= document.querySelector('[data-Description-Video1]');
    descriptionVideo1.innerHTML=`<h3>${sections['Description-Video1'].content}</h3>`;
    descriptionVideo1.setAttribute('data-editable', 'true');
    descriptionVideo1.setAttribute('data-key', 'Description-Video1');

    const video1= document.querySelector('[data-Video1]');
    video1.innerHTML=` <video id="video-1" src="${sections['Video1'].videoUrl}" loop muted playsinline></video>`;
    video1.setAttribute('data-editable', 'true');
    video1.setAttribute('data-key', 'Video1');

    const content1= document.querySelector('[data-Content1]');
    content1.textContent= sections['Content1'].content;
    content1.setAttribute('data-editable', 'true');
    content1.setAttribute('data-key', 'Content1');

    const video2= document.querySelector('[data-Video2]');
    video2.innerHTML=`<video id="video-2" src="${sections['Video2'].videoUrl}" loop muted playsinline></video>`;
    video2.setAttribute('data-editable', 'true');
    video2.setAttribute('data-key', 'Video2');

    const title1= document.querySelector('[data-Title1]');
    title1.innerHTML=`<h3>${sections['Title1'].content}</h3>`;
    title1.setAttribute('data-editable', 'true');
    title1.setAttribute('data-key', 'Title1');

    const img1= document.querySelector('[data-Img1]');
    img1.innerHTML=`<img src="${sections['Img1'].imageUrl}" alt="Img">`;
    img1.setAttribute('data-editable', 'true');
    img1.setAttribute('data-key', 'Img1');

    const img2= document.querySelector('[data-Img2]');
    img2.innerHTML=`<img src="${sections['Img2'].imageUrl}" alt="Img">`;
    img2.setAttribute('data-editable', 'true');
    img2.setAttribute('data-key', 'Img2');

    const img3= document.querySelector('[data-Img3]');
    img3.innerHTML=`<img src="${sections['Img3'].imageUrl}" alt="Img">`;
    img3.setAttribute('data-editable', 'true');
    img3.setAttribute('data-key', 'Img3');

    const img4= document.querySelector('[data-Img4]');
    img4.innerHTML=`<img src="${sections['Img4'].imageUrl}" alt="Img">`;
    img4.setAttribute('data-editable', 'true');
    img4.setAttribute('data-key', 'Img4');

    const img5= document.querySelector('[data-Img5]');
    img5.innerHTML=`<img src="${sections['Img5'].imageUrl}" alt="Img">`;
    img5.setAttribute('data-editable', 'true');
    img5.setAttribute('data-key', 'Img5');

    const img6= document.querySelector('[data-Img6]');
    img6.innerHTML=`<img src="${sections['Img6'].imageUrl}" alt="Img">`;
    img6.setAttribute('data-editable', 'true');
    img6.setAttribute('data-key', 'Img6');

    const img7= document.querySelector('[data-Img7]');
    img7.innerHTML=`<img src="${sections['Img7'].imageUrl}" alt="Img">`;
    img7.setAttribute('data-editable', 'true');
    img7.setAttribute('data-key', 'Img7');

    const img8= document.querySelector('[data-Img8]');
    img8.innerHTML=`<img src="${sections['Img8'].imageUrl}" alt="Img">`;
    img8.setAttribute('data-editable', 'true');
    img8.setAttribute('data-key', 'Img8');

    const img9= document.querySelector('[data-Img9]');
    img9.innerHTML=`<img src="${sections['Img9'].imageUrl}" alt="Img">`;
    img9.setAttribute('data-editable', 'true');
    img9.setAttribute('data-key', 'Img9');

    const video3= document.querySelector('[data-Video3]');
    video3.innerHTML=` <video id="video-3" src="${sections['Video3'].videoUrl}" loop muted playsinline></video>`;
    video3.setAttribute('data-editable', 'true');
    video3.setAttribute('data-key', 'Video3');

    const content2= document.querySelector('[data-Content2]');
    content2.textContent= sections['Content2'].content;
    content2.setAttribute('data-editable', 'true');
    content2.setAttribute('data-key', 'Content2');

    const title2= document.querySelector('[data-Title2]');
    title2.innerHTML=`<h3>${sections['Title2'].content}</h3>`;
    title2.setAttribute('data-editable', 'true');
    title2.setAttribute('data-key', 'Title2');

    const img10= document.querySelector('[data-Img10]');
    img10.innerHTML=`<img src="${sections['Img10'].imageUrl}" alt="Img">`;
    img10.setAttribute('data-editable', 'true');
    img10.setAttribute('data-key', 'Img10');

    const img11= document.querySelector('[data-Img11]');
    img11.innerHTML=`<img src="${sections['Img11'].imageUrl}" alt="Img">`;
    img11.setAttribute('data-editable', 'true');
    img11.setAttribute('data-key', 'Img11');

    const img12= document.querySelector('[data-Img12]');
    img12.innerHTML=`<img src="${sections['Img12'].imageUrl}" alt="Img">`;
    img12.setAttribute('data-editable', 'true');
    img12.setAttribute('data-key', 'Img12');

    const img13= document.querySelector('[data-Img13]');
    img13.innerHTML=`<img src="${sections['Img13'].imageUrl}" alt="Img">`;
    img13.setAttribute('data-editable', 'true');
    img13.setAttribute('data-key', 'Img13');

    const img14= document.querySelector('[data-Img14]');
    img14.innerHTML=`<img src="${sections['Img14'].imageUrl}" alt="Img">`;
    img14.setAttribute('data-editable', 'true');
    img14.setAttribute('data-key', 'Img14');

    const img15= document.querySelector('[data-Img15]');
    img15.innerHTML=`<img src="${sections['Img15'].imageUrl}" alt="Img">`;
    img15.setAttribute('data-editable', 'true');
    img15.setAttribute('data-key', 'Img15');

    const img16= document.querySelector('[data-Img16]');
    img16.innerHTML=`<img src="${sections['Img16'].imageUrl}" alt="Img">`;
    img16.setAttribute('data-editable', 'true');
    img16.setAttribute('data-key', 'Img16');

    const img17= document.querySelector('[data-Img17]');
    img17.innerHTML=`<img src="${sections['Img17'].imageUrl}" alt="Img">`;
    img17.setAttribute('data-editable', 'true');
    img17.setAttribute('data-key', 'Img17');

    const img18= document.querySelector('[data-Img18]');
    img18.innerHTML=`<img src="${sections['Img18'].imageUrl}" alt="Img">`;
    img18.setAttribute('data-editable', 'true');
    img18.setAttribute('data-key', 'Img18');

    const content3= document.querySelector('[data-Content3]');
    content3.textContent= sections['Content3'].content;
    content3.setAttribute('data-editable', 'true');
    content3.setAttribute('data-key', 'Content3');

    const video4= document.querySelector('[data-Video4]');
    video4.innerHTML=`<video id="video-4" src="${sections['Video4'].videoUrl}" loop muted playsinline></video>`;
    video4.setAttribute('data-editable', 'true');
    video4.setAttribute('data-key', 'Video4');

    document.getElementById("video-1").play();
    document.getElementById("video-2").play();
    document.getElementById("video-3").play();
    document.getElementById("video-4").play();

  }catch (error){
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
        const oldPublicId = target.parentElement.dataset.publicId;
        const oldImageUrl = target.src;

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
                const res = await fetch('https://fashion-bsqk.onrender.com/imgPage', {
                    method: 'POST',
                    body: formData
                });
                const data = await res.json();
                const newPublicId = data.publicId;
                const newImageUrl = data.imageUrl;

                target.src = newImageUrl;
                target.parentElement.dataset.publicId = newPublicId;

                await fetch(`${API}/${pageId}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        $set: {
                            [`sections.${sectionKey}`]: {
                                publicId: newPublicId,
                                imageUrl: newImageUrl
                            }
                        }
                    })
                });

                if (oldPublicId) {
                    await fetch(`https://fashion-bsqk.onrender.com/deleteImage/${oldPublicId}`, {
                        method: 'DELETE'
                    });
                }
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

        const oldPublicId = target.parentElement.dataset.publicId;
        const oldVideoUrl = target.src;

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
                const res = await fetch('https://fashion-bsqk.onrender.com/videoPage', {
                    method: 'POST',
                    body: formData
                });
                const data = await res.json();
                const newPublicId = data.publicId;
                const newVideoUrl = data.videoUrl;

                target.src = newVideoUrl;
                target.parentElement.dataset.publicId = newPublicId;

                await fetch(`${API}/${pageId}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        $set: {
                            [`sections.${sectionKey}`]: {
                                publicId: newPublicId,
                                videoUrl: newVideoUrl
                            }
                        }
                    })
                });

                if (oldPublicId) {
                    await fetch(`https://fashion-bsqk.onrender.com/deleteVideo/${oldPublicId}`, {
                        method: 'DELETE'
                    });
                }
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

document.addEventListener("DOMContentLoaded", ()=>{
    Checkadmin();
    include("/Admin-Index/Content/Header/Header.html", "header");
    include("/Admin-Index/Content/Footer/Footer.html", "footer");
    fetchPage(pageId);
});