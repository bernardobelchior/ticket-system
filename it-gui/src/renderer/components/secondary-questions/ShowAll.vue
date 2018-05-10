<template>
  <el-card class="show-card">
    <el-table :data="tickets" style="width: 100%">
      <el-table-column prop="title" label="Title">
      </el-table-column>
      <el-table-column label="State" width="250">
        <template slot-scope="scope">
          <span>{{possibleStates[scope.row.state]}}</span>
        </template>
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
    name: 'show-all-secondary-questions',
    data () {
      return {
        tickets: [],
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
      }
    },
    mounted: function () {
      this.$root.$data.feathers.service('secondary-questions').find().then(results => {
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
