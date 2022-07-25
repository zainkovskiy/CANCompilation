import axios from 'axios';

export async function getCards(){
  try{
    const res = await axios.post('https://hs-01.centralnoe.ru/Project-Selket-Main/testMap.php', 
      {
        "filter": {
            "reqTypeofRealty": "Квартиры"
        },
        "metro": {},
        "extra": {},
        "map": {
            "source": "circle",
            "geometry": [
                [
                    55.03766767022481,
                    82.9348066403198
                ],
                327.4086442946993
            ]
        },
        "source": "1c"
    })
    console.log(res);
    return res
  } catch(err){
    console.log(err);
    return err
  }
}