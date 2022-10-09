<script>
  import { getSequence } from "../API/searchStatisticsAPI";
  import { byField } from "../helpers/byField";
  export let id;
  let text = " ";
  let animating = false;

  async function showSequence(id) {
    if (!animating) {
      animating = true;
      const typeAnimationSpeed = 200;
      const typeAnimationDelay = 600;
      const sequence = await getSequence(id);

      for (let i = 0; i < sequence.length; i++) {
        sequence[i].request_time = Date.parse(sequence[i].request_time);
      }
      sequence.sort(byField("request_time"));

      setTimeout(() => {
        for (let i = 0; i < sequence.length; i++) {
          setTimeout(() => {
            text = sequence[i].request;
          }, (1 + i) * typeAnimationSpeed);
        }

        setTimeout(() => {
          text = " ";
        }, (sequence.length + 2) * typeAnimationSpeed);

        setTimeout(() => {
          animating = false;
        }, (sequence.length + 2) * typeAnimationSpeed + typeAnimationDelay);
      }, typeAnimationDelay);
    }
  }
</script>

<div
  class="request-list__item"
  class:request-list__item_carriage={animating}
  on:click={() => {
    showSequence(id);
  }}
>
  {#if !animating}
    <slot />
  {:else}
    {text}
  {/if}
</div>

<style>
  .request-list__item {
    color: var(--line-2);
    padding: 20px 24px;
    box-shadow: inset 0 -0.5px var(--surface-3), inset 0 0.5px var(--surface-3);
    transition: background-color 0.2s ease, box-shadow 0.2s ease;
    font-family: monospace;
  }

  .request-list__item:hover {
    background: var(--surface-3);
  }

  .request-list__item:first-child {
    padding-top: 24px;
    box-shadow: inset 0 -0.5px var(--surface-3);
  }

  .request-list__item:last-child {
    padding-bottom: 24px;
    box-shadow: inset 0 0.5px var(--surface-3);
  }

  .request-list__item_carriage {
    background: var(--surface-3);
  }
  .request-list__item_carriage.request-list__item {
    box-shadow: inset 0 -0.5px var(--surface-3), inset 0 0.5px var(--surface-3), inset 4px 0 var(--primary);
  }
  .request-list__item_carriage.request-list__item:first-child {
    box-shadow: inset 0 -0.5px var(--surface-3), inset 4px 0 var(--primary);
  }
  .request-list__item_carriage.request-list__item:last-child {
    box-shadow: inset 0 0.5px var(--surface-3), inset 4px 0 var(--primary);
  }

  .request-list__item_carriage::after {
    content: "█";
  }
</style>
