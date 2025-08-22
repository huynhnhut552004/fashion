document.addEventListener("DOMContentLoaded", ()=>{
    Checkadmin();
    fetchPage(pageId);
    const Payment= document.querySelector(".Payment");
    const edit1= document.getElementById("Edit-1");
    const edit2= document.getElementById("Edit-2");
    Payment.classList.add("Hidden");
    edit1.classList.add("Hidden");
    edit2.classList.add("Hidden");
    CheckImformation();
    editImformation();
    checkPayment();
    editPayment();
    Complete();
})

function CheckImformation(){
    const next= document.getElementById("Continue-1");
    next.addEventListener("click", (e)=>{
        e.preventDefault();
        const phone= document.getElementById("Phone-Number").value;
        const address= document.getElementById("Address").value;
        const detail= document.getElementById("Detailed").value;
        const error= document.querySelector(".Error-1");
        if(!phone || !address || !detail){
            if(error.style.display=="none" || error.style.display==""){
                error.style.display="flex";
            }
        }else{
            const Imformation= document.querySelector(".Imformation");
            const Payment= document.querySelector(".Payment");
            const edit= document.getElementById("Edit-1");
            Imformation.classList.add("Hidden");
            Payment.classList.remove("Hidden");
            edit.classList.remove("Hidden");
        }
    })
}

function editImformation(){
    const edit= document.getElementById("Edit-1");
    edit.addEventListener("click", (e)=>{
        const Imformation= document.querySelector(".Imformation");
        const Payment= document.querySelector(".Payment");
        const error= document.querySelector(".Error-1");
        Imformation.classList.remove("Hidden");
        Payment.classList.add("Hidden");
        edit.classList.add("Hidden");
        if(error.style.display=="flex" || error.style.display==""){
            error.style.display="none";
        }
    })
}

function checkPayment(){
    const next= document.getElementById("Continue-2");
    next.addEventListener("click", (e)=>{
        e.preventDefault();
        const Cardnumber= document.getElementById("Card-Number").value;
        const Month= document.getElementById("Month").value;
        const Year= document.getElementById("Year").value;
        const Securitycode= document.getElementById("Security-Code").value;
        const First= document.getElementById("First").value;
        const Last= document.getElementById("Last").value;
        const City= document.getElementById("City").value;
        const Billingaddress= document.getElementById("Billing-Address").value;
        const Postacode= document.getElementById("Posta-Code").value;
        const Nation= document.getElementById("Nation").value;
        const Phone= document.getElementById("Phone-Number-Payment").value;
        const error= document.querySelector(".Error-2");
        if(!Cardnumber || !Month || !Year || !Securitycode || !First || !Last || !City || !Billingaddress || !Postacode || !Nation || !Phone){
            if(error.style.display=="none" || error.style.display==""){
                error.style.display="flex";
            }
        }else{
            const Payment= document.querySelector(".Payment");
            const edit= document.getElementById("Edit-2");
            const Complete= document.getElementById("Complete");
            Payment.classList.add("Hidden");
            edit.classList.remove("Hidden");
            if(Complete.style.display=="none"||Complete.style.display==""){
                Complete.style.display="block";
            }
        }
    })
}

function editPayment(){
    const edit= document.getElementById("Edit-2");
    edit.addEventListener("click", (e)=>{
        const Imformation= document.querySelector(".Imformation");
        const Payment= document.querySelector(".Payment");
        const error= document.querySelector(".Error-2");
        Imformation.classList.add("Hidden");
        Payment.classList.remove("Hidden");
        edit.classList.add("Hidden");
        if(error.style.display=="flex" || error.style.display==""){
            error.style.display="none";
        }
    })
}

function Complete(){
    const Complete= document.getElementById("Complete");
    Complete.addEventListener("click", (e)=>{
        e.preventDefault();
        window.location.href="../Success/Success.html";
    })
}

async function Checkadmin() {
    const token= localStorage.getItem("token");
    const res= await fetch("https://fashion-imn4.onrender.com/admin",{
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


const API= "https://fashion-imn4.onrender.com/Page";
const pageId="689326c62b865f43c08fdb73";

async function  fetchPage(id){
    try{
        const res= await fetch(`${API}/${id}`);
        const data= await res.json();
        const sections= data.sections;

        const headerCheckout= document.querySelector('[data-Header-Checkout]');
        headerCheckout.innerHTML=`<h2>${sections['Header-Checkout'].content}</h2>`;
        headerCheckout.setAttribute('data-editable', 'true');
        headerCheckout.setAttribute('data-key', 'Header-Checkout');
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
