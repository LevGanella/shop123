export default class productsClass {
    id:string
    name:string
    price:number
    count:number

    constructor(id:string,name:string,price:number,count:number){
        this.id=id
        this.name=name
        this.price=price
        this.count = count
    }
}