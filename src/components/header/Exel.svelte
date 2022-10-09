<script>
  import Caption from "../Caption.svelte";
  export let status;
  export let requests;
  export let fileName;

  function createCSV() {
    let csv = [];
    for (const requestObject of requests) {
      for (const request of requestObject.requests) {
        if (request.trim().length !== 0) {
          csv.push(request);
        }
      }
    }

    return encodeURIComponent(csv.join("\r\n"));
  }
</script>

<a
  class="header__exel"
  class:header__exel_disabled={status !== "success"}
  download={status === "success" ? fileName : null}
  href={status === "success" ? "data:text/csv;charset=utf-8,%EF%BB%BF" + createCSV() : null}
>
  <!-- svelte-ignore a11y-missing-attribute -->
  <img class="header__exel__image" src="/excel.svg" />

  <Caption>скачать .csv</Caption>
</a>

<style>
  .header__exel {
    cursor: pointer;

    display: grid;
    grid-template-columns: auto;
    gap: 4px;

    justify-items: center;

    text-decoration: none;

    transition: filter 0.4s ease, opacity 0.4s ease;
  }

  .header__exel_disabled {
    filter: grayscale(0.5);
    opacity: 0.5;
    cursor: unset;
    pointer-events: none;
  }

  .header__exel__image {
    margin-left: -6px;
    width: 48px;
    transition: transform 0.2s ease;
  }

  .header__exel:hover .header__exel__image {
    transform: scale(1.1);
  }
</style>
