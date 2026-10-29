const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const ServerFetch = async (path) => {
  const res = await fetch(`${baseUrl}${path}`);
  // handle 401 , 404 , 403
  return res.json();
};

export const serverMutation = async (path, data) => {
  const res = await fetch(`${baseUrl}${path}`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};
