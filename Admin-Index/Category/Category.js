API= "https://fashion-bsqk.onrender.com/Category";
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
};

selectCategory = null;

async function fetchCategory() {
  const res = await fetch(API);
  const data = await res.json();
  const Cate = document.getElementById("Category");
  Cate.innerHTML = "";
  for (const cat of data) {
    const wrapper = document.createElement("div");
    wrapper.style.marginBottom = "20px";
    wrapper.style.border = "1px solid #ccc";
    wrapper.style.padding = "10px";
    const title = document.createElement("div");
    title.innerText = cat.name;
    title.style.fontSize = "20px";
    title.style.fontWeight = "bold";
    title.style.cursor = "pointer";
    wrapper.appendChild(title);
    const productRes = await fetch(`${API}/${cat._id}`);
    const products = await productRes.json();
    if (Array.isArray(products)) {
      const productTable = document.createElement("table");
      productTable.style.display="none";
        productTable.style.width="100%";
        productTable.style.paddingLeft="4%";
      products.forEach(p => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${p.gender}</td>
          <td>${p.name}</td>
          <td><img src="${p.image}" width="60"></td>
          <td>${p.price}$</td>
          <td>${p.description}</td>
        `;
        productTable.appendChild(row);
      });
      title.addEventListener("click", () => {
      selectCategory = cat;
      if(productTable.style.display=="none"){
        productTable.style.removeProperty("display");
      }else{
        productTable.style.display="none";
      }
      document.getElementById("Name").value = cat.name;
    });
      wrapper.appendChild(productTable);
    }
    Cate.appendChild(wrapper);
  }
}

document.getElementById("Confirm").addEventListener("click", async ()=>{
  const token= localStorage.getItem("token");
  const name= document.getElementById("Name").value;
  const res= await fetch(API,{
    method:"POST",
    headers:{"Content-Type": "application/json",
    authorization: `Bearer ${token}`},
    body: JSON.stringify({name})
  });
  clearInputs();
  fetchCategory()
});

document.getElementById("Delete").addEventListener("click", async ()=>{
        const token = localStorage.getItem("token");
        await fetch(`${API}/${selectCategory._id}`, {
            method: "DELETE",
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        fetchCategory()
        selectCategory=null;
})

document.getElementById("Edit").addEventListener("click", async ()=>{
    const token= localStorage.getItem("token");
    const updateName= document.getElementById("Name").value;
    await fetch(`${API}/${selectCategory._id}`,{
        method:"PATCH",
        headers:{"Content-Type":"application/json",
            authorization:`Bearer ${token}`
        },
        body: JSON.stringify({name:updateName})
    });
    fetchCategory()
    selectCategory= null;
})

function clearInputs(){
    document.getElementById("Name").value = "";
}

document.addEventListener("DOMContentLoaded", ()=>{
    Checkadmin();
    fetchCategory()
});


