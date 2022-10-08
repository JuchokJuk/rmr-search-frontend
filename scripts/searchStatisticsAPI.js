const service = "https://rmr-search-server.onrender.com/searchStatistics/";

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

async function getSequence(id) {
  const url = `${service}getSequence/${id}`;

  response = await fetchWithTimeout(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "GET",
  });

  const sequence = await response.json();
  return sequence;
}