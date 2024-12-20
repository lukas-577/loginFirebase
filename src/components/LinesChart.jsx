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

var Icap = [6, 5, 7, 8, 6, 7, 9, 8, 7, 6, 5, 4, 3, 2, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var estacionTrabajo = ['ubicacion1', 'ubicacion2', 'ubicacion3', 'ubicacion4', 'ubicacion5', 'ubicacion6', 'ubicacion7'];


var misoptions = {
    scales: {
        y: {
            beginAtZero: true,
        },
    },
}


export default function LinesChart({ dataFav }) {
    const data = {
        labels: dataFav,
        datasets: [
            {
                label: 'Icap',
                data: Icap,
                tension: 0.5,
                fill: true,
                borderColor: 'rgb(100, 68, 39)',
                backgroundColor: 'rgb(100, 68, 39, 0.5)',
                pointRadius: 5,
                pointBackgroundColor: 'rgb(100, 68, 39)',
                pointBorderColor: 'rgb(100, 68, 39)',
            },
        ],
    }
    return <Line data={data} options={misoptions} />
}