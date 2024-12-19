import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc, collection, getDocs } from 'firebase/firestore';
import NavBar from '../../components/NavBar';
import LoadingScreen from '../../components/LoadingScreen';

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ubicacion, setUbicacion] = useState({ region: '', comuna: '' });
  const [favLocations, setFavLocations] = useState([]); // Estado para almacenar los nombres de ubicaciones favoritas

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
          const locationsSnapshot = await getDocs(locationsCollectionRef);

          // Extraer y almacenar solo el nombre de cada ubicación en el estado `favLocations`
          const locations = locationsSnapshot.docs.map((doc) => ({
            nombre: doc.data().nombre,
            lat: doc.data().lat,
            lon: doc.data().lng,
          }));
          setFavLocations(locations);
          console.log("Ubicaciones favoritas:", locations);

        } catch (error) {
          console.error("Error al recuperar la información:", error);
        }
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    //console.log(user.photoURL),
    <>
      <NavBar user={user}></NavBar>
      <div className="pt-24 flex justify-center h-screen w-screen">
        {user ? (
          <div className="mt-24 flex flex-col items-center mt-4">
            <img
              className="rounded-full h-20 w-20"
              src={user.photoURL}
              alt={user.displayName}
            />
            <p className="mt-4">{user.displayName}</p>
            <p className="mt-2">{user.email}</p>


            {/* Mostrar región y comuna si existen */}
            {ubicacion.region && ubicacion.comuna && (
              <div className="mt-4">
                <p><strong>Región:</strong> {ubicacion.region}</p>
                <p><strong>Comuna:</strong> {ubicacion.comuna}</p>
              </div>
            )}


            {/* Mostrar solo el nombre de las ubicaciones favoritas si existen */}
            {favLocations.length > 0 && (
              <div className="mt-4">
                <strong>Ubicaciones Favoritas:</strong>
                <ul>
                  {favLocations.map((location, index) => (
                    <li key={index}>
                      {location.nombre}
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </div>
        ) : (
          <p>No has iniciado sesión.</p>
        )}
      </div>
    </>
  );
}

export default Profile;
