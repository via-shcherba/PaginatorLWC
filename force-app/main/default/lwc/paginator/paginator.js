/* Designed by via.shcherba */

import { LightningElement, api, track } from 'lwc';
import firstPageLbl from '@salesforce/label/c.First_Page';
import previousLbl from '@salesforce/label/c.Previous';
import nextLbl from '@salesforce/label/c.Next';
import lastPageLbl from '@salesforce/label/c.Last_Page';

export default class Paginator extends LightningElement {

    @api selectOptions = [
        { label: 5, value: 5 },
        { label: 10, value: 10 },
        { label: 15, value: 15 }
    ];
    @api numberPages = 1;
    @track currentPage = 1;
    @track labels = {
        firstPageLbl,
        previousLbl,
        nextLbl,
        lastPageLbl
    }

    get disabledNext() {
        return this.currentPage === this.numberPages;
    }

    get disabledPrevious() {
        return this.currentPage === 1;
    }

    changePageSize(event) {
        this.currentPage = 1;
        let value = event.target.value;
        this.dispatchEvent(
            new CustomEvent('changepagesize', { detail: value })
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
            new CustomEvent('changepagenumber', { detail: num })
        );
    }

}