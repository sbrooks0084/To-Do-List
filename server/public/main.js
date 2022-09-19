let addToButton = document.getElementById('addToDo')
let toDoContainer = document.getElementById('toDoContainer')
let inputField = document.getElementById('inputField')
let getAllButton = document.getElementById('getAll')



const url = 'http://localhost:4000/tasks'


//GET ALL (done)

getAllButton.addEventListener('click', async (e) => {
//This empties the container
    toDoContainer.innerHTML = ""
    //This will fetch our data
    const data = await fetch(url)
    // This will convert to useable data
    const json = await data.json()
    // This will call func with json as its argument
    console.log(json)
    getAllToContainer(json)
})

function getAllToContainer(json) {
    for (let i = 0; i < json.length; i++) {
        let todo = json[i].task
        
        let container = document.createElement('div')
        let div = document.createElement('div')
        let deleteBtn = document.createElement('button')
        deleteBtn.className = "deleteBtn"
        let editBtn = document.createElement('button')
        editBtn.className ="editBtn"
        container.className = "todo-container"
        editBtn.innerText = "Edit"
        deleteBtn.innerText = "Delete"
        div.className = 'todo'
        div.innerText = todo
        container.id = json[i].todo_id

        editBtn.addEventListener('click', changeTask)
        deleteBtn.addEventListener('click', deleteTask)
        container.append(div)
        div.append(editBtn)
        div.append(deleteBtn)
        toDoContainer.appendChild(container)
        
        // deleteBtn.style.display = "none"
        // editBtn.style.display = "none"
    }

    
}

function changeTask(eventObject) {
    let todoId = eventObject.target.parentElement.parentElement
    //console.log(todoId)
    let inputBox = document.createElement('input')
    inputBox.className = "inputBox"
    //inputBox.innerText = todoId
    let submitBtn = document.createElement('button')
    submitBtn.className = "submitBtn"
    submitBtn.innerText = "Submit"
    todoId.append(inputBox)
    todoId.append(submitBtn)
    submitBtn.addEventListener('click', editTask)

}
//CREATE ONE (done)
addToButton.addEventListener('click', async (e) => {
    let input = inputField.value
    fetch(url, {
        method: "Post",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({ "task": input })
    })
        .then(res => res.json())
        .then(data => console.log(data))
    let notify = document.createElement('div');
    notify.innerText = `${input} was added to your list`
    toDoContainer.append(notify)
})


async function deleteTask(eventObject) {
    let todoId = eventObject.target.parentElement.parentElement
    console.log(todoId)
    fetch(`${url}/${todoId}`, {
        method: "Delete"
    })
        .then(res => res.json())
        .then(data => console.log(data))
            console.log("todo deleted")
            //console.log(todoId)
        
    console.log(document.getElementById(todoId.id))
    document.getElementById(todoId.id).remove();
    //toDoContainer.style.display = "none"
     
}

async function editTask(e) {
    let todoId = e.target.parentElement.parentElement;
    let editedTask = todoId.childNodes[0].childNodes[1]
    editedTask.value
    console.log(editedTask.value)
    fetch(`${url}/${todoId.id}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({ "task": editedTask.value })
    })
        .then(res => res.json())
        .then(data => console.log(data))
        //console.log(todoId)
   

}









