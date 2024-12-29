import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc, collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import NavBar from '../../components/NavBar';
import LoadingScreen from '../../components/LoadingScreen';
import LinesChart from '../../components/LinesChart';
import ImgProfile from '../../components/ImgProfile';
import bgProfileLight from '../../assets/bgProfilePageLight.svg';
import bgProfileDark from '../../assets/bgProfilePageDark.svg';

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ubicacion, setUbicacion] = useState({ region: '', comuna: '' });
  const [favLocations, setFavLocations] = useState([]); // Estado para almacenar los nombres de ubicaciones favoritas
  const dataFav = favLocations.map((location) => location.nombre);
  const icapValues = favLocations.map((location) => location.icap);

  const [currentTheme, setCurrentTheme] = useState(
    document.documentElement.getAttribute("data-theme") || "mytheme"
  ); // Detecta el tema actual

  useEffect(() => {
    const auth = getAuth();
    const db = getFirestore();

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        try {
          // Obtener el documento del usuario desde Firestore
          const userRef = doc(db, 'users', currentUser.uid);
          const userDoc = await getDoc(userRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUbicacion({
              region: userData.region || '',
              comuna: userData.comuna || '',
            });
          }

          // Obtener los nombres de ubicaciones favoritas en la subcolección 'locations'
          const locationsCollectionRef = collection(userRef, 'locations');
          const locationsQuery = query(locationsCollectionRef, orderBy('date', 'desc'), limit(4));
          const locationsSnapshot = await getDocs(locationsQuery);

          // Extraer y almacenar solo el nombre de cada ubicación en el estado `favLocations`
          const locations = locationsSnapshot.docs.map((doc) => ({
            nombre: doc.data().nombre,
            icap: doc.data().icap,
            lat: doc.data().lat,
            lon: doc.data().lng,

          }));
          setFavLocations(locations);
        } catch (error) {
          console.error("Error al recuperar la información:", error);
        }
      }

      setLoading(false);
    });

    // Observa cambios en el tema
    const observer = new MutationObserver(() => {
      const theme = document.documentElement.getAttribute("data-theme");
      setCurrentTheme(theme || "mytheme");
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => {
      unsubscribe();
      observer.disconnect();
    };
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <NavBar user={user} />
      <div
        className="relative pt-24 flex justify-center h-screen w-screen bg-cover bg-center"
        style={{
          backgroundImage: `url(${currentTheme === "darktheme" ? bgProfileDark : bgProfileLight})`,
        }}
      >
        {user ? (
          <div className="mt-8 flex flex-col md:flex-row items-center md:items-start gap-12">
            {/* Columna Izquierda: Información del Usuario */}
            <div className="flex flex-col items-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-6 max-w-lg">
              <ImgProfile user={user} />
              <p className="mt-4 text-lg font-semibold text-gray-800 dark:text-gray-100">{user.displayName}</p>
              <p className="mt-2 text-gray-600 dark:text-gray-400">{user.email}</p>

              {/* Mostrar región y comuna si existen */}
              {ubicacion.region && ubicacion.comuna && (
                <div className="mt-4 text-gray-700 dark:text-gray-300">
                  <p>
                    <strong>Región:</strong> {ubicacion.region}
                  </p>
                  <p>
                    <strong>Comuna:</strong> {ubicacion.comuna}
                  </p>
                </div>
              )}

              {/* Mostrar ubicaciones favoritas si existen */}
              {favLocations.length > 0 && (
                <div className="mt-3 text-gray-700 dark:text-gray-300">
                  <strong>Ubicaciones Favoritas:</strong>
                  <ul className="list-disc list-inside">
                    {favLocations.slice(0, 4).map((location, index) => (
                      <li key={index}>{location.nombre}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Columna Derecha: Gráfico */}
            <div className="w-full md:w-3/5 flex items-center justify-center">
              <div className="w-full h-[300px] bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-4">
                <LinesChart dataFav={dataFav} icapValues={icapValues} />
              </div>
            </div>
            <div className="mt-3 text-gray-700 dark:text-gray-300">
              <img src="/indice.png" alt="" />
            </div>
          </div>
        ) : (
          <p className="text-gray-700 dark:text-gray-300">No has iniciado sesión.</p>
        )}
      </div>
    </>
  );
}

export default Profile;
