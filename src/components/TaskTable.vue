<template>
  <!-- 🔽 Filter Header -->
  <div class="filter-bar q-mb-md">
    <div class="row items-center justify-between">
      <div class="text-h6 text-primary">Tasks</div>

      <q-select
        v-if="showFilter"
        v-model="statusFilter"
        :options="statusOptions"
        label="Filter by Status"
        outlined
        dense
        emit-value
        map-options
        class="status-filter"
      />
    </div>
  </div>

  <!-- 📋 Table Card -->
  <q-card flat bordered class="task-card">
    <q-table
      flat
      :rows="filteredTasks"
      :columns="columns"
      row-key="id"
      hide-pagination
      class="task-table"
    >
      <!-- Status -->
      <template #body-cell-status="props">
        <q-td>
          <q-badge :color="props.row.completed ? 'primary' : 'secondary'" class="status-badge">
            {{ props.row.completed ? 'Completed' : 'Pending' }}
          </q-badge>
        </q-td>
      </template>

      <!-- Done -->
      <template #body-cell-completed="props">
        <q-td class="text-center">
          <q-checkbox
            :model-value="props.row.completed"
            @update:model-value="$emit('toggle', props.row.id)"
          />
        </q-td>
      </template>

      <!-- Description -->
      <template #body-cell-description="props">
        <q-td>
          <div class="desc-2-lines">
            {{ props.row.description }}
          </div>
        </q-td>
      </template>

      <!-- Actions -->
      <template #body-cell-actions="props">
        <q-td class="text-center">
          <q-btn icon="edit" flat round dense color="primary" @click="$emit('edit', props.row)" />
          <q-btn
            icon="delete"
            flat
            round
            dense
            color="negative"
            @click="$emit('delete', props.row.id)"
          />
        </q-td>
      </template>
    </q-table>
  </q-card>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  tasks: {
    type: Array,
    required: true,
  },
  showFilter: {
    type: Boolean,
    default: true,
  },
})

defineEmits(['toggle', 'delete', 'edit'])

/* 🔽 Filter dropdown */
const statusFilter = ref('all')

const statusOptions = [
  { label: 'All', value: 'all' },
  { label: 'Pending', value: 'pending' },
  { label: 'Completed', value: 'completed' },
]

/* ✅ Filtered rows */
const filteredTasks = computed(() => {
  if (statusFilter.value === 'completed') {
    return props.tasks.filter((t) => t.completed)
  }

  if (statusFilter.value === 'pending') {
    return props.tasks.filter((t) => !t.completed)
  }

  return props.tasks
})

const columns = [
  { name: 'name', label: 'Task', field: 'name', align: 'left' },
  {
    name: 'description',
    label: 'Description',
    field: 'description',
    align: 'left',
    style: 'max-width: 260px',
  },
  { name: 'status', label: 'Status', align: 'left' },
  { name: 'completed', label: 'Done', align: 'center' },
  { name: 'actions', label: 'Actions', align: 'center' },
]
</script>

<style scoped>
/* Header bar */
.filter-bar {
  background: rgba(25, 118, 210, 0.05);
  border-radius: 8px;
  padding: 12px 16px;
}

/* Filter select */
.status-filter {
  width: 220px;
}

/* Card */
.task-card {
  border-radius: 12px;
  overflow: hidden;
}

/* Table */
.task-table thead tr {
  background-color: rgba(0, 0, 0, 0.03);
}

.task-table tbody tr:hover {
  background-color: rgba(25, 118, 210, 0.04);
}

/* Status badge */
.status-badge {
  padding: 4px 10px;
  font-weight: 500;
  border-radius: 12px;
}

/* Description clamp */
.desc-2-lines {
  max-width: 260px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.4em;
  max-height: 2.8em;
  color: #555;
}
</style>
