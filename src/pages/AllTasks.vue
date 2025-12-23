<template>
  <q-page class="q-pa-md">
    <div class="row items-center justify-end q-mb-sm">
      <q-btn label="Add Task" icon="add" color="primary" @click="openAdd" />
    </div>
    <!-- <q-btn label="Add Task" icon="add" color="primary" @click="openAdd" /> -->

    <TaskTable
      class="q-mt-md"
      :tasks="store.tasks"
      @toggle="store.toggleTask"
      @delete="store.deleteTask"
      @edit="openEdit"
    />

    <div class="q-mt-md text-weight-medium">Remaining Tasks: {{ store.remainingTasks }}</div>

    <AddTaskDialog
      v-model="dialog"
      :task="selectedTask"
      @add="store.addTask"
      @update="store.updateTask"
    />
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useTaskStore } from 'stores/taskStore'
import TaskTable from 'components/TaskTable.vue'
import AddTaskDialog from 'components/AddTaskDialog.vue'

const store = useTaskStore()
const dialog = ref(false)
const selectedTask = ref(null)

const openAdd = () => {
  selectedTask.value = null
  dialog.value = true
}

const openEdit = (task) => {
  selectedTask.value = task
  dialog.value = true
}
</script>
