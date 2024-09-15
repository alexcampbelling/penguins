interface InfoModalProps {
  onClose: () => void;
}

export default function InfoModal({ onClose }: InfoModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg max-w-md">
        <h2 className="text-xl font-bold mb-4">About Penguin QR Collector</h2>
        <p className="mb-4">
          Penguin QR Collector is a fun game where you collect unique penguin
          images by scanning QR codes hidden around Melbourne. Find them all to
          complete your collection!
        </p>
        <button
          onClick={onClose}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  );
}
