<template>
  <Transition>
    <menu ref="actionMenu" class="actionMenu_menu" v-show="props.actionMenuVisible.value === true">
      <slot></slot>
    </menu>
  </Transition>
</template>


<script setup>
  import { ref, onMounted, onBeforeUnmount } from "vue";
  const actionMenu = ref(null);


  const emit = defineEmits(["updateActionMenuRef", "updateActionMenuVisible"])
  const props = defineProps(["actionMenuVisible"])


  async function actionMenuDisableVisibility(actionMenuVisible = props.actionMenuVisible) {

    emit("updateActionMenuVisible", !actionMenuVisible);
  }

  function actionMenuHandleEscKey(event) {
    if (event.key === "Escape") {
      actionMenuDisableVisibility()
    }
  }

  function actionMenuHandleEmptyClick(event) {
    if (!event.target.classList.contains("actionMenu_btn")) {
      actionMenuDisableVisibility()
    }
  }

  const windowEventListeners = {
    escapeKey: ["keydown", actionMenuHandleEscKey],
    emptyClick: ["click", actionMenuHandleEmptyClick]
  };

  onMounted( () => {
    for (const eventListener in windowEventListeners) {
      window.addEventListener(...windowEventListeners[eventListener])
    }
    emit("updateActionMenuRef", actionMenu);
  });

  onBeforeUnmount( () => {
    for (const eventListener in windowEventListeners) {
      window.removeEventListener(...windowEventListeners[eventListener])
    }
  });


</script>


<style>

</style>