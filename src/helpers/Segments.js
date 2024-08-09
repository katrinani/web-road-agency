// Функция для вычисления расстояния между двумя точками по их координатам
function getDistance(lat1, lon1, lat2, lon2) {
    let R = 6371; // Радиус земли в километрах
    let dLat = deg2rad(lat2 - lat1);
    let dLon = deg2rad(lon2 - lon1);
    let a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c; // Расстояние в километрах
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180);
}


export function makeSegments (points) {
    // Исходные данные: список точек и список километровых столбов
    const other = [];
    const milestones = [];
    points.filter(point => point["Тип точки"][0] !== 9).forEach((marker) => {
        if (marker["Тип точки"][0] !== 8 && marker["Тип точки"][0] !== 9) {
            other.push({"coordinate": [marker["Долгота"], marker["Широта"]], "marker": marker});
        } else if (marker["Тип точки"][0] !== 9) {
            milestones.push({"coordinate": [marker["Долгота"], marker["Широта"]], "marker": marker});
        }
    });


    let stressedSegments = [];
    let mediumSegments = [];

    milestones.forEach(milestone => {
        let nearbyPoints = [];

        other.forEach(point => {
            let distance = getDistance(
                point["coordinate"][0],
                point["coordinate"][1],
                milestone["coordinate"][0],
                milestone["coordinate"][1]
            );

            if (distance <= 1) {
                nearbyPoints.push(point);
            }
        });

        if (nearbyPoints.length > 10) {
            stressedSegments.push(nearbyPoints);
        } else if (nearbyPoints.length >= 3 && nearbyPoints.length <= 10) {
            mediumSegments.push(nearbyPoints);
        }
    });

    // Сортировка на уникальные значения
    function uniqueList(list) {
        const uniqueIDs = new Set();
        const uniqueList = list.map(innerArray => {
            return innerArray.filter(item => {
                if (!uniqueIDs.has(item.marker.ID)) {
                    uniqueIDs.add(item.marker.ID);
                    return true;
                }
                return false;
            });
        });
        return uniqueList.filter(segment => segment.length !== 0);
    }

    return {
        "stressed": uniqueList(stressedSegments),
        "medium": uniqueList(mediumSegments)
    }
}
