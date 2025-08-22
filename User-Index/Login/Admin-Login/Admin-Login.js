document.getElementById("AdminForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("Admin-Name").value;
  const password = document.getElementById("Password").value;

  const res = await fetch("https://fashion-bsqk.onrender.com/Login-Admin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({username, password}),
  });

  const data = await res.json();
  if (res.ok) {
    localStorage.setItem("token", data.token); 
    window.location.href = "/Admin-Index/Main/Main-Admin.html";
  } else {
    const error= document.querySelector(".Error");
    if(error.style.visibility=="hidden"||error.style.visibility==""){ 
        error.style.visibility="visible";
    }
  }
});