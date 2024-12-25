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

const Icap = [6, 5, 7, 8, 6, 7, 9, 8, 7, 6, 5, 4, 3, 2, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function LinesChart({ dataFav }) {
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
                data: Icap,
                tension: 0.5,
                fill: true,
                borderColor: borderColor,
                backgroundColor: backgroundColor,
                pointRadius: 5,
                pointBackgroundColor: pointColor,
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
