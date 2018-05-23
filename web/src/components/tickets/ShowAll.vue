<template>
  <el-card class="show-card">
    <el-table :data="tickets" style="width: 100%">
      <el-table-column label="Date" prop="date" :formatter="formatDate" sortable>
      </el-table-column>
      <el-table-column prop="title" label="Title" sortable>
      </el-table-column>
      <el-table-column label="State" prop="state" width="250" sortable :formatter="formatState" :filters="stateFilters" :filter-method="filterState">
      </el-table-column>
      <el-table-column label="Show" width="100">
        <template slot-scope="scope">
          <el-button @click="showTicket(scope.row.id)">Show</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
  export default {
    name: 'show-ticket',
    data () {
      return {
        tickets: [],
        stateFilters: [
          {
            value: 'unassigned',
            text: 'Unassigned'
          },
          {
            value: 'assigned',
            text: 'Assigned'
          },
          {
            value: 'waiting_for_answers',
            text: 'Waiting for answers'
          },
          {
            value: 'solved',
            text: 'Solved'
          }
        ],
        possibleStates: {
          'unassigned': 'Unassigned',
          'assigned': 'Assigned',
          'waiting_for_answers': 'Waiting for answers',
          'solved': 'Solved'
        }
      }
    },
    methods: {
      showTicket: function (ticketId) {
        this.$router.push('/tickets/show/' + ticketId)
      },
      formatDate: function (row) {
        return new Date(row.createdAt).toLocaleString()
      },
      formatState: function (row) {
        return this.possibleStates[row.state]
      },
      filterState: function (value, row) {
        return row.state === value
      }
    },
    mounted: function () {
      this.$root.$data.feathers.service('tickets').find().then(results => {
        this.$set(this, 'tickets', results.data)
      })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .show-card {
    max-width: 800px;
    margin: auto;
  }
</style>
