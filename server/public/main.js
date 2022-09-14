

let addToButton = document.getElementById('addToDo')
let toDoContainer = document.getElementById('toDoContainer')
let inputField =document.getElementById('inputField')
let getAllButton = document.getElementById('getAll')
const url = 'http://localhost:4000/tasks'

//GET ONE (done)
addToButton.addEventListener('click', function(){
    var paragraph = document.createElement('p')
    paragraph.classList.add('paragraph-styling')
    paragraph.innerText = inputField.value
    console.log(inputField.value)
    toDoContainer.appendChild(paragraph)
   
    // paragraph.addEventListener('click', function(){
    //     paragraph.style.textDecoration = 'line-through'
    // })
    //DELETE ONE (not in use)
    paragraph.addEventListener('dblclick', function(){
        toDoContainer.removeChild(paragraph)
    })


})


//GET ALL (done)
getAllValues()
function getAllValues(){
    getAllButton.addEventListener('click', async (e) => {
        const data = await fetch(url)
        const json = await data.json()
        getAllToContainer(json)
    })       
    
}
function getAllToContainer(json){
    for (let i = 0; i < json.length; i++){
        let current =json[i].task
        console.log(current)
        var paragraph = document.createElement('p')
        paragraph.className = 'paragraph-styling'
        paragraph.innerText = current
        console.log(json)
        toDoContainer.appendChild(paragraph)
    
    }
    
}
//CREATE ONE (done)
addOneValue()
function addOneValue(){
    addToButton.addEventListener('click', async (e) => {
        let input = inputField.value
        console.log(input)
        fetch(url, {
            method: "Post",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({"task": input})
        })
        .then(res => res.json())
        .then(data => console.log(data))
           
    })    

}
//DELETE ONE
deleteOneValue()
function deleteOneValue(){
    getAllButton.addEventListener('click', async (e) => {
        let input = inputField.value
        fetch(`${url}/${id}`, {
            method: "Delete"
            
        })
        .then(res => res.json())
        .then(data => console.log(data))
           
    })    

}

//UPDATE ONE