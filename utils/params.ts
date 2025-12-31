interface Params {
  genre?: string;
  search?: string;
  limit?: string;
  page?: string;
}

export function updateParams(params: Params) {
  const urlParams = new URLSearchParams();

  if (params.genre) {
    urlParams.set("genre", params.genre);
  }
  if (params.search) {
    urlParams.set("search", params.search);
  }
  if (params.limit) {
    urlParams.set("limit", params.limit);
  }
  if (params.page) {
    urlParams.set("page", params.page);
  }

  return urlParams.toString();
}
