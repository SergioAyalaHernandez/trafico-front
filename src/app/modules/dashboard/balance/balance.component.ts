import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData } from 'chart.js';
import {InformesService} from "../../../services/informes.service";

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent implements OnInit {
  // Variables para KPIs
  totalInfracciones: number = 0;
  importeTotal: number = 0;
  infraccionesHoy: number = 0;
  totalArticulos: number = 0;

  // Datos para gráficos en formato ng2-charts v3
  infraccionesPorCarreteraChart: ChartData = {
    labels: [],
    datasets: [{
      data: [],
      label: 'Infracciones'
    }]
  };

  infraccionesPorImporteChart: ChartData = {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
    }]
  };

  infraccionesPorEdadSexoChart: ChartData = {
    labels: [],
    datasets: [
      { data: [], label: 'Hombres', backgroundColor: '#36A2EB' },
      { data: [], label: 'Mujeres', backgroundColor: '#FF6384' }
    ]
  };

  infraccionesPorVehiculoChart: ChartData = {
    labels: [],
    datasets: [{
      data: [],
      label: 'Infracciones por vehículo',
      backgroundColor: '#4BC0C0'
    }]
  };

  // Datos para listas y tablas
  articulosInfringidos: string[] = [];
  articulosConteo: Map<string, number> = new Map();
  demografiaInfractores: any[] = [];

  // Datos para tabla de infracciones por unidad
  unidadSeleccionada: string = '1';
  infraccionesPorUnidad: any[] = [];

  // Opciones de gráficos
  barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      }
    }
  };

  constructor(private informesService: InformesService) { }

  ngOnInit(): void {
    this.cargarDatos();
    this.cargarInfraccionesPorUnidad();
  }

  cargarDatos(): void {
    // Cargar infracciones por carretera
    this.informesService.getInfraccionesPorCarretera().subscribe(data => {
      this.infraccionesPorCarreteraChart.labels = data.map((item: { carretera: string }) => item.carretera);
      this.infraccionesPorCarreteraChart.datasets[0].data = data.map((item: { cantidadInfracciones: number }) => item.cantidadInfracciones);

      // Calcular total de infracciones
      this.totalInfracciones = data.reduce((sum: number, item: { cantidadInfracciones: number }) => sum + item.cantidadInfracciones, 0);
    });

    // Cargar infracciones por importe
    this.informesService.getInfraccionesPorImporte().subscribe(data => {
      this.infraccionesPorImporteChart.labels = data.map((item: { importe: number }) => `${item.importe}€`);
      this.infraccionesPorImporteChart.datasets[0].data = data.map((item: { cantidadInfracciones: number }) => item.cantidadInfracciones);

      // Calcular importe total
      this.importeTotal = data.reduce((sum: number, item: { importe: number; cantidadInfracciones: number }) => sum + (item.importe * item.cantidadInfracciones), 0);

      // Para demo, asumimos que hay algunas infracciones hoy
      this.infraccionesHoy = Math.round(this.totalInfracciones * 0.25);
    });

    // Cargar artículos infringidos
    this.informesService.getArticulosInfringidos().subscribe((data: string[]) => {
      this.articulosInfringidos = [...new Set(data)]; // Eliminar duplicados

      // Crear un mapa para contar ocurrencias
      data.forEach((articulo: string) => {
        this.articulosConteo.set(articulo, (this.articulosConteo.get(articulo) || 0) + 1);
      });

      this.totalArticulos = this.articulosInfringidos.length;
    });

    // Cargar demografía de infractores
    this.informesService.getDemografiaInfractores().subscribe(data => {
      this.demografiaInfractores = data;
    });

    // Cargar infracciones por edad y sexo
    this.informesService.getInfraccionesPorEdadSexo().subscribe(data => {
      // Agrupar por sexo
      const tramosEdad = [...new Set(data.map((item: { tramoEdad: string }) => item.tramoEdad))];

      this.infraccionesPorEdadSexoChart.labels = tramosEdad;

      // Datos para hombres
      this.infraccionesPorEdadSexoChart.datasets[0].data = tramosEdad.map(tramo => {
        const item = data.find((d: { tramoEdad: string; sexoInfractor: string }) => d.tramoEdad === tramo && d.sexoInfractor === 'M');
        return item ? item.cantidadInfracciones : 0;
      });

      // Datos para mujeres
      this.infraccionesPorEdadSexoChart.datasets[1].data = tramosEdad.map(tramo => {
        const item = data.find((d: { tramoEdad: string; sexoInfractor: string }) => d.tramoEdad === tramo && d.sexoInfractor === 'F');
        return item ? item.cantidadInfracciones : 0;
      });
    });

    // Cargar infracciones por vehículo
    this.informesService.getInfraccionesPorVehiculo().subscribe(data => {
      this.infraccionesPorVehiculoChart.labels = data.map((item: { marca?: string; modelo?: string }) =>
        item.marca && item.modelo ? `${item.marca} ${item.modelo}` : 'Sin datos');
      this.infraccionesPorVehiculoChart.datasets[0].data = data.map((item: { cantidadInfracciones: number }) => item.cantidadInfracciones);
    });
  }

  cargarInfraccionesPorUnidad(): void {
    this.informesService.getInfraccionesPorUnidad(Number(this.unidadSeleccionada)).subscribe(data => {
      this.infraccionesPorUnidad = data;
    });
  }

  getArticuloCount(articulo: string): number {
    return this.articulosConteo.get(articulo) || 0;
  }
}
