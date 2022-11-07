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

export async function getAct(raw) {
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

export const getDOU = async (raw) => {
  const res = await axios.post('https://crm.centralnoe.ru/dealincom/templates/pokaz.php',
    raw)
    console.log(res)
  if (res.status === 200 && res.statusText === "OK") {
    // const url = res.data;
    // const url = 'https://crm.centralnoe.ru/bitrix/services/main/ajax.php?action=documentgenerator.api.document.getfile&SITE_ID=s1&id=17814&ts=1667805301';
    // const link = document.createElement('a');
    // link.href = url;
    // link.setAttribute('download', 'akt_pokaza');
    // document.body.appendChild(link);
    // link.click();
    document.location.href = res.data;
  }
}
