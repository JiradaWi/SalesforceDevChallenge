import { LightningElement, track, wire } from 'lwc';
import { CurrentPageReference } from "lightning/navigation";

import getCampaign from '@salesforce/apex/emailPreviewController.getCampaign';

export default class EmailPreview extends LightningElement {

    @track campaignId;  
    @track campaignName;

    @wire(CurrentPageReference)
    getStateParameters(currentPageReference) {
        if (currentPageReference) {
            const urlValue = currentPageReference.state.c__id;
            console.log('urlValue: '+urlValue);
            if (urlValue) {
                this.campaignId = urlValue;
            } else {
                this.campaignId = `URL Value was not set`;
            }
        }
    }
    
    connectedCallback(){
        // const campaignId = this.getStateParameters();
        this.getCampaignInfo();
     }

     getCampaignInfo(){
         console.log('getCampaign');

        getCampaign({campaignId: this.campaignId})
        .then( result=>{               
                this.campaignName = result.Campaign.Name;              
            }
        ).catch(error=>{

        })
     }

     toCampaign(){
         
     }
}