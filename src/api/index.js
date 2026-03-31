const base = import.meta.env.VITE_BASE;

async function massageRes(res, resolve) {
  const result = await res.json()
  if (result.error && result.error === 'Invalid credentials!') {
    resolve(result)
  } else {
    resolve(result)
  }
}

function loginFNC(username, password) {
  return new Promise((resolve) => {
    fetch(`${base}auth/login`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    }).then((res) => {
      massageRes(res, resolve)
    });
  })
}

function ExportReport(type, title, data) {
  return new Promise((resolve) => {
    fetch(`${base}report/jobApplied`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ type, title, data }),
    }).then((res) => {
      massageRes(res, resolve)
    });
  })
}

export {
    loginFNC,
    ExportReport,
}