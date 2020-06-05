define(['pipAPI', 'https://galmaimon.github.io/iatArab.js'], function(APIConstructor, iatExtension){
    var API = new APIConstructor();
	API.addGlobal({posWords : API.shuffle([
            'Love', 'Cheer', 'Friend', 'Pleasure', 
            'Adore', 'Cheerful', 'Friendship', 'Joyful', 
            'Smiling','Cherish', 'Excellent', 'Glad', 
            'Joyous', 'Spectacular', 'Appealing', 'Delight', 
            'Excitement', 'Laughing', 'Attractive','Delightful', 
            'Fabulous', 'Glorious', 'Pleasing', 'Beautiful', 
            'Fantastic', 'Happy', 'Lovely', 'Terrific', 
            'Celebrate', 'Enjoy', 'Magnificent', 'Triumph']), 
        negWords : API.shuffle([
            'Abuse', 'Grief', 'Poison', 'Sadness', 
            'Pain', 'Despise', 'Failure', 'Nasty', 
            'Angry', 'Detest', 'Horrible', 'Negative', 
            'Ugly', 'Dirty', 'Gross', 'Evil', 
            'Rotten','Annoy', 'Disaster', 'Horrific',  
            'Scorn', 'Awful', 'Disgust', 'Hate', 
            'Humiliate', 'Selfish', 'Tragic', 'Bothersome', 
            'Hatred', 'Hurtful', 'Sickening', 'Yucky'])
        });
        var global=API.getGlobal();
        
       
	return iatExtension({

		category1 : {
			name : 'Arab Muslims', //Will appear in the data.
			title : {
				media : {word : 'Arab Muslims'}, //Name of the category presented in the task.
				css : {color:'#31940F','font-size':'2em'}, //Style of the category title.
				height : 4 //Used to position the "Or" in the combined block.
			}, 
			stimulusMedia : [ //Stimuli content as PIP's media objects
    		        {word: 'Hakim'},
                {word: 'Sharif'},
                {word: 'Yousef'},
				        {word: 'Wahib'},
            	  {word: 'Akbar'},
            	  {word: 'Muhsin'},
            	  {word: 'Salim'},
                {word: 'Karim'},
                {word: 'Habib'},
				        {word: 'Ashraf'}  
			], 
			//Stimulus css (style)
			stimulusCss : {color:'#31940F','font-size':'1.8em'}
		},	
		category2 :	{
			name : 'Other People', //Will appear in the data.
			title : {
				media : {word : 'Other People'}, //Name of the category presented in the task.
				css : {color:'#31940F','font-size':'2em'}, //Style of the category title.
				height : 4 //Used to position the "Or" in the combined block.
			}, 
			stimulusMedia : [ //Stimuli content as PIP's media objects
    		        {word: 'Ernesto'},
                {word: 'Matthais'},
                {word: 'Maarten'},
				        {word: 'Philippe'},
            	  {word: 'Guillame'},
            	  {word: 'Benoit'},
            	  {word: 'Takuya'},
                {word: 'Kazuki'},
                {word: 'Chaiyo'},
				        {word: 'Marcelo'}
			], 
			//Stimulus css
			stimulusCss : {color:'#31940F','font-size':'1.8em'}
		},	

		base_url : {//Where are your images at?
			image : 'https://galmaimon.github.io/iatage'
		} 
	});
});
