"use client";
import HoverCursorEffect from "@/components/animation/HoverCursorEffect";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { useProperty } from "@/contexts/APIContext";
import {formatPropertyPrice} from "@/lib/utils/formatters";

export default function PropertyPopup() {
  const { selectedProperty, setSelectedProperty } = useProperty();

  const contentRef = useRef<HTMLDivElement | null>(null); // .mfp-content
  const popupRef = useRef<HTMLDivElement | null>(null); // .popup

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node | null;
      const content = contentRef.current;
      const popup = popupRef.current;

      if (!target || !popup) return;

      if (popup.contains(target)) return;

      if (content?.contains(target)) {
          setSelectedProperty(null);
      }

      if (!content?.contains(target)) {
          setSelectedProperty(null);
      }
    };

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, []);

  return (
    <>
      <div
        className={`mfp-bg mfp-fade mfp-ready portfolio-popup-bg ${
          selectedProperty ? "active" : ""
        }`}
        onClick={() => setSelectedProperty(null)}
      />
      <div
        className={`mfp-wrap mfp-close-btn-in mfp-auto-cursor mfp-fade mfp-ready portfolio-popup-wrap ${
          selectedProperty ? "active" : ""
        }`}
        tabIndex={-1}
      >
        <div className="mfp-container mfp-inline-holder" data-lenis-prevent>
          <div className="mfp-content" ref={contentRef}>
            <div className="popup" ref={popupRef}>
              <button
                className="mfp-close permanent-light"
                onClick={() => setSelectedProperty(null)}
              />

              <div className="popup__container">
                <div className="container-fluid p-0">
                  <div className="row g-0">
                    <div className="col-12">
                      <div className="project">
                        <div className="project__block no-padding no-margin project-image-bg">
                          {selectedProperty && (
                            <>
                              <Image
                                className="project-image-bg__portrait"
                                alt="Project Illustration"
                                src={selectedProperty?.image || ""}
                                width={600}
                                height={800}
                              />
                              <Image
                                className="project-image-bg__landscape"
                                alt="Project Illustration"
                                src={selectedProperty?.image || ""}
                                width={1920}
                                height={800}
                              />{" "}
                            </>
                          )}
                          <div className="project__title">
                            <h3 className="light">
                              {selectedProperty?.name || ""}
                            </h3>
                          </div>
                        </div>

                        <div className="project__block grid-block grid-items">
                          <div className="project__data">
                            <div className="container-fluid p-0">
                              <div className="row g-0">
                                <div className="col-12 col-xl-4">
                                  <div className="container-fluid p-0">
                                    <div className="row g-0">
                                      <div className="col-12 col-md-6 grid-item pdata__item">
                                        <p className="data__title tagline-chapter small type-basic-160lh">
                                            ADDRESS
                                        </p>
                                        <p className="data__descr small type-basic-160lh">
                                            {selectedProperty?.address || ""}
                                        </p>
                                      </div>
                                      <div className="col-12 col-md-6 grid-item pdata__item">
                                        <p className="data__title tagline-chapter small type-basic-160lh">
                                            PRICE
                                        </p>
                                        <p className="data__descr small type-basic-160lh">
                                            ${selectedProperty?.price ? formatPropertyPrice(selectedProperty?.price): ""}
                                        </p>
                                      </div>
                                      {/* project data single item */}
                                      <div className="col-12 col-md-6 grid-item pdata__item">
                                        <p className="data__title tagline-chapter small type-basic-160lh">
                                          DISPONIBLE
                                        </p>
                                        <p className="data__descr small type-basic-160lh">
                                            {selectedProperty?.sold ? "NOT" : "YES"}
                                        </p>
                                      </div>
                                      {/* project data single item */}
                                      <div className="col-12 col-md-6 grid-item pdata__item">
                                        <p className="data__title tagline-chapter small type-basic-160lh">
                                          Owner
                                        </p>
                                        <p className="data__descr small type-basic-160lh">
                                            {selectedProperty?.ownerId || ""}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-12 col-xl-8 grid-item">
                                  <p className="type-basic-160lh">
                                      {selectedProperty?.description || ""}!
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="project__block small-size">
                          <div className="container-fluid p-0">
                            <div className="row g-0">
                              <div className="col-12 d-flex justify-content-center">
                                <HoverCursorEffect
                                  as="a"
                                  className="btn btn-circle-text hover-circle"
                                  onClick={() => setSelectedProperty(null)}
                                  emZIndex="0"
                                >
                                  <span
                                    className="btn-caption"
                                    style={{ zIndex: 1 }}

                                  >
                                    Close
                                  </span>
                                </HoverCursorEffect>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Popup Content End */}
            </div>
          </div>
        </div>
      </div>{" "}
    </>
  );
}
