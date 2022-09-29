const service = "http://localhost:8006/searchStatistics/";

async function getRequests() {
  const url = `${service}getRequests`;

  response = await fetchWithTimeout(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "GET",
  });

  const rquests = await response.json();
  return rquests;
}
