import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore'; // Importar Firestore
import NavBar from '../../components/NavBar';
import LoadingScreen from '../../components/LoadingScreen'; // Importa la pantalla de carga

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ubicacion, setUbicacion] = useState({ region: '', comuna: '' }); // Estado para guardar región y comuna

  useEffect(() => {
    const auth = getAuth();
    const db = getFirestore(); // Inicializar Firestore

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
        } catch (error) {
          console.error("Error al recuperar la ubicación:", error);
        }
      }

      // Eliminar el estado de carga cuando se tienen todos los datos
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <LoadingScreen />; // Mostrar pantalla de carga mientras se espera por los datos
  }

  return (
    <>
      <NavBar user={user}></NavBar>
      <div className="flex justify-center items-start h-screen w-screen"> {/* Ocupa toda la pantalla y centra el contenido horizontalmente */}
        {user ? (
          <div className="mt-24 flex flex-col items-center mt-4"> {/* Centra la imagen y el texto */}
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
          </div>
        ) : (
          <p>No has iniciado sesión.</p>
        )}
      </div>
    </>
  );
}

export default Profile;
