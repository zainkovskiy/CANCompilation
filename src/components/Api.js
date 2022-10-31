import axios from 'axios';

export async function setEdit(res) {
  axios.post('https://hs-01.centralnoe.ru/Project-Selket-Main/Servers/Filter/Selection.php', res)
}


export async function hide(uid) {
  axios.post('https://hs-01.centralnoe.ru/Project-Selket-Main/Servers/Filter/Selection.php', {
    action: 'hide',
    entityId: uid,
  })
}

export async function show(uid) {
  axios.post('https://hs-01.centralnoe.ru/Project-Selket-Main/Servers/Filter/Selection.php', {
    action: 'show',
    entityId: uid,
  })
}

export async function sendSMS(selectPhone) {
  const res = await axios.post('https://hs-01.centralnoe.ru/Project-Selket-Main/Servers/Filter/Selection.php', {
    action: "sendSMS",
    entityId: dealId,
    phone: selectPhone
  });
  if (res?.data?.status === 'ok') {
    console.log('true');
    return true
  } else {
    return false
  }
}

export async function getFile(raw) {
  const res = await axios.post('https://hs-01.centralnoe.ru/Project-Selket-Main/Filter/Selections/Akt.php', 
  raw, 
  { responseType: 'blob' })
  if (res.status === 200 && res.statusText === "OK") {
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const name = res.headers['content-disposition'].split('filename=')[1];
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', name);
    document.body.appendChild(link);
    link.click();
  }
}
