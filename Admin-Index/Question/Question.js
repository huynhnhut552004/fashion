const API= "https://fashion-imn4.onrender.com/Question";
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

selectQuestion= null;

async function fetchQuestion() {
    const token= localStorage.getItem("token");
    const res= await fetch(API, {headers:{authorization:`Bearer ${token}`}});
    const data= await res.json();
    const table= document.getElementById("QuestionTable");
    table.innerHTML="";
    data.forEach(q=>{
        const row= document.createElement("tr");
        row.addEventListener("click",()=>{
            selectQuestion= q;
            document.getElementById("Email").innerHTML= q.email;
            document.getElementById("Question").innerHTML= q.question;
        });
        const createdDate = new Date(q.creatAt);
        const formattedDate = createdDate.toLocaleString("vi-VN", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit"
        });
        row.innerHTML=`
        <td>${formattedDate}</td>
        <td>${q.email}</td>
        <td>${q.question}</td>
        `;
        table.appendChild(row);
    });
}

document.getElementById("Delete").addEventListener("click", async ()=>{
    if (!selectQuestion) return alert("Not selected yet!");
        const token = localStorage.getItem("token");
        await fetch(`${API}/${selectQuestion._id}`, {
            method: "DELETE",
            headers: { authorization: `Bearer ${token}` }
        });
        selectQuestion=null;
        fetchQuestion();
        clear();
});

function clear(){
    document.getElementById("Email").value="";
    document.getElementById("Question").value="";
}

document.addEventListener("DOMContentLoaded", ()=>{
    Checkadmin();
    fetchQuestion();
})