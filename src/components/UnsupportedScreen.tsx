// src/components/UnsupportedScreen.tsx

import React from 'react';

const UnsupportedScreen: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0d1b2a] text-white text-center px-6">
      <div className="max-w-md">
        <h1 className="text-4xl font-bold mb-6">Resolução não suportada</h1>
        <p className="text-lg mb-4">
          Este website foi desenvolvido apenas para utilização em computadores com ecrãs grandes.
        </p>
        <p className="text-md mb-6">
          Por favor, acede através de um dispositivo com um ecrã maior para uma melhor experiência.
        </p>
        <p className="text-sm opacity-60">
          Largura mínima recomendada: 1024px
        </p>
      </div>
    </div>
  );
};

export default UnsupportedScreen;
