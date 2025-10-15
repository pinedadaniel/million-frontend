"use client"
import Image from "next/image";
import RevealText from "../animation/RevealText";
import {useProperty} from "@/contexts/APIContext";
import Paginator from "../ui/Paginator";
import PropertyFilters from "../ui/PropertyFilters";
import {Property} from "@/lib/api";
import { formatPropertyPrice } from "@/lib/utils/formatters";
import React from "react";


export default function Explorer() {

    const {
        listProperties, 
        currentPage, 
        totalPages, 
        hasNextPage, 
        hasPreviousPage, 
        loading, 
        goToPage,
        setSelectedProperty,
        applyFilters
    } = useProperty();

    function handleClick(property: Property) {
        setSelectedProperty(property);
    }

    return (
        <section id="explorer" className="demo__inner inner-type-bottom">
            <div className="inner__wrapper">
                <div className="container-fluid p-0">
                    <div className="row g-0">
                        <div className="col-12 col-xl-2">
                            <div className="inner__name">
                                <div className="content__block name-block">
                  <span className="section-name icon-right animate-in-up">
                    <span style={{display: "flex", alignItems: "center", cursor: "pointer"}} className="section-name-caption">Explorer
                    <i className="ph ph-arrow-down-right" />
                    </span>
                  </span>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-xl-8">
                            <div className="inner__content">
                                <div className="content__block section-grid-title">
                                    <div className="block__descr">
                                        <RevealText as="h2" className=" animate-in-up">
                                            Exclusive Properties in South Florida
                                        </RevealText>
                                    </div>
                                </div>

                                <PropertyFilters
                                    onFiltersChange={applyFilters}
                                    loading={loading}
                                />
                                
                                <div className="content__block grid-block">
                                    <div className="container-fluid p-0">
                                        <div className="row g-0">
                                            {listProperties.length > 0 ? (
                                                listProperties.map((property) => (
                                                    <div key={property.id} className="col-12 card grid-item animate-in-up">
                                                        <div style={{cursor: "pointer"}} onClick={() => handleClick(property)} className="card__item">
                                                            <a
                                                                className="card__link"
                                                            >
                                                                <div className="card__image">
                                                                    <Image
                                                                        alt={property.name}
                                                                        src={property.image}
                                                                        width={1920}
                                                                        height={1200}
                                                                        unoptimized
                                                                    />
                                                                </div>
                                                                <div className="card__caption d-flex justify-content-between align-items-center animate-in-up">
                                                                    <h5 className="card__text" style={{textTransform: "uppercase"}}>★ {property.address}</h5>
                                                                    <div style={{display: "flex", alignItems: "center"}}>
                                                                        <span className="card__icon">
                                                                    </span>
                                                                        <h5>
                                                                            {formatPropertyPrice(property.price)}
                                                                        </h5>
                                                                    </div>

                                                                </div>
                                                            </a>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="col-12 card grid-item animate-in-up">
                                                    NO DATA
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                
                                <Paginator
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    hasNextPage={hasNextPage}
                                    hasPreviousPage={hasPreviousPage}
                                    onPageChange={goToPage}
                                    loading={loading}
                                />
                                
                            </div>
                        </div>
                        <div className="col-12 col-xl-2" />
                    </div>
                </div>
            </div>
        </section>
    );
}
