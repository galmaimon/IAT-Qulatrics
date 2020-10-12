define(['pipAPI', 'https://galmaimon.github.io/epex/quep.js'], function(APIConstructor, epExtension){
	var API = new APIConstructor();
	var global = API.getGlobal();
	return epExtension(
	{
			//The prime categories.
			primeCats :  [
				{
					name : 'positive', //Will appear in the data.
					//An array of all media objects for this category.
					mediaArray : [
    				   {image: 'pos1.jpg'},
                    {image: 'pos2.jpg'},
                    {image: 'pos3.jpg'},
                    {image: 'pos4.jpg'},
                    {image: 'pos5.jpg'},
                    {image: 'pos6.jpg'},
                    {image: 'pos7.jpg'},
                    {image: 'pos8.jpg'}
				    ]
				}, 
				{
					name : 'negative', //Will appear in the data.
					//An array of all media objects for this category.
					mediaArray : [
    					{image: 'pos1.jpg'},
                    {image: 'pos2.jpg'},
                    {image: 'pos3.jpg'},
                    {image: 'pos4.jpg'},
                    {image: 'pos5.jpg'},
                    {image: 'pos6.jpg'},
                    {image: 'pos7.jpg'},
                    {image: 'pos8.jpg'}
    				]
				}
			],	


			nTrialsPerPrimeTargetPair:15, //How many trials in a block, per prime-target combination (always three blocks).
			fixationDuration : 500, 
			errorFBDuration : 1500, 
			ITIDuration : 500,

			//Set the image folder here.
			base_url : {
				image : "https://baranan.github.io/minno-tasks/images/ampImages"
			}
	});
});
