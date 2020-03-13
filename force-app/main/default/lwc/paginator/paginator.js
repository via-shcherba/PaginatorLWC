/* Designed by via.shcherba */

import { LightningElement, api, track } from 'lwc';
import firstPageLbl from '@salesforce/label/c.First_Page';
import previousLbl from '@salesforce/label/c.Previous';
import nextLbl from '@salesforce/label/c.Next';
import lastPageLbl from '@salesforce/label/c.Last_Page';


export default class Paginator extends LightningElement {
   
    @api selectOptions;
    @api numberPages;
    @track currentPage = 1;
    @track labels = {
        firstPageLbl,
        previousLbl,
        nextLbl,
        lastPageLbl
    }

    get isHasNext() {
        return this.currentPage === this.numberPages;
    }

    get isHasPrevious() {
        return this.currentPage === 1;
    }

    changePageSize(event) {       
        this.currentPage = 1;
        let value = event.target.value;        
        this.dispatchEvent(
            new CustomEvent('pagesize', { detail: value })
        );            
    }

    firstPage() {
        this.currentPage = 1;
        this.setPageNumber(this.currentPage);
    }

    previousPage() {
        this.currentPage--;
        this.setPageNumber(this.currentPage);
    }

    nextPage() {
        this.currentPage++;
        this.setPageNumber(this.currentPage);
    }

    lastPage() {
        this.currentPage = this.numberPages;
        this.setPageNumber(this.currentPage);
    }

    setPageNumber(num) {
        this.dispatchEvent(
            new CustomEvent('pagenumber', { detail: num })
        );
    }

}