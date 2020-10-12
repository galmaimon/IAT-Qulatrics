define(['pipAPI', 'https://galmaimon.github.io/epex/quep.js'], function(APIConstructor, epExtension){
	var API = new APIConstructor();
	var global = API.getGlobal();
	return epExtension(
	{
			//The prime categories.
			primeCats :  [
				{
					name : 'birds', //Will appear in the data.
					//An array of all media objects for this category.
					mediaArray : [
    				    {word : 'Pigeons'}, 
					{word : 'Swans'}, 
					{word : 'Crows'}, 
					{word : 'Ravens'}
				], 
				    ]
				}, 
				{
					name : 'mamals', //Will appear in the data.
					//An array of all media objects for this category.
					mediaArray : [
    					{word : 'Dogs'}, 
					{word : 'Horses'}, 
					{word : 'Lions'}, 
					{word : 'Cows'}
    				]
				}
			],	

			nTrialsPerPrimeTargetPair:15, //How many trials in a block, per prime-target combination (always three blocks).
			fixationDuration : 500, 
			errorFBDuration : 1500, 
			ITIDuration : 500,

			//Set the image folder here.
			base_url : {
				image : "https://baranan.github.io/minno-tasks/images/"
			}
	});
});
