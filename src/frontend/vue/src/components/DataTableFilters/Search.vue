<template>

  <div>
    <label for="ui-searchFor">Search For</label>
    <input 
      id="ui-searchFor" 
      type="search" 
      :value="searchForValue"
      @change="$emit('update:searchForValue', $event.target.value)"
    >
  </div>

  <div>
    <label for="ui-searchIn">Search In</label>
    <select
      id="ui-searchFor"
      :value="searchInValue"
      @change="$emit('update:searchInValue', $event.target.value)"
    >
      <option 
        v-for="option in searchInOptions"
        :value="option.key"
        :key="option.key"
      > {{ option.name }}</option>
    </select>
  </div>

  <button type="button">
    <IconSearch></IconSearch>
  </button>

</template>

<script setup>

  import { IconSearch } from '@tabler/icons-vue';

  defineProps(["searchInOptions", "searchForValue", "searchInValue"])
  defineEmits(["update:searchForValue", "update:searchInValue"])

</script>


<style>

</style>