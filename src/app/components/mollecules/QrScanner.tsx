import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Button } from "@/components/ui/button";

export default function QrScanner() {
  const [qrCode, setQrCode] = useState<string | null>(null);
  const getQr = () => {
    try {
      const response = fetch("http://202.10.47.75:4567/api/qr");
      response
        .then((res) => res.json())
        .then((data) => {
          console.log("QR Code Data:", data.qr);
          setQrCode(data.qr);
        })
        .catch((error) => {
          console.error("Error fetching QR code:", error);
          setQrCode(null);
        });
      return;
    } catch (error) {
      console.error("Error fetching QR code:", error);
      setQrCode(null);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">QR Scanner</h2>
        <p className="text-gray-600 mb-4">Scan the QR code to connect.</p>
        <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-lg">
          <QRCodeCanvas value={qrCode ?? ""} size={256} bgColor="#ffffff" fgColor="#000000" level="L" />
        </div>
        <div className="w-full mt-4 text-center">
          <Button variant="default" onClick={getQr}>
            Get QR Code
          </Button>
          <Button variant="secondary" className="ml-2" onClick={() => setQrCode(null)}>
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
