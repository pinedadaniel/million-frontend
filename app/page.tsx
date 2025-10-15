import React from "react";
import { Metadata } from "next";
import Header from "@/components/headers/Header";
import Logo from "@/components/headers/Logo";
import Intro from "@/components/home/Intro";
import Explorer from "@/components/home/Explorer";
import Sold from "@/components/home/Sold";
import ColorSwitcher from "@/components/headers/ColorSwitcher";
import BottomBackground from "@/components/home/BottomBackground";
import "@/public/css/theme.css";
import {useRouter} from "next/router";
import {Property} from "@/lib/api";

export const metadata: Metadata = {
  title:
    "MILLION | HOME",
  description: "Million Luxury",
  other: {
    google: 'notranslate',
  }

};

export default function page() {
  return (
    <>
      <div className="demo">
        <Header/>
        <Logo/>
        <ColorSwitcher parentClass="top-controls loading__fade" />
        <main id="page-content" className="page-content">
          <Intro />
          <Explorer />
          <Sold />
        </main>
        <BottomBackground />{" "}
      </div>
    </>
  );
}
