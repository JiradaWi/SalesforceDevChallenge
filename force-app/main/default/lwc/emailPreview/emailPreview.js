import { LightningElement, track, wire } from 'lwc';
import { CurrentPageReference } from "lightning/navigation";
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent'

import getCampaign from '@salesforce/apex/emailPreviewController.getCampaign';

export default class EmailPreview extends NavigationMixin(LightningElement) {

    @track campaignId;
    @track campaignName;

    @wire(CurrentPageReference)
    getStateParameters(currentPageReference) {
        if (currentPageReference) {
            const urlValue = currentPageReference.state.c__id;
            if (urlValue) {
                this.campaignId = urlValue;
            } else {
                this.showToast('No Campaign ID Found!', 'Please navigate to this page using campaign record page.', 'error');
            }
        }
    }

    connectedCallback() {
        // const campaignId = this.getStateParameters();
        this.getCampaignInfo();
    }

    getCampaignInfo() {
        console.log('getCampaign');
        if (this.campaignId) {
            getCampaign({ campaignId: this.campaignId})
                .then(result => {
                    this.campaignName = result.Campaign.Name;
                }
                ).catch(error => {
                    console.log(JSON.stringify(error));
                    this.showToast('Campaign ID Incorrect!', 'Please navigate to this page using campaign record page.', 'error');
                })
        }
    }

    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
        });
        this.dispatchEvent(event);
    }


    toCampaign() {
        console.log('test');

        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.campaignId,
                objectApiName: 'Campaign',
                actionName: 'view'
            },
        });
        console.log('test2');
    }
}