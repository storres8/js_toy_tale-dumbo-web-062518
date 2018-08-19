document.addEventListener('DOMContentLoaded', () => {


const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
    const toyName = document.getElementById('new-toy-name')
    const toyImg = document.getElementById('new-toy-img')
    const submitBtn = document.getElementById('new-toy-submit')
    // submit
    submitBtn.addEventListener('click', () =>{
      const toyObj = {
        name: toyName.value,
        image: toyImg.value,
        likes: 0
      }
      createToy(toyObj)
    })
  } else {
    toyForm.style.display = 'none'
  }
})

////////////////////////////Started my code from here//////////////////////////////////////////////////////////

fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(resp => allToys(resp))


function createToy(toyObj){
  fetch('http://localhost:3000/toys', {
  method: 'POST',
  body: JSON.stringify(toyObj),
  headers:{
    'Content-Type': 'application/json'
  }
    })
  .then(res => res.json())
}

function updateLikes(id, likeValue){
// console.log("this is the toyid", id)
  fetch(`http://localhost:3000/toys/${id}`, {
  method: 'PATCH',
  body: JSON.stringify(likeValue),
  headers:{
    'Content-Type': 'application/json'
  }
})
.then(res => res.json())
}

function deleteToy(id){
  // console.log(id)
  fetch(`http://localhost:3000/toys/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json());
}


function allToys(toysArray){
  const collection = document.getElementById('toy-collection')
  toysArray.forEach(toy => {
    const card = document.createElement('div')
    card.className = "card"
    const name = document.createElement('h2')
    name.innerText = toy.name
    const img = document.createElement('img')
    img.src = toy.image
    img.className = "toy-avatar"
    const likes = document.createElement('p')
    likes.innerText = `${toy.likes} Likes!`
    const bttn = document.createElement('button')
    bttn.className = "like-btn"
    bttn.innerText = "Like <3"
    bttn.addEventListener('click', ()=>{
      const likeValue = {likes: ++toy.likes}
      updateLikes(toy.id, likeValue)
      likes.innerText = `${toy.likes} Likes!`
      // console.log(toy.likes)
    })
    const deleteBtn = document.createElement('button')
    deleteBtn.id = 'delete-toy'
    deleteBtn.innerText = "Delete Toy :("
    deleteBtn.confirm
    deleteBtn.addEventListener('click', () =>{
      deleteToy(toy.id)
      card.innerText = 'OOPS! Nothing exists!'
    })

    card.append(name, img, likes, bttn, deleteBtn)
    collection.append(card)


  })
}


})
