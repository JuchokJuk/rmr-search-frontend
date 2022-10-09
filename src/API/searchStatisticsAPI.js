import { fetchWithTimeout } from '../helpers/fetchWidthTimeout'

const service = "https://rmr-search-server.onrender.com/searchStatistics/";

export async function getRequests() {
  const url = `${service}getRequests`;

  const response = await fetchWithTimeout(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "GET",
  });

  const requests = await response.json();
  return requests;
}

export async function getSequence(id) {
  const url = `${service}getSequence/${id}`;

  const response = await fetchWithTimeout(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "GET",
  });

  const sequence = await response.json();
  return sequence;
}