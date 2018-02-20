function CarService() {
    var url = 'https://inspire-server.herokuapp.com/api/joedavis-cars'
    var localCars = []

    function Car(formData) {
        this.make = formData.make.value;
        this.model = formData.model.value;
        this.year = formData.year.value;
        this.color = formData.color.value;
        this.price = formData.price.value;
    }

    this.getCars = function getCars(cb) {
        $.get(url + 'cars')
            .then(function (cars) {
                localCars = cars
                cb(localCars)
            })
    }

    this.makeCar = function (formData, cb) {
        var car = new Car(formData)
        $.post(url + 'cars', car)
            .then(res => {
                localCars.unshift(res.data)
                cb(localCars)
            })
    }

    this.editCar = function editCar(formData, cb){
        $.ajax({
            url: url + 'cars/' + formData.id.value,
            method: 'PUT',
            data: new Car(formData)
        })
            .then(res => {
                this.getCars(cb)
            })

    }

    this.removeCar = function removeCar(id, cb){
        $.ajax({
            url: url + 'cars/' + id,
            method: 'DELETE'
        })
            .then(res => {
                this.getCars(cb)
            })
    }


}