function fetchImage(name, page) {
  const KEY = '24115894-e73b87c75d7b7d0a00bbe3b23';
  return fetch(
    `https://pixabay.com/api/?q=${name}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`,
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error(`Image with name ${name} not found`));
  });
}

const api = { fetchImage };

export default api;
