<template>


  <nav class="ui-pagination_nav" aria-label="Pagination Navigation">
      <ol class="ui-pagination_pagebuttons">
        <div class="ui-pagination_btn-arrow_wrap">
          <button 
            class="ui-pagination_btn ui-pagination_btn-arrow ui-pagination_btn-arrow_left"
            :disabled="!ui_previousPossible"
            title="Previous Page"
            aria-label="Previous Page"
            @click="updateActivePage(props.listToPaginate.currentPage - 1)"
          >
            <IconChevronLeft size="16" stroke-width="4"></IconChevronLeft>
          </button>
        </div>

        <div class="ui-pagination_btn_wrap">
          <template v-for="pg in visibleBtns">

            <button v-if="pg !== '…'"
              class="ui-pagination_btn"
              type="button"
              @click="updateActivePage(pg)"
              :class="(pg == props.listToPaginate.currentPage) ? 'ui-pagination_btn-activePg' : null"
              :aria-current="pg == props.listToPaginate.currentPage"
              :disabled="pg == props.listToPaginate.currentPage"
              :title="`Go to Page ${pg}`"
              :aria-label="(pg == props.listToPaginate.currentPage) ? `Current Page, Page ${pg}` : `Go to Page ${pg}`"
            >
              {{ pg }}
            </button>

            <span v-else
              aria-hidden="true"
              class="ui-pagination_btn-placeholder"
            >…</span>

          </template>
        </div>

        <div class="ui-pagination_btn-arrow_wrap">
          <button
            class="ui-pagination_btn ui-pagination_btn-arrow ui-pagination_btn-arrow_right"
            :disabled="!ui_forwardPossible"
            title="Next Page"
            aria-label="Next Page"
            @click="updateActivePage(props.listToPaginate.currentPage + 1)"
          >
            <IconChevronRight size="16" stroke-width="4"></IconChevronRight>
          </button>
        </div>
      </ol>

    <div class="ui-pagination_goToPage">
      <label for="ui-pagination_goToPage-input">Go To</label>
      <input 
        id="ui-pagination_goToPage-input"
        type="number"
        min="1"
        :max="props.listToPaginate.totalPages"
        @keydown.enter="updateActivePage(ui_goToPage)"
        v-model="ui_goToPage"
        aria-label="Enter the page number to go to"
      >
      <button :disabled="!validPageSelection" @click="updateActivePage(ui_goToPage)" :aria-label="`Go to Page ${ui_goToPage}`">Go</button>
    </div>


    <div class="ui-pagination_showEntryQty">
      <label for="ui-pagination_showEntryQty-select">Show</label>
      <select id="ui-pagination_showEntryQty-select" v-model="props.listFilters.limit" title="Number of entries to show per page" aria-label="Number of entries to show per page">
        <option v-for="value in [5, 10, 25, 50, 100]" :key="value"> {{value}}</option>
      </select>
    </div>


    <div class="ui-pagination_entriesinfo">
      <span 
        :aria-description="`Currently showing entries ${ui_qtyVisible} of a total of ${props.listToPaginate.totalEntries} entries`"
        :title="`Currently showing entries ${ui_qtyVisible} of a total of ${props.listToPaginate.totalEntries} entries`"
      >
        {{ ui_qtyVisible }} of {{ props.listToPaginate.totalEntries }}
      </span>
    </div>


  </nav>

</template>


<script setup>


import { ref, computed } from "vue";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-vue";

  const props = defineProps(["listToPaginate", "listFilters"]);
  const emits = defineEmits(["updateCurrentPage"]);

  const ui_goToPage = ref(1)
  const ui_forwardPossible = computed( () => (props.listToPaginate.currentPage < props.listToPaginate.totalPages) ? true : false);
  const ui_previousPossible = computed( () => (props.listToPaginate.currentPage > 1) ? true : false); 

  const validPageSelection = computed( () => {
    return (Number.isInteger(ui_goToPage.value) 
            && ui_goToPage.value <= props.listToPaginate.totalPages 
            && ui_goToPage.value > 0) ? true : false
  });

  const ui_qtyVisible = computed( () => {
    const from = (props.listFilters.limit * (props.listToPaginate.currentPage-1)) + 1;
    const calcTo = props.listFilters.limit * props.listToPaginate.currentPage;
    const to = (calcTo > props.listToPaginate.totalEntries) ? props.listToPaginate.totalEntries : calcTo;
    return `${from}–${to}`
  });


  const visibleBtns = computed( () => {
    return getVisibleBtns(props.listToPaginate.totalPages, props.listToPaginate.currentPage)
  });

  function getVisibleBtns(totalPages, currentPage) {

    /**
     * always show: "<" | "first page" | "last page" | ">" 
     * middle part with 2 pages before and 2 pages after for easier access
     * e.g.: < 1 ... 3 4 `5` 6 7 ... 10 >
     */
    //TODO: Refactor and simplify - looks ugly and hackish

    const totalBtns = (() => {
      const totalBtns = [];
      for (let i=1; i<=totalPages; i++) {
        totalBtns.push(i);
      };
      return totalBtns;
    })();


    const tempVisibleBtns = [[], [], []];
    if (totalPages < 7) {
      tempVisibleBtns[0] = totalBtns.slice(0, (totalPages>5) ? 6 : totalPages)
      return tempVisibleBtns.flatMap(elem => elem);
    }
    if (currentPage < 5) {
      tempVisibleBtns[0] = totalBtns.slice(0, (totalPages>5) ? 6 : totalPages)
      tempVisibleBtns[1] = ["…"]
      tempVisibleBtns[2] = totalBtns.slice(totalPages-1, totalPages)
    }
    else if (currentPage > totalPages-4) {
      tempVisibleBtns[0] = totalBtns.slice(0, 1);
      tempVisibleBtns[1] = ["…"]
      tempVisibleBtns[2] = totalBtns.slice(totalPages - 6, totalPages)

    } else {
      tempVisibleBtns[0] = totalBtns.slice(0, 1)
      tempVisibleBtns[1] = totalBtns.slice(currentPage - 3, currentPage + 2)
      tempVisibleBtns[2] = totalBtns.slice(totalPages-1, totalPages)
      tempVisibleBtns[1].push("…");
      tempVisibleBtns[1].unshift("…");
    }
    return tempVisibleBtns.flatMap(elem => elem);

  }




  function updateActivePage(pageNumber, listToPaginate = props.listToPaginate) {
    if (validPageSelection.value) {
      listToPaginate.currentPage = (pageNumber > listToPaginate.totalPages) ? listToPaginate.totalPages : pageNumber;
      emits("updateCurrentPage");
    }
  }


</script>







<style>

.ui-pagination_nav {
  background-color: lightgrey;
  border-radius: var(--border-radius);
  box-shadow: inset var(--box-shadow);
  display: flex;
  gap: .5rem;
  justify-content: start;
  margin: 1rem 0rem;
  padding: 0.5rem;
}

.ui-pagination_nav select, .ui-pagination_nav input, .ui-pagination_nav button {
  text-align: center;
}

.ui-pagination_nav ol {
  margin: 0;
  text-align: center;
}

.ui-pagination_nav label {
  display: inline-block
}

.ui-pagination_entriesinfo {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
}

.ui-pagination_pagebuttons, 
.ui-pagination_goToPage,
.ui-pagination_showEntryQty,
.ui-pagination_entriesinfo {
  padding: 0.75rem;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  background-color: azure;
  display: flex;
  gap: .5rem;
  align-items: center;
  justify-content: center;
}

.ui-pagination_pagebuttons {
  gap: 0rem;
}

.ui-pagination_goToPage,
.ui-pagination_showEntryQty,
.ui-pagination_entriesinfo {
  flex-wrap: wrap;
  flex-shrink: 5;

}

.ui-pagination_btn-activePg {
  /*font-weight: 700;*/
  background-color: #646cff;
  color: #fff;
}

.ui-pagination_btn {
  /*min-width: 4.25rem;*/
  padding: 0.6rem 0.6rem;
  transition: all var(--transition-time-short);
}

.ui-pagination_btn-placeholder {
  opacity: .3;
  font-weight: 700;
  font-size: .8rem;
}

.ui-pagination_goToPage input {
  width: 3rem;
  padding: 0.5rem 0.25rem;
}

.ui-pagination_goToPage button,
.ui-pagination_showEntryQty select {
  padding: 0.6rem 0.4rem;
  margin: 0rem;
}

.ui-pagination_btn-arrow svg {
  transition: transform var(--transition-time-short);
}

.ui-pagination_btn-arrow_right:hover svg {
  transform: translate(.25rem, 0);
}

.ui-pagination_btn-arrow_left:hover svg {
  transform: translate(-.25rem, 0);
}

.ui-pagination_btn-arrow:hover {
  background-color: #646cff !important;
  color: #fff;
}

.ui-pagination_btn-arrow {
  transition: all var(--transition-time-short);
}


@media screen and (max-width: 600px)  {
  .ui-pagination_nav {
    flex-direction: column;
  }
  .ui-pagination_entriesinfo {
    margin-left: 0;
  }

}

</style>