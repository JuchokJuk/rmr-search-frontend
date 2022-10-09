<script>
  import Header from "./components/header/Header.svelte";
  import RequestList from "./components/RequestList.svelte";
  import WidthControl from "./components/WidthControl.svelte";
  import { getRequests } from "./API/searchStatisticsAPI";

  let requests;
  let status = "loading";

  (async () => {
    let dataLoaded;
    try {
      requests = await getRequests();
      if (requests.error) {
        dataLoaded = false;
      } else {
        dataLoaded = true;
      }
    } catch (e) {
      dataLoaded = false;
    }

    if (dataLoaded) {
      if (requests.length > 0) {
        status = "success";
      } else {
        status = "empty";
      }
    } else {
      status = "failure";
    }
  })();
</script>

<WidthControl>
  <div class="page-container">
    <Header {status} {requests} />
    <RequestList {status} {requests} />
  </div>
</WidthControl>

<style>
  .page-container {
    margin-top: 64px;
    margin-bottom: 64px;
    margin-left: 16px;
    margin-right: 16px;

    display: grid;
    grid-template-columns: auto;
    gap: 48px;

    animation: fade-in 0.4s ease;
  }
  @keyframes fade-in {
    0% {
      opacity: 0;
      transform: translateY(32px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
