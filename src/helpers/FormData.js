const highways = ['М5']
const point_types = ['АЗС', 'ЭЗС', 'Кафе', 'Гостиница', 'Автосервис', 'Шиномонтаж', 'Автомойка']

const FormData = {
    "Название": "name",
    "Широта": "latitude", 
    "Долгота": "longitude", 
    "Дорога": highways,
    "Тип точки": point_types
}

export default FormData