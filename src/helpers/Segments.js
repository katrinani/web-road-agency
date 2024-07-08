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
    points.forEach((marker) => {
        if (marker["Тип точки"][0] !== 8) {
            other.push([marker["Долгота"], marker["Широта"]]);
        } else {
            milestones.push([marker["Долгота"], marker["Широта"]]);
        }
    });


    let stressedSegments = [];
    let mediumSegments = [];

    milestones.forEach(milestone => {
        let nearbyPoints = [];

        other.forEach(point => {
            let distance = getDistance(point[0], point[1], milestone[0], milestone[1]);

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

    return {
        "stressed": stressedSegments,
        "medium": mediumSegments
    }
}
