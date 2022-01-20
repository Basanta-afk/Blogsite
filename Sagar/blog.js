//display
function setLocalstorage() {
  if (localStorage.getItem("blogdata")) {
    let showDiv = document.querySelector("#box");
    showDiv.innerHTML = "";
    let arr = JSON.parse(localStorage.getItem("blogdata"));
    arr.forEach((data, index) => {
      let newDiv = document.createElement("div");
      newDiv.setAttribute("class", "container");
      let htmldata = `
      <div>
      <h2>${data.title} </h2>
      <h4>${data.timestamp} </h4>
                <img src="${data.image}" id="preview" alt="no Image"/>  
                <div>${data.details}</div> 
                <Button onClick='onDelete(${index})'>Delete</Button>
                <Button id="btnEdit" onClick='onEdit(${index})'>Edit</Button>
                </div>
               
      `;
      newDiv.insertAdjacentHTML("afterbegin", htmldata);
      showDiv.insertAdjacentElement("afterbegin", newDiv);
    });
  }
}

setLocalstorage();
// }, 2);

//drag and drop image

const dropArea = document.querySelector("#drag_area");
dropArea.addEventListener("dragover", (e) => {
  e.preventDefault();
  console.log("Entered");
});
dropArea.addEventListener("dragleave", (e) => {
  console.log("Exit");
});
dropArea.addEventListener("drop", (e) => {
  e.preventDefault();
  const input = e.dataTransfer.files[0];
  const reader = new FileReader();
  let fileType = input.type;
  let validExtensions = ["image/jpeg", "image/jpg", "image/png"];
  if (validExtensions.includes(fileType)) {
    displayImage = reader.onload = (e) => (displayImage = e.target.result);

    reader.readAsDataURL(input);

    dropArea.innerHTML = `<img src="${displayImage}" alt="${input.type}">`;
  } else {
    dropArea.innerHTML = `Invalid File`;
  }
});

// image upload
function onChange(event) {
  const input = event.target.files[0];
  let fileType = input.type;
  let validExtensions = ["image/jpeg", "image/jpg", "image/png"];
  if (validExtensions.includes(fileType)) {
    const reader = new FileReader();
    displayImage = reader.onload = (e) => (displayImage = e.target.result);
    reader.readAsDataURL(input);

    dropArea.innerHTML = `<img src="${displayImage}" alt="${input.type}"/>`;
  } else {
    dropArea.innerHTML = "Invalid File";
  }
}

//submit form

let submitBtn = document.querySelector("#submitBtn");
let image = document.querySelector("#image").value;
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let image;
  let arr = JSON.parse(localStorage.getItem("blogdata"));
  
    let title = document.querySelector("#title").value;
    let details = document.querySelector("#details").value;

    if (title && details) {
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
    document.querySelector("#image").value = "";

    dropArea.innerHTML = "Drop your image here";

    setLocalstorage();
    alert("Added");
  } else {
    alert("Fill up form");
  }
});

//delete
function onDelete(id) {
  let arr = JSON.parse(localStorage.getItem("blogdata"));

  arr.splice(id, 1);

  localStorage.setItem("blogdata", JSON.stringify(arr));
  setLocalstorage();
}

//update
function onEdit(id) {
  let array = JSON.parse(localStorage.getItem("blogdata"));
  let title = (document.querySelector("#title").value = array[id].title);
  let details = (document.querySelector("#details").value = array[id].details);
  let image = (document.querySelector("#image").file = array[id].image);
  submitBtn.setAttribute("disabled", true);
  let editBtn = document.createElement("button");
  editBtn.innerHTML = "Update";
  form.insertAdjacentElement("beforeend", editBtn);
  editBtn.addEventListener("click", (e) => {
    e.preventDefault();

    let newtitle = document.querySelector("#title").value;
    let newdetails = document.querySelector("#details").value;

    array.splice(id, 1, {
      title: newtitle,
      timestamp: Date(),
      details: newdetails,
      image: image,
    });

    localStorage.setItem("blogdata", JSON.stringify(array));
    document.getElementById("title").value = "";
    document.getElementById("details").value = "";
    document.querySelector("#image").value = "";
    form.removeChild(form.lastElementChild);
    submitBtn.removeAttribute("disabled", true);
    setLocalstorage();
    alert("Updated");
  });
}
