import bgLogin from '../../assets/bgLogin.svg';
function NotFound() {
    return (
        <div className="content-center flex items-center justify-center min-h-screen bg-base-100"
        style={{backgroundImage: `url(${bgLogin})`}}>
            <div className="flex flex-col items-center justify-center px-5 mx-auto space-y-8 text-center sm:max-w-md">
                {/* Ícono estilizado */}
                <box-icon
                    name="leaf"
                    animation="tada"
                    size="lg"
                    className="text-green-500 w-20 h-20"
                ></box-icon>

                {/* Mensaje */}
                <p className="text-6xl font-bold text-primary">404 - Page Not Found</p>

                {/* Botón */}
                <a
                    href="/"
                    className="px-8 py-3 font-semibold text-white bg-primary rounded-md hover:bg-primary-focus"
                >
                    Vuelve al Inicio
                </a>
            </div>
        </div>

    )
}
export default NotFound