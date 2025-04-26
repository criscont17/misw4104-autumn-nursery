import { catchError, map, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment.development';
import { NurseryDetail } from '../models/nursery';
import { Plant } from '../models/plant';

@Injectable({
  providedIn: 'root',
})
export class PlantService {
  private _endpointUrl = `${environment.apiUrl}/cf1077fa69112bc67ff520dd6517a93afd3dae29/202212_MISW4104_Grupo2.json`;

  constructor(private _http: HttpClient) {}

  getPlants(): Observable<NurseryDetail> {
    return this._http.get<Plant[]>(this._endpointUrl).pipe(
      map((plants) => {
        let indoorPlant = 0;
        let outdoorPlant = 0;

        plants.forEach((plant) => {
          if (plant.tipo === 'Interior') indoorPlant += 1;
          if (plant.tipo === 'Exterior') outdoorPlant += 1;
        });

        return {
          indoorPlant,
          outdoorPlant,
          plants,
        };
      }),
      catchError((error) => {
        console.error('Error al consultar API:', error);

        return throwError(
          () =>
            new Error(
              'No se pudo obtener el listado de plantas. Por favor intente más tarde.'
            )
        );
      })
    );
  }
}
