export function fetchData(url: string, header: string) {
  return fetch(url, {
    method: "GET",
    headers: { "app-id": header },
  })
    .then(response => {
      if (response.ok) return response.json();
      throw response;
    })
    .catch(error => console.error("Bad request", error));
}
