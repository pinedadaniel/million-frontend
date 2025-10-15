"use client"

import HoverCursorEffect from "../animation/HoverCursorEffect";
import VelocityMarquee from "../animation/VelocityMarquee";
import Image from "next/image";
import {useProperty} from "@/contexts/APIContext";
import RevealText from "@/components/animation/RevealText";

export default function Sold() {

    const {listSoldProperties} = useProperty();

  return (
    <div
      id="sold"
      className="demo__inner inner-grid-bottom no-padding-bottom"
    >
      <div className="inner__wrapper">
          <div className="content__block section-grid-title">
              <div className="block__descr">
                  <RevealText style={{textAlign: "center"}} as="h2" className=" animate-in-up">
                     SOLD!
                  </RevealText>
              </div>
          </div>
        <div className="container-fluid p-0">
          <div className="row g-0">
            <div className="col-12">
              <div className="media__fullwidth">
                {/* Marquee V1 Divider Start */}
                <VelocityMarquee className="items items--gsap">
                    {
                        listSoldProperties.map((property) => (
                            <div key={property.id} data-name={property.name} style={{backgroundImage: `url(${property.image})`}} className="item image">
                            </div>
                        ))
                    }
                </VelocityMarquee>
                {/* Marquee V1 Divider End */}
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid p-0">
          <div className="row g-0">
            <div className="col-12 col-xl-2" />
            <div className="col-12 col-xl-8">
              <div className="container-fluid p-0">
                <div className="row g-0">
                  <div className="col-12">
                    <div className="footer__footercta d-flex flex-column">
                      <div className="footercta__caption d-flex justify-content-center text-center animate-in-up">
                        <p className="type-basic-160lh">
                          MILLION | Redefine Lifestyle - Ranked 1 team in the US in new development
                        </p>
                      </div>
                      <div id={"letstalk"} className="footercta__cta d-flex justify-content-center animate-in-up">
                        <HoverCursorEffect
                          as="a"
                          className="btn btn-default hover-default"
                        >
                          <span className="btn-caption">Let&#39;s Talk</span>
                        </HoverCursorEffect>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="footer__links d-flex flex-column text-center text-lg-left flex-lg-row justify-content-lg-between">
                      <p className="small">
                        Let&apos;s talk on{" "}
                        <a
                          className="link-small-underline"
                        >
                          Danielpineda.developer@gmail.com
                        </a>
                      </p>{" "}
                      <p className="small">
                        All Rights Reserved
                       <i className="ph ph-heart ms-2" />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-xl-2" />
          </div>
        </div>
      </div>
    </div>
  );
}
