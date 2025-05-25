"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { QRCodeCanvas } from "qrcode.react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, CheckCircle2, QrCode, SendHorizonal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function QrScanner() {
  const [logoutStatus, setLogoutStatus] = useState("");
  const [number, setNumber] = useState("");
  const [message, setMessage] = useState("");
  const [sendStatus, setSendStatus] = useState("");

  const {
    data: qrData,
    isLoading: isQrLoading,
    refetch: refetchQr,
  } = useQuery({
    queryKey: ["qr"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:4567/qr");
      return res.data.qr;
    },
    refetchInterval: 5000,
  });

  const {
    data: statusData,
    isLoading: isStatusLoading,
    refetch: refetchStatus,
  } = useQuery({
    queryKey: ["status"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:4567/status");
      return res.data.connected;
    },
    refetchInterval: 1000,
  });

  const handleLogout = async () => {
    try {
      const res = await axios.post("http://localhost:4567/logout");
      if (res.data.success) {
        setLogoutStatus("Berhasil logout");
        refetchStatus();
        refetchQr();
      } else {
        setLogoutStatus("Gagal logout");
      }
    } catch (err) {
      setLogoutStatus("Error saat logout");
    }
  };

  const handleSend = async () => {
    if (!number || !message) {
      setSendStatus("❗ Nomor dan pesan wajib diisi.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:4567/send", {
        number,
        message,
      });

      if (res.data.success) {
        setSendStatus("✅ Pesan berhasil dikirim!");
      } else {
        setSendStatus("❌ Gagal mengirim pesan.");
      }
    } catch (err) {
      setSendStatus("❌ Terjadi kesalahan saat kirim pesan.");
    }
  };

  if (isStatusLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        <span className="ml-3 text-muted-foreground">Memuat status koneksi...</span>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted px-4">
      <Card className="w-full max-w-md p-4 shadow-xl border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <QrCode className="h-5 w-5 text-primary" />
            WhatsApp QR Scanner
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-center">
          {statusData ? (
            <>
              <Alert variant="default" className="bg-green-100 text-green-700">
                <CheckCircle2 className="h-5 w-5" />
                <AlertTitle>WhatsApp terkoneksi</AlertTitle>
                <AlertDescription className="text-sm">WhatsApp sudah berhasil login, siap untuk kirim pesan!</AlertDescription>
              </Alert>

              {/* Form kirim pesan */}
              <div className="space-y-4 text-left">
                <div className="space-y-2">
                  <Label htmlFor="number">Nomor WhatsApp</Label>
                  <Input id="number" type="text" placeholder="contoh: 6281234567890" value={number} onChange={(e) => setNumber(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Pesan</Label>
                  <Input id="message" type="text" placeholder="Tulis pesan kamu..." value={message} onChange={(e) => setMessage(e.target.value)} />
                </div>
                <Button onClick={handleSend} variant="default" className="w-full">
                  <SendHorizonal className="w-4 h-4 mr-2" />
                  Kirim Pesan
                </Button>
                {sendStatus && <p className="text-sm text-muted-foreground">{sendStatus}</p>}
              </div>

              {/* Tombol Logout */}
              <Button variant="secondary" onClick={handleLogout} className="w-full mt-4">
                Logout
              </Button>

              {logoutStatus && <p className="text-sm text-muted-foreground">{logoutStatus}</p>}
            </>
          ) : isQrLoading ? (
            <div className="flex justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <>
              <p className="text-sm text-muted-foreground">Scan QR Code berikut ini menggunakan WhatsApp di HP kamu</p>
              <div className="flex justify-center">
                <QRCodeCanvas value={qrData} size={220} />
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
