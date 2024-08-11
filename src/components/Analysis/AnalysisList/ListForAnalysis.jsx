import React from "react";
import {
    ExplanationForReliabilityLevels,
    ReliabilityLevels,
    unverifiedTypes
} from "../../../helpers/FormData";
import createTestVariant from "../../../helpers/Request/CreateTestVariant";

const AnalysisList = (props) => {
    const segments = props.segmentsMarkers

    const handleSegmentClick = async (segment, idSegment) => {
        const IDs = segment.map((point) => (point["marker"]["ID"]));
        const Point = await createTestVariant(IDs);
        console.log(Point);
        props.setTestPoint(Point);
        props.setRightPart("Тестовый вариант");
    };

    return (
        <div
            className="p-4 w-50 shadow-sm p-3 bg-body-tertiary rounded border border-dark-subtle d-flex flex-column mb-2 align-items-center">
            <h3 className="text-center">Анализ участков</h3>
            <div
                className="p-2 rounded border-dark-subtle overflow-auto shadow-sm"
                style={{height: 'calc(100% - 60px)', width: 'calc(100% - 16px)'}}
            >
                {["stressed", "medium"].map((kind) => (
                    <div className="accordion mb-1" id={`accordion-${kind}`}>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id={`heading-${kind}`}>
                                <button className={`accordion-button border border-${kind === "stressed" ? "danger" : kind === "medium" ? "warning" : ""}`}
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target={`#collapse-${kind}`}
                                        aria-expanded="true"
                                        aria-controls={`collapse-${kind}`}
                                        style={{backgroundColor: 'transparent'}}>
                                    <div
                                        className={`text ${kind === "stressed" ? "text-danger" : kind === "medium" ? "text-warning" : ""}`}>
                                        <b>{kind === "stressed" ? "Напряженные участки" : kind === "medium" ? "Средняя напряженность" : ""}</b>
                                    </div>
                                </button>
                            </h2>
                            <div id={`collapse-${kind}`} className="accordion-collapse collapse show"
                                 aria-labelledby={`heading-${kind}`}
                                 data-bs-parent={`#accordion-${kind}`}>
                                <div className="accordion-body">
                                    {segments[kind].length === 0 ?
                                        <p style={{margin: '0', padding: '0'}}>Нет ни одного участка</p> :
                                        <ul className="list-group">
                                            {segments[kind].map((segment, indexSegment) => (
                                                <li className="list-group-item"
                                                    style={{border: 'none', margin: '0', padding: '0'}}>
                                                    <div className="accordion mb-1"
                                                         id={`accordionSection${indexSegment}`}>
                                                        <div className="accordion-item">
                                                            <h2 className="accordion-header"
                                                                id={`heading${indexSegment}`}
                                                            >
                                                                <button className="accordion-button" type="button"
                                                                        data-bs-toggle="collapse"
                                                                        data-bs-target={`#collapse${indexSegment}`}
                                                                        aria-expanded="true"
                                                                        aria-controls={`collapse${indexSegment}`}
                                                                        style={{backgroundColor: 'transparent'}}>
                                                                    <div>Участок {indexSegment + 1} ({segment.length} шт.)</div>
                                                                </button>
                                                            </h2>
                                                            <div id={`collapse${indexSegment}`}
                                                                 className="accordion-collapse collapse show"
                                                                 aria-labelledby={`heading${indexSegment}`}
                                                                 data-bs-parent={`#accordionSection${indexSegment}`}>
                                                                <div className="accordion-body">
                                                                    <div className="d-flex justify-content-center">
                                                                        <button
                                                                            onClick={() => handleSegmentClick(segment)}
                                                                            className="btn btn-outline-primary rounded mybtn mb-1 w-100"
                                                                        >
                                                                            Выбрать участок
                                                                        </button>
                                                                    </div>
                                                                    <ul className="list-group">
                                                                        {segment.map((point, indexPoint) => (
                                                                            <li className="list-group-item "
                                                                                style={{
                                                                                    border: 'none',
                                                                                    margin: '0',
                                                                                    padding: '0'
                                                                                }}>
                                                                                <div className="accordion mb-1"
                                                                                     id={`accordionPoint${indexSegment}-${indexPoint}`}>
                                                                                    <div className="accordion-item">
                                                                                        <h2 className="accordion-header"
                                                                                            id={`headingPoint${indexSegment}-${indexPoint}`}>
                                                                                            <button
                                                                                                className="accordion-button"
                                                                                                type="button"
                                                                                                data-bs-toggle="collapse"
                                                                                                data-bs-target={`#collapsePoint${indexSegment}-${indexPoint}`}
                                                                                                aria-expanded="true"
                                                                                                aria-controls={`collapsePoint${indexSegment}-${indexPoint}`}
                                                                                                style={{backgroundColor: 'transparent'}}>
                                                                                                {`Точка ${indexPoint + 1}`}
                                                                                            </button>
                                                                                        </h2>
                                                                                        <div
                                                                                            id={`collapsePoint${indexSegment}-${indexPoint}`}
                                                                                            className="accordion-collapse collapse show"
                                                                                            aria-labelledby={`headingPoint${indexSegment}-${indexPoint}`}
                                                                                            data-bs-parent={`#accordionPoint${indexSegment}-${indexPoint}`}>
                                                                                            <div
                                                                                                className="accordion-body">
                                                                                                {<div>
                                                                                                    <div>Описание: {point["marker"]["Описание"]}</div>
                                                                                                    <div>Широта: {point["marker"]["Широта"]}</div>
                                                                                                    <div>Долгота: {point["marker"]["Долгота"]}</div>
                                                                                                    <div>Тип
                                                                                                        точки: {unverifiedTypes[point["marker"]["Тип точки"]]}</div>
                                                                                                    <div
                                                                                                        title={ExplanationForReliabilityLevels[point["marker"]["Уровень доверия"] - 1]}
                                                                                                    >
                                                                                                        Уровень доверия:
                                                                                                        {ReliabilityLevels[point["marker"]["Уровень доверия"] - 1]}</div>
                                                                                                    <div>Дорога: {point["marker"]["Дорога"]}</div>
                                                                                                    <div>Дата
                                                                                                        создания: {point["marker"]["Дата"]}</div>
                                                                                                </div>}
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AnalysisList;