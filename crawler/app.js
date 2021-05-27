// $ npm install axios
// https://www.twse.com.tw/exchangeReport/STOCK_DAY?
// response=json
// &date=20210524
// &stockNo=2615
//test
//teach from : https://www.youtube.com/watch?v=MkwQ7duA-t0

import axios from 'axios';
//GET
axios.get('https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=20210524&stockNo=2615')
.then(res =>{
    console.log(res);
}).catch(err => {
    console.log(err);
})


//POST
axios.post('https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=20210524&stockNo=2615', {
    firstName: 'Fred',
    lastName: 'Flintstone'
})
.then(res => {
    console.log(response);
})
.catch(err => {
    console.log(error);
});



// {"stat":"OK",
// "date":"20210524",
// "title":"110年05月 2615 萬海             各日成交資訊",
// "fields":["日期",
//             "成交股數",
//             "成交金額",
//             "開盤價",
//             "最高價",
//             "最低價",
//             "收盤價",
//             "漲跌價差"
//             ,"成交筆數"],
// "data":[["110/05/03","85,917,961","8,685,398,219","98.90","104.00","96.00","101.50","+6.80","41,351"],
//         ["110/05/04","74,821,203","7,150,372,564","99.30","102.50","91.40","91.40","-10.10","35,517"],
//         ["110/05/05","60,549,549","5,601,290,222","90.60","96.20","86.20","92.50","+1.10","28,939"],
//         ["110/05/06","55,450,766","5,084,050,381","95.00","96.30","87.30","89.90","-2.60","28,052"],
//         ["110/05/07","40,152,658","3,628,643,226","92.00","92.80","87.80","92.30","+2.40","20,517"],
//         ["110/05/10","64,344,031","6,360,052,436","95.30","101.50","93.50","101.50","+9.20","32,879"],
//         ["110/05/11","83,483,343","8,421,070,792","99.90","106.00","94.00","98.70","-2.80","39,818"],
//         ["110/05/12","47,470,803","4,351,877,376","93.80","96.70","88.90","88.90","-9.80","21,899"],
//         ["110/05/13","49,102,435","3,988,206,152","80.10","86.60","80.10","80.10","-8.80","20,770"],
//         ["110/05/14","80,649,644","6,278,558,453","82.10","84.00","73.00","81.60","+1.50","39,809"],
//         ["110/05/17","87,858,857","6,865,470,838","76.10","83.60","74.20","78.20","-3.40","42,140"],
//         ["110/05/18","33,160,674","2,807,479,701","82.90","86.00","80.00","86.00","+7.80","13,709"],
//         ["110/05/19","77,980,129","7,231,071,373","90.00","94.60","87.80","94.60","+8.60","34,008"],
//         ["110/05/20","143,366,821","14,404,229,509","94.10","104.00","92.00","104.00","+9.40","54,363"],
//         ["110/05/21","73,376,940","8,290,558,283","110.00","114.00","109.50","114.00","+10.00","20,536"],
//         ["110/05/24","128,697,005","15,601,891,282","117.00","125.00","116.00","125.00","+11.00","55,936"],
//         ["110/05/25","167,451,509","20,686,225,321","132.50","135.50","112.50","116.50","-8.50","78,999"]],
// "notes":["符號說明:+/-/X表示漲/跌/不比價",
//         "當日統計資訊含一般、零股、盤後定價、鉅額交易，不含拍賣、標購。",
//         "ETF證券代號第六碼為K、M、S、C者，表示該ETF以外幣交易。"]}