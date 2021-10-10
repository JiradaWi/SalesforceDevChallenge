public with sharing class EmailPreviewController {
    public EmailPreviewController() {

    }

    @AuraEnabled
    public static Map<String, Object> getCampaign(String campaignId){
        Map<String, Object> result = new Map<String, Object>();

        if(String.isBlank(campaignId)){
            result.put('STATUS', 'Fail');
            result.put('Message', 'No campaign ID found!');
        }else{
            List<Campaign> camList = [SELECT Id, Name FROM Campaign WHERE Id = :campaignId];
            if(camList != null && camList.size() > 0){
                result.put('STATUS', 'Success');
                result.put('Campaign',camList[0]);
            }else{
                result.put('STATUS', 'Fail');
                result.put('Message', 'No campaign found!');
            }
           
        }
        return result;
    }
}
