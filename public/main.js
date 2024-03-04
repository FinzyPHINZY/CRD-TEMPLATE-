// Control Image Carousel
function startCarousel() {
  let activeImage = 0;
  const images = document.querySelectorAll("#carousel img");

  function cycleImages() {
    if (!images[activeImage]) {
      clearInterval(intervalId);
      return;
    }

    // Loops the carousel
    images[activeImage].classList.remove("active");
    activeImage = (activeImage + 1) % images.length;
    images[activeImage].classList.add("active");
  }

  let intervalId = setInterval(cycleImages, 3000);
}

// Handle Edit Requests
function editItem(id, name, description) {
  document.getElementById("updateId").value = id;
  document.getElementById("updateName").value = name;
  document.getElementById("updateDescription").value = description;

  document.getElementById("updateForm").action = `/item/update/${id}`;
}

// Handle Delete Requests
async function deleteItem(id) {
  console.log(id);
  console.log("deleting item from main.js");
  try {
    const response = await fetch(
      `https://crud-template.onrender.com/item/delete/${id}`,
      {
        method: "DELETE",
      }
    );
    if (response.ok) {
      location.reload();
      console.log("Deleting item was successful");
    } else {
      console.log("Failed to delete item");
    }
  } catch (err) {
    console.error("An error occured", err);
  }
}

// Handle Errors from server if unable to write data (optional)
function checkForError() {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has("error")) {
    alert("Validation failed. Name and description are required.");
  }
}

window.onload = () => {
  startCarousel();
  checkForError();
};
