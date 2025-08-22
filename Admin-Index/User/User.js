const API="http://localhost:3000/User";
async function checkadmin() {
    const token= localStorage.getItem("token");
    const res= await fetch("http://localhost:3000/admin",{
        headers:{authorization:`Bearer ${token}`},
    });
    if(!res.ok){
        alert("You do not have enough Admin access rights!");
        window.location.href="/User-Index/Login/Admin-Login/Admin-Login.html";
    }else{
        const data= await res.json();
        console.log(data);
    }
}

let selectedUser = null;

async function fecthUser() {
    const token= localStorage.getItem("token");
    const res= await fetch(API,{
        headers: {authorization:`Bearer ${token}`},
    });
    const data= await res.json();
    const table= document.getElementById("UserTable");
    table.innerHTML="";
    data.forEach(p =>{
        const row= document.createElement("tr");
         row.addEventListener("click", ()=>{
            selectedUser = p;
            document.getElementById("First").value = p.firstName;
            document.getElementById("Last").value = p.lastName;
            document.getElementById("Email").value = p.username;

        });
        const createdDate = new Date(p.creatAt);
        const formattedDate = createdDate.toLocaleString("vi-VN", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit"
        });
        row.innerHTML=`
        <td>${p.firstName}</td>
        <td>${p.lastName}</td>
        <td>${formattedDate}</td>
        <td>${p.username}</td>
        <td>${p.ban}</td>
        `;
        table.appendChild(row);
    });
}

document.getElementById("Edit").addEventListener("click", async ()=>{
    const token= localStorage.getItem("token");
        updateFirstname= document.getElementById("First").value;
        updateLastname= document.getElementById("Last").value;
        updateEmail= document.getElementById("Email").value;
        await fetch(`${API}/${selectedUser._id}`,{
            method:"PATCH",
            headers:{"Content-Type":"application/json",
                authorization:`Bearer ${token}`
            },
            body:JSON.stringify({
                firstName: updateFirstname,
                lastName: updateLastname,
                username: updateEmail
            })
        });
        fecthUser();
        clearInputs();
})
    

document.getElementById("Delete").addEventListener("click", async () => {
    if (!selectedUser) return alert("Not selected yet!");
        const token = localStorage.getItem("token");
        await fetch(`${API}/${selectedUser._id}`, {
            method: "DELETE",
            headers: { authorization: `Bearer ${token}` }
        });
        selectedUser=null;
        fecthUser();
        clearInputs();
    });

document.getElementById("Ban").addEventListener("click", async () => {
    if (!selectedUser) return alert("Not selected yet!");
    if (!selectedUser.ban) {
        const token = localStorage.getItem("token");
        await fetch(`${API}/${selectedUser._id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ ban: true })
        });
        fecthUser();
    } else {
        alert("TAccount has been banned!");
    }
});

document.getElementById("Unban").addEventListener("click", async () => {
    if (!selectedUser) return alert("Not selected yet!");
    if (selectedUser.ban) {
        const token = localStorage.getItem("token");
        await fetch(`${API}/${selectedUser._id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ ban: false })
        });
        fecthUser();
    } else {
        alert("Account has not been banned!");
    }
});

function clearInputs(){
    document.getElementById("First").value="";
    document.getElementById("Last").value="";
    document.getElementById("Email").value="";
}

document.addEventListener("DOMContentLoaded", ()=>{
    checkadmin();
    fecthUser();
})