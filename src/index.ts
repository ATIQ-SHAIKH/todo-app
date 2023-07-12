type Task = {
  title: string
  completed: boolean
  createdAt: Date
}

const loadTasks = (): Task[] => {
  const taskJSON = localStorage.getItem("TASKS")
  if (taskJSON == null || taskJSON == "" || taskJSON == undefined) return []
  return JSON.parse(taskJSON)
}

const saveTasks = () => {
  localStorage.setItem("TASKS", JSON.stringify(tasks))
}


const addListItem = (task: Task) => {
  const item = document.createElement("li")
  const label = document.createElement("label")
  const checkbox = document.createElement("input")
  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked
    saveTasks()
  })
  checkbox.type = "checkbox"
  checkbox.checked = task.completed;
  const span = document.createElement("span")
  span.className = "checkmark";
  label.className = "labelContainer"
  label.append(checkbox, task.title)
  item.append(label)
  list?.append(item)
}

const list = document.querySelector<HTMLUListElement>("#list")
const form = document.getElementById("form") as HTMLFormElement | null
const button = document.getElementById("clear") 
const input = document.querySelector<HTMLInputElement>("#input")
let tasks: Task[] = loadTasks()
tasks.forEach((task)=>addListItem(task))

form?.addEventListener("submit", e => {
  e.preventDefault()

  if (input?.value == "" || input?.value == null) return

  const newTask: Task = {
    title: input.value,
    completed: false,
    createdAt: new Date(),
  }
  tasks.push(newTask)
  saveTasks()

  addListItem(newTask)
  input.value = ""
})

// const clear = () => {
//   console.log("h")
//   localStorage.setItem("TASKS", "");
//   console.log(localStorage.getItem("TASKS"))
// }

button?.addEventListener("click",(e)=>{
  localStorage.clear()
  tasks = []
  const listItems = document.querySelectorAll('#list');
  listItems.forEach(listItem => {
    listItem.parentNode?.removeChild(listItem);
  });
  
  
})