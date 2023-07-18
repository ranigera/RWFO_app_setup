// ****************************************************************
//                           PARAMETERS:
// ---------------------------------------------------------------

window.app_settings = {
	server: {
		base_address: 'https://experiments.schonberglab.org',
		ws_base_address: 'wss://experiments.schonberglab.org',
	},
	app_base_adress: 'https://DOMAIN_NAME/PATH',  // <HTML ADJUSTABLE>
	SETUP_TEXT_app_base_adress: 'App base address:<br>* used to create the installation links for participants',  // <HTML ADJUSTABLE>
	context: 'Space_Gold',  // <HTML ADJUSTABLE>
	SETUP_TEXT_context: "App/context name (Don't use spaces; you can use underscores and they will be replaced with a space where relevant): ",  // <HTML ADJUSTABLE>
	one_time_link: true, // <HTML ADJUSTABLE>
	SETUP_TEXT_one_time_link: "Do you want the installation links to work only once?<br>* This prevents installation on more than one device. But if the page reloads before installation you'd need to send a new link (with a new subject number). ", // <HTML ADJUSTABLE>
	downloadAllToLocalStorage: false, // this refers to the case where the data need to be downloaded again to the local storage (e.g., after reinstalling the app because of a problem)
	minDailyDataPointsToStoreLocally: 20,
	experimentalDayStartingHour: 5, // Possiblie assignments are 0-23. Assign 0 to simply seperate between days.  Relevant for example to determine the time at day to empty container according to a 24h watch. 
	pressesRequired: 2,
	rewards: {
		isRatioSchedule: true, // <HTML ADJUSTABLE>
		SETUP_TEXT_isRatioSchedule: 'Use a random RATIO reinforcement schedule?<br> set to false to use a random INTERVAL reinforcement schedule will be used.', // <HTML ADJUSTABLE>
		winningRate: 3, // <HTML ADJUSTABLE> per entries if isRatioSchedule is true; per seconds if isRatioSchedule is false.  <HTML ADJUSTABLE>
		SETUP_TEXT_winningRate: 'Winning rate:<br>Use an integer. It will be used according to the reinforcement schedule type:<br>* in a RATIO schedule each TRIAL will have 1/x of winning.<br> * in an INTERVAL schedule each second (measured from the last entry) will have 1/x chance of making the reward available, "waiting" to be collected.', // <HTML ADJUSTABLE>
		winningChancePerUnit: function () {
			return 1 / this.winningRate;
		},
		isVariableReward: false, // <MAYBE MAKE IT HTML ADJUSTABLE>
		SETUP_TEXT_isVariableReward: 'Use a variable reward amount?<br>* if set to false a constant sum will be used.<br>* if set to true will be sampled from a uniform distribution according to the values specified where relevant below.', // <HTML ADJUSTABLE>
		// for constant reward:
		rewardConstantSum: 15,
		SETUP_TEXT_rewardConstantSum: 'Constant reward sum (applicable if "Use a variable reward amount" above was set to false):', // <HTML ADJUSTABLE>
		// for VariableReward (will be computed unifomly in the given range):
		minWinningSum: 20,
		SETUP_TEXT_minWinningSum: 'Minimum winning sum (applicable if "Use a variable reward amount" above was set to true):', // <HTML ADJUSTABLE>
		maxWinningSum: 30,
		SETUP_TEXT_maxWinningSum: 'Maximum winning sum (applicable if "Use a variable reward amount" above was set to true):', // <HTML ADJUSTABLE>

		// Sure win stuff:
		winAnywayIfMultipleNonWins: true, // this is to make sure that in case a participant did not win many times they will. <HTML ADJUSTABLE>
		SETUP_TEXT_winAnywayIfMultipleNonWins: 'Win anyway if multiple non-wins?<br>* if set to true, if the participant did not win for a long time (2 times the winning rate), they will win anyway.<br>* in the case of a random interval schedule, it will also require that the participant entered during the relevant period at least once.', // <HTML ADJUSTABLE>
		RelativeNonWinUnitsBeforeSureWinning: function () {
			return this.winningRate * 2;
		},

		// First daily entries stuff:
		enforceFirstEntryNoWinSecondEntryWin: true, // <HTML ADJUSTABLE> <<< if this and enforce_n_random_winnings_during_minimum_entries are true, the latter takes precedence
		SETUP_TEXT_enforceFirstEntryNoWinSecondEntryWin: 'Enforce daily beginning pattern of first entry no win second entry win?<br>* if set to true, the first entry of the day will be a win and the second will be a no win.<br>* in the case of a random interval schedule it will also require that the participant entered during the relevant period at least once.', // <HTML ADJUSTABLE>

		enforce_n_random_winnings_during_minimum_entries: false, // <HTML ADJUSTABLE>
		SETUP_TEXT_enforce_n_random_winnings_during_minimum_entries: 'Enforce random winnings during initial daily entries?<br>If set to true, participants will have n random winnings (determined below) during the first few daily entries.<br>* NOTE: The number of "initial daily entries" is determined below under "Daily entry to manipulate in". <i>Even if the experiment is set to have no devaluation/control manipulations, the value in this window will be used for the purpose of determining what is the number of "initial daily entries".</i><br> * if the value here and under "Enforce daily beginning pattern..." above are set to true, this one here will take precedence.', // <HTML ADJUSTABLE>
		n_random_winnings_during_minimum_entries: 2, // <HTML ADJUSTABLE>
		SETUP_TEXT_n_random_winnings_during_minimum_entries: 'Number of random winnings during initial daily entries (applicable only if "Enforce random winnings during initial daily entries" above was set to true):', // <HTML ADJUSTABLE>

		// Other stuff:
		notifyRewardContainerReset: true,

		// Aversive outcome stuff: <<<< If included: enforceFirstEntryNoWinSecondEntryWin and winAnywayIfMultipleNonWins, enforce_n_random_winnings_during_minimum_entries ......, detail !!!!
		// --------------------------------
		includeAversiveOutcome: false, // <HTML ADJUSTABLE>
		SETUP_TEXT_includeAversiveOutcome: 'Include loss outcomes?', // <HTML ADJUSTABLE>
		losingRate: 3, // <HTML ADJUSTABLE> per entries if isRatioSchedule is true; per seconds if isRatioSchedule is false.  <HTML ADJUSTABLE>
		SETUP_TEXT_losingRate: 'Losing rate:<br>Use an integer. It will be used according to the reinforcement schedule type:<br>* in a RATIO schedule each TRIAL will have 1/x of losing.<br> * in an INTERVAL schedule each second (measured from the last entry) will have 1/x chance of making the reward available, "waiting" to be collected.', // <HTML ADJUSTABLE>
		losingChancePerUnit: function () {
			return 1 / this.losingRate;
		},

		isVariableLoss: false, // <MAYBE MAKE IT HTML ADJUSTABLE>
		SETUP_TEXT_isVariableLoss: 'Use a variable loss amount?<br>* if set to false a constant sum will be used.<br>* if set to true will be sampled from a uniform distribution according to the values specified where relevant below.', // <HTML ADJUSTABLE>
		// for constant loss:
		lossConstantSum: 15,
		SETUP_TEXT_lossConstantSum: 'Constant loss sum (applicable if "Use a variable loss amount" above was set to false):', // <HTML ADJUSTABLE>
		// for VariableLoss (will be computed unifomly in the given range):
		minLosingSum: 20,
		SETUP_TEXT_minLosingSum: 'Minimum losing sum (applicable if "Use a variable loss amount" above was set to true):', // <HTML ADJUSTABLE>
		maxLosingSum: 30,
		SETUP_TEXT_maxLosingSum: 'Maximum losing sum (applicable if "Use a variable loss amount" above was set to true):', // <HTML ADJUSTABLE>
	},
	cost: {
		isCost: true,
		SETUP_TEXT_isCost: 'Use cost?', // <HTML ADJUSTABLE>
		isCostPerPress: false,
		isVariableCost: false,
		minCostSum: 1,
		maxCostSum: 5,
		// for constant cost:
		costConstantSum: 1,
		SETUP_TEXT_costConstantSum: 'Cost amount (use a positive integer):', // <HTML ADJUSTABLE>
		presentCost: true,
	},

	forceDeval: null, // for debugging purposes
	group_vars: { // <HTML ADJUSTABLE>
		SETUP_TEXT_group_A: 'NOTE: The following group A parameters will be used for subject numbers 101-199, 401-499, 701-799 etc.', // <HTML ADJUSTABLE>
		group_A: {
			SETUP_TEXT_dayToFinishExperiment: 'Day to finish experiment:<br>* Note, the experiment will end on the first entry on that day, thus if for example it is set to 5, the game will last 4 days).', // <HTML ADJUSTABLE>
			dayToFinishExperiment: 5, // short training
			SETUP_TEXT_daysWithControlManipulations: 'Days with control manipulations:<br>* If more than one day is chosen use commas to separate (e.g. 2,4).<br>* leave (or change to) empty to not use it.', // <HTML ADJUSTABLE>
			daysWithControlManipulations: [2, 4],
			SETUP_TEXT_daysWithDevaluationManipulations: 'Days with devaluation manipulations:<br>* If more than one day is chosen use commas to separate (e.g. 2,4).<br>* leave (or change to) empty to not use it.', // <HTML ADJUSTABLE>
			daysWithDevaluationManipulations: [3],
		},
		SETUP_TEXT_group_B: 'NOTE: The following group B parameters will be used for subject numbers 201-299, 501-599, 801-899 etc.', // <HTML ADJUSTABLE>
		group_B: {
			SETUP_TEXT_dayToFinishExperiment: 'Day to finish experiment:<br>* Note, the experiment will end on the first entry on that day, thus if for example it is set to 5, the game will last 4 days).', // <HTML ADJUSTABLE>
			dayToFinishExperiment: 12, // long training
			SETUP_TEXT_daysWithControlManipulations: 'Days with control manipulations:<br>* If more than one day is chosen use commas to separate (e.g. 2,4).<br>* leave (or change to) empty to not use it.', // <HTML ADJUSTABLE>
			daysWithControlManipulations: [9, 11],
			SETUP_TEXT_daysWithDevaluationManipulations: 'Days with devaluation manipulations:<br>* If more than one day is chosen use commas to separate (e.g. 2,4).<br>* leave (or change to) empty to not use it.', // <HTML ADJUSTABLE>
			daysWithDevaluationManipulations: [10],
		},
		SETUP_TEXT_group_C: 'NOTE: The following group C parameters will be used for subject numbers 301-399, 601-699, 901-999 etc.', // <HTML ADJUSTABLE>
		group_C: {
			SETUP_TEXT_dayToFinishExperiment: 'Day to finish experiment:<br>* Note, the experiment will end on the first entry on that day, thus if for example it is set to 5, the game will last 4 days).', // <HTML ADJUSTABLE>
			dayToFinishExperiment: 12, // long training parallel manipulations
			SETUP_TEXT_daysWithControlManipulations: 'Days with control manipulations:<br>* If more than one day is chosen use commas to separate (e.g. 2,4).<br>* leave (or change to) empty to not use it.', // <HTML ADJUSTABLE>
			daysWithControlManipulations: [2, 3, 4, 9, 11],
			SETUP_TEXT_daysWithDevaluationManipulations: 'Days with devaluation manipulations:<br>* If more than one day is chosen use commas to separate (e.g. 2,4).<br>* leave (or change to) empty to not use it.', // <HTML ADJUSTABLE>
			daysWithDevaluationManipulations: [10],
		},
	},
	feedback_in_devalued_actions: false, // <HTML ADJUSTABLE>
	SETUP_TEXT_feedback_in_devalued_actions: 'Feedback on devalued actions:<br>* should participants receive feedback that the outcome is devalued (when entering when it is devalued)?', // <HTML ADJUSTABLE>
	// for non-personalized time of manipulation:
	entry_to_manipulate_in: 5, // manipulation will occur on the entry_to_manipulate_in, namely entry_to_manipulate_in - 1 will have to be completed // <HTML ADJUSTABLE>
	SETUP_TEXT_entry_to_manipulate_in: 'Daily entry to manipulate in (on control and outcome devaluation manipulation days)', // <HTML ADJUSTABLE>
	hour_at_day_to_manipulate_anyway: 14,
	referenceDayPrecentileForManipulation: 0.5, // if referenceDayPrecentile=0.5 it will take the median, 0.25 quarter of the presses in a day etc.
	nTimesToShowCaveIfNotEntering: 2,
	maxSecsToShowCaveAgainIfNotEntering: 30,
	nTrialsBeforeNotifyGameOver: 3,
	nDailyEntriesRequired: function () { return this.entry_to_manipulate_in; },
	manipulationImageID: function (manipulationType) {
		if (manipulationType == 'devaluation') {
			return 'warehouse_full';
		} else if (manipulationType == 'still_valued' || manipulationType == 'still_valued_post_deval' || manipulationType == 'still_valued_replacing_devaluation') { // i.e., 'still_valued'
			return 'warehouse_half';
		}
	},
	msToRecordTimeSinceManipulationActivation: 500, // in ms
	// Manipulation checks:
	use_warehouse_state_query: false, // <HTML ADJUSTABLE>
	SETUP_TEXT_use_warehouse_state_query: 'Use warehouse state query?<br>* if <b>false</b>: a gold collection (in cave) short sub-task will appear after each manipulation (control and outcome devaluation).<br>* if <b>true</b>: Instead of the sub-task, participants will be asked to indicate (by typing) "partially full" or "completely full" after each manipulation.', // <HTML ADJUSTABLE>
	coinCollectionTask: {
		includeRocks: true,
		includeBombs: false, // <HTML ADJUSTABLE>
		SETUP_TEXT_includeBombs: 'Include bombs (loss items) in the cave (applicable only if "Use warehouse state query" is set to false)?', // <HTML ADJUSTABLE>
		duration: 5, // in seconds
		openningAnimTime: 1500, // in ms
		element_disappearing_time: 150, // in ms
		nStim: 30, // needs to be a multiple of the number of stimuli used
		bg_img_path: 'images/cave.jpg',
		outcome_win_image_path: 'images/outcome_win.png',
		outcome_loss_image_path: 'images/outcome_loss.png',
		outcome_no_win_image_path: 'images/outcome_no_win.png',
		outcomeImageHeightWidthRatio: 325 / 349, // namely the height = 325 and width = 349	
		stimSizeProportionOfScreen: 0.15, // will determine the size (width and height of the stimuli)
		textSizeProportionOfScreenWidth: 0.15,
		ProportionOfScreenWidthToPlaceCounter: 0.9,
		ProportionOfScreenHeightToPlaceCounter: 0.05,
		counterTextColor: [0, 0, 255], // can be one value for gray, 3 for RGB, 4 to include alpha
		finishMessageTextColor: [0, 0, 255], // can be one value for gray, 3 for RGB, 4 to include alpha
		finishMessage: "Goodbye",
		costPerPress: 10, // for the winnings calculation at the end
		rewardPerCoinStash: function () { return app_settings.rewards.rewardConstantSum }, // for the winnings calculation at the end
	},
	hideOutcome: {
		hide: true,
		hideOnlyUnderManipulationPeriods: false, // if false will hide every day from what we set in daysToHideAt_UntilTomorrow
		SETUP_TEXT_TITLE_1: 'Days to conceal the outcome <i>from some point and for the rest of the day</i>:', // <HTML ADJUSTABLE>
		SETUP_TEXT_SUB_TITLE_1: 'Days to conceal the outcome until the next day:<br>* use commas to separate between days.<br>* leave (or change to) empty to not use it.<br>* you can ignore groups you do not intend to use.', // <HTML ADJUSTABLE>
		daysToHideAt_UntilTomorrow: { // detemine according to group name <HTML ADJUSTABLE>
			group_A: [2, 3, 4], // short training
			SETUP_TEXT_group_A: 'group A:', // <HTML ADJUSTABLE>
			group_B: [9, 10, 11], // long training
			SETUP_TEXT_group_B: 'group B:', // <HTML ADJUSTABLE>
			group_C: [2, 3, 4, 9, 10, 11], // long training parallel manipulations
			SETUP_TEXT_group_C: 'group C:', // <HTML ADJUSTABLE>
		}, // [2, 3, 4, 5, 8, 10, 12],
		entry_to_hideOutcome_in: 3, // relevant if hideOnlyUnderManipulationPeriods is false.  <HTML ADJUSTABLE>
		SETUP_TEXT_entry_to_hideOutcome_in: 'Daily entry to begin concealing the outcome at:<br>* this will take effect only on the days defined above.', // relevant if hideOnlyUnderManipulationPeriods is false.  <HTML ADJUSTABLE>

		SETUP_TEXT_TITLE_2: 'Days to conceal the outcome <i>at random each time for a limited number of entries</i>:', // <HTML ADJUSTABLE>
		SETUP_TEXT_SUB_TITLE_2: 'Days to randomly conceal the outcomes:<br><i>* NOTE: if the same day is set both for "until the next day" (above) and "random batches" (below), the former will take precedence for that day.</i><br>* use commas to separate between days.<br>* leave (or change to) empty to not use it.<br>* you can ignore groups you do not intend to use.', // <HTML ADJUSTABLE>
		daysToHideAt_Randomly: { // detemine according to group name <HTML ADJUSTABLE> >> leave empty if not relevant
			group_A: [], // short training
			SETUP_TEXT_group_A: 'group A:', // <HTML ADJUSTABLE>
			group_B: [], // long training 
			SETUP_TEXT_group_B: 'group B:', // <HTML ADJUSTABLE>
			group_C: [], // long training parallel manipulations
			SETUP_TEXT_group_C: 'group C:', // <HTML ADJUSTABLE>
		}, // [2, 3, 4, 5, 8, 10, 12],
		chance_to_begin_hiding_batch_when_Random: 0.33, // <HTML ADJUSTABLE>
		SETUP_TEXT_chance_to_begin_hiding_batch_when_Random: 'Probability to begin a batch of concealed outcome entries:<br>* this refers to the chance on a given entry which is not in a previously initiated batch or a first entry after that batch.<br>* this will take effect only for the days defined above.', // <HTML ADJUSTABLE>
		n_entriesToHide_when_Random: 2, // <HTML ADJUSTABLE>
		SETUP_TEXT_n_entriesToHide_when_Random: 'Concealed outcomes batch size (number of entries): <br>* this will take effect only on the days defined above.', // <HTML ADJUSTABLE>
	},
	lottery_N_frames: 35,
	durations: { //in ms
		// every trial:
		entranceMessage: 800,
		lotteryAnim: 3500,
		intervalBetweenLotteryAndOutcomeAnim: 2800,
		// manipulation:
		outcomeAnim: 2000,
		intervalBetweenOutcomeAndNextThing: 1000,
		// animations:
		costAnim: 1500,
		surface_disappearance: 700,
	},
	text: {
		// alerts, prompts etc:
		rewardContainerClearingMessage: 'The cargo spaceship has depleted the warehouse and it is now ready to store gold.',
		manipulationMessage: function (manipulationType) {
			if (manipulationType == 'devaluation') {
				return 'The warehouse is full!<br>It cannot store any more gold until the cargo spaceship empties it.';
			} else if (manipulationType == 'still_valued' || manipulationType == 'still_valued_post_deval' || manipulationType == 'still_valued_replacing_devaluation') { // i.e., 'still_valued'
				return 'The warehouse is half full...';
			}
		},
		confirmationCodeTextMessage: '\nPlease enter the following letters to confirm that you have read the message: ',
		realGameBegins: 'The real game starts now.<br>The gold you will accumulate from now on is worth real money.<br><br>Good Luck!',
		endExperiment: function (baselineAccumulatedReward) {
			return 'The game is over. Thank you for participating!' + '<br><br>' +
				'You managed to bring to earth '
				+ baselineAccumulatedReward // This was designed to replace the line below.
				// + logic.calculateReward(subData, app_settings.coinCollectionTask, dayToFinishExperiment)
				+ ' Gold units!'
		},
		noConnectionToEndExperiment: 'Unable to connect to the server.' + '<br><br>' +
			'Please verify you have network connection and try again.',
		dialog_coinCollection: "You found a gold cave. There are rocks and gold in the cave. Each attempt to collect an item (clicking) costs 10 gold units. The gold collected will be kept in the warehouse if it has room. Once you enter the cave, you'll have 5 seconds to stay there.",
		dialog_warehouseStateQuery: 'What is the current state of the warehouse?',
		dialog_warehouseStateQuery_allowed_answers: ['partially full', 'completely full'],
		loadingDataError: 'There is a problem!' +
			'<br><br>' +
			'A. Please make sure you are connected to the internet.' +
			'<br>' +
			'B. Try closing the app and reentering.' +
			'<br><br>' +
			"If it is still not working, please contact [NAME] at: [PHONE NUMBER].",
	},
	// Instructions and demo:
	allowInstructions: true, // for debugging purpose.
	allowDemo: true,
	demoCycle: {
		0: { isWin: true, isLoss: false, whichManipulation: null, activateManipulation: false, isUnderManipulation: false, toHideOutcome: false, resetContainer: false, consumptionTest: false },
		1: { isWin: false, isLoss: false, whichManipulation: null, activateManipulation: false, isUnderManipulation: false, toHideOutcome: false, resetContainer: false, consumptionTest: false },
		2: { isWin: false, isLoss: false, whichManipulation: null, activateManipulation: false, isUnderManipulation: false, toHideOutcome: false, resetContainer: false, consumptionTest: true },
		3: { isWin: true, isLoss: false, whichManipulation: 'still_valued', activateManipulation: true, isUnderManipulation: false, toHideOutcome: false, resetContainer: false, consumptionTest: false },
		4: { isWin: true, isLoss: false, whichManipulation: 'devaluation', activateManipulation: true, isUnderManipulation: false, toHideOutcome: false, resetContainer: false, consumptionTest: false },
		5: { isWin: false, isLoss: false, whichManipulation: null, activateManipulation: false, isUnderManipulation: false, toHideOutcome: true, resetContainer: true, consumptionTest: false },
	},
	demoCycleSupportingText: {
		0: {
			a: 'We prepared a demo for you with a virtual screen that simulates a smartphone.<br> Tap the app to launch your spaceship to a gold-seeking mission. First, you will see your spaceship landing, and in the top right corner, the cost of sending the spaceship to the mission will be displayed (-1).',
			b: 'Now tap the bottom half of the screen and then on the top half to remove the ice layer and enable the gold search. After a few seconds of searching, the outcome will be presented.',
			c: 'In this round you have found gold!<br>Immediately afterwards, the end message appears ("See you next time"). When this message appears, it means that the search result has been recorded and you can exit the app. To exit the app in this demo, tap the home button on the virtual smartphone.',
		},
		1: "Now you will enter (and exit) the app a few times and we will demonstrate different task components.<br> You can now enter the app and remove the ice layers.<br> This time you won't find gold (only worthless rocks).",
		2: 'In the next round you will encounter a cave rich in gold.<br>You will receive a message about this and then you will have 5 seconds inside it, during which you can collect from the items in the cave.',
		3: 'In the next entry we will demonstrate receiving a report that the warehouse is half full.',
		4: 'This time we will demonstrate receiving a report that the warehouse is full.',
		5: 'At the beginning of the next round you will receive a report that the cargo spaceship (the one that empties the warehouse on the gold planet every 24 hours) has emptied the warehouse.<br>In addition, it will be cloudy and you will not be able to see the result of your gold search.<br>*Here, too, you would have to wait for the end message so that the search result is recorded.',
	},
	instructionsFileName: 'instructions.html',
	n_instruction_pages: 24,
	lastInstructionsPageExplainsDemo: true,
	instructions_test_questions: {
		toRandomizeQuestions: false,
		dont_know_answer: "I don't know.",
		1: {
			question: 'Is there a cost to enter the app (that is, to try and find gold)?',
			correct_answer: 'Yes, it costs 1 gold unit.',
			distractor_1: 'There is no entry cost, there is a cost only on attempts to collect items in a cave.',
			distractor_2: 'Yes, it costs 15 gold units.',
			distractor_3: 'Yes, the cost varies each time.',
		},
		2: {
			question: 'Does the chance of finding gold vary at certain times?',
			correct_answer: 'No, the chance of finding gold is always the same.',
			distractor_1: 'The chance of finding gold changes all the time.',
			distractor_2: 'The chance of finding gold changes when it is cloudy and it is not possible to see if I found gold.',
			distractor_3: 'If I recently found a lot of gold, the chance of finding more gold is smaller and vice versa.',
		},
		3: {
			question: 'What happens if the warehouse is full?',
			correct_answer: 'It is not possible to accumulate any more gold that will be taken to Earth and converted into real money for me until the warehouse is emptied at the end of the day (at 5:00 AM).',
			distractor_1: 'I will need to directly and immediately send the gold to Earth.',
			distractor_2: 'This means that the game is over.',
			distractor_3: 'The warehouse cannot be filled completely but only partially.',
		},
		4: {
			question: 'What happens if the warehouse is partially full?',
			correct_answer: "Nothing, it's just an update. As long as the warehouse is not completely full, it is possible to continue accumulating gold in it.",
			distractor_1: "It's not something I would know about because there are no reports of the warehouse being only partially full.",
			distractor_2: 'It is not possible to accumulate any more gold that will be taken to Earth and converted into real money for me until the warehouse is emptied at the end of the day (at 5:00 AM).',
			distractor_3: 'I will need to directly and immediately send the gold to Earth.',
		},
		5: {
			question: 'What is the value of the gold piles I can find?',
			correct_answer: '15 gold units.',
			distractor_1: 'The amount varies and will be displayed each time accordingly.',
			distractor_2: '1 gold unit.',
			distractor_3: 'The amount varies and I have no way of knowing it.',
		},
		6: {
			question: 'After I enter the app, when can I exit it so that the search outcome will be counted for me?',
			correct_answer: 'When the end message (saying "See you next time") appears.',
			distractor_1: 'Immediately after I enter.',
			distractor_2: 'Immediately upon the presentation of the search outcome.',
			distractor_3: 'When clouds appear.',
		},
		7: {
			question: "What happens when the gold planet is cloudy and I can't see the search outcomes?",
			correct_answer: 'Everything continues exactly the same. There is no change except for the fact that I cannot see the search outcome.',
			distractor_1: 'The game is not available at these times so it is better to try again later.',
			distractor_2: 'There is no entry cost.',
			distractor_3: "I cannot acquire the gold in the warehouse.",
		},
		8: {
			question: 'How can I earn real money?',
			correct_answer: 'Just enter the app to search for gold. If I find gold and there is room in the warehouse, the gold will be taken to Earth and converted into real money. The more gold I acqire, the more money I will earn.',
			distractor_1: 'It is not possible to earn real money in the game.',
			distractor_2: 'Just enter the app to search for rocks. If I find rocks and there is room in the warehouse, the rocks will be taken to Earth and converted into real money.',
			distractor_3: 'Enter the app and wait as long as possible before I close it. The longer it is continuously open, the more I will earn.',
		},
		9: {
			question: 'How many entries can be made each day?',
			correct_answer: 'As much as desired, but at least 5 entries per day in order to keep the gold planet available (and with it the ability to continue accumulating gold).',
			distractor_1: 'As much as desired, but at least 2 entries per day in order to keep the gold planet available (and with it the ability to continue accumulating gold).',
			distractor_2: 'As much as desired, but at most 100 entries per day in order to keep the gold planet available (and with it the ability to continue accumulating gold).',
			distractor_3: 'As much as desired, but at most 300 entries per day in order to keep the gold planet available (and with it the ability to continue accumulating gold).',
		},
		10: {
			question: 'Which of the following is not true regarding the rich-in-gold caves that I may occasionally encounter?',
			correct_answer: "All of the answers are correct (except for 'I don't know').",
			distractor_1: 'I have only 5 seconds inside the cave, during which I can collect from the items placed in it.',
			distractor_2: 'Each attempt (click) to collect an item inside the cave costs 10 gold units.',
			distractor_3: 'The value of the gold and rock piles is equal to the value of the gold and rock piles in the regular gold searches.',
		},
		11: {
			question: 'What is the duration of the game?',
			correct_answer: 'The duration of the game is not predetermined. It can range from a few days to one month.',
			distractor_1: 'One day.',
			distractor_2: 'A week.',
			distractor_3: 'A month.',
		},
		// [replace_here_ with_a_number]: {
		// 	question: '',
		// 	correct_answer: '',
		// 	distractor_1: '',
		// 	distractor_2: '',
		// 	distractor_3: '',
		// },
	},
	// Meta stuff:
	instructions_HTML_title: 'Instructions',
	instructions_main_HTML_element: "instructions_iframe",
	App_HTML_title: function () { return this.context.replace(/_/g, ' ') },
	App_main_HTML_element: "main_container",
	dataVarList: ["serial", "uniqueEntryID", "subId", "group", "context", "day", "isWin", "isLoss", "reward", "cost", "baselineAccumulatedReward", "resetContainer", "resetContainerConfirmationTime", "manipulationToday", "activateManipulation", "isUnderManipulation", "hideOutcome", "isFirstTime", "todayInitialOutcomes", "startTime", "press1Time", "press2Time", "outcomeTime", "endTime", "manipulationAlertTime", "showInstructions", "instructionsStartedFlag", "completedInstructions", "isDemo", "demoTrialNum", "isDialogOn", "coin_task_finish_status", "endExperiment", "manipulationConfirmationTime", "manipCheckAlertTime", "manipChecConfirmationTime", "localSessionId"],
	// NOTE: the completedInstructions is assigned during the instructions upon success.
}
