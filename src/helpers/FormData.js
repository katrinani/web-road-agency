import roads from "./Roads"

//export const highways = ['М-5']
export const highways = roads;

export const point_types = ['АЗС', 'Кафе', 'Автосервис', 'Гостиница', 'ЭЗС', 'Шиномонтаж', 'Автомойка']

export const FormData = {
    "Название": "name",
    "Широта": "latitude", 
    "Долгота": "longitude", 
    "Дорога": highways,
    "Тип точки": point_types
}