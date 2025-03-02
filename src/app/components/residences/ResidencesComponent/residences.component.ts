import { Component, OnInit } from '@angular/core';
import { Residence } from 'src/app/core/models/residence.model';
import { ResidenceService } from 'src/app/services/residence.service';
import { CommonService } from 'src/app/core/Services/common.service';


@Component({
  selector: 'app-residences',
  templateUrl: './residences.component.html',
  styleUrls: ['./residences.component.css']
})
export class ResidencesComponent implements OnInit {
  searchText: string = '';
  listResidences: Residence[] = [];
  listResidencesFav: Residence[] = [];
  similarAddressCounts: { [address: string]: number } = {}; // Stocke les comptes pour chaque adresse

  constructor(
    private residenceService: ResidenceService,
    private commonService: CommonService // Inject CommonService
  ) {}

  ngOnInit() {
    this.loadResidences();
  }

  loadResidences() {
    this.residenceService.getResidences().subscribe(residences => {
      console.log("Résidences récupérées :", residences); // Vérifier les données
      this.listResidences = residences;
    });
  }

  showLocation(address: string) {
    if (address.toLowerCase() === 'inconnu') {
      alert('The address of this residence is unknown.');
    } else {
      alert('Residence Address: ' + address);
    }
  }

  addToFavorites(residence: Residence) {
    if (!this.listResidencesFav.find(fav => fav.id === residence.id)) {
      this.listResidencesFav.push(residence);
    }
  }


  getSimilarAddresses(address: string): void {
    const count = this.listResidences.filter(residence => residence.address.trim().toLowerCase() === address.trim().toLowerCase()).length;
  
    this.similarAddressCounts[address] = count;
  
    console.log(`Résidences trouvées avec l'adresse "${address}":`, count);
  }
  deleteResidence(id: number) {
    this.residenceService.getResidences(id).subscribe(() => {
      this.listResidences = this.listResidences.filter(res => res.id !== id);
    });
  }
  
  
}
