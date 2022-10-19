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

export const formatNumber = (number: number | string | undefined) => {
  number = number ? typeof number === 'number' ? number : parseFloat(number) : 0
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
  console.log(params)
  return params
}
export function hasQueryString(search: URLSearchParams){
  let keys = []
  for (let key of search.keys()){
    keys.push(key)
  }
  return keys.length > 0 ? true : false
}

export function sliceString(str: string | undefined, length: number | undefined= 40): string{
  return str?.slice(0, length) + (str && str.length > length ? "..." : "")
}

export function editField(current: any, update: any, field: string) {
  return update[field]=== "" || !update[field]  ? current[field] : update[field]
}

export const filter_inputs = [
  {
    id: 1,
    title: "Price",
    subTitle: "&#8358;",
    rating: false,
    // list: [
    //   {id: 1.1, text: "Under ₦10,000", value: "<10000"},
    //   {id: 1.2, text: "₦10,000 - ₦20,000", value: "10000-20000"},
    //   {id: 1.3, text: "₦20,000 - ₦30,000", value: "20000-30000"},
    //   {id: 1.4, text: "₦30,000 - ₦40,000", value: "30000-40000"},
    //   {id: 1.5, text: "₦40,000 - ₦50,000", value: "40000-50000"},
    //   {id: 1.5, text: "₦50,000 -  Above", value: "50000>"},
    // ],
    range: true,
    search: false,
  },
//   {
//     id: 2,
//     title: "Discount",
//     subTitle: "",
//     rating: false,
//     list: [
//       {id: 2.1, text: "50% and above", value: "50%>"},
//       {id: 2.2, text: "40% and above", value: "40%"},
//       {id: 2.3, text: "30% and above", value: "30%"},
//       {id: 2.4, text: "20% and above", value: "20%"},
//       {id: 2.5, text: "10% and above", value: "10%"},
//       {id: 2.5, text: "5% and above", value: "5%"},
//     ],
//     range: false,
//     search: false,
//   },
//   {
//     id: 3,
//     title: "Brand",
//     subTitle: "",
//     rating: false,
//     list: [
//       {id: 3.1, text: "Nokia", value: "nokia"},
//       {id: 3.2, text: "Gionee", value: "gionee"},
//       {id: 3.3, text: "Samsung", value: "samsung"},
//       {id: 3.4, text: "Motorola", value: "motorola"},
//       {id: 3.5, text: "iPhone", value: "iPhone"},
//       {id: 3.5, text: "Infinix", value: "infinix"},
//       {id: 3.6, text: "Techno", value: "techno"},
//       {id: 3.7, text: "iTel", value: "iTel"},
//     ],
//     range: false,
//     search: true,
//   },
//   {
//     id: 4,
//     title: "Sizes",
//     subTitle: "",
//     rating: false,
//     list: [
//       {id: 4.1, text: "7.0 inches", value: "7.0"},
//       {id: 4.2, text: "6.4 inches", value: "6.4"},
//       {id: 4.3, text: "6.1 inches", value: "6.1"},
//       {id: 4.4, text: "5.5 inches", value: "5.5"},
//       {id: 4.5, text: "5.0 inches", value: "5.0"},
//       {id: 4.5, text: "4.5 inches", value: "4.5"},
//     ],
//     range: false,
//     search: false,
//   },
//   {
//     id: 5,
//     title: "Ratings",
//     subTitle: "",
//     rating: true,
//     list: [
//       {id: 5.1, text: 5, value: 5},
//       {id: 5.2, text: 4, value: 4},
//       {id: 5.3, text: 3, value: 3},
//       {id: 5.4, text: 2, value: 2},
//       {id: 5.5, text: 1, value: 1},
//     ],
//     range: false,
//     search: false,
//   },
]