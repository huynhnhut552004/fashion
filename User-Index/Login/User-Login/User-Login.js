document.getElementById("Login").addEventListener("click", (e)=>{
    e.preventDefault();
    const email= document.getElementById("Email").value;
    const password= document.getElementById("Password").value;
    if(email==="setadministrator" && password===""){
            window.location.href="../Admin-Login/Admin-Login.html";
        }else{
            document.getElementById("User").requestSubmit();
    }
});

document.getElementById("User").addEventListener("submit", async(e)=>{
    e.preventDefault();
    const username= document.getElementById("Email").value;
    const password= document.getElementById("Password").value;
    const res= await fetch("http://localhost:3000/Login/login",{
        method:"POST",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify({username, password}),
    });
    const data= await res.json();
    if(res.ok){
        localStorage.setItem("token",data.token);
        window.location.href="/User-Index/Main/Main.html";
    }
    if(res.status==403){
        const ban= document.querySelector(".Ban");
        const err= document.querySelector(".Error");
        if(ban.style.display=="none"|| ban.style.display==""){
            ban.style.display="flex"
        }
        if(err.style.display=="flex"||err.style.display==""){
            err.style.display="none";
        }
        return;
    }
    if(res.status==401){
        const err= document.querySelector(".Error");
        const ban= document.querySelector(".Ban");
        if(err.style.display=="none"||err.style.display==""){
            err.style.display="flex";
        }
        if(ban.style.display=="flex"|| ban.style.display==""){
            ban.style.display="none"
        }
        return;
    }
});
