<template>

  <section class="ui-filter_section ui-filter_section-wrap">
    <div
      tabindex="0"
      class="ui-filter_toggle"
      :class="(filtersVisible) ? 'ui-filter_toggle-active' : null"
      @click="filtersVisible = !filtersVisible"
      @keydown.enter="filtersVisible = !filtersVisible"
      @keydown.space="filtersVisible = !filtersVisible"
    >
      <h3>Filter</h3>
      <IconChevronDown></IconChevronDown>
    </div>

    <form class="ui-filter_wrap" v-show="filtersVisible === true">

      <section class="ui-filter_section" v-if="(options.showDateRange !==  undefined) ? options.showDateRange : true">

        <div class="ui-filter-flex_wrap">
          <DateRange
            v-model:dateFrom="dataListStore.filters.from"
            v-model:dateTo="dataListStore.filters.to"
          >
          </DateRange>
        </div>

      </section>

      <section class="ui-filter_section" v-if="(options.showSort !== undefined) ? options.showSort : true">

        <div class="ui-filter-flex_wrap">

          <div>
            <SortBy 
              v-model="dataListStore.filters.sortBy"
              :sort-by-options="options.sortByOptions"
            >
            </SortBy>
          </div>

          <div>
            <span>Sort Order</span>
            <SortOrder 
              v-model="dataListStore.filters.sortOrder"
            >
            </SortOrder>
          </div>

        </div>
      </section>

      <section class="ui-filter_section" v-if="(options.showSearch !== undefined) ? options.showSearch : true">

        <div class="ui-filter-flex_wrap">

          <Search
            :search-in-options="options.sortByOptions"
            :searchForValue="dataListStore.filters.searchFor"
            @update:searchForValue="newValue => dataListStore.filters.searchFor = newValue"
            :searchInValue="dataListStore.filters.searchIn"
            @update:searchInValue="newValue => dataListStore.filters.searchIn = newValue"
          >
          </Search>

        </div>

      </section>
    </form>
  </section> 
    
</template>


<script setup>
  import { ref } from 'vue';
  import { IconChevronDown } from '@tabler/icons-vue';
  import SortOrder from './SortOrder.vue';
  import SortBy from "./SortBy.vue";
  import DateRange from "./DateRange.vue";
  import Search from './Search.vue';
  import { useDataListStore } from '../../stores/DataListStore';

  const props = defineProps(["options"])

  const dataListStore = useDataListStore();
  const filtersVisible = ref(true);

</script>

<style>
  .ui-filter_wrap {
    padding: 0.5rem;
    background-color: lightgrey;
    border-radius: var(--border-radius);
    box-shadow: inset var(--box-shadow);
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .ui-filter-flex_wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    flex-wrap: wrap;

  }

  .ui-filter_section {
    background-color: azure;
    padding: .75rem;
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
    position: relative;
  }

  .ui-filter_section-wrap {
    margin: .75rem 0rem;
  }

  .ui-filter_toggle {
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: all var(--transition-time-short);
  }

  .ui-filter_toggle:hover,
  .ui-filter_toggle:focus  {
    color: #646cff;
  }

  /** increase hit area via ::after/::before */
  .ui-filter_toggle::after,
  .ui-filter_toggle::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 1rem;
    left: 0;
  }

  .ui-filter_toggle::after {
    bottom: 0;
  }

  .ui-filter_toggle::before {
    top: 0;
  }

  .ui-filter_toggle h3 {
    margin: 0;
    font-size: 1rem;
  }

  .ui-filter_toggle svg {
    transition: transform var(--transition-time-short);
  }

  .ui-filter_toggle-active svg {
    transform: rotate(-90deg);
  }


  @media screen and (max-width: 600px)  {
    .ui-filter_wrap {
      flex-direction: column;
    }
  }

</style>