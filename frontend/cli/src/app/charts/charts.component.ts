import { Component, OnInit } from "@angular/core";
import { ChartConfiguration } from "chart.js";
import { ChartData } from "chart.js";
import { Parte } from "../partes/parte";
import { ParteService } from "../partes/parte.service";
import { Stat } from "./stat";
import { ChartDataset } from "chart.js";
import { supervisorStat } from "./supervisorStat";

@Component({
  selector: "app-charts",
  template: `
    <ul class="nav nav-tabs componente-con-espacio" id="myTab" role="tablist">
      <li class="nav-item" role="presentation">
        <button
          class="nav-link active"
          id="home-tab"
          data-bs-toggle="tab"
          data-bs-target="#home-tab-pane"
          type="button"
          role="tab"
          aria-controls="home-tab-pane"
          aria-selected="true"
        >
          Proyecto
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          class="nav-link"
          id="profile-tab"
          data-bs-toggle="tab"
          data-bs-target="#profile-tab-pane"
          type="button"
          role="tab"
          aria-controls="profile-tab-pane"
          aria-selected="false"
        >
          Cliente
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          class="nav-link"
          id="contact-tab"
          data-bs-toggle="tab"
          data-bs-target="#contact-tab-pane"
          type="button"
          role="tab"
          aria-controls="contact-tab-pane"
          aria-selected="false"
        >
          Control de errores
        </button>
      </li>
    </ul>
    <div class="tab-content" id="myTabContent">
      <div
        class="tab-pane fade show active"
        id="home-tab-pane"
        role="tabpanel"
        aria-labelledby="home-tab"
        tabindex="0"
      >
        <div
          class="chart-container componente-con-espacio centered-div"
          style="position: relative; height:45vh; width:55vw"
        >
          <canvas
            baseChart
            [data]="barChartDataProject"
            [options]="barChartOptions"
            [plugins]="barChartPlugins"
            [legend]="barChartLegend"
            [type]="'bar'"
          >
          </canvas>
        </div>
      </div>
      <div
        class="tab-pane fade"
        id="profile-tab-pane"
        role="tabpanel"
        aria-labelledby="profile-tab"
        tabindex="0"
      >
        <div
          class="chart-container componente-con-espacio"
          style="position: relative; height:45vh; width:75vw"
        >
          <canvas
            baseChart
            [data]="barChartDataClient"
            [options]="barChartOptions"
            [plugins]="barChartPlugins"
            [legend]="barChartLegend"
            [type]="'bar'"
          >
          </canvas>
        </div>
      </div>
      <div
        class="tab-pane fade"
        id="contact-tab-pane"
        role="tabpanel"
        aria-labelledby="contact-tab"
        tabindex="0"
      >
        <div
          class="chart-container componente-con-espacio"
          style="position: relative; height:45vh; width:75vw"
        >
          <canvas
            baseChart
            [data]="barChartDataSupervisor"
            [options]="barChartOptions"
            [plugins]="barChartPlugins"
            [legend]="barChartLegend"
            [type]="'bar'"
          >
          </canvas>
        </div>
      </div>
    </div>
  `,
  styles: [],
  styleUrls: [],
})
export class ChartsComponent {
  title = "ng2-charts-demo";
  projectStats: Stat[] = <Stat[]>[];
  clientStats: Stat[] = <Stat[]>[];
  supervisorErrores: supervisorStat[] = <supervisorStat[]>[];
  supervisorValidos: supervisorStat[] = <supervisorStat[]>[];
  projectMap!: Map<string, Stat[]>;
  clientMap!: Map<string, Stat[]>;
  clientLabels!: string[];
  projectLabels!: string[];
  supervisoresLabels!: string[];

  barChartDataClient!: ChartData<"bar", { key: string; value: number }[]>;
  barChartDataProject!: ChartData<"bar", { key: string; value: number }[]>;
  barChartDataSupervisor!: ChartData<"bar", { key: string; value: number }[]>;

  barChartLegend = true;
  barChartPlugins = [];

  barChartOptions: ChartConfiguration<"bar">["options"] = {
    responsive: true,
    scales: {
      x: {
        //stacked: true,
      },
      y: {
        //stacked: true,
      },
    },
  };

  constructor(private parteService: ParteService) {}

  ngOnInit() {
    this.getProjectsHours();
    this.getClientHours();
    this.getSupervisorStats();
  }

  getProjectsHours(): void {
    this.parteService.getStatsProject().subscribe((dataPackage) => {
      this.projectStats = <Stat[]>dataPackage.data;
      this.projectMap = this.groupStat(this.projectStats);
      this.getProjectLabels();
      this.barChartDataProject = {
        labels: this.projectLabels,
        datasets: Array.from(this.projectMap).map(([key, value]) => ({
          label: key,
          data: value.map((list) => ({
            key: list.quincena,
            value: list.horas,
          })),
          parsing: {
            xAxisKey: "key",
            yAxisKey: "value",
          },
        })),
      };
    });
  }

  getClientHours(): void {
    this.parteService.getStatsClient().subscribe((dataPackage) => {
      this.clientStats = <Stat[]>dataPackage.data;
      this.clientMap = this.groupStat(this.clientStats);
      this.getClientLabels();
      this.barChartDataClient = {
        labels: this.clientLabels,
        datasets: Array.from(this.clientMap).map(([key, value]) => ({
          label: key,
          data: value.map((list) => ({
            key: list.quincena,
            value: list.horas,
          })),
          parsing: {
            xAxisKey: "key",
            yAxisKey: "value",
          },
        })),
      };
    });
  }

  getSupervisorStats(): void {
    this.parteService.getSupervisorErrores().subscribe((dataPackage) => {
      this.supervisorErrores = <supervisorStat[]>dataPackage.data;
      this.parteService.getSupervisorValidos().subscribe((dataPackage) => {
        this.supervisorValidos = <supervisorStat[]>dataPackage.data;
        this.calculosSupervisor();
        this.barChartDataSupervisor = {
          labels: this.supervisoresLabels,
          datasets: [
            {
              label: "Errores",
              data: this.supervisorErrores,
              parsing: {
                xAxisKey: "key",
                yAxisKey: "value",
              },
            },
            {
              label: "Validos",
              data: this.supervisorValidos,
              parsing: {
                xAxisKey: "key",
                yAxisKey: "value",
              },
            },
          ],
        };
      });
    });
  }

  calculosSupervisor(): void {
    let mySet = new Set<string>();
    this.supervisorErrores.forEach((e) => mySet.add(e.key));
    this.supervisorValidos.forEach((e) => mySet.add(e.key));

    this.supervisoresLabels = Array.from(mySet);
    console.log(this.supervisoresLabels);
  }

  groupStat(stadistics: Stat[]): Map<string, Stat[]> {
    const groupedMap = new Map<string, Stat[]>();
    for (const item of stadistics) {
      if (!groupedMap.has(item.codigo)) {
        groupedMap.set(item.codigo, [item]);
      } else {
        groupedMap.get(item.codigo)?.push(item);
      }
    }
    return groupedMap;
  }

  getProjectLabels(): void {
    let projectSet = new Set<string>();

    this.projectStats.forEach((stat) => {
      projectSet.add(stat.quincena);
    });

    this.projectLabels = Array.from(projectSet).sort((a, b) => {
      const [dayA, monthA, yearA] = a.split("-").map(Number);
      const [dayB, monthB, yearB] = b.split("-").map(Number);

      if (yearA !== yearB) {
        return yearA - yearB;
      }

      if (monthA !== monthB) {
        return monthA - monthB;
      }

      return dayA - dayB;
    });
  }

  getClientLabels(): void {
    let clientSet = new Set<string>();
    this.clientStats.forEach((stat) => {
      clientSet.add(stat.quincena);
    });

    this.clientLabels = Array.from(clientSet).sort((a, b) => {
      const [dayA, monthA, yearA] = a.split("-").map(Number);
      const [dayB, monthB, yearB] = b.split("-").map(Number);

      if (yearA !== yearB) {
        return yearA - yearB;
      }

      if (monthA !== monthB) {
        return monthA - monthB;
      }

      return dayA - dayB;
    });
  }
}
