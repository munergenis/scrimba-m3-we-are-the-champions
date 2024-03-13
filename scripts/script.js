/* Example publication

<li class="liked">
<h3>➡️ Per</h3>
<p>
  Hello Genís, I've seen your webapps. Like those so
  much. 👌 My favourite is Item List. So I can go shopping now.
  Thank you!!👏👏 Tam
</p>
<div>
  <h3>Genís</h3>
  <p>&#9829 4</p>
</div> 

*/

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js"
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js"

const firebaseConfig = {
  apiKey: "AIzaSyA76-AFFELTwxNUyekK2-s-XO_KJ6T_G8Y",
  authDomain: "tell-me-what-d42f6.firebaseapp.com",
  databaseURL:
    "https://tell-me-what-d42f6-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "tell-me-what-d42f6",
  storageBucket: "tell-me-what-d42f6.appspot.com",
  messagingSenderId: "884407092327",
  appId: "1:884407092327:web:e7c169033de7061e94c0c2",
}
const app = initializeApp(firebaseConfig)
const db = getDatabase(app)
const postsRef = ref(db, "posts")

const textEl = document.querySelector("#create-text-el")
const fromEl = document.querySelector("#from-text-el")
const toEl = document.querySelector("#to-text-el")
const publishBtn = document.querySelector("#publish-btn")
const postListEl = document.querySelector("#posts-ul")

// Starting app
let publication = {
  text: "",
  from: "",
  to: "",
  likes: 0,
}

let posts = []

// Event listeners
publishBtn.addEventListener("click", () => {
  if (textEl.value && fromEl.value && toEl.value) {
    getPublicationInputs()
    clearInputs()
    pushPublicationToDB()
  } else {
    validateInputs()
  }
})

textEl.addEventListener("click", () => textEl.classList.remove("required"))
fromEl.addEventListener("click", () => fromEl.classList.remove("required"))
toEl.addEventListener("click", () => toEl.classList.remove("required"))

// Listen for changes in DB
onValue(postsRef, (snapshot) => {
  if (snapshot.exists()) {
    postListEl.innerHTML = ""
    const posts = Object.entries(snapshot.val())
    const postsLastIndex = posts.length - 1
    for (let i = postsLastIndex; i >= 0; i--) {
      const postID = posts[i][0]
      const post = posts[i][1]
      let liEl = document.createElement("li")
      liEl = appendLiContent(liEl, post)
      // Add event listener. Likes functionality.
      postListEl.append(liEl)
    }
  } else {
    postListEl.textContent = "No posts yet"
  }
})

// Functions
function getPublicationInputs() {
  publication.text = textEl.value
  publication.from = fromEl.value
  publication.to = toEl.value
}

function validateInputs() {
  if (!textEl.value) {
    textEl.classList.add("required")
  }
  if (!fromEl.value) {
    fromEl.classList.add("required")
  }
  if (!toEl.value) {
    toEl.classList.add("required")
  }
}

function clearInputs() {
  textEl.value = ""
  fromEl.value = ""
  toEl.value = ""
}

function pushPublicationToDB() {
  push(postsRef, publication)
}

function appendLiContent(liEl, post) {
  liEl.innerHTML = `
    <h3>➡️ ${post.to}</h3>
    <p>
      ${post.text}
    </p>
    <div>
      <h3>${post.from}</h3>
      <p>&#9829 ${post.likes}</p>
    </div> 
  `
  return liEl
}
