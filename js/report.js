class arrReport{
    name;
    quanlity;
    price;
    constructor(name,quanlity,price){
        this.name=name;
        this.quanlity=quanlity;
        this.price=price;
    }
    getPrice(){
        return Number(this.quanlity)*Number(this.price)
    }
}