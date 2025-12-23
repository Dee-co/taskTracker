import { defineStore } from 'pinia'
import { LocalStorage } from 'quasar'

export const useTaskStore = defineStore('tasks', {
  state: () => ({
    tasks: LocalStorage.getItem('tasks') || [],
  }),

  getters: {
    remainingTasks: (state) => state.tasks.filter((t) => !t.completed).length,
    completedTasks: (state) => state.tasks.filter((t) => t.completed),
    pendingTasks: (state) => state.tasks.filter((t) => !t.completed),
  },

  actions: {
    addTask(task) {
      this.tasks.push({
        id: Date.now(),
        name: task.name,
        description: task.description,
        completed: task.completed,
      })
      this.save()
    },

    updateTask(updatedTask) {
      const index = this.tasks.findIndex((t) => t.id === updatedTask.id)
      if (index !== -1) {
        this.tasks[index] = { ...updatedTask }
        this.save()
      }
    },

    toggleTask(id) {
      const task = this.tasks.find((t) => t.id === id)
      task.completed = !task.completed
      this.save()
    },

    deleteTask(id) {
      this.tasks = this.tasks.filter((t) => t.id !== id)
      this.save()
    },

    save() {
      LocalStorage.set('tasks', this.tasks)
    },
  },
})
