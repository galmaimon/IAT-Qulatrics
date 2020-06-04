define(['pipAPI', 'https://galmaimon.github.io/iatage.js'], function(APIConstructor, iatExtension){
    var API = new APIConstructor();

	return iatExtension({
		category1 : {
			name : 'Old people', //Will appear in the data.
			title : {
				media : {word : 'Old people'}, //Name of the category presented in the task.
				css : {color:'#31940F','font-size':'2em'}, //Style of the category title.
				height : 4 //Used to position the "Or" in the combined block.
			}, 
			stimulusMedia : [ //Stimuli content as PIP's media objects
    		    {image: 'om1.jpg'},
                {image: 'om2.jpg'},
                {image: 'om3.jpg'},
                {image: 'of1.jpg'},
                {image: 'of2.jpg'},                 
                {image: 'of3.jpg'}
			], 
			//Stimulus css (style)
			stimulusCss : {color:'#31940F','font-size':'1.8em'}
		},	
		category2 :	{
			name : 'Young people', //Will appear in the data.
			title : {
				media : {word : 'Young people'}, //Name of the category presented in the task.
				css : {color:'#31940F','font-size':'2em'}, //Style of the category title.
				height : 4 //Used to position the "Or" in the combined block.
			}, 
			stimulusMedia : [ //Stimuli content as PIP's media objects
    		    {image: 'ym1.jpg'},
                {image: 'ym2.jpg'},
                {image: 'ym3.jpg'},
                {image: 'yf1.jpg'},
                {image: 'yf2.jpg'},
                {image: 'yf3.jpg'}
			], 
			//Stimulus css
			stimulusCss : {color:'#31940F','font-size':'1.8em'}
		},	

		base_url : {//Where are your images at?
			image : 'https://galmaimon.github.io/iatage'
		} 
	});
});
