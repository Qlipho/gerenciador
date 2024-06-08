document.addEventListener('DOMContentLoaded', () => {
    fetchTasks()

    document.getElementById('add-task').addEventListener('click', async () => {
        const title = document.getElementById('title').value
        const description = document.getElementById('description').value

        await fetch('/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ titulo: title, descricao: description }),
        })

        fetchTasks()
    })
})

async function fetchTasks() {
    const response = await fetch('/tasks')
    const tasks = await response.json()

    const tasksContainer = document.getElementById('tasks')
    tasksContainer.innerHTML = ''

    tasks.forEach(task => {
        const taskElement = document.createElement('div')
        taskElement.classList.add('border', 'p-2', 'mb-2')

        const title = document.createElement('div')
        title.textContent = task.titulo
        title.classList.add('font-bold')

        const description = document.createElement('div')
        description.textContent = task.descricao

        const completed = document.createElement('input')
        completed.type = 'checkbox'
        completed.checked = task.completa
        completed.addEventListener('change', async () => {
            await fetch(`/tasks/${task.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ completa: completed.checked }),
            })
            fetchTasks()
        })

        const deleteButton = document.createElement('button')
        deleteButton.textContent = 'Excluir'
        deleteButton.classList.add('bg-red-500', 'text-white', 'p-1', 'ml-2')
        deleteButton.addEventListener('click', async () => {
            await fetch(`/tasks/${task.id}`, {
                method: 'DELETE',
            })
            fetchTasks()
        })

        taskElement.appendChild(title)
        taskElement.appendChild(description)
        taskElement.appendChild(completed)
        taskElement.appendChild(deleteButton)
        tasksContainer.appendChild(taskElement)
    })
}
