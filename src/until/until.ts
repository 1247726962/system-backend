export function getChildren(arr, _id) {
  const res = [];
  for (const item of arr) {
    if (item.pid === _id) { // 找到当前id的子元素
      // 插入子元素，每个子元素的children通过回调生成
      if (getChildren(arr, item._id).length == 0) {
        res.push({ ...item });
      } else {
        res.push({ ...item, children: getChildren(arr, item._id) });
      }
    }
  }
  return res;
}

function loadXMLDoc() {
  var xmlhttp;
  if (window.XMLHttpRequest) {
    // IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
    xmlhttp = new XMLHttpRequest();
  }
  else {
    // IE6, IE5 浏览器执行代码
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) { }
  }
  xmlhttp.open("GET", "/api/test", true);
  xmlhttp.send();
}
/* 数字转换汉字，例如：1 => 一，102=> 一百零二 */
export const toChineseNumber = (n) => {
  if (!Number.isInteger(n) && n < 0) {
    throw Error('请输入自然数');
  }
  const digits = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
  const positions = ['', '十', '百', '千', '万', '十万', '百万', '千万', '亿', '十亿', '百亿', '千亿'];
  const charArray = String(n).split('');
  let result = '';
  let prevIsZero = false;
  //处理0  deal zero
  for (let i = 0; i < charArray.length; i++) {
    const ch = charArray[i];
    if (ch !== '0' && !prevIsZero) {
      result += digits[parseInt(ch)] + positions[charArray.length - i - 1];
    } else if (ch === '0') {
      prevIsZero = true;
    } else if (ch !== '0' && prevIsZero) {
      result += '零' + digits[parseInt(ch)] + positions[charArray.length - i - 1];
    }
  }
  //处理十 deal ten
  if (n < 100) {
    result = result.replace('一十', '十');
  }
  return result;
}
/* 
  链表排序,分为:
  单链表
  双链表
*/
interface OneObject {
  _id: string,
  pre: string,
  [key: string]: any
}
interface TwinObject {
  _id: string,
  pre: string,
  next: string,
  [key: string]: any
}
export const listSort = (dataArrray: OneObject[] | TwinObject[], mode: 'one' | 'twin' = 'one') => {

  if (dataArrray.length === 0) return []

  let result = []

  let first = dataArrray.find(i => { return i.pre === null || i.pre === '' || i.pre === undefined })

  const find = (param) => {
    let data = dataArrray.find(i => { return i.pre === param._id })
    if (data) {
      result.push(data)
      find(data)
    }
  }

  find(first)

  return [first, ...result]

}