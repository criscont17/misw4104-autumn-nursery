import { Plant } from './plant';

export class NurseryDetail {
  indoorPlant: number;
  outdoorPlant: number;
  plants: Plant[];

  constructor(indoorPlant: number, outdoorPlant: number, plants: Plant[]) {
    this.indoorPlant = indoorPlant;
    this.outdoorPlant = outdoorPlant;
    this.plants = plants;
  }
}
