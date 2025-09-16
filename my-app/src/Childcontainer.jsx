import React from "react";

const ChildContainer = () => {
  return (
    <div className="childContainer w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header (Visible Everywhere) */}
      <header className="text-center mb-6 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-amber-100">
          Why Choose Filespire?
        </h1>
      </header>

      {/* Mobile Version (bullet points only) */}
      <section className="sm:hidden text-purple-200 text-lg px-4">
        <ul className="list-disc list-inside space-y-2">
          <li className="font-semibold text-white">QR Code for Links</li>
          <li className="font-semibold text-white">Link Generation</li>
          <li className="font-semibold text-white">Email Sharing</li>
          <li className="font-semibold text-white">User Authentication</li>
        </ul>
      </section>

      {/* Desktop Version (grid with icons & details) */}
      <section className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
        <div className="flex flex-col items-center text-center p-6 bg-black/20 backdrop-blur-md rounded-2xl shadow-md hover:scale-105 transition">
          <div className="text-4xl mb-4">🔒</div>
          <h2 className="text-xl font-semibold text-white">
            QR Code for Links
          </h2>
          <p className="text-purple-200 mt-2">Easy sharing.</p>
        </div>

        <div className="flex flex-col items-center text-center p-6 bg-black/20 backdrop-blur-md rounded-2xl shadow-md hover:scale-105 transition">
          <div className="text-4xl mb-4">🔗</div>
          <h2 className="text-xl font-semibold text-white">Link Generation</h2>
          <p className="text-purple-200 mt-2">
            Get a sharable link as soon as you upload a file.
          </p>
        </div>

        <div className="flex flex-col items-center text-center p-6 bg-black/20 backdrop-blur-md rounded-2xl shadow-md hover:scale-105 transition">
          <div className="text-4xl mb-4">📧</div>
          <h2 className="text-xl font-semibold text-white">Email Sharing</h2>
          <p className="text-purple-200 mt-2">
            Send file links directly to your email.
          </p>
        </div>

        <div className="flex flex-col items-center text-center p-6 bg-black/20 backdrop-blur-md rounded-2xl shadow-md hover:scale-105 transition">
          <div className="text-4xl mb-4">🛡️</div>
          <h2 className="text-xl font-semibold text-white">
            User Authentication
          </h2>
          <p className="text-purple-200 mt-2">Securely log in with Firebase.</p>
        </div>
      </section>
    </div>
  );
};

export default ChildContainer;
