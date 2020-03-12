import { LightningElement, track, wire } from 'lwc';
import getContacts from '@salesforce/apex/testApexController.getContacts';

export default class TestComponent extends LightningElement {

    @track data;
    @track columns = [
        {label: 'Last Name', fieldName: 'LastName', type: 'text'},
        {label: 'First Name', fieldName: 'FirstName', type: 'text'},
        {label: 'Phone', fieldName: 'Phone', type: 'phone'},
        {label: 'Email', fieldName: 'Email', type: 'email'}
    ];
   
    @track selectOptions = [
        {label: 10, value: 10},
        {label: 20, value: 20},
        {label: 30, value: 30}
    ];

    numberRecords;
    pageSize = 10;
    numberPages;
    paginationList;

    constructor() {
        super();
        this.getDataFromApex();
    }

    async setFeatures() {
        this.numberRecords = this.data.length;
        this.setPageNumber(1);
    }

    async getDataFromApex() {
        let contacts = await getContacts();
        if (contacts) {
            this.data = contacts;           
        }   
        await this.setFeatures();
    }

    countPages() {    
        if (this.pageSize > this.numberRecords) {
            this.numberPages = 1;
        } else {
            this.numberPages = Math.ceil(this.numberRecords / +this.pageSize);            
        }       
        this.setNumberPages();           
    }

    // to pass on number pages to c-paginator
    setNumberPages() {
        this.template.querySelector('c-paginator')
        .setNumberPages(this.numberPages);  
    }

    setPageNumber(pageNumber) {   
        this.countPages();  
        let recordFrom = (pageNumber - 1) * this.pageSize;        
        let recordTo;
        if((recordFrom + this.pageSize) <= this.numberRecords) {           
            recordTo = recordFrom + this.pageSize;
        } else {
            recordTo = (this.numberRecords - recordFrom) + recordFrom;
        }          
        this.paginationList = [];
        for(let i = recordFrom; i < recordTo; i++) {
            if(this.numberRecords > i) {
                this.paginationList.push(this.data[i]);
            }
        }           
    }

    // c-paginator management
    changePageSize(event) {
        this.pageSize = event.detail;
        this.setPageNumber(1);
    }

    firstPage(event) {
        this.setPageNumber(event.detail);
    }

    previousPage(event) {
        this.setPageNumber(event.detail);
    }

    nextPage(event) {
        this.setPageNumber(event.detail);
    }

    lastPage(event) {
        this.setPageNumber(event.detail);
    }

}