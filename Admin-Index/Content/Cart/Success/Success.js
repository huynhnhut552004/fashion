 async function Checkadmin() {
    const token= localStorage.getItem("token");
    const res= await fetch("http://localhost:3000/admin",{
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

const pageId= "689326e405f2a44685180a0f";
const API = "http://localhost:3000/Page";

async function fetchPage(id) {
    try{
        const res= await fetch(`${API}/${id}`);
        const data= await res.json();
        const sections= data.sections;

        const headerSuccess= document.querySelector('[data-Header-Success]');
        headerSuccess.innerHTML=`<h2>${sections['Header-Success'].content}</h2>`;
        headerSuccess.setAttribute('data-editable', 'true');
        headerSuccess.setAttribute('data-key', 'Header-Success');
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

document.addEventListener("DOMContentLoaded", ()=>{
    Checkadmin();
    fetchPage(pageId);
})