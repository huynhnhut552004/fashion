 const pageId= "689326e405f2a44685180a0f";
const API = "https://fashion-bsqk.onrender.com/Page";

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

fetchPage(pageId);