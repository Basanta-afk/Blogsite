function setLocalstorage() {
  if (localStorage.getItem("blogdata")) {
    let showDiv = document.querySelector("#displayCard");
    showDiv.innerHTML = "";
    let arr = JSON.parse(localStorage.getItem("blogdata"));
    arr.forEach((data, index) => {
      let newDiv = document.createElement("div");
      newDiv.setAttribute("class", "newData");
      let htmldata = `
      <div class="card">
        <h2 class="card_title">${data.title} </h2>
        <button class = "cbutton" onClick='onDelete(${index})'/>
        Delete
        </button>
        <button class = "ebutton" onClick='onEdit(${index})'/>
        Edit
        </button>
        <h5>${data.timestamp} </h3>
        <img src="${data.image}" class="card_image" id="preview" alt="no Image"/>  
        <div class="card_description">${data.details}</div> 
      </div>       
      `;
      newDiv.insertAdjacentHTML("afterbegin", htmldata);
      showDiv.insertAdjacentElement("afterbegin", newDiv);
    });
  }
}

setTimeout(() => {
  setLocalstorage();
}, 2);

let submitBtn = document.querySelector("#submitBtn");

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let arr = JSON.parse(localStorage.getItem("blogdata"));
  let title = document.querySelector("#title").value;
  let details = document.querySelector("#details").value;

  let arrData = {
    title: title,
    timestamp: Date(),
    details: details,
    image: displayImage,
  };
  arr.push(arrData);

  localStorage.setItem("blogdata", JSON.stringify(arr));
  document.getElementById("title").value = "";
  document.getElementById("details").value = "";
  document.getElementById("image").value = "";
  setLocalstorage();
  closeForm();
});

function onDelete(id) {
  let arr = JSON.parse(localStorage.getItem("blogdata"));
  let deleteArr = [...arr];
  deleteArr.splice(id, 1);
  arr = [...deleteArr];
  localStorage.setItem("blogdata", JSON.stringify(arr));
  setLocalstorage();
}

function onEdit(id) {
  let arr = JSON.parse(localStorage.getItem("blogdata"));
  let title = (document.querySelector("#title").value = arr[id].title);
  let details = (document.querySelector("#details").value = arr[id].details);
  let image = (document.querySelector("#image").file = arr[id].image);

  submitBtn.setAttribute("disabled", true);

  let editBtn = document.createElement("button");

  editBtn.innerHTML = "Update";

  form.insertAdjacentElement("beforeend", editBtn);

  editBtn.addEventListener("click", (e) => {
    e.preventDefault();

    let newtitle = document.querySelector("#title").value;
    let newdetails = document.querySelector("#details").value;

    arr.splice(id, 1, {
      title: newtitle,
      timestamp: Date(),
      details: newdetails,
      image: image,
    });

    localStorage.setItem("blogdata", JSON.stringify(arr));
    document.getElementById("title").value = "";
    document.getElementById("details").value = "";
    document.querySelector("#image").value = "";
    form.removeChild(form.lastElementChild);
    submitBtn.removeAttribute("disabled", true);
    setLocalstorage();
  });
}

function onChange(event) {
  const input = event.target.files[0];
  const reader = new FileReader();
  displayImage = reader.onload = (e) => (displayImage = e.target.result);
  reader.readAsDataURL(input);
}

const dropArea = document.querySelector("#image_drag_area");
dropArea.addEventListener("dragover", (eve) => {
  eve.preventDefault();
  eve.dataTransfer.dropEffect = "copy";
});

dropArea.addEventListener("dragleave", (eve) => {});

dropArea.addEventListener("drop", (eve) => {
  eve.preventDefault();
  const input = eve.target.files[0];
  const reader = new FileReader();
  document.querySelector(
    "#image_drop_area"
  ).style.backgroundImage = `url(${input})`;
  displayImage = reader.onload = (e) => (displayImage = e.target.result);
  reader.readAsDataURL(input);
});
