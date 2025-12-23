<template>
  <q-dialog
    persistent
    v-model="model"
    backdrop-filter="blur(8px)"
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card class="task-dialog">
      <!-- Header -->
      <q-card-section class="dialog-header">
        <div class="text-h6">
          {{ isEdit ? 'Edit Task' : 'Add New Task' }}
        </div>
      </q-card-section>

      <q-form ref="formRef" @submit.prevent="submit">
        <!-- Body -->
        <q-card-section class="q-gutter-sm">
          <q-input
            v-model="form.name"
            label="Task Name"
            outlined
            dense
            autofocus
            :rules="nameRules"
          />

          <q-input
            v-model="form.description"
            label="Description"
            type="textarea"
            outlined
            dense
            autogrow
            :rules="descriptionRules"
          />

          <q-select
            v-model="form.status"
            label="Status"
            outlined
            dense
            :options="statusOptions"
            emit-value
            map-options
            :rules="statusRules"
          />
        </q-card-section>

        <!-- Actions -->
        <q-card-actions align="center" class="q-pt-none">
          <q-btn outline dense color="negative" label="Cancel" v-close-popup @click="reset" />
          <q-btn dense color="primary" :label="isEdit ? 'Edit' : 'Add'" type="submit" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { reactive, watch, computed, ref } from 'vue'
import { Notify } from 'quasar'

const model = defineModel()

const props = defineProps({
  task: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['add', 'update'])
const formRef = ref(null)

/* ✅ Status Options (ONLY 2) */
const statusOptions = [
  { label: 'Pending', value: 'pending' },
  { label: 'Completed', value: 'completed' },
]

const form = reactive({
  id: null,
  name: '',
  description: '',
  status: 'pending',
})

const nameRules = [
  (val) => !!val || 'Task name is required',
  (val) => val.length >= 3 || 'Minimum 3 characters required',
]

const descriptionRules = [
  (val) => !!val || 'Description is required',
  (val) => val.length >= 5 || 'Minimum 5 characters required',
]

const statusRules = [(val) => !!val || 'Status is required']

const isEdit = computed(() => !!props.task)

const reset = () => {
  form.id = null
  form.name = ''
  form.description = ''
  form.status = 'pending'
}

/* ✅ Watch task (Edit Mode) */
watch(
  () => props.task,
  (task) => {
    if (task) {
      form.id = task.id
      form.name = task.name
      form.description = task.description
      form.status = task.completed ? 'completed' : 'pending'
    } else {
      reset()
    }
  },
  { immediate: true }
)

/* ✅ Submit */
const submit = async () => {
  const valid = await formRef.value.validate()
  if (!valid) return

  const payload = {
    id: form.id,
    name: form.name.trim(),
    description: form.description.trim(),
    completed: form.status === 'completed',
  }

  if (isEdit.value) {
    emit('update', payload)
    Notify.create({ type: 'positive', message: 'Task updated successfully' })
  } else {
    emit('add', payload)
    Notify.create({ type: 'positive', message: 'Task added successfully' })
  }

  model.value = false
  reset()
}
</script>
<style scoped>
/* Dialog Card */
.task-dialog {
  min-width: 420px;
  border-radius: 16px;
  backdrop-filter: blur(12px);
  background: rgba(255, 255, 255, 0.85);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

/* Header */
.dialog-header {
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  padding-bottom: 12px;
}
</style>
