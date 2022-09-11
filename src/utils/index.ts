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
  number = typeof number === 'number' ? number : parseFloat(number)
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};