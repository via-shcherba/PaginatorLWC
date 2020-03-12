/* Designed by via.shcherba */

import { LightningElement, api } from 'lwc';
import firstPageLbl from '@salesforce/label/c.First_Page';
import previousLbl from '@salesforce/label/c.Previous';
import nextLbl from '@salesforce/label/c.Next';
import lastPageLbl from '@salesforce/label/c.Last_Page';


export default class Paginator extends LightningElement {
   
    @api selectOptions;
    @api setNumberPages(value) {
        this.numberPages = value;        
        this.checkAvailability();
    }    
    numberPages;
    currentPage = 1;

    labels = {
        firstPageLbl,
        previousLbl,
        nextLbl,
        lastPageLbl
    }

    selectOptionsDefault = [
        {label: 5, value: 5},
        {label: 10, value: 10},
        {label: 15, value: 15}
    ];       

    checkAvailability() {
        if(this.currentPage === 1) {
            this.template.querySelectorAll('lightning-button')[0].disabled = true;  
            this.template.querySelectorAll('lightning-button')[1].disabled = true;
        } else {
            this.template.querySelectorAll('lightning-button')[0].disabled = false;  
            this.template.querySelectorAll('lightning-button')[1].disabled = false;
        }
        if (this.currentPage === this.numberPages) {
            this.template.querySelectorAll('lightning-button')[2].disabled = true;
            this.template.querySelectorAll('lightning-button')[3].disabled = true;
        } else {
            this.template.querySelectorAll('lightning-button')[2].disabled = false;  
            this.template.querySelectorAll('lightning-button')[3].disabled = false;  
        }
    }

    changePageSize(event) {       
        this.currentPage = 1;
        let value = event.target.value;        
        this.dispatchEvent(
            new CustomEvent('select', { detail: value })
        );            
    }

    firstPage() {
        this.currentPage = 1;
        this.dispatchEvent(
            new CustomEvent('first', { detail: this.currentPage })
        );
        this.checkAvailability();
    }

    previousPage() {
        this.currentPage--;
        this.dispatchEvent(
            new CustomEvent('previous', { detail: this.currentPage })
        );
        this.checkAvailability();
    }

    nextPage() {
        this.currentPage++;
        this.dispatchEvent(
            new CustomEvent('next', { detail: this.currentPage })
        );
        this.checkAvailability();
    }

    lastPage() {
        this.currentPage = this.numberPages;
        this.dispatchEvent(
            new CustomEvent('last', { detail: this.currentPage })
        );
        this.checkAvailability();
    }

}