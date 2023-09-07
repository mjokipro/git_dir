class Vehicle {
    constructor(make, model, year,) {
        this.make = make;
        this.model = model;
        this.year = year;
    }

    honk() {
        return 'beep';
    }

    toString() {
        return `The vehicle is a ${this.make} ${this.model} from ${this.year}`;
    }
}

class Car extends Vehicle {
    constructor(make, model, year,) {
        super(make, model, year);
        this.numWheels = 4;
    }  
}

class Motorcycle extends Vehicle {
    constructor(make, model, year, ) {
        super(make, model, year,);
        this.numWheels = 2;
    }

    revEngine() {
        return 'VROOM!!!';
    }
}

class Garage {
    constructor(capacityNum,) {
        this.vehiclesArr = [];
        this.capacityNum = capacityNum;
    }

    add(newVehicle) {
        if (this.vehiclesArr.length >= this.capacityNum) {
            return 'Sorry, we are full';
        }
        if (!(newVehicle instanceof Vehicle)) {
            return 'Only vehicles are allowed in here!';
        }
        this.vehiclesArr.push(newVehicle);
        return 'Vehicle added!';
    } 
    
}