import { DashboardType } from '../types/DashboardType';

const mockDashboardData: DashboardType[] = [
  {
    nombreCentro: "Pirquen",
    semanales: {
      consumo_alimentos: {
        "2023-W15": 12500,
        "2023-W16": 13800,
        "2023-W17": 15200,
        "2023-W18": 14750,
      },
      fcr: {
        "2023-W15": 1.15,
        "2023-W16": 1.18,
        "2023-W17": 1.12,
        "2023-W18": 1.20,
      },
      peso_promedio: {
        "2023-W15": 380,
        "2023-W16": 440,
        "2023-W17": 500,
        "2023-W18": 550,
      },
      clima: {
        "2023-W15": { temperatura: 12.5, precipitacion: 15.2 },
        "2023-W16": { temperatura: 13.1, precipitacion: 8.7 },
        "2023-W17": { temperatura: 11.8, precipitacion: 22.4 },
        "2023-W18": { temperatura: 12.9, precipitacion: 5.1 },
      }
    },
    ciclos: {
      id_ciclo: "I23F24",
      fecha_inicio: "2023-04-08",
      fecha_termino: "2024-01-15",
      meses: [
        {
          idMes: 4,
          año: 2023,
          datos: {
            consumo_alimentos: {
              "2023-04-08": 75,
              "2023-04-09": 200,
              "2023-04-10": 1200,
              "2023-04-11": 8200,
              "2023-04-12": 4500,
            },
            fcr: {
              "2023-04-08": 0.15,
              "2023-04-09": 0.42,
              "2023-04-10": 1.1,
              "2023-04-11": 0.89,
              "2023-04-12": 1.02,
            },
            peso_promedio: {
              "2023-04-08": 50,
              "2023-04-09": 85,
              "2023-04-10": 115,
              "2023-04-11": 150,
              "2023-04-12": 195,
            },
            clima: {
              "2023-04-08": { temperatura: 10.5, precipitacion: 2.3 },
              "2023-04-09": { temperatura: 12.1, precipitacion: 0 },
              "2023-04-10": { temperatura: 11.8, precipitacion: 5.7 },
              "2023-04-11": { temperatura: 9.2, precipitacion: 12.4 },
              "2023-04-12": { temperatura: 13.6, precipitacion: 0 },
            },
            resumen_mensual: {
              consumoTotal: 14175,
              fcrPromedio: 0.73,
              pesoPromedio: 195,
              temperaturaPromedio: 11.44,
              precipitacionTotal: 20.4
            }
          }
        },
        {
          idMes: 5,
          año: 2023,
          datos: {
            consumo_alimentos: {
              "2023-05-01": 8931,
              "2023-05-02": 100,
              "2023-05-03": 275,
              "2023-05-04": 18275,
              "2023-05-05": 13500,
            },
            fcr: {
              "2023-05-01": 1.25,
              "2023-05-02": 0.18,
              "2023-05-03": 0.42,
              "2023-05-04": 1.15,
              "2023-05-05": 1.08,
            },
            peso_promedio: {
              "2023-05-01": 220,
              "2023-05-02": 245,
              "2023-05-03": 270,
              "2023-05-04": 295,
              "2023-05-05": 320,
            },
            clima: {
              "2023-05-01": { temperatura: 14.2, precipitacion: 3.1 },
              "2023-05-02": { temperatura: 15.8, precipitacion: 0 },
              "2023-05-03": { temperatura: 13.5, precipitacion: 8.2 },
              "2023-05-04": { temperatura: 12.1, precipitacion: 15.6 },
              "2023-05-05": { temperatura: 16.3, precipitacion: 2.4 },
            },
            resumen_mensual: {
              consumoTotal: 41081,
              fcrPromedio: 0.82,
              pesoPromedio: 320,
              temperaturaPromedio: 14.38,
              precipitacionTotal: 29.3
            }
          }
        },
        {
          idMes: 6,
          año: 2023,
          datos: {
            consumo_alimentos: {
              "2023-06-01": 19846,
              "2023-06-02": 27583,
              "2023-06-03": 9438,
              "2023-06-04": 31726,
              "2023-06-05": 22500,
            },
            fcr: {
              "2023-06-01": 1.32,
              "2023-06-02": 1.45,
              "2023-06-03": 0.95,
              "2023-06-04": 1.38,
              "2023-06-05": 1.25,
            },
            peso_promedio: {
              "2023-06-01": 345,
              "2023-06-02": 370,
              "2023-06-03": 395,
              "2023-06-04": 420,
              "2023-06-05": 445,
            },
            clima: {
              "2023-06-01": { temperatura: 18.5, precipitacion: 1.2 },
              "2023-06-02": { temperatura: 19.2, precipitacion: 0 },
              "2023-06-03": { temperatura: 17.8, precipitacion: 4.5 },
              "2023-06-04": { temperatura: 16.4, precipitacion: 9.8 },
              "2023-06-05": { temperatura: 20.1, precipitacion: 0.3 },
            },
            resumen_mensual: {
              consumoTotal: 111093,
              fcrPromedio: 1.27,
              pesoPromedio: 445,
              temperaturaPromedio: 18.4,
              precipitacionTotal: 15.8
            }
          }
        },
        {
          idMes: 1,
          año: 2024,
          datos: {
            consumo_alimentos: {
              "2024-01-01": 302100,
              "2024-01-02": 302379,
              "2024-01-03": 252281,
              "2024-01-04": 268945,
              "2024-01-05": 285700,
            },
            fcr: {
              "2024-01-01": 3.98,
              "2024-01-02": 3.95,
              "2024-01-03": 3.42,
              "2024-01-04": 3.68,
              "2024-01-05": 3.85,
            },
            peso_promedio: {
              "2024-01-01": 1220,
              "2024-01-02": 1245,
              "2024-01-03": 1270,
              "2024-01-04": 1295,
              "2024-01-05": 1320,
            },
            clima: {
              "2024-01-01": { temperatura: 2.5, precipitacion: 95.2 },
              "2024-01-02": { temperatura: 1.8, precipitacion: 108.6 },
              "2024-01-03": { temperatura: 0.9, precipitacion: 125.4 },
              "2024-01-04": { temperatura: -0.5, precipitacion: 89.7 },
              "2024-01-05": { temperatura: 1.2, precipitacion: 112.3 },
            },
            resumen_mensual: {
              consumoTotal: 1411405,
              fcrPromedio: 3.78,
              pesoPromedio: 1320,
              temperaturaPromedio: 1.18,
              precipitacionTotal: 531.2
            }
          }
        }
      ],
      resumen_ciclo: {
        consumoTotal: 1618834,
        fcrPromedio: 1.91,
        pesoPromedio: 1320,
        temperaturaPromedio: 11.0,
        precipitacionTotal: 576.8
      }
    },
    promedios: {
      fcr_promedio: 1.16,
      peso_promedio: 468,
      temperatura_promedio: 14.7,
      precipitacion_promedio: 12.8
    }
  },
  {
    nombreCentro: "Polocuhe",
    semanales: {
      consumo_alimentos: {
        "2023-W15": 13200,
        "2023-W16": 14500,
        "2023-W17": 16000,
        "2023-W18": 15500,
      },
      fcr: {
        "2023-W15": 1.12,
        "2023-W16": 1.16,
        "2023-W17": 1.10,
        "2023-W18": 1.18,
      },
      peso_promedio: {
        "2023-W15": 390,
        "2023-W16": 450,
        "2023-W17": 510,
        "2023-W18": 560,
      },
      clima: {
        "2023-W15": { temperatura: 13.2, precipitacion: 12.8 },
        "2023-W16": { temperatura: 13.8, precipitacion: 7.5 },
        "2023-W17": { temperatura: 12.5, precipitacion: 19.2 },
        "2023-W18": { temperatura: 13.6, precipitacion: 4.8 },
      }
    },
    ciclos: {
      id_ciclo: "I23F24",
      fecha_inicio: "2023-04-08",
      fecha_termino: "2024-01-15",
      meses: [
        {
          idMes: 4,
          año: 2023,
          datos: {
            consumo_alimentos: {
              "2023-04-08": 80,
              "2023-04-09": 210,
              "2023-04-10": 1250,
              "2023-04-11": 8500,
              "2023-04-12": 4700,
            },
            fcr: {
              "2023-04-08": 0.16,
              "2023-04-09": 0.44,
              "2023-04-10": 1.12,
              "2023-04-11": 0.91,
              "2023-04-12": 1.04,
            },
            peso_promedio: {
              "2023-04-08": 52,
              "2023-04-09": 87,
              "2023-04-10": 118,
              "2023-04-11": 155,
              "2023-04-12": 200,
            },
            clima: {
              "2023-04-08": { temperatura: 11.2, precipitacion: 2.1 },
              "2023-04-09": { temperatura: 12.8, precipitacion: 0 },
              "2023-04-10": { temperatura: 12.1, precipitacion: 5.1 },
              "2023-04-11": { temperatura: 9.8, precipitacion: 11.2 },
              "2023-04-12": { temperatura: 14.1, precipitacion: 0 },
            },
            resumen_mensual: {
              consumoTotal: 14740,
              fcrPromedio: 0.74,
              pesoPromedio: 200,
              temperaturaPromedio: 12.0,
              precipitacionTotal: 18.4
            }
          }
        },
        {
          idMes: 5,
          año: 2023,
          datos: {
            consumo_alimentos: {
              "2023-05-01": 9200,
              "2023-05-02": 120,
              "2023-05-03": 290,
              "2023-05-04": 19000,
              "2023-05-05": 14000,
            },
            fcr: {
              "2023-05-01": 1.28,
              "2023-05-02": 0.20,
              "2023-05-03": 0.45,
              "2023-05-04": 1.18,
              "2023-05-05": 1.12,
            },
            peso_promedio: {
              "2023-05-01": 225,
              "2023-05-02": 250,
              "2023-05-03": 275,
              "2023-05-04": 300,
              "2023-05-05": 325,
            },
            clima: {
              "2023-05-01": { temperatura: 14.8, precipitacion: 2.8 },
              "2023-05-02": { temperatura: 16.2, precipitacion: 0 },
              "2023-05-03": { temperatura: 14.1, precipitacion: 7.5 },
              "2023-05-04": { temperatura: 12.8, precipitacion: 14.2 },
              "2023-05-05": { temperatura: 16.8, precipitacion: 2.1 },
            },
            resumen_mensual: {
              consumoTotal: 42610,
              fcrPromedio: 0.85,
              pesoPromedio: 325,
              temperaturaPromedio: 14.94,
              precipitacionTotal: 26.6
            }
          }
        },
        {
          idMes: 1,
          año: 2024,
          datos: {
            consumo_alimentos: {
              "2024-01-01": 315000,
              "2024-01-02": 318000,
              "2024-01-03": 265000,
              "2024-01-04": 275000,
              "2024-01-05": 295000,
            },
            fcr: {
              "2024-01-01": 4.02,
              "2024-01-02": 4.08,
              "2024-01-03": 3.55,
              "2024-01-04": 3.72,
              "2024-01-05": 3.88,
            },
            peso_promedio: {
              "2024-01-01": 1235,
              "2024-01-02": 1260,
              "2024-01-03": 1285,
              "2024-01-04": 1310,
              "2024-01-05": 1335,
            },
            clima: {
              "2024-01-01": { temperatura: 3.1, precipitacion: 88.5 },
              "2024-01-02": { temperatura: 2.8, precipitacion: 95.2 },
              "2024-01-03": { temperatura: 2.1, precipitacion: 118.8 },
              "2024-01-04": { temperatura: 0.8, precipitacion: 82.1 },
              "2024-01-05": { temperatura: 2.5, precipitacion: 108.5 },
            },
            resumen_mensual: {
              consumoTotal: 1468000,
              fcrPromedio: 3.85,
              pesoPromedio: 1335,
              temperaturaPromedio: 2.26,
              precipitacionTotal: 493.1
            }
          }
        }
      ],
      resumen_ciclo: {
        consumoTotal: 1525350,
        fcrPromedio: 1.81,
        pesoPromedio: 1335,
        temperaturaPromedio: 9.73,
        precipitacionTotal: 538.1
      }
    },
    promedios: {
      fcr_promedio: 1.14,
      peso_promedio: 475,
      temperatura_promedio: 14.8,
      precipitacion_promedio: 11.1
    }
  }
];

export const getDashboard = (): DashboardType[] => {
  return mockDashboardData;
};

// Mantener compatibilidad con el nombre anterior
export const fetchDashboardData = getDashboard;
