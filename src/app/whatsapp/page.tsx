"use client";

import { useState } from "react";
import axios from "axios";

import QrScanner from "../components/mollecules/QrScanner";

export default function SendMessageForm() {
  const [number, setNumber] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await axios.post("http://localhost:4567/send", { number, message });
      if (res.data.success) {
        setStatus(`Pesan terkirim ke ${number}`);
      } else {
        setStatus("Gagal mengirim pesan.");
      }
    } catch (error: any) {
      setStatus("Error: " + error?.response?.data?.error || error.message);
    }
  };

  return (
    <>
      <div>
        <QrScanner />
      </div>
      <div>
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
          <input type="text" placeholder="Nomor (628xxxxxxx)" value={number} onChange={(e) => setNumber(e.target.value)} className="border p-2 w-full rounded" required />
          <textarea placeholder="Isi pesan" value={message} onChange={(e) => setMessage(e.target.value)} className="border p-2 w-full rounded" rows={4} required />
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Kirim Pesan
          </button>
          <p className="text-sm text-gray-700">{status}</p>
        </form>
      </div>
    </>
  );
}
