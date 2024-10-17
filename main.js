const title = document.querySelector("#title");
const content = document.querySelector("#content");
const imgUrl = document.querySelector("#imgUrl");
const postForm = document.querySelector("#postForm");
const postsContainer = document.querySelector("#postsContainer");

let editMode = false;
let editPostId = null;

document.addEventListener("DOMContentLoaded", loadPosts);
postForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const newPost = {
    id: editPostId || Date.now().toString(), // Generate unique ID using Date.now()
    title: title.value,
    content: content.value,
    imgUrl: imgUrl.value,
  };
  if (editMode) {
    updatePost(newPost);
  } else {
    createPost(newPost);
  }
  loadPosts();
  postForm.reset();
});

const generatePostHtml = (post) => {
  const postCard = document.createElement("div");
  postCard.classList.add("post-card");
  const image = document.createElement("img");
  image.src = post.imgUrl;
  image.alt = "image post";
  postCard.appendChild(image);

  const title = document.createElement("h2");
  title.textContent = post.title;
  postCard.appendChild(title);

  const content = document.createElement("p");
  content.textContent = post.content;
  postCard.appendChild(content);

  const buttonsDiv = document.createElement("div");
  buttonsDiv.style.display = "flex";
  buttonsDiv.style.justifyContent = "space-around";

  const edit = document.createElement("button");
  edit.textContent = "Edit";
  edit.onclick = () => editPost(post.id, post, post);
  buttonsDiv.appendChild(edit);

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.onclick = () => deletePost(post.id);
  buttonsDiv.appendChild(deleteButton);
  postCard.appendChild(buttonsDiv);

  return postCard;
};

function loadPosts() {
  const posts = JSON.parse(localStorage.getItem("posts")) || [];
  postsContainer.innerHTML = ""; // Clear existing posts before loading new ones
  posts.map((post) => postsContainer.appendChild(generatePostHtml(post)));
}

function editPost(postId) {
  const posts = JSON.parse(localStorage.getItem("posts")) || [];
  const post = posts.find((post) => post.id === postId);
  title.value = post.title;
  content.value = post.content;
  imgUrl.value = post.imgUrl;
  document.getElementById("postSubmitBtn").textContent = "Update post";
  editMode = true;
  editPostId = postId;
}
function createPost(post) {
  const posts = JSON.parse(localStorage.getItem("posts")) || [];
  posts.push(post);
  localStorage.setItem("posts", JSON.stringify(posts));
}
function updatePost(post) {
  const posts = JSON.parse(localStorage.getItem("posts")) || [];
  const postIndex = posts.findIndex((pst) => pst.id === post.id);
  posts[postIndex] = post;
  localStorage.setItem("posts", JSON.stringify(posts));
}

function deletePost(postId) {
  const posts = JSON.parse(localStorage.getItem("posts")) || [];
  const filterPost = posts.filter((post) => post.id !== postId);
  localStorage.setItem("posts", JSON.stringify(filterPost));
  loadPosts(); // Reload posts after deleting one
}
