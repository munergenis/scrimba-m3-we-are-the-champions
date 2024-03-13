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

const textEl = document.querySelector("#create-text-el")
const fromEl = document.querySelector("#from-text-el")
const toEl = document.querySelector("#to-text-el")
const publishBtn = document.querySelector("#publish-btn")
const postListEl = document.querySelector("#posts-ul")

let publication = {
  text: "",
  from: "",
  to: "",
}

let posts = []
