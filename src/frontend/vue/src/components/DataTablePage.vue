<template>

  <DataTableFilters
    :options="{
      sortByOptions: sortedDataTableKeys,
      showDateRange: props.options.tableFilters.showDateRange
    }"
  >
  </DataTableFilters>

  <PaginationBar
    v-if="options.paginationBar.showTop === true && options.dataStore.data.length > 0"
    :list-to-paginate="options.dataStore.pagination"
    :list-filters="options.dataStore.filters"
  >
  </PaginationBar>

  <LoadingSpinner v-if="options.dataStore.isLoading">
  </LoadingSpinner>

  <ListActionButtons v-if="options.listActionButtons.showTop === true">
    <template v-slot:listActionButtons>
      <slot name="listActionButtons"></slot>
    </template>
  </ListActionButtons>

  <DataTable
    :table-options="{showSelection: true, showAction: true}"
    :data-list="options.dataStore"
    :data-key-id="'_id'"
    :data-keys="options.dataTableKeys"
    @update-current-item="(newValue) => props.options.dataStore.currentItem = newValue"
    @click-table-heading="(dataKeyId) => tableHeadingSortHandler(dataKeyId, options.dataStore)"
    @click-selection="toggleSelectionHandler(props.options.dataStore.data, props.options.dataStore.allItemsSelected)"
  >
    <template v-slot:actionMenuEntries>
      <slot name="actionMenuEntries"></slot>
    </template>

  </DataTable>

  <ListActionButtons v-if="options.listActionButtons.showBottom === true">
    <template v-slot:listActionButtons>
      <slot name="listActionButtons"></slot>
    </template>
  </ListActionButtons>


  <section class="ui-datatable_wrap" v-if="options.dataStore.data.length > 0">

  
  
  
  
  </section>


  <div class="ui-section-bgwrap"  v-if="messageBoxOptions.value.visible === true">
    <MessageBox
      :options="messageBoxOptions.value"
      >
    </MessageBox>
  </div>


</template>



<script setup>
  import { reactive, onMounted, watch } from 'vue';
  import DataTableFilters from './DataTableFilters/DataTableFilters.vue';
  import PaginationBar from './PaginationBar/PaginationBar.vue';
  import ListActionButtons from './DataTable/ListActionButtons.vue';
  import DataTable from './DataTable/DataTable.vue'

  import MessageBox from "./MessageBox.vue";
  import LoadingSpinner from './Loading-Spinner.vue';

  import loadDataHandler from "../services/loadDataHandler";
  import { tableHeadingSortHandler } from "../services/utils";

  const props = defineProps(["options"]);

  const messageBoxOptions = reactive({value: ""});

  const sortedDataTableKeys = [...props.options.dataTableKeys].sort( (a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();

    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });


  function toggleSelectionHandler(dataList, allItemsSelected) {
    dataList.forEach(item => item.selected = !allItemsSelected);
  }

  onMounted( async () => {
    await loadDataHandler(
      props.options.dataStore, 
      messageBoxOptions, 
      props.options.apiFunc.load, 
      props.options.dataProcessing
    );
  })



  const filtersStoreWatchList = (() => {
    const filterKeys = Object.keys(props.options.dataStore.filters);
    return filterKeys.map(filter => () => props.options.dataStore.filters[filter])
  })();

  watch([...filtersStoreWatchList], async (newValue, oldValue) => {
    props.options.dataStore.pagination.currentPage = 1;
    await loadDataHandler(
      props.options.dataStore, 
      messageBoxOptions, 
      props.options.apiFunc.load, 
      props.options.dataProcessing
    );
  });


  watch( () => props.options.dataStore.pagination.currentPage, async (newValue, oldValue) => {
      if (newValue > props.options.dataStore.pagination.totalPages) {
        return props.options.dataStore.pagination.currentPage = props.options.dataStore.pagination.totalPages
      }
      await loadDataHandler(
        props.options.dataStore,
        messageBoxOptions,
        props.options.apiFunc.load,
        props.options.dataProcessing
      );
    }
  );

</script>