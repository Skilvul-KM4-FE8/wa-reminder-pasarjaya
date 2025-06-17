"use client";
import { Header } from "../../components/mollecules/header/header";
import QrScanner from "../../components/mollecules/qrscanner";

export default function WhatsappPage() {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center p-(-4)">
        <QrScanner />
      </div>
    </>
  );
}
