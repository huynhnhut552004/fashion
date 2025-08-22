const API="http://localhost:3000/Product";
async function checkadmin() {
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
};

async function fetchProduct() {
    const name = document.getElementById("searchInput").value;
    let url= `${API}/search?`;
    if (name) url += `search=${encodeURIComponent(name)}`;
    const res= await fetch(url);
    const data= await res.json();
    const table= document.getElementById("productTable");
    table.innerHTML=""; 
    data.forEach(p =>{
        const row= document.createElement("tr");
        const escapedGender= p.gender.replace(/'/g, "\\'");
        const escapedName = p.name.replace(/'/g, "\\'");
        const escapedDescription = p.description.replace(/'/g, "\\'");
        const escapedImage = p.image.replace(/'/g, "\\'");
        row.innerHTML=`
        <td>${p.gender}</td>
        <td>${p.name}</td>
        <td>${p.price}$</td>
        <td><img src="${p.image}" width="60"></td>
        <td>${p.description}</td>
        <td>
            <button onclick="deleteProduct('${p._id}')">Delete</button>
            <button onclick="editProduct('${p._id}', '${escapedGender}', '${p.category}', '${escapedName}', ${p.price}, '${escapedImage}', '${escapedDescription}')">Edit</button>
        </td>
        `;
        table.appendChild(row);
    });
}

async function loadCategories() {
    const res= await fetch("http://localhost:3000/Category");
    const category= await res.json();
    const select= document.getElementById("filterCategory");
    category.forEach(cat =>{
        const option= document.createElement("option");
        option.value= cat._id;
        option.textContent= cat.name;
        select.appendChild(option);
    });
}
async function Confirm() {
        const token= localStorage.getItem("token");
        const gender= document.getElementById("Genderfilter").value;
        const name= document.getElementById("Name").value;
        const price= document.getElementById("Price").value;
        const description= document.getElementById("Description").value;
        const imageFile= document.getElementById("imageInput").files[0];
        const category= document.getElementById("filterCategory").value;
        let imageUrl='';
        if (!imageFile){
            alert("Products must have images!");
            return;
        }
        const formData= new FormData();
        formData.append('image', imageFile);
        try{
            const uploadRes= await fetch("http://localhost:3000/imgProduct",{
                method:"POST",
                body:formData
            });
            if (!uploadRes.ok){
                throw new Error(`Upload failed status: ${uploadRes.status}`);
            }
            const uploadData= await uploadRes.json();
            imageUrl= uploadData.imageUrl;
        }catch(err){
            console.error("Error uploading image:", err);
            alert("Unable to upload photo. Please try again.");
            return;
        }
        await fetch(API,{
            method:"POST",
            headers:{"Content-Type": "application/json",
            authorization: `Bearer ${token}`},
            body: JSON.stringify({gender, category, name, price, image: imageUrl, description})
        });
        clearInputs();
        fetchProduct();
}

async function deleteProduct(id) {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API}/${id}`, {
            method: "DELETE",
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        fetchProduct();
    }

function editProduct(id, gender, category, name, price, image, description){
    document.getElementById("Genderfilter").value = gender;
    document.getElementById("filterCategory").value = category;
    document.getElementById("Name").value= name;
    document.getElementById("Price").value= price;
    document.getElementById("currentImage").src = image;
    document.getElementById("Description").value= description;
    const btn=document.getElementById("Confirm");
    if(btn){
        btn.innerText="Update";
        btn.dataset.editingId= id;
        btn.onclick= async function () {
            const currentId= this.dataset.editingId;
            const token= localStorage.getItem("token");
            const updatedgender= document.getElementById("Genderfilter").value;
            const updatedCategory= document.getElementById("filterCategory").value;
            const updatedName = document.getElementById("Name").value;
            const updatedPrice = document.getElementById("Price").value;
            const updatedDescription = document.getElementById("Description").value;
            const updatedImageFile = document.getElementById("imageInput").files[0];
            let finalImageUrl= image;
            if (updatedImageFile) {
            const formData = new FormData();
            formData.append('image', updatedImageFile);
            try {
                const uploadRes = await fetch("http://localhost:3000/imgProduct", {
                    method: "POST",
                    body: formData,
                });
                if (!uploadRes.ok) {
                    throw new Error(`Upload failed! status: ${uploadRes.status}`);
                }
                const uploadData = await uploadRes.json();
                finalImageUrl = uploadData.imageUrl;
                const oldFilename = image.split('/').pop();
                if (oldFilename && oldFilename !== uploadData.imageUrl.split('/').pop()) {
                    await fetch(`http://localhost:3000/deleteProductImage/${oldFilename}`, {
                        method: "DELETE"
                    });
                }
            } catch (err) {
                console.error("Error uploading image for update:", err);
                alert("Unable to update photo, please try again.");
                return;
            }
        }
            await fetch(`${API}/${currentId}`,{
                method:"PATCH",
                headers:{
                    "Content-Type": "application/json",
                    authorization: `Bearer ${token}`},
                body: JSON.stringify({
                    gender: updatedgender,
                    category: updatedCategory,
                    name: updatedName,
                    price: updatedPrice,
                    image: finalImageUrl,
                    description: updatedDescription
                })
            });
            delete btn.dataset.editingId;
            btn.innerText="Confirm";
            btn.onclick= Confirm;
            clearInputs();
            fetchProduct();
    }
}
}

const gender= document.getElementById("Genderfilter");
const category= document.getElementById("filterCategory");

async function fetchProductfillter() {
    const valuegender= gender.value;
    const valuecaterogy= category.value;
    const table= document.getElementById("productTable");
    table.innerHTML="";
    if(valuecaterogy=="" && valuegender==""){
        fetchProduct();
    } else if(valuecaterogy=="" && valuegender==="Men"){
            const res= await fetch("http://localhost:3000/Product/Menproduct");
            const data= await res.json();
            data.forEach(p=>{
                const row= document.createElement("tr");
            const escapedGender= p.gender.replace(/'/g, "\\'");
            const escapedName = p.name.replace(/'/g, "\\'");
            const escapedDescription = p.description.replace(/'/g, "\\'");
            const escapedImage = p.image.replace(/'/g, "\\'");
            row.innerHTML=`
            <td>${p.gender}</td>
            <td>${p.name}</td>
            <td>${p.price}$</td>
            <td><img src="${p.image}" width="60"></td>
            <td>${p.description}</td>
            <td>
                <button onclick="deleteProduct('${p._id}')">Delete</button>
                <button onclick="editProduct('${p._id}', '${escapedGender}', '${p.category}', '${escapedName}', ${p.price}, '${escapedImage}', '${escapedDescription}')">Edit</button>
            </td>
            `;
            table.appendChild(row);
            })
    } else if(valuecaterogy=="" && valuegender==="Women"){
        const res= await fetch("http://localhost:3000/Product/Womenproduct");
            const data= await res.json();
            data.forEach(p=>{
                const row= document.createElement("tr");
            const escapedGender= p.gender.replace(/'/g, "\\'");
            const escapedName = p.name.replace(/'/g, "\\'");
            const escapedDescription = p.description.replace(/'/g, "\\'");
            const escapedImage = p.image.replace(/'/g, "\\'");
            row.innerHTML=`
            <td>${p.gender}</td>
            <td>${p.name}</td>
            <td>${p.price}$</td>
            <td><img src="${p.image}" width="60"></td>
            <td>${p.description}</td>
            <td>
                <button onclick="deleteProduct('${p._id}')">Delete</button>
                <button onclick="editProduct('${p._id}', '${escapedGender}', '${p.category}', '${escapedName}', ${p.price}, '${escapedImage}', '${escapedDescription}')">Edit</button>
            </td>
            `;
            table.appendChild(row);
            })
    } else if(valuecaterogy!=="" && valuegender==""){
        const res= await fetch(`http://localhost:3000/Product/category/${valuecaterogy}`);
            const data= await res.json();
            data.forEach(p=>{
                const row= document.createElement("tr");
            const escapedGender= p.gender.replace(/'/g, "\\'");
            const escapedName = p.name.replace(/'/g, "\\'");
            const escapedDescription = p.description.replace(/'/g, "\\'");
            const escapedImage = p.image.replace(/'/g, "\\'");
            row.innerHTML=`
            <td>${p.gender}</td>
            <td>${p.name}</td>
            <td>${p.price}$</td>
            <td><img src="${p.image}" width="60"></td>
            <td>${p.description}</td>
            <td>
                <button onclick="deleteProduct('${p._id}')">Delete</button>
                <button onclick="editProduct('${p._id}', '${escapedGender}', '${p.category}', '${escapedName}', ${p.price}, '${escapedImage}', '${escapedDescription}')">Edit</button>
            </td>
            `;
            table.appendChild(row);
            })
    }else if(valuecaterogy!=="" && valuegender=="Men"){
        const res= await fetch(`http://localhost:3000/Product/category/${valuecaterogy}/gender/Men`);
            const data= await res.json();
            data.forEach(p=>{
                const row= document.createElement("tr");
            const escapedGender= p.gender.replace(/'/g, "\\'");
            const escapedName = p.name.replace(/'/g, "\\'");
            const escapedDescription = p.description.replace(/'/g, "\\'");
            const escapedImage = p.image.replace(/'/g, "\\'");
            row.innerHTML=`
            <td>${p.gender}</td>
            <td>${p.name}</td>
            <td>${p.price}$</td>
            <td><img src="${p.image}" width="60"></td>
            <td>${p.description}</td>
            <td>
                <button onclick="deleteProduct('${p._id}')">Delete</button>
                <button onclick="editProduct('${p._id}', '${escapedGender}', '${p.category}', '${escapedName}', ${p.price}, '${escapedImage}', '${escapedDescription}')">Edit</button>
            </td>
            `;
            table.appendChild(row);
            })
    }else if(valuecaterogy!=="" && valuegender=="Women"){
        const res= await fetch(`http://localhost:3000/Product/category/${valuecaterogy}/gender/Women`);
            const data= await res.json();
            data.forEach(p=>{
                const row= document.createElement("tr");
            const escapedGender= p.gender.replace(/'/g, "\\'");
            const escapedName = p.name.replace(/'/g, "\\'");
            const escapedDescription = p.description.replace(/'/g, "\\'");
            const escapedImage = p.image.replace(/'/g, "\\'");
            row.innerHTML=`
            <td>${p.gender}</td>
            <td>${p.name}</td>
            <td>${p.price}$</td>
            <td><img src="${p.image}" width="60"></td>
            <td>${p.description}</td>
            <td>
                <button onclick="deleteProduct('${p._id}')">Delete</button>
                <button onclick="editProduct('${p._id}', '${escapedGender}', '${p.category}', '${escapedName}', ${p.price}, '${escapedImage}', '${escapedDescription}')">Edit</button>
            </td>
            `;
            table.appendChild(row);
            })
    }
}


gender.addEventListener("change", fetchProductfillter);
category.addEventListener("change", fetchProductfillter);

function clearInputs(){
    document.getElementById("Name").value = "";
    document.getElementById("Price").value = "";
    document.getElementById("imageInput").value = ""; 
    document.getElementById("Description").value = "";
}



document.addEventListener("DOMContentLoaded", ()=>{
    checkadmin();
    fetchProduct();
    loadCategories();
});