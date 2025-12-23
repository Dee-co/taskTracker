<template>
  <q-page class="q-pa-md">
    <TaskTable
      :tasks="store.completedTasks"
      :showFilter="false"
      @toggle="store.toggleTask"
      @delete="store.deleteTask"
      @edit="openEdit"
    />

    <!-- <div v-if="!store.completedTasks.length" class="text-grey q-mt-md">No completed tasks</div> -->
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
const openEdit = (task) => {
  selectedTask.value = task
  dialog.value = true
}
</script>
