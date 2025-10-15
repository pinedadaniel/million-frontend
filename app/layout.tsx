import "../public/css/styles.css";
import "../public/css/filters.css";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import { APIProvider } from "@/contexts/APIContext";
import PropertyPopup from "@/components/modals/PropertyPopup";
import InitScroll from "@/components/scroll/InitScroll";
import LenisSmoothScroll from "@/components/scroll/LenisSmoothScroll";
import ScrollTop from "@/components/scroll/ScrollTop";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Million Luxury",
  description: "Million Luxury",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      color-scheme="dark"
      suppressHydrationWarning
      className="js flexbox flexboxlegacy canvas canvastext webgl no-touch geolocation postmessage no-websqldatabase indexeddb hashchange history draganddrop websockets rgba hsla multiplebgs backgroundsize borderimage borderradius boxshadow textshadow opacity cssanimations csscolumns cssgradients cssreflections csstransforms csstransforms3d csstransitions fontface generatedcontent video audio localstorage sessionstorage webworkers no-applicationcache svg inlinesvg smil svgclippaths"
    >
      <body>
        <APIProvider>
          {children}
          <LenisSmoothScroll />
          <ScrollTop />
          <PropertyPopup />
          <InitScroll />
        </APIProvider>
      </body>
    </html>
  );
}
