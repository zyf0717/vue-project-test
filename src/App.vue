<script setup>

import { ref, onMounted } from 'vue'
import Papa from 'papaparse'

const csvData = ref(null)

async function fetchAndParseCSV() {
  try {
    const response = await fetch('https://calmcode.io/static/data/titanic.csv')
    const csvText = await response.text()
    Papa.parse(csvText, {
      header: true,
      complete: function(results) {
        console.log(results.data)
        csvData.value = results.data
      }
    })
  } catch (error) {
    console.error('Error fetching and parsing CSV:', error)
  }
}

onMounted(() => {
  fetchAndParseCSV()
})

let sexList = ['All', 'Female', 'Male', 'Other', 'Unknown']
let sex = ref(null)
let minAge = ref(0)
let maxAge = ref(100)

</script>

<template>
  <div>
    <label for="sex">Gender: </label>
    <select v-model="sex" id="sex">
      <option value="" disabled selected>Select sex</option>
      <option v-for="s in sexList" :key="s" :value="s">{{ s }}</option>
    </select>
    <p>Selected sex: {{ sex || 'None' }}</p>
  </div>
  <br> <br> <br>
  <div>
    <label for="minAge">Min Age: {{ minAge }} </label>
    <br>
    <input type="range" v-model="minAge" id="minAge" min="0" max="100" step="1">
    <br>
    <label for="maxAge">Max Age: {{ maxAge }} </label>
    <br>
    <input type="range" v-model="maxAge" id="maxAge" min="0" max="100" step="1">
    <p>Selected Age Range: {{ minAge }} - {{ maxAge }}</p>
  </div>
  <div id="app">
    <h1>CSV Data</h1>
    <br>
    <div v-if="csvData">
      <pre>{{ csvData }}</pre>
    </div>
    <div v-else>
      Loading...
    </div>
  </div>
</template>