import ParallaxItem from "../animation/Parallax";
import RevealText from "@/components/animation/RevealText";


export default function Intro() {

  return (
    <section id="home" className="demo__intro">
      <div className="intro__content">
        <div className="intro__background intro-bg-01 hero-animate-in-up">
          <ParallaxItem speed={0.6} className="intro-bg-01__01">
              <video controls={false} playsInline autoPlay muted loop className={"video"} width="640" height="360">
                  <source src="/video/background.mp4" type="video/mp4" />
              </video>
            <div className="intro-bg__shadow" />
          </ParallaxItem>

        </div>
        <div className="container-fluid p-0 fullheight-desktop">
          <div className="row g-0 fullheight-desktop align-items-xl-stretch">
            <div className="col-12 col-xl-2" />
            <div className="col-12 col-xl-8 fullheight-desktop">
              <div
                id="headline"
                className="headline d-flex align-items-start flex-column loading-wrap"
              >
                <p
                  data-duration="0.7"
                  data-delay="100"
                  className="headline__subtitle space-bottom loading__item hero-animate-in-up"
                >
                  #1 Team in the US
                  <br />
                  In New Construction
                </p>
                <h1
                  className="headline__title loading__item hero-animate-in-up"
                  data-duration="0.7"
                  data-delay="300"
                >
                  More Than $2.1 Billion
                  In Sales
                </h1>
                <div
                  className="headline__btn loading__item hero-animate-in-up"
                  data-duration="0.7"
                  data-delay="500"
                >
                  <a
                    className="btn btn-line-small icon-right slide-right-down"
                    href={"#about"}
                  >
                    <span className="btn-caption">About Million</span>
                    <i className="ph ph-arrow-down-right" />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-12 col-xl-2" />
          </div>
        </div>
      </div>
      <div id={"about"} className="intro__media media-grid-bottom">
            <div  className="container-fluid p-0">
                <div className="row g-0">
                    <div className="col-12 col-xl-2"/>
                    <div className="col-12 col-xl-8">
                        <div className="content__block">
                            <div className="container-fluid p-0">
                                <div className="row g-0">
                                    <div className="col-12">
                                        <div  className="divider about divider-image content_video animate-in-up">
                                            <RevealText as="h2" className="animate-in-up">
                                                Welcome to MILLION, an exclusive luxury real estate boutique nestled in the heart of South Florida’s most desirable locations. Specializing in high-end properties, we provide a sanctuary for discerning clients including top Fortune 500 executives, affluent families, celebrities, and professional athletes from across the globe.
                                                At MILLION, we understand the unique demands of our elite clientele and offer a seamless blend of confidentiality and personalized attention. Our commitment to privacy is unwavering; we ensure that every transaction and interaction is handled with the utmost discretion and according to stringent confidentiality protocols.
                                            </RevealText>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-xl-2"/>
                </div>
            </div>
      </div>
    </section>
  );
}
