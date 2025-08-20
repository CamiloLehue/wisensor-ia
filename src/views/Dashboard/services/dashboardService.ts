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
          idMes: 1,
          año: 2023,
          orden_en_ciclo: 0, // Mes vacío antes del inicio del ciclo
          datos: {
            consumo_alimentos: {},
            fcr: {},
            peso_promedio: {},
            clima: {},
            resumen_mensual: {
              consumoTotal: 0,
              fcrPromedio: 0,
              pesoPromedio: 0,
              temperaturaPromedio: 0,
              precipitacionTotal: 0
            }
          }
        },
        {
          idMes: 2,
          año: 2023,
          orden_en_ciclo: 0, // Mes vacío antes del inicio del ciclo
          datos: {
            consumo_alimentos: {},
            fcr: {},
            peso_promedio: {},
            clima: {},
            resumen_mensual: {
              consumoTotal: 0,
              fcrPromedio: 0,
              pesoPromedio: 0,
              temperaturaPromedio: 0,
              precipitacionTotal: 0
            }
          }
        },
        {
          idMes: 3,
          año: 2023,
          orden_en_ciclo: 0, // Mes vacío antes del inicio del ciclo
          datos: {
            consumo_alimentos: {},
            fcr: {},
            peso_promedio: {},
            clima: {},
            resumen_mensual: {
              consumoTotal: 0,
              fcrPromedio: 0,
              pesoPromedio: 0,
              temperaturaPromedio: 0,
              precipitacionTotal: 0
            }
          }
        },
        {
          idMes: 4,
          año: 2023,
          orden_en_ciclo: 1, // Primer mes del ciclo
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
          orden_en_ciclo: 2, // Segundo mes del ciclo
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
          orden_en_ciclo: 3, // Tercer mes del ciclo
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
          idMes: 7,
          año: 2023,
          orden_en_ciclo: 4, // Cuarto mes del ciclo
          datos: {
            consumo_alimentos: {
              "2023-07-01": 27426,
              "2023-07-02": 23212,
              "2023-07-03": 31978,
              "2023-07-04": 35846,
              "2023-07-05": 28750,
            },
            fcr: {
              "2023-07-01": 1.42,
              "2023-07-02": 1.28,
              "2023-07-03": 1.55,
              "2023-07-04": 1.61,
              "2023-07-05": 1.35,
            },
            peso_promedio: {
              "2023-07-01": 470,
              "2023-07-02": 495,
              "2023-07-03": 520,
              "2023-07-04": 545,
              "2023-07-05": 570,
            },
            clima: {
              "2023-07-01": { temperatura: 22.3, precipitacion: 0 },
              "2023-07-02": { temperatura: 23.8, precipitacion: 0.5 },
              "2023-07-03": { temperatura: 21.5, precipitacion: 2.1 },
              "2023-07-04": { temperatura: 24.2, precipitacion: 0 },
              "2023-07-05": { temperatura: 25.6, precipitacion: 0.8 },
            },
            resumen_mensual: {
              consumoTotal: 147212,
              fcrPromedio: 1.44,
              pesoPromedio: 570,
              temperaturaPromedio: 23.48,
              precipitacionTotal: 3.4
            }
          }
        },
        {
          idMes: 8,
          año: 2023,
          orden_en_ciclo: 5, // Quinto mes del ciclo
          datos: {
            consumo_alimentos: {
              "2023-08-01": 77152,
              "2023-08-02": 76738,
              "2023-08-03": 79715,
              "2023-08-04": 82459,
              "2023-08-05": 75200,
            },
            fcr: {
              "2023-08-01": 2.15,
              "2023-08-02": 2.12,
              "2023-08-03": 2.18,
              "2023-08-04": 2.22,
              "2023-08-05": 2.08,
            },
            peso_promedio: {
              "2023-08-01": 595,
              "2023-08-02": 620,
              "2023-08-03": 645,
              "2023-08-04": 670,
              "2023-08-05": 695,
            },
            clima: {
              "2023-08-01": { temperatura: 26.8, precipitacion: 0 },
              "2023-08-02": { temperatura: 27.5, precipitacion: 1.2 },
              "2023-08-03": { temperatura: 25.9, precipitacion: 3.8 },
              "2023-08-04": { temperatura: 28.1, precipitacion: 0 },
              "2023-08-05": { temperatura: 26.4, precipitacion: 2.5 },
            },
            resumen_mensual: {
              consumoTotal: 391264,
              fcrPromedio: 2.15,
              pesoPromedio: 695,
              temperaturaPromedio: 26.94,
              precipitacionTotal: 7.5
            }
          }
        },
        {
          idMes: 9,
          año: 2023,
          orden_en_ciclo: 6, // Sexto mes del ciclo
          datos: {
            consumo_alimentos: {
              "2023-09-01": 85988,
              "2023-09-02": 86217,
              "2023-09-03": 100490,
              "2023-09-04": 94268,
              "2023-09-05": 88500,
            },
            fcr: {
              "2023-09-01": 2.28,
              "2023-09-02": 2.32,
              "2023-09-03": 2.45,
              "2023-09-04": 2.38,
              "2023-09-05": 2.25,
            },
            peso_promedio: {
              "2023-09-01": 720,
              "2023-09-02": 745,
              "2023-09-03": 770,
              "2023-09-04": 795,
              "2023-09-05": 820,
            },
            clima: {
              "2023-09-01": { temperatura: 24.2, precipitacion: 4.5 },
              "2023-09-02": { temperatura: 23.8, precipitacion: 8.2 },
              "2023-09-03": { temperatura: 22.1, precipitacion: 12.6 },
              "2023-09-04": { temperatura: 21.5, precipitacion: 15.8 },
              "2023-09-05": { temperatura: 20.9, precipitacion: 6.3 },
            },
            resumen_mensual: {
              consumoTotal: 455463,
              fcrPromedio: 2.34,
              pesoPromedio: 820,
              temperaturaPromedio: 22.5,
              precipitacionTotal: 47.4
            }
          }
        },
        {
          idMes: 10,
          año: 2023,
          orden_en_ciclo: 7, // Séptimo mes del ciclo
          datos: {
            consumo_alimentos: {
              "2023-10-01": 112808,
              "2023-10-02": 113013,
              "2023-10-03": 119454,
              "2023-10-04": 125739,
              "2023-10-05": 115200,
            },
            fcr: {
              "2023-10-01": 2.52,
              "2023-10-02": 2.55,
              "2023-10-03": 2.62,
              "2023-10-04": 2.68,
              "2023-10-05": 2.48,
            },
            peso_promedio: {
              "2023-10-01": 845,
              "2023-10-02": 870,
              "2023-10-03": 895,
              "2023-10-04": 920,
              "2023-10-05": 945,
            },
            clima: {
              "2023-10-01": { temperatura: 18.3, precipitacion: 18.5 },
              "2023-10-02": { temperatura: 17.2, precipitacion: 22.1 },
              "2023-10-03": { temperatura: 16.8, precipitacion: 8.9 },
              "2023-10-04": { temperatura: 15.5, precipitacion: 35.2 },
              "2023-10-05": { temperatura: 14.9, precipitacion: 12.7 },
            },
            resumen_mensual: {
              consumoTotal: 586214,
              fcrPromedio: 2.57,
              pesoPromedio: 945,
              temperaturaPromedio: 16.54,
              precipitacionTotal: 97.4
            }
          }
        },
        {
          idMes: 11,
          año: 2023,
          orden_en_ciclo: 8, // Octavo mes del ciclo
          datos: {
            consumo_alimentos: {
              "2023-11-01": 204498,
              "2023-11-02": 170699,
              "2023-11-03": 179573,
              "2023-11-04": 188246,
              "2023-11-05": 195800,
            },
            fcr: {
              "2023-11-01": 3.15,
              "2023-11-02": 2.98,
              "2023-11-03": 3.05,
              "2023-11-04": 3.12,
              "2023-11-05": 3.18,
            },
            peso_promedio: {
              "2023-11-01": 970,
              "2023-11-02": 995,
              "2023-11-03": 1020,
              "2023-11-04": 1045,
              "2023-11-05": 1070,
            },
            clima: {
              "2023-11-01": { temperatura: 12.8, precipitacion: 45.3 },
              "2023-11-02": { temperatura: 11.5, precipitacion: 38.7 },
              "2023-11-03": { temperatura: 10.2, precipitacion: 52.1 },
              "2023-11-04": { temperatura: 9.8, precipitacion: 29.6 },
              "2023-11-05": { temperatura: 8.9, precipitacion: 41.2 },
            },
            resumen_mensual: {
              consumoTotal: 938816,
              fcrPromedio: 3.10,
              pesoPromedio: 1070,
              temperaturaPromedio: 10.64,
              precipitacionTotal: 206.9
            }
          }
        },
        {
          idMes: 12,
          año: 2023,
          orden_en_ciclo: 9, // Noveno mes del ciclo
          datos: {
            consumo_alimentos: {
              "2023-12-01": 207439,
              "2023-12-02": 202910,
              "2023-12-03": 212897,
              "2023-12-04": 199564,
              "2023-12-05": 208500,
            },
            fcr: {
              "2023-12-01": 3.22,
              "2023-12-02": 3.18,
              "2023-12-03": 3.28,
              "2023-12-04": 3.15,
              "2023-12-05": 3.25,
            },
            peso_promedio: {
              "2023-12-01": 1095,
              "2023-12-02": 1120,
              "2023-12-03": 1145,
              "2023-12-04": 1170,
              "2023-12-05": 1195,
            },
            clima: {
              "2023-12-01": { temperatura: 7.2, precipitacion: 58.4 },
              "2023-12-02": { temperatura: 6.8, precipitacion: 62.1 },
              "2023-12-03": { temperatura: 5.5, precipitacion: 71.8 },
              "2023-12-04": { temperatura: 4.9, precipitacion: 39.7 },
              "2023-12-05": { temperatura: 3.8, precipitacion: 85.3 },
            },
            resumen_mensual: {
              consumoTotal: 1031310,
              fcrPromedio: 3.22,
              pesoPromedio: 1195,
              temperaturaPromedio: 5.64,
              precipitacionTotal: 317.3
            }
          }
        },
        {
          idMes: 1,
          año: 2024,
          orden_en_ciclo: 10, // Décimo mes del ciclo (último)
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
        consumoTotal: 4577637,
        fcrPromedio: 2.15,
        pesoPromedio: 1320,
        temperaturaPromedio: 13.2,
        precipitacionTotal: 1273.3
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
          idMes: 1,
          año: 2023,
          orden_en_ciclo: 0, // Mes vacío antes del inicio del ciclo
          datos: {
            consumo_alimentos: {},
            fcr: {},
            peso_promedio: {},
            clima: {},
            resumen_mensual: {
              consumoTotal: 0,
              fcrPromedio: 0,
              pesoPromedio: 0,
              temperaturaPromedio: 0,
              precipitacionTotal: 0
            }
          }
        },
        {
          idMes: 2,
          año: 2023,
          orden_en_ciclo: 0, // Mes vacío antes del inicio del ciclo
          datos: {
            consumo_alimentos: {},
            fcr: {},
            peso_promedio: {},
            clima: {},
            resumen_mensual: {
              consumoTotal: 0,
              fcrPromedio: 0,
              pesoPromedio: 0,
              temperaturaPromedio: 0,
              precipitacionTotal: 0
            }
          }
        },
        {
          idMes: 3,
          año: 2023,
          orden_en_ciclo: 0, // Mes vacío antes del inicio del ciclo
          datos: {
            consumo_alimentos: {},
            fcr: {},
            peso_promedio: {},
            clima: {},
            resumen_mensual: {
              consumoTotal: 0,
              fcrPromedio: 0,
              pesoPromedio: 0,
              temperaturaPromedio: 0,
              precipitacionTotal: 0
            }
          }
        },
        {
          idMes: 4,
          año: 2023,
          orden_en_ciclo: 1, // Primer mes del ciclo
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
          orden_en_ciclo: 2, // Segundo mes del ciclo
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
          idMes: 6,
          año: 2023,
          orden_en_ciclo: 3, // Tercer mes del ciclo
          datos: {
            consumo_alimentos: {
              "2023-06-01": 21000,
              "2023-06-02": 29000,
              "2023-06-03": 10000,
              "2023-06-04": 33500,
              "2023-06-05": 24000,
            },
            fcr: {
              "2023-06-01": 1.38,
              "2023-06-02": 1.52,
              "2023-06-03": 1.02,
              "2023-06-04": 1.45,
              "2023-06-05": 1.32,
            },
            peso_promedio: {
              "2023-06-01": 360,
              "2023-06-02": 385,
              "2023-06-03": 410,
              "2023-06-04": 435,
              "2023-06-05": 460,
            },
            clima: {
              "2023-06-01": { temperatura: 19.2, precipitacion: 0.8 },
              "2023-06-02": { temperatura: 20.1, precipitacion: 0 },
              "2023-06-03": { temperatura: 18.5, precipitacion: 3.2 },
              "2023-06-04": { temperatura: 17.8, precipitacion: 7.5 },
              "2023-06-05": { temperatura: 21.3, precipitacion: 0.1 },
            },
            resumen_mensual: {
              consumoTotal: 117500,
              fcrPromedio: 1.34,
              pesoPromedio: 460,
              temperaturaPromedio: 19.38,
              precipitacionTotal: 11.6
            }
          }
        },
        {
          idMes: 7,
          año: 2023,
          orden_en_ciclo: 4, // Cuarto mes del ciclo
          datos: {
            consumo_alimentos: {
              "2023-07-01": 28500,
              "2023-07-02": 24000,
              "2023-07-03": 33000,
              "2023-07-04": 37200,
              "2023-07-05": 30500,
            },
            fcr: {
              "2023-07-01": 1.48,
              "2023-07-02": 1.35,
              "2023-07-03": 1.62,
              "2023-07-04": 1.68,
              "2023-07-05": 1.42,
            },
            peso_promedio: {
              "2023-07-01": 485,
              "2023-07-02": 510,
              "2023-07-03": 535,
              "2023-07-04": 560,
              "2023-07-05": 585,
            },
            clima: {
              "2023-07-01": { temperatura: 23.1, precipitacion: 0 },
              "2023-07-02": { temperatura: 24.5, precipitacion: 0.2 },
              "2023-07-03": { temperatura: 22.8, precipitacion: 1.5 },
              "2023-07-04": { temperatura: 25.2, precipitacion: 0 },
              "2023-07-05": { temperatura: 26.1, precipitacion: 0.5 },
            },
            resumen_mensual: {
              consumoTotal: 153200,
              fcrPromedio: 1.51,
              pesoPromedio: 585,
              temperaturaPromedio: 24.34,
              precipitacionTotal: 2.2
            }
          }
        },
        {
          idMes: 8,
          año: 2023,
          orden_en_ciclo: 5, // Quinto mes del ciclo
          datos: {
            consumo_alimentos: {
              "2023-08-01": 80000,
              "2023-08-02": 79500,
              "2023-08-03": 82500,
              "2023-08-04": 85200,
              "2023-08-05": 78000,
            },
            fcr: {
              "2023-08-01": 2.22,
              "2023-08-02": 2.18,
              "2023-08-03": 2.25,
              "2023-08-04": 2.28,
              "2023-08-05": 2.15,
            },
            peso_promedio: {
              "2023-08-01": 610,
              "2023-08-02": 635,
              "2023-08-03": 660,
              "2023-08-04": 685,
              "2023-08-05": 710,
            },
            clima: {
              "2023-08-01": { temperatura: 27.5, precipitacion: 0 },
              "2023-08-02": { temperatura: 28.2, precipitacion: 0.8 },
              "2023-08-03": { temperatura: 26.8, precipitacion: 2.5 },
              "2023-08-04": { temperatura: 28.8, precipitacion: 0 },
              "2023-08-05": { temperatura: 27.1, precipitacion: 1.8 },
            },
            resumen_mensual: {
              consumoTotal: 405200,
              fcrPromedio: 2.22,
              pesoPromedio: 710,
              temperaturaPromedio: 27.68,
              precipitacionTotal: 5.1
            }
          }
        },
        {
          idMes: 9,
          año: 2023,
          orden_en_ciclo: 6, // Sexto mes del ciclo
          datos: {
            consumo_alimentos: {
              "2023-09-01": 89000,
              "2023-09-02": 89500,
              "2023-09-03": 104000,
              "2023-09-04": 97500,
              "2023-09-05": 91500,
            },
            fcr: {
              "2023-09-01": 2.35,
              "2023-09-02": 2.38,
              "2023-09-03": 2.52,
              "2023-09-04": 2.45,
              "2023-09-05": 2.32,
            },
            peso_promedio: {
              "2023-09-01": 735,
              "2023-09-02": 760,
              "2023-09-03": 785,
              "2023-09-04": 810,
              "2023-09-05": 835,
            },
            clima: {
              "2023-09-01": { temperatura: 25.1, precipitacion: 3.2 },
              "2023-09-02": { temperatura: 24.5, precipitacion: 6.8 },
              "2023-09-03": { temperatura: 23.2, precipitacion: 10.5 },
              "2023-09-04": { temperatura: 22.8, precipitacion: 13.2 },
              "2023-09-05": { temperatura: 21.5, precipitacion: 5.1 },
            },
            resumen_mensual: {
              consumoTotal: 471500,
              fcrPromedio: 2.40,
              pesoPromedio: 835,
              temperaturaPromedio: 23.42,
              precipitacionTotal: 38.8
            }
          }
        },
        {
          idMes: 10,
          año: 2023,
          orden_en_ciclo: 7, // Séptimo mes del ciclo
          datos: {
            consumo_alimentos: {
              "2023-10-01": 116500,
              "2023-10-02": 117000,
              "2023-10-03": 123500,
              "2023-10-04": 130000,
              "2023-10-05": 119500,
            },
            fcr: {
              "2023-10-01": 2.58,
              "2023-10-02": 2.62,
              "2023-10-03": 2.68,
              "2023-10-04": 2.75,
              "2023-10-05": 2.55,
            },
            peso_promedio: {
              "2023-10-01": 860,
              "2023-10-02": 885,
              "2023-10-03": 910,
              "2023-10-04": 935,
              "2023-10-05": 960,
            },
            clima: {
              "2023-10-01": { temperatura: 19.2, precipitacion: 15.8 },
              "2023-10-02": { temperatura: 18.5, precipitacion: 18.5 },
              "2023-10-03": { temperatura: 17.8, precipitacion: 7.2 },
              "2023-10-04": { temperatura: 16.5, precipitacion: 28.8 },
              "2023-10-05": { temperatura: 15.2, precipitacion: 10.5 },
            },
            resumen_mensual: {
              consumoTotal: 606500,
              fcrPromedio: 2.64,
              pesoPromedio: 960,
              temperaturaPromedio: 17.44,
              precipitacionTotal: 80.8
            }
          }
        },
        {
          idMes: 11,
          año: 2023,
          orden_en_ciclo: 8, // Octavo mes del ciclo
          datos: {
            consumo_alimentos: {
              "2023-11-01": 211000,
              "2023-11-02": 176000,
              "2023-11-03": 185500,
              "2023-11-04": 194500,
              "2023-11-05": 202000,
            },
            fcr: {
              "2023-11-01": 3.22,
              "2023-11-02": 3.05,
              "2023-11-03": 3.12,
              "2023-11-04": 3.18,
              "2023-11-05": 3.25,
            },
            peso_promedio: {
              "2023-11-01": 985,
              "2023-11-02": 1010,
              "2023-11-03": 1035,
              "2023-11-04": 1060,
              "2023-11-05": 1085,
            },
            clima: {
              "2023-11-01": { temperatura: 13.5, precipitacion: 38.2 },
              "2023-11-02": { temperatura: 12.8, precipitacion: 32.5 },
              "2023-11-03": { temperatura: 11.2, precipitacion: 45.8 },
              "2023-11-04": { temperatura: 10.5, precipitacion: 25.2 },
              "2023-11-05": { temperatura: 9.8, precipitacion: 35.8 },
            },
            resumen_mensual: {
              consumoTotal: 969000,
              fcrPromedio: 3.16,
              pesoPromedio: 1085,
              temperaturaPromedio: 11.56,
              precipitacionTotal: 177.5
            }
          }
        },
        {
          idMes: 12,
          año: 2023,
          orden_en_ciclo: 9, // Noveno mes del ciclo
          datos: {
            consumo_alimentos: {
              "2023-12-01": 214500,
              "2023-12-02": 210000,
              "2023-12-03": 220000,
              "2023-12-04": 206500,
              "2023-12-05": 215500,
            },
            fcr: {
              "2023-12-01": 3.28,
              "2023-12-02": 3.25,
              "2023-12-03": 3.35,
              "2023-12-04": 3.22,
              "2023-12-05": 3.32,
            },
            peso_promedio: {
              "2023-12-01": 1110,
              "2023-12-02": 1135,
              "2023-12-03": 1160,
              "2023-12-04": 1185,
              "2023-12-05": 1210,
            },
            clima: {
              "2023-12-01": { temperatura: 8.2, precipitacion: 52.5 },
              "2023-12-02": { temperatura: 7.5, precipitacion: 58.8 },
              "2023-12-03": { temperatura: 6.8, precipitacion: 65.2 },
              "2023-12-04": { temperatura: 5.2, precipitacion: 35.8 },
              "2023-12-05": { temperatura: 4.8, precipitacion: 78.5 },
            },
            resumen_mensual: {
              consumoTotal: 1066500,
              fcrPromedio: 3.28,
              pesoPromedio: 1210,
              temperaturaPromedio: 6.5,
              precipitacionTotal: 290.8
            }
          }
        },
        {
          idMes: 1,
          año: 2024,
          orden_en_ciclo: 10, // Décimo mes del ciclo (último)
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
        consumoTotal: 4745550,
        fcrPromedio: 2.18,
        pesoPromedio: 1335,
        temperaturaPromedio: 13.5,
        precipitacionTotal: 1151.1
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
