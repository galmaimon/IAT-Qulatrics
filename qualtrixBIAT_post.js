---
layout: post
title: Running BIAT extention from Qulatrics
author: Gal_Maimon
---

[Project Implicit](http://projectimplicit.net/) has developed [MinnoJS](https://minnojs.github.io/) to program web studies. 
The main instrument that we use in Project Implicit is the Implicit Association Test (IAT). 
The IAT is a commonly used indirect measure of social cognition (read more about such measures [here](https://www.tau.ac.il/~baranan/imp.html)). 
If you reached this blog post, you probably know what the IAT is and you want to use it in your own study. In this blog post, I will explain how you can use our script in a Qulatrics study. 

### Project Implicit's MinnoJS BIAT extension 
We will use a [modification](https:// galmaimon.github.io/BIAT.js) of an BIAT MinnoJS [script](https:// galmaimon.github.io/BIAT.js) that Project Implicit has developed. In Project Implicit, we use that script to run the study from Open Minno Suite, our platform for running web studies. Before you decide to use that script in Qualtrics, please consider using our free platform as an alternative to Qualtrics (you can read more about it here). 

The script that we created for building BIATs is an extension, implemented as a function that creates an BIAT from a few arguments (i.e., parameters) that the researcher defines. You can read more about the basic idea of using extensions in Minno on [this page](https://github.com/baranan/minno-tasks/blob/master/implicitmeasures.md).

### Into Qualtrics
To run an IAT on Qualtrics study, I followed the guide from an earlier [post](https://minnojs.github.io/minnojs-blog/qualtrics/). 
The IAT will run from a single question in your survey, separated from any other question by a Page Break, like this:
![Qualtrics image](../images/quiat1.png)

Then, click the JS icon in the IAT question, and add the following code: 
```js
Qualtrics.SurveyEngine.addOnload(function () {
    // hide question and next button
    var container = this.getQuestionContainer();
    container.querySelector('.Inner').style.display = 'none';
    this.hideNextButton();
    // load MinnoJS from the CDN (you probably don't need to change this)
    var scriptTag = document.createElement('script');
    scriptTag.src = 'https://cdn.jsdelivr.net/gh/minnojs/minno-quest@0.3/dist/pi-minno.js';
    scriptTag.onload = onLoad;
    scriptTag.onreadystatechange = onLoad;
    container.appendChild(scriptTag);
    // create the root element for Minno
    var canvas = document.createElement('div');
    container.appendChild(canvas);
    // function to proceed to next question
    var proceed = this.clickNextButton.bind(this);
    // This function gets activated only after MinnoJS is loaded
    function onLoad() {
        // Run your study (just set the correct URL)
        minnoJS(canvas, 'https://galmaimon.github.io/exampleBIAT.js');
        // MinnoJS doesn't know about Qualtrics, we pass a function to inject the results into the question
        // For some reason `piGlobal` isn't available so we attach it to `minnoJS`
        minnoJS.logger = function (value) {
            var el = container.querySelector('textarea');
            el.value = value;
        }
        // At the end of the study let MinnoJS proceed to the next question
        // We need to wait a few miliseconds for Qualtrics to register the value that we entered
        minnoJS.onEnd = function () { setTimeout(proceed, 100); }
    }
});
```

This code will run our example Qualtric BIAT from this page. Start with that example. After you verify that it runs fine on your Qualtrics survey, replace it with your own IAT (we’ll get to that shortly). 

**IMPORTANT NOTE:** to skip blocks when you’re testing the IAT, use the key combination: Esc, Enter.

### How we define the BIAT

If you go to [our example](https://galmaimon.github.io/exampleBIAT.js), you will see how simple it can be to define your own IAT:
```js
define(['pipAPI', 'https://galmaimon.github.io/BIAT.js'], function(APIConstructor, iatExtension){
  var API = new APIConstructor();
	
	return iatExtension({
		practiceCategory1 : 
			{
				name : 'Mammals', //Will appear in the data.
				title : {
					media : {word : 'Mammals'}, //Name of the category presented in the task.
					css : {color:'#31b404','font-size':'1.8em'}, //Style of the category title.
					height : 4, //Height (because we need to know where to put the next item in the title)
					startStimulus : { 
					//If you're using a startStimulus, set here. If not, set the parameter showStimuliWithInst to false (see later below)
						media : {word : 'Dogs, Horses, Cows, Lions'}, 
						css : {color:'#31b404','font-size':'1em'}, 
						height : 2
					}
				}, 
				stimulusMedia : [ //Stimuli content as PIP's media objects
					{word : 'Dogs'}, 
					{word : 'Horses'}, 
					{word : 'Lions'}, 
					{word : 'Cows'}
				], 
				//Stimulus css (style of the stimuli)
				stimulusCss : {color:'#31b404','font-size':'2em'}
			},	
			practiceCategory2 : 
			{
				name : 'Birds', 
				title : {
					media : {word : 'Birds'}, 
					css : {color:'#31b404','font-size':'1.8em'}, 
					height : 4,
					startStimulus : {
						media : {word : 'Pigeons, Swans, Crows, Ravens'}, 
						css : {color:'#31b404','font-size':'1em'}, 
						height : 2
					}
				}, 
				stimulusMedia : [ //Stimuli content as PIP's media objects
					{word : 'Pigeons'}, 
					{word : 'Swans'}, 
					{word : 'Crows'}, 
					{word : 'Ravens'}
				], 
				//Stimulus css
				stimulusCss : {color:'#31b404','font-size':'2em'}
			},
			categories : [  //As many categories you need.
				{
					name : 'category1', //Will appear in the data.
					title : {
						media : {word : 'Category1'}, //Name of the category presented in the task.
						css : {color:'#31b404','font-size':'1.8em'}, //Style of the category title.
						height : 4, //Height (because we need to know where to put the next item in the title)
						startStimulus : { 
						//If you're using a startStimulus, set here. If not, set the parameter showStimuliWithInst to false (see later below)
							media : {word : 'cat1A, cat1B'}, 
							css : {color:'#31b404','font-size':'1em'}, 
							height : 2
						}
					}, 
					stimulusMedia : [ //Stimuli content as PIP's media objects
						{word : 'cat1A'}, 
						{word : 'cat1B'}
					], 
					//Stimulus css (style of the stimuli)
					stimulusCss : {color:'#31b404','font-size':'2em'}
				},	
				{
					name : 'category2', 
					title : {
						media : {word : 'Category2'}, 
						css : {color:'#31b404','font-size':'1.8em'}, 
						height : 4,
						startStimulus : {
							media : {word : 'cat2A, cat2B'}, 
							css : {color:'#31b404','font-size':'1em'}, 
							height : 2
						}
					}, 
					stimulusMedia : [ //Stimuli content as PIP's media objects
						{word : 'cat2A'}, 
						{word : 'cat2B'}
					], 
					//Stimulus css
					stimulusCss : {color:'#31b404','font-size':'2em'}
				}
			]
	});
});
```
In the first line, we tell Minno where the [full IAT script](https://galmaiimon.github.io/BIAT.js) is:
`define(['pipAPI', 'https://galmaimon.github.io/BIAT.js'], function(APIConstructor, iatExtension){`

At the beginning of [that script](https://galmaimon.github.io/exwmplwBIAT.js),  you will see the practice category, each BIAT test begin with a practice block include 8 trials, in our case Mammals-pleasant(bird) trial in witch each focal and non focal category will appear in twice.
The focal attribute in our example is Pleasant and will throughout the task, you can change it to both of the focal attribute if you want.
After the practice categories you will see the categories in the test, you can set as many categories as you would like, all the categories will includes in the trial, one as the focal category and the others as non focal category and the numbers of stimuli of the focal and non-focal will be equal. In our example there are only 2 categories called category1 and category2


### Use your own script file

Next, it’s time to create your own IAT. For that, you need to create a script like the example script, and post it online. If you have your own website (e.g., a home directory hosted by your university), you can put that script on that website. It is a static file so pretty much any server will suffice. Or, you can use a free online service for that. My example is hosted on GitHub Pages, which is free and [easy to setup](https://help.github.com/en/github/working-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site). 

First, just copy my code and put it on your server. Change the url in the JavaScript code you entered to Qualtrics earlier, and see that the IAT runs fine. 

### Define your IAT

Now, change your code to build the IAT you need. If you’re using photos, put them in your own directory and change your IAT script to search for images there: base_url: {image:’YOUR URL GOES HERE’}.
If you’re using words rather than photos, you need to update the [media](https://minnojs.github.io/minno-time/0.5/time/API.html#media) object of the categories. For instance: {word: 'Tyrone'}.

If you want to update the attributes, see how the attributes are defined in the [extension script](https://baranan.github.io/minno-tasks/quiat8.js) and override them by defining your own attributes in your IAT script.

Although our IAT script supports touch devices, the IAT does not detect automatically whether the participant is using a touch device (e.g., mobile). Therefore, if you want your participants to run the IAT on a mobile device or a tablet, you will need to create an IAT version specifically for those participants (in your script, set isTouch:true in the IAT parameters). 

### Processing the IAT data

The original [post](https://minnojs.github.io/minnojs-blog/qualtrics/) about running MinnoJS scripts from Qualtrics explains the how to process the data saved by Qualtrics. [Here](https://github.com/baranan/minno-tasks/blob/master/docs/minno.qualtrics.iat.process.rmd)([download from [here](https://baranan.github.io/minno-tasks/minno.qualtrics.iat.process.rmd)] is an R (well, rmd) script that you can use to analyze the IAT data. If you don’t feel comfortable using R, here is how to create a csv file with the IAT data, using Excel. 
1. Download the data from Qualtrics as csv.
2. Open the csv file with Excel
3. Copy only the cells with IAT data. For instance, because the IAT was in Q3 in my Qualtrics questionnaire, the relevant column is under Q3. Select only the cells with that data and copy those cells.
4. Open a notepad (or notepad++ or any other simple editor) and paste the data (the cells you copied) to that file.
5. Replace (usually, using ctrl-H) the text *“block,trial* with the text *block,trial* (to remove the “ before block)
6. Replace “”” (three double quotes) with “” (two double quotes)
7. Replace “” (two double quotes) with “ (one double quotes)
8. Save that file as a csv file
9. You can open that csv file to make sure that it is fine. 

The steps in an animated gif:
![Data image](../images/processiat.gif)

### Using Project Implicit's IATs

We posted online some of Project Implicit's IATs:

[2020 Race IAT](https://baranan.github.io/minno-tasks/demoRace0005.js), URL:`"https://baranan.github.io/minno-tasks/demoRace0005.js"`

[2020 Gender-Science IAT](https://baranan.github.io/minno-tasks/demogenderscience0002.js), URL:`"https://baranan.github.io/minno-tasks/demogenderscience0002.js"` 

[2020 Sexuality IAT](https://baranan.github.io/minno-tasks/demosexuality0002.js), URL: `"https://baranan.github.io/minno-tasks/demosexuality0002.js"`

[Israel: AShkenazim/Mizrakhim Hebrew](https://baranan.github.io/minno-tasks/iatashmiz.js), URL: `"https://baranan.github.io/minno-tasks/iatashmiz.js"`

You can duplicate them to your own server, or just call them directly from Qualtrics. That is, in the code you enter in Qualtrics, when you define what task to launch using MinnoJS, use the URL to the demo task that you want to use. For instance:

`minnoJS(canvas, 'https://github.com/baranan/minno-tasks/blob/master/docs/demoRace0005.js');`

In the evaluative IATs, for each participant, we randomly choose eight positive and eight negative attribute words from a sets of 48 positive and 48 negativewords. In our internal tests, we did not find evidence that any of these words is more effective than the others. 
In the Sexuality IAT, for each participant, we randomly choose whether the Gay category would refer to women or men, or both. When you process the data, to know which IAT each  participant completed, use the stimuli in the IAT data.


### Any questions?

If you have any questions, you post questions in our MinnoJS Google Group, [here](https://groups.google.com/forum/?utm_medium=email&utm_source=footer#!forum/minnojs). 

### Cite Us

You used MinnoJS platform, which is cited like this:

`Zlotnick, E., Dzikiewicz, A. J., & Bar-Anan, Y. (2015). Minno.js (Version 0.3) [Computer software].`

To cite our Qualtrics-IAT script, cite this blog post:

`Bar-Anan, Y. (2020, March 3). Running Project Implicit’s IAT from Qulatrics [Blog post]. Retrieved from https://minnojs.github.io/minnojs-blog/qualtrics-iat/`



