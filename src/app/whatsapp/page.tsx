"use client";
import { Header } from "../components/header";
import QrScanner from "../components/qrscanner";

export default function WhatsappPage() {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center -mt-25">
        <QrScanner />
      </div>
    </>
  );
}
