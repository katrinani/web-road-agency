const highways = ['М-5']
const point_types = ['АЗС', 'ЭЗС', 'Кафе', 'Гостиница', 'Автосервис', 'Шиномонтаж', 'Автомойка']
// здесь должны быть другие коды
// GasStation - 0, Cafe - 1, CarService - 2, Hotel - 3,
// ElectricFillingStation - 4, TireService - 5, CarWash - 6
const FormData = {
    "Название": "name",
    "Широта": "latitude", 
    "Долгота": "longitude", 
    "Дорога": highways,
    "Тип точки": point_types
}

export default FormData