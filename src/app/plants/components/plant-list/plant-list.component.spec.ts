import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PlantListComponent } from './plant-list.component';
import { PlantService } from '../../services/plant.service';
import { Plant } from '../../models/plant';
import { faker } from '@faker-js/faker';

describe('PlantListComponent', () => {
  let component: PlantListComponent;
  let debug: DebugElement;
  let fixture: ComponentFixture<PlantListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [PlantListComponent],
      providers: [PlantService],
    }).compileComponents();

    fixture = TestBed.createComponent(PlantListComponent);
    component = fixture.componentInstance;

    for (let i = 0; i < 3; i++) {
      const plant = new Plant(
        faker.number.int({ min: 10, max: 1000 }),
        faker.food.vegetable(),
        faker.number.int({ min: 1, max: 100 }),
        faker.book.author(),
        faker.person.fullName(),
        faker.lorem.sentence({ min: 3, max: 7 }),
        faker.person.middleName()
      );

      component.plants.push(plant);
    }

    fixture.detectChanges();
    debug = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a <table> with 4 <tr>, 7 <th> and 9 <td> elements', () => {
    expect(debug.queryAll(By.css('tr')).length).toBe(4);
    expect(debug.queryAll(By.css('th')).length).toBe(7);
    expect(debug.queryAll(By.css('td')).length).toBe(9);
  });
});
