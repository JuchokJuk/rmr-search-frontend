<script>
  import Caption from "../Caption.svelte";
  import Exel from "./Exel.svelte";

  export let status;
  export let requests;

  function createCaption() {
    let date = new Date();
    const month = date.getMonth();

    date.setMonth(month - 1);
    if (date.getMonth() == month) {
      date.setDate(0);
    }
    date.setHours(0, 0, 0, 0);

    const monthAgo = format(date);

    const currentDate = format(new Date());

    const caption = `История запросов c ${monthAgo} по ${currentDate}`;
    return caption;
  }

  function format(date) {
    return date.toLocaleDateString("ru-US", {
      month: "long",
      day: "numeric",
    });
  }


</script>

<div class="header">
  <div class="header__text">
    <h1 class="header__headline">Что искали на redmadrobot.ru</h1>
    <div class="header__caption">
      {#if status === "loading"}
        <Caption>Загружаем историю запросов ...</Caption>
      {:else if status === "empty"}
        <Caption>Пока что, никто ничего не искал</Caption>
      {:else if status === "success"}
        <Caption>{createCaption()}</Caption>
      {/if}
    </div>
  </div>

  <Exel {status} {requests} fileName={createCaption()}/>
</div>

<style>
  .header {
    margin-left: 8px;
    margin-right: 8px;
    display: grid;
    grid-template-columns: 1fr auto;
    grid-template-rows: 1fr;
    gap: 48px;
  }
  @media (max-width: 680px) {
    .header {
      grid-template-columns: 1fr;
      grid-template-rows: 1fr auto;
      justify-items: start;
    }
  }

  .header__text {
    display: grid;
    grid-template-columns: auto;
    gap: 16px;
  }

  .header__headline {
    font-size: 32px;
    line-height: 36px;
  }

  .header__caption {
    margin-left: 4px;
    margin-right: 4px;
  }
</style>
