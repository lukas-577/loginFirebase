import { useEffect, useState } from "react";
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    LineController,
    Filler
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, LineController, Filler);

const Icap = [6, 1, 4, 8, 3, 2, 2, 8, 7, 6, 5, 4, 3, 2, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function LinesChart({ dataFav, icapValues }) {
    const [isDark, setIsDark] = useState(
        document.documentElement.getAttribute("data-theme") === "darktheme"
    );

    // Monitorear cambios en el atributo data-theme
    useEffect(() => {
        const observer = new MutationObserver(() => {
            const theme = document.documentElement.getAttribute("data-theme");
            setIsDark(theme === "darktheme");
        });

        observer.observe(document.documentElement, { attributes: true });

        return () => observer.disconnect();
    }, []);

    // Generar colores dinámicos para los puntos según el valor de Icap
    const pointColors =icapValues.map((value) => {
        if (value < 2) return isDark ? 'rgb(255, 0, 0)' : 'rgb(200, 0, 0)'; // Rojo
        if (value >= 2 && value < 3.6) return isDark ? 'rgb(250, 154, 104)' : 'rgb(250, 154, 104)'; // Naranja claro
        if (value >= 3.6 && value < 5.2) return isDark ? 'rgb(252, 255, 155)' : 'rgb(252, 255, 155)'; // Amarillo claro
        if (value >= 5.2 && value < 6.9) return isDark ? 'rgb(145, 209, 83)' : 'rgb(145, 209, 83)'; // Verde claro
        return isDark ? 'rgb(165, 159, 254)' : 'rgb(165, 159, 254)'; // Azul claro
    });

    // Colores dinámicos según el tema
    const borderColor = isDark ? 'rgb(255, 255, 255)' : 'rgb(100, 68, 39)';
    const backgroundColor = isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(100, 68, 39, 0.5)';
    const pointColor = isDark ? 'rgb(255, 255, 255)' : 'rgb(100, 68, 39)';
    const labelColor = isDark ? '#fff' : '#00000'; // Color de la leyenda (etiqueta "Icap")

    const data = {
        labels: dataFav,
        datasets: [
            {
                label: 'Icap',
                data: icapValues,
                tension: 0.5,
                fill: true,
                borderColor: borderColor,
                backgroundColor: backgroundColor,
                pointRadius: 5,
                pointBackgroundColor: pointColors,
                pointBorderColor: pointColor,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    color: isDark ? '#fff' : '#00000', // Color de los ticks del eje Y
                },
            },
            x: {
                ticks: {
                    color: isDark ? '#fff' : '#00000', // Color de los ticks del eje X
                },
            },
        },
        plugins: {
            legend: {
                labels: {
                    color: labelColor, // Cambia el color de la leyenda (etiqueta "Icap")
                },
            },
        },
    };

    return <Line data={data} options={options} />;
}
