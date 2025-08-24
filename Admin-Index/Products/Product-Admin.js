const API = "https://fashion-bsqk.onrender.com/Product";

async function checkadmin() {
    const token = localStorage.getItem("token");
    const res = await fetch("https://fashion-bsqk.onrender.com/admin", {
        headers: { authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
        alert("You do not have enough Admin access rights!");
        window.location.href = "/User-Index/Login/Admin-Login/Admin-Login.html";
    } else {
        const data = await res.json();
        console.log(data);
    }
}

async function fetchProduct() {
    const name = document.getElementById("searchInput").value;
    let url = `${API}/search?`;
    if (name) url += `search=${encodeURIComponent(name)}`;
    const res = await fetch(url);
    const data = await res.json();
    displayProducts(data);
}

async function loadCategories() {
    const res = await fetch("https://fashion-bsqk.onrender.com/Category");
    const category = await res.json();
    const select = document.getElementById("filterCategory");
    category.forEach(cat => {
        const option = document.createElement("option");
        option.value = cat._id;
        option.textContent = cat.name;
        select.appendChild(option);
    });
}

function displayProducts(products) {
    const table = document.getElementById("productTable");
    table.innerHTML = "";
    products.forEach(p => {
        const row = document.createElement("tr");
        const escapedGender = p.gender.replace(/'/g, "\\'");
        const escapedName = p.name.replace(/'/g, "\\'");
        const escapedDescription = p.description.replace(/'/g, "\\'");
        const escapedImage = p.image?.imageUrl?.replace(/'/g, "\\'") || '';
        const imageUrl = p.image?.imageUrl || '';
        const publicId = p.image?.publicId || '';

        row.innerHTML = `
            <td>${p.gender}</td>
            <td>${p.name}</td>
            <td>${p.price}$</td>
            <td><img src="${imageUrl}" width="60"></td>
            <td>${p.description}</td>
            <td>
                <button onclick="deleteProduct('${p._id}')">Delete</button>
                <button onclick="editProduct('${p._id}', '${escapedGender}', '${p.category}', '${escapedName}', ${p.price}, '${escapedImage}', '${escapedDescription}', '${publicId}')">Edit</button>
            </td>
        `;
        table.appendChild(row);
    });
}

async function Confirm() {
    const token = localStorage.getItem("token");
    const gender = document.getElementById("Genderfilter").value;
    const name = document.getElementById("Name").value;
    const price = document.getElementById("Price").value;
    const description = document.getElementById("Description").value;
    const imageFile = document.getElementById("imageInput").files[0];
    const category = document.getElementById("filterCategory").value;
    
    if (!imageFile) {
        alert("Products must have images!");
        return;
    }

    const formData = new FormData();
    formData.append('image', imageFile);
    
    try {
        const uploadRes = await fetch("https://fashion-bsqk.onrender.com/imgProduct", {
            method: "POST",
            body: formData
        });
        
        if (!uploadRes.ok) {
            throw new Error(`Upload failed status: ${uploadRes.status}`);
        }
        
        const uploadData = await uploadRes.json();
        const publicId = uploadData.publicId;
        const imageUrl = uploadData.imageUrl;
        
        await fetch(API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                gender,
                category,
                name,
                price,
                description,
                image: { publicId, imageUrl }
            })
        });
        
        clearInputs();
        fetchProduct();
    } catch (err) {
        console.error("Error adding product:", err);
        alert("Unable to upload photo. Please try again.");
    }
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

function editProduct(id, gender, category, name, price, image, description, publicId) {
    document.getElementById("Genderfilter").value = gender;
    document.getElementById("filterCategory").value = category;
    document.getElementById("Name").value = name;
    document.getElementById("Price").value = price;
    document.getElementById("currentImage").src = image;
    document.getElementById("Description").value = description;

    const btn = document.getElementById("Confirm");
    if (btn) {
        btn.innerText = "Update";
        btn.dataset.editingId = id;
        btn.onclick = async function () {
            const currentId = this.dataset.editingId;
            const token = localStorage.getItem("token");
            const updatedgender = document.getElementById("Genderfilter").value;
            const updatedCategory = document.getElementById("filterCategory").value;
            const updatedName = document.getElementById("Name").value;
            const updatedPrice = document.getElementById("Price").value;
            const updatedDescription = document.getElementById("Description").value;
            const updatedImageFile = document.getElementById("imageInput").files[0];
            let finalImage = { publicId, imageUrl: image };
            
            if (updatedImageFile) {
                const formData = new FormData();
                formData.append('image', updatedImageFile);

                try {
                    const uploadRes = await fetch("https://fashion-bsqk.onrender.com/imgProduct", {
                        method: "POST",
                        body: formData,
                    });

                    if (!uploadRes.ok) {
                        throw new Error(`Upload failed! status: ${uploadRes.status}`);
                    }
                    const uploadData = await uploadRes.json();
                    finalImage = { publicId: uploadData.publicId, imageUrl: uploadData.imageUrl };
                } catch (err) {
                    console.error("Error uploading image for update:", err);
                    alert("Unable to update photo, please try again.");
                    return;
                }
            }

            await fetch(`${API}/${currentId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    gender: updatedgender,
                    category: updatedCategory,
                    name: updatedName,
                    price: updatedPrice,
                    image: finalImage,
                    description: updatedDescription
                })
            });

            delete btn.dataset.editingId;
            btn.innerText = "Confirm";
            btn.onclick = Confirm;
            clearInputs();
            fetchProduct();
        }
    }
}

async function fetchProductfillter() {
    const valuegender = gender.value;
    const valuecategory = category.value;
    let url = `${API}`;

    if (valuegender && valuecategory) {
        url = `${API}/category/${valuecategory}/gender/${valuegender}`;
    } else if (valuegender) {
        url = `${API}/gender/${valuegender}`;
    } else if (valuecategory) {
        url = `${API}/category/${valuecategory}`;
    } else {
        url = `${API}`;
    }
    
    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Failed to fetch products: ${res.status}`);
        }
        const data = await res.json();
        displayProducts(data);
    } catch (err) {
        console.error("Lỗi khi lọc sản phẩm:", err);
        document.getElementById("productTable").innerHTML = "<tr><td colspan='6'></td></tr>";
    }
}

const gender = document.getElementById("Genderfilter");
const category = document.getElementById("filterCategory");
gender.addEventListener("change", fetchProductfillter);
category.addEventListener("change", fetchProductfillter);

function clearInputs() {
    document.getElementById("Name").value = "";
    document.getElementById("Price").value = "";
    document.getElementById("imageInput").value = "";
    document.getElementById("Description").value = "";
    document.getElementById("currentImage").src = ""; 
}

document.addEventListener("DOMContentLoaded", () => {
    checkadmin();
    fetchProduct();
    loadCategories();
});