import React from "react";
import {
    ExplanationForReliabilityLevels,
    ReliabilityLevels,
    unverifiedTypes
} from "../../helpers/FormData";

const AnalysisList = (props) => {
    const segments = props.segmentsMarkers
    // const handleSegmentClick = async (segment) => {
    //     console.log(segment)
    //     // const IDs = segment.map((point) => (point["marker"]["ID"]))
    //     // props.setRightPart("Тестовый вариант")
    //     // props.setListIDs(IDs)
    //     // onClick={() => handleSegmentClick(segment)}
    // };

    return (
        <div
            className="p-4 w-50 shadow-sm p-3 bg-body-tertiary rounded border border-dark-subtle d-flex flex-column mb-2 align-items-center">
            <h3 className="text-center">Анализ участков</h3>
            <div
                className="p-2 rounded border-dark-subtle overflow-auto shadow-sm"
                style={{height: 'calc(100% - 60px)', width: 'calc(100% - 16px)'}}
            >
                {["stressed", "medium"].map((kind) => (
                    <div className="accordion" id={`accordion-${kind}`}>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id={`heading-${kind}`}>
                                <button className="accordion-button" type="button" data-bs-toggle="collapse"
                                        data-bs-target={`#collapse-${kind}`} aria-expanded="true"
                                        aria-controls={`collapse-${kind}`}>
                                    <div
                                        className={`text ${kind === "stressed" ? "text-danger" : kind === "medium" ? "text-warning" : ""}`}>
                                        {kind === "stressed" ? "Напряженные участки" : kind === "medium" ? "Средняя напряженность" : ""}
                                    </div>
                                </button>
                            </h2>
                            <div id={`collapse-${kind}`} className="accordion-collapse collapse show"
                                 aria-labelledby={`heading-${kind}`}
                                 data-bs-parent={`#accordion-${kind}`}>
                                <div className="accordion-body">
                                    <ul className="list-group">
                                        {segments[kind].map((segment, indexSegment) => (
                                            <li className="list-group-item"
                                                style={{border: 'none', margin: '0', padding: '0'}}>
                                                <div className="accordion" id={`accordionSection${indexSegment}`}>
                                                    <div className="accordion-item">
                                                        <h2 className="accordion-header"
                                                            id={`heading${indexSegment}`}
                                                        >
                                                            <button className="accordion-button" type="button"
                                                                    data-bs-toggle="collapse"
                                                                    data-bs-target={`#collapse${indexSegment}`}
                                                                    aria-expanded="true"
                                                                    aria-controls={`collapse${indexSegment}`}
                                                                    >
                                                                {`Участок ${indexSegment + 1}`}
                                                            </button>
                                                        </h2>
                                                        <div id={`collapse${indexSegment}`}
                                                             className="accordion-collapse collapse show"
                                                             aria-labelledby={`heading${indexSegment}`}
                                                             data-bs-parent={`#accordionSection${indexSegment}`}>
                                                            <div className="accordion-body">
                                                                <ul className="list-group">
                                                                    {segment.map((point, indexPoint) => (
                                                                        <li className="list-group-item "
                                                                            style={{
                                                                                border: 'none',
                                                                                margin: '0',
                                                                                padding: '0'
                                                                            }}>
                                                                            <div className="accordion"
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
                                                                                            aria-controls={`collapsePoint${indexSegment}-${indexPoint}`}>
                                                                                            {`Точка ${indexPoint + 1}`}
                                                                                        </button>
                                                                                    </h2>
                                                                                    <div
                                                                                        id={`collapsePoint${indexSegment}-${indexPoint}`}
                                                                                        className="accordion-collapse collapse show"
                                                                                        aria-labelledby={`headingPoint${indexSegment}-${indexPoint}`}
                                                                                        data-bs-parent={`#accordionPoint${indexSegment}-${indexPoint}`}>
                                                                                        <div className="accordion-body">
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
                                                                                                <div>Дата создания: {point["marker"]["Дата"]}</div>
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