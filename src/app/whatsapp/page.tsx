import { Header } from "../components/header";

export default function WhatsappPage() {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold mb-4">WhatsApp Page</h1>
        <p className="text-lg">This is the WhatsApp page.</p>
        {/* Add your WhatsApp functionality here */}
      </div>
    </>
  );
}
