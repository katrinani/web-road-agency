import roads from "./Request/Roads"

// export const highways = ['М-5', 'А-310', 'Р-254', 'Р-354']
export const highways = roads;

export const verifiedTypes = [
    'АЗС', // 0
    'Кафе', // 1
    'Автосервис', // 2
    'Гостиница', // 3
    'ЭЗС', // 4
    'Событие', // 5
    'Шиномонтаж', // 6
    'Автомойка', // 7
    'Километр' // 8
]

export const unverifiedTypes = [
    "ДТП", // 0
    "Недостатки дороги", // 1
    "Преграда", // 2
    "Противоправные действия 3х лиц" // 3
]

export const FormData = {
    "Название": "name",
    "Широта": "latitude", 
    "Долгота": "longitude", 
    "Дорога": highways,
    "Тип точки": verifiedTypes,
    "Регион": "region",
    "Описание": "decription"
}