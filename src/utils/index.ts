export function formatDate(date: string){
    let split = date.split("/")
    split = split.reverse()
    return split.join("-")
}

export function validURL(str: string) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
}

export async function verifyLink(url: string){
  try{
    let res = await fetch(url)
    let data = res.json()
    return data
  }
  catch(err){
    console.log(err)
  }
}

export const formatNumber = (number: number | string) => {
  number = typeof number === 'number' ? number : number === 'undefined' ? 0 : parseFloat(number)
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export function getColor(status: string){
  switch(status){
    case 'success' || 'SUCCESS':{
      return {
        
      }
    }
  }
}

export function serializeFormQuery(search: URLSearchParams){
  let params: any = {}
  for (let [key, value] of search.entries()){
    params[key] = value
  }
  return params
}
export function hasQueryString(search: URLSearchParams){
  let keys = []
  for (let key of search.keys()){
    keys.push(key)
  }
  return keys.length > 0 ? true : false
}