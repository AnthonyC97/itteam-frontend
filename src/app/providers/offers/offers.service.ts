import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OffersService {

  constructor(private http: HttpClient) { }


  public getOffers(): Promise<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<any>(`http://localhost:8080/offers`, { headers })
      .toPromise();
  }

  public insetNewOffer(body: any): Promise<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`http://localhost:8080/offers`, body, { headers })
      .toPromise();
  }

  public deleteOffer(id: number): Promise<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`http://localhost:8080/offers/delete/${id}`, { headers })
      .toPromise();
  }
}
