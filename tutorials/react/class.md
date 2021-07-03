# Class 類別 & 繼承 extends & 建構子 constructor

初學物件導向，第一個碰的就是 Class，網路上找了很多說法，自己歸納併整理一下，有錯誤還請指導<br>
然而碰到 Class 也會碰到建構子**constructor** & 繼承**extends**(另外做筆記)，這裡先簡單用

> 類別(Class)是先裡面定義好物件的整體架構，再用這個類別定義來產生相同結構的多個的物件，<br>
> 類別在定義時並不會直接產生出物件，要經過實體化的過程**new 運算符號**才會產生物件實體<br>
> 好比我用 **Person** 來舉例， **Person** 有名字、有年紀，並創建了 **speak()** 這個方法
>
> 類別名稱命名時要使用大駝峰(ClassName)的寫法

```ruby
class Person{
    //建構子
    constructor(name,age){
        this.name = name;
        this.age = age;
    }

    //一般方法
    speak(){
        console.log(`我是${this.name}, 我年紀是${this.age}歲`);
    }
}

const people1 = new Person('Alex',20);
const people2 = new Person('John',18);
console.log(people1); // Person {name: 'Alex', age: 20}
console.log(people2); // Person {name: 'John', age: 18}

```

> 在類別 Person 下用**建構子**設定 name、age，及 speak()方法<br>
> 由以上程式碼範例得知 people1 及 people2 使用 **new 運算符號** 都得到 class Person{} 這個的 name 及 age<br>
> 所以 people1 及 people2 這 2 個就變成擁有 name、age 的物件(object)

## extends 繼承

```ruby

//Student 繼承 Person 的所有東西，然可以再加入並使用自己獨特的、特有的參數&方法

class Student extends Person{
    constructor(name,age,grade){
        super(name,age);
        this.grade = grade;
        this.school = 'XX高中';
    }

    speak(){
        console.log(`我是${this.name}, 我年紀是${this.age}歲, 我目前是${this.grade}, 我就讀${this.school}`);
    }

    eat(){
        console.log(`我中午吃2個便當`);
    }
}

const student = new Student('小明',15,'高一')
console.log(student); //
student.speak();
student.eat();

```

> 在這段程式碼中，看到了一個 super()，這是用來使用被繼承的 constructor，讓繼承者可以使用**被繼承者**的參數<br>
> 這個 super()必須放在 constructor 理的第一順位!!!!!!!!
>
> 在 Student 繼承 Person 後，<br>
> Student 便擁有 Person 的所有參數、方法，還可以自身加其它參數方法<br>
> 舉例 eat()，這個方法就 Student 可以使用

由這個範例可以看出，我定義了 Person(人) 這個類別，<br>
然後 Student (學生) 這個族群去繼承 Person(人) 的所有東西，再增加自己的參數及方法，<br>
我也可以創建 Teacher (老師) 這個族群也去繼承 Person(人)，再增加 teach()方法.....<br>
