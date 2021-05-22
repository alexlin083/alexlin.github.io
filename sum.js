function sum(n) {
    let sum=0;
    for(let i=1; i<=n; i++){
        sum+=i;
    }
    return sum;
  }
  
console.log(sum(1)); // 1

// tax
function total(x){
    let salary=10000;
    let rate=0.3;
    let tax = (salary * x)*rate;
    return tax;
}
console.log(total(3));