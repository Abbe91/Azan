import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
export function PalestinePopup() {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 relative overflow-hidden">
        <div className="relative p-6 bg-gradient-to-t from-black to-transparent">
          <p className="text-4xl font-arabic text-white text-center mb-4 drop-shadow-lg">
            اللهم انصر فلسطين
          </p>
          <p className="text-xl text-white text-center drop-shadow-lg">
            O Allah, grant victory to Palestine
          </p>
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 text-white hover:text-gray-200 transition-colors"
            aria-label="Close popup"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
