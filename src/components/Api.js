import axios from 'axios';

export async function setEdit(res){
  axios.post('https://hs-01.centralnoe.ru/Project-Selket-Main/Servers/Filter/Selection.php', res)
}


export async function hide(uid){
  axios.post('https://hs-01.centralnoe.ru/Project-Selket-Main/Servers/Filter/Selection.php', {
    action: 'hide',
    entityId: uid,
  })
}

export async function show(uid){
  axios.post('https://hs-01.centralnoe.ru/Project-Selket-Main/Servers/Filter/Selection.php', {
    action: 'show',
    entityId: uid,
  })
}