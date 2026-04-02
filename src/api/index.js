// const base = import.meta.env.VITE_BASE;

// async function massageRes(res, resolve) {
//   const result = await res.json()
//   if (result.error && result.error === 'Invalid credentials!') {
//     resolve(result)
//   } else {
//     resolve(result)
//   }
// }

// function loginFNC(username, password) {
//   return new Promise((resolve) => {
//     fetch(`${base}auth/login`, {
//       method: 'post',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ username, password }),
//     }).then((res) => {
//       massageRes(res, resolve)
//     });
//   })
// }

// function ExportReport(type, title, data) {
//   return new Promise((resolve) => {
//     fetch(`${base}report/jobApplied`, {
//       method: 'post',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ type, title, data }),
//     }).then((res) => {
//       massageRes(res, resolve)
//     });
//   })
// }

// export {
//     loginFNC,
//     ExportReport,
// }

const base = import.meta.env.VITE_BASE;

/**
 * safe JSON parse
 */
async function parseResponse(res) {
  const text = await res.text();

  try {
    return text ? JSON.parse(text) : {};
  } catch {
    return text;
  }
}

/**
 * 通用 request wrapper
 * 统一处理 fetch + error handling
 */
async function request(url, options = {}) {
  const res = await fetch(`${base}${url}`, {
    ...options,
    headers: {
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...options.headers,
    },
  });

  const data = await parseResponse(res);

  if (!res.ok) {
    throw new Error(data?.message || "Request failed");
  }

  return data;
}

/**
 * login API
 */
export async function loginFNC(username, password) {
  return request("auth/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
}

/**
 * export report API
 */
export async function ExportReport(type, title, data) {
  return request("report/jobApplied", {
    method: "POST",
    body: JSON.stringify({
      type,
      title,
      data,
    }),
  });
}

/**
 * build query helper
 */
function buildQuery(params) {
  return new URLSearchParams(
    Object.fromEntries(
      Object.entries(params).filter(
        ([_, v]) => v !== undefined && v !== null
      )
    )
  ).toString();
}

/**
 * wallet history API
 */
export async function PhouxWallet_history(
  token,
  transaction_type,
  status,
  dateFrom,
  dateTo,
  sort,
  dir,
  size,
  page
) {
  const query = buildQuery({
    transaction_type,
    status,
    date_from: dateFrom,
    date_to: dateTo,
    sort,
    dir,
    size,
    page,
  });

  return request(`phoux-wallet/history?${query}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
