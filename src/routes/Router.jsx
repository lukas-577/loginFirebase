import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home/Home'
import CameraPage from '../pages/Camera/CameraPage'
import { ProtectedRute } from '../components/ProtectedRute'
import PhotoReviewPage from '../pages/Camera/PhotoReviewPage'
import Login from '../pages/Home/components/Login'
import Register from '../pages/Home/components/Register'
import ForgotPassword from '../pages/Home/components/Forgotpass'
import Profile from '../pages/Profile/Profile'
import Ubicacion from '../pages/getUbi/Ubicacion'
import Afiliacion from '../pages/Afiliation/Afiliation'
import Confirmation from '../pages/Home/components/Confirmation'
import ImageGenerated from '../pages/RespuestaBack/imagenesBack'
import WaterPotabilityResultPage from '../pages/WaterPotability/WaterPotabilityResultPage'
import NotFound from '../pages/NotFound/Index'
import ManualPlantManager from '../pages/WaterPotability/ManualPlants'


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element:
                    <ProtectedRute>
                        <Home></Home>
                    </ProtectedRute>
            },
            {
                path: "/camera",
                element:
                    <ProtectedRute>
                        <CameraPage></CameraPage>
                    </ProtectedRute>
            },
            {
                path: "/review-photo",
                element:
                    <ProtectedRute>
                        <PhotoReviewPage></PhotoReviewPage>
                    </ProtectedRute>
            },
            {
                path: "/profile",
                element:
                    <ProtectedRute>
                        <Profile></Profile>
                    </ProtectedRute>
            },
            {
                path: "/ubicacion",
                element:
                    <ProtectedRute>
                        <Ubicacion></Ubicacion>
                    </ProtectedRute>
            },
            {
                path: "/image-generada",
                element:
                    <ProtectedRute>
                        <ImageGenerated></ImageGenerated>
                    </ProtectedRute>
            },
            {
                path: "/water-potability",
                element:
                    <ProtectedRute>
                        <WaterPotabilityResultPage></WaterPotabilityResultPage>
                    </ProtectedRute>
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/register",
                element: <Register></Register>
            },
            {
                path: "/forgot-password",
                element: <ForgotPassword></ForgotPassword>
            },
            {
                path: "/afiliacion",
                element: <Afiliacion></Afiliacion>
            },
            {
                path: "/confirmation",
                element: <Confirmation></Confirmation>
            },
            {
                path: "*",
                element: <NotFound></NotFound>
            }
        ]
    }
])

export default router