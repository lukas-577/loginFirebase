function LoadingScreen() {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50"> {/* Fondo oscuro y pantalla completa */}
      <div className="bg-white p-6 rounded-lg shadow-lg"> {/* Cuadro blanco centrado */}
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-t-blue-500 border-r-blue-500 rounded-full" role="status">
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;
