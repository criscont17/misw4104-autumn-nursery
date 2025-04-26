import { Component, OnInit } from '@angular/core';

import { PlantService } from '../../services/plant.service';
import { Plant } from '../../models/plant';

@Component({
  selector: 'app-plant-list',
  standalone: false,
  templateUrl: './plant-list.component.html',
  styleUrl: './plant-list.component.css',
})
export class PlantListComponent implements OnInit {
  errorMessage = '';
  indoorPlants = 0;
  outdoorPlants = 0;
  plants: Plant[] = [];

  constructor(private plantService: PlantService) {}

  ngOnInit(): void {
    this.loadNurseryDetail();
  }

  loadNurseryDetail(): void {
    this.plantService.fetchNurseryDetail$().subscribe({
      next: ({ indoorPlant, outdoorPlant, plants }) => {
        this.indoorPlants = indoorPlant;
        (this.outdoorPlants = outdoorPlant), (this.plants = plants);
      },
      error: (error) => {
        this.errorMessage = error.message;
      },
    });
  }
}
