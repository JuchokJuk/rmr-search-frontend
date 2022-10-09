<script>
  import RequestItem from "./RequestItem.svelte";
  export let status;
  export let requests;
</script>

<div class="request-list" class:request-list_hidden={status !== "success"}>
  {#if status === "success"}
    {#each requests as requestObject}
      {#each requestObject.requests as request}
        {#if request.trim().length !== 0}
          <RequestItem id={requestObject.id}>{request}</RequestItem>
        {/if}
      {/each}
    {/each}
  {/if}
</div>

<style>
  .request-list {
    background: var(--surface-2);
    border-radius: 8px;
    overflow: hidden;
    transition: transform 0.4s ease, opacity 0.4s ease;
  }
  .request-list_hidden {
    opacity: 0;
    transform: translateY(32px);
  }
</style>
