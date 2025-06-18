"use client";
import { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function QrScanner() {
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    getQr();
    getStatus();
  }, []);

  const getStatus = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_WA_URL}/api/status`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Status Data:", data);
        setStatus(data.status || "unknown");
        if (data.status === "connected") {
          toast.success("WhatsApp is connected.");
        } else {
          toast.error("WhatsApp is not connected. Please scan the QR code.");
        }
      })
      .catch((error) => {
        console.error("Error fetching status:", error);
        setStatus("error");
        toast.error("Error fetching WhatsApp status.");
      });
  };

  const getQr = () => {
    try {
      const response = fetch(`${process.env.NEXT_PUBLIC_API_WA_URL}/api/qr`);

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

  const handleLogout = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_WA_URL}/api/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Logout successful:", data);
        setQrCode(null);
        setStatus("");
        toast.success("Logout successful, QR code cleared.");
      })
      .catch((error) => {
        console.error("Error during logout:", error);
      });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="mb-2">
        <span className="font-semibold">Status: </span>
        <span className={status === "connected" ? "text-green-600" : status === "error" ? "text-red-600" : "text-yellow-600"}>{status}</span>
      </div>
      <h2 className="text-2xl font-bold mb-4">QR Scanner</h2>
      <p className="text-gray-600 mb-4">Scan the QR code to connect.</p>
      <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-lg">
        <QRCodeCanvas value={qrCode ?? ""} size={256} bgColor="#ffffff" fgColor="#000000" level="L" />
      </div>
      <div className="grid grid-cols-1 gap-2 mt-4 text-center">
        <Button variant="default" onClick={getQr}>
          Get QR Code
        </Button>
        <Button variant="outline" onClick={getStatus}>
          Check Status
        </Button>
        <Button variant="destructive" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </div>
  );
}
