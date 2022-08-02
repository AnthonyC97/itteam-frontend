import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { OffersService } from 'src/app/providers/offers/offers.service';
import * as M from 'materialize-css';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.sass']
})
export class OffersComponent implements OnInit {

  @ViewChild('modal') modal!: ElementRef;

  public offers: Array<any> = [];
  public modalInstance: any;
  public formAddOffer!: FormGroup;
  public isEdit: boolean = false;
  constructor(private offersService: OffersService) { }

  ngOnInit(): void {
    this.getOffersFromAPI();
    setTimeout(() => {
      this.modalInstance = new M.Modal(this.modal.nativeElement, {});
    }, 100);
  }

  private async getOffersFromAPI(): Promise<void> {
    try {
      const result = await this.offersService.getOffers();
      this.offers = result;
    } catch (error) {
      console.error("Ocurrió un error al intentar obtener las ofertas.", error);
    }
  }

  private buildFormAdd(): void {
    this.formAddOffer = new FormGroup({
      id: new FormControl(null),
      name: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      feature: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required)
    });
  }

  public openAddModal(): void {
    this.modalInstance.open();
    this.buildFormAdd();
    this.isEdit = false;
  }

  public openModalEditar(elementData: any): void {
    this.modalInstance.open();
    this.formAddOffer = new FormGroup({
      id: new FormControl(elementData.id),
      name: new FormControl(elementData.name, Validators.required),
      price: new FormControl(elementData.price.precio, Validators.required),
      feature: new FormControl(elementData.characteristics[0].name, Validators.required),
      description: new FormControl(elementData.characteristics[0].description, Validators.required)
    });
    this.isEdit = true;
  }

  public async saveInfoWithAPI(): Promise<void> {
    const data = this.formAddOffer.value;
    const body: any = {
      id: data.id,
      name: data.name,
      price: {
        precio: data.price
      },
      characteristics: [{
        name: data.feature,
        description: data.description
      }]
    };
    try {
      const result = await this.offersService.insetNewOffer(body);
      if (this.isEdit) {
        this.getOffersFromAPI();
      } else {
        this.offers.push(result);
      }
    } catch (error) {
      console.error("Error al intentar registrar la nueva oferta", error);
    }
  }

  public async deleteOfferWithAPI(id: number, idx: number): Promise<void> {
    try {
      const result = await this.offersService.deleteOffer(id);
      if (result) {
        this.offers.splice(idx, 1);
      }
    } catch (error) {
      console.error("Ocurrió un error al intentar eliminar el registro", error);
    }
  }

}
