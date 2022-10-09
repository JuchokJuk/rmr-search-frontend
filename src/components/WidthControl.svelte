<div class="width-control-container">
  <div class="width-control">
    <slot />
  </div>
</div>

<style>
  .width-control-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .width-control {
    width: 100%;
    max-width: 800px;
  }
</style>
