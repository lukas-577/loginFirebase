import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="flex justify-center items-start h-screen w-screen"> {/* Ocupa toda la pantalla y centra el contenido horizontalmente */}
      {user ? (
        <div className="flex flex-col items-center mt-4"> {/* Centra la imagen y el texto */}
          <h1 className="mb-4 text-center">Perfil</h1>
          <img
            className="rounded-full h-20 w-20"
            src={user.photoURL}
            alt={user.displayName}
            />
            <p className="mt-4">{user.displayName}</p>
            <p className="mt-2">{user.email}</p>
        </div>
      ) : (
        <p>No has iniciado sesión.</p>
      )}
    </div>
  );
}

export default Profile;
