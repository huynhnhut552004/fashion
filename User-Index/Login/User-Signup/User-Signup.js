document.getElementById("SignupFrom").addEventListener("submit", async (e) => {
  e.preventDefault();
  const firstName = document.getElementById("First").value;
  const lastName = document.getElementById("Last").value;
  const username = document.getElementById("Email").value;
  const passwordInput = document.getElementById("Password");
  const confirmInput = document.getElementById("Confirm-Password");
  const password = passwordInput.value;
  const confirmpass = confirmInput.value;
  if (password !== confirmpass) {
    passwordInput.style.border = "1px solid #d93025";
    confirmInput.style.border = "1px solid #d93025";
    return;
  }
  try {
    const res = await fetch("https://fashion-bsqk.onrender.com/Login/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, firstName, lastName }),
    });
    const data = await res.json();
    if (res.ok) {
      window.location.href = "/User-Index/Login/User-Login/User-Login.html";
    } 
    if(res.status===409){
      const err1= document.querySelector(".Error-1");
      const err = document.querySelector(".Error");
      if(err1.style.display=="flex"||err1.style.display==""){
        err1.style.display="none";
      }
      if(err.style.display=="none"||err.style.display==""){
        err.style.display="flex";
      }
    }
    if(res.status===400){
      const err = document.querySelector(".Error");
      const err1= document.querySelector(".Error-1");
      if(err.style.display=="flex"||err.style.display==""){
        err.style.display="none";
      }
      if(err1.style.display=="none"||err1.style.display==""){
        err1.style.display="flex";
      }
    }
  } catch (error) {
    console.error("Lỗi khi gửi yêu cầu:", error);
  }
});