function useMinimumPrice() {
    return async function (booking) {
        if (!booking.distance && !booking.hours) {
            return
        }
        let selectedCar = {}
        const cars = await useCars();
        if (booking.car_id) {
            selectedCar = cars.find((car) => booking.car_id == car.id)
        } else {
            selectedCar = cars[0]
        }
        const car_price = selectedCar.car_price[0]
        if (booking.ride_type == 'hourly') {
            booking.cost = Number(booking.hours) * Number(car_price.hourly_price)
            booking.price = car_price.hourly_price
        } else {
            booking.cost = (booking.distance.split(" ")[0]) * Number(car_price.km_price)
            console.log("total cost ", booking.cost);
            booking.price = car_price.km_price
        }
    }
}
export default useMinimumPrice