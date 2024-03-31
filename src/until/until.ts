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