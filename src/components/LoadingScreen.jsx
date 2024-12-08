function LoadingScreen() {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50"> {/* Fondo oscuro y pantalla completa */}

      <span className="loading loading-spinner loading-lg"></span>

    </div>
  );
}

export default LoadingScreen;
