
let userId = null; 

async function setupEventListeners() {
    const confirmButton = document.getElementById("Confirm");
    const changePasswordButton = document.getElementById("Change-Password");
    confirmButton.addEventListener("click", async (e) => {
        e.preventDefault();
        const username = document.getElementById("Email").value;
        const errorElement = document.querySelector(".Error");
        const changePasswordSection = document.querySelector(".Change-Password");

        try {
            const res = await fetch("https://fashion-imn4.onrender.com/Forget", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username }),
            });
            const data = await res.json();
            
            if (res.status === 200) {
                userId = data.userId; 
                const changpass= document.querySelector(".Change-Password");
                const error= document.querySelector(".Error");
                const error1= document.querySelector(".Error-1");
                if (changpass.style.visibility=="hidden"||changpass.style.visibility==""){
                    changpass.style.visibility="visible"
                }
                if(error.style.display=="flex"||error.style.display==""){
                    error.style.display="none";
                }
                if(error1.style.display=="flex"||error1.style.display==""){
                    error1.style.display="none";
                }
            } 
            if( res.status===400)
                {
                    const error1= document.querySelector(".Error-1");
                    const error= document.querySelector(".Error");
                    if(error.style.display=="flex"||error.style.display==""){
                            error.style.display="none";
                        }
                    if(error1.style.display=="none"||error.style.display==""){
                        error1.style.display="flex";
                    }
                } 
                if(res.status===404) {
                    const error= document.querySelector(".Error");
                    const error1= document.querySelector(".Error-1");
                        if(error1.style.display=="flex"||error.style.display==""){
                            error1.style.display="none";
                        }
                        if(error.style.display=="none"||error.style.display==""){
                            error.style.display="flex";
                        }
            }

        } catch (err) {
            console.error("Lỗi khi gửi yêu cầu:", err);
        }
    });


    changePasswordButton.addEventListener("click", async (e) => {
        e.preventDefault();
        const newPasswordInput = document.getElementById("New-Password");
        const confirmPasswordInput = document.getElementById("Confirm-Password");

        const password = newPasswordInput.value;
        const confirmPass = confirmPasswordInput.value;

        if (password !== confirmPass) {
            newPasswordInput.style.border = "1px solid #d93025";
            confirmPasswordInput.style.border = "1px solid #d93025";
            return;
        }
        try {
            const res = await fetch(`https://fashion-imn4.onrender.com/Forget/${userId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password }),
            });
            const data = await res.json();
            if (res.status === 200) {
                window.location.href="/User-Index/Login/User-Login/User-Login.html";
            }
        } catch (err) {
            console.error("Lỗi khi gửi yêu cầu:", err);
        }
    });
}

document.addEventListener("DOMContentLoaded", setupEventListeners);