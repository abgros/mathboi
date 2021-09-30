// OLDER CODE: THIS IS THE ORIGINAL BOT WRITTEN IN 2018-19

const Discord = require('discord.js');
const client = new Discord.Client();
{{{{{{{{{{
var prefixstr = ",";
var message;

client.on('ready', () => {
    client.user.setActivity(prefixstr + "help", {type: "WATCHING"})
    // PLAYING, STREAMING, LISTENING, WATCHING
})

var commandList = ["help", "add", "a", "subtract", "s", "multiply", "m", "divide", "d", "say", "shout", "mock", "reverse", "b_lasagna", "defaultdance", "yeet", "mutelist"];
var adminList = ["prefix", "kill", "mute", "unmute", "clearmute"];
var helpList = ["List of commands:", "help", "add/a", "subtract/s", "multiply/m", "divide/d", "say", "shout", "mock", "reverse", "b_lasagna", "defaultdance", "yeet", "mutelist", "", "Admin Only:", "prefix", "kill", "mute", "unmute",  "clearmute"];
var muted = [];
var spam = ["weee", "arbek", "wе", "arbеk", "e e e", "w e e"];
var botAdmins = ["330790361100189696"]; // just me

client.on('message', (message) => {
    if (message.author == client.user) { // Prevent bot from responding to its own messages
        return;
    }
	for (i = 0; i < spam.length; i++){
		if (message.content.toLowerCase().includes(spam[i])) {
			console.log("Deleting spam message " + message);
			message.delete();
			return;
		}
	}
	if (muted.includes(message.author.id)){
		message.delete();
		console.log("Deleted message from muted user " + message.author.username + "#" + message.author.discriminator + " " + message);
		return;
	}
	
    if (message.content.startsWith(prefixstr)) {
        processCommand(message);
    }
});

function processCommand(message) {
	
	let command = message.content.substr(prefixstr.length); // Remove the prefix
	let splitCommand = command.split(" "); // Split the message up in to pieces for each space
	let primaryCommand = splitCommand[0]; // The first word directly after the exclamation is the command
	let arguments = splitCommand.slice(1); // All other words are arguments/parameters/options for the command
	
	console.log("Command received: " + primaryCommand);
	console.log("Arguments: " + arguments);
	
	if (commandList.includes(primaryCommand)) {
		eval(primaryCommand + "(arguments, message);");
	}	
	
	if (adminList.includes(primaryCommand)) {
		if (botAdmins.includes(message.author.id.toString())){
			eval(primaryCommand + "(arguments, message);");
		} else {
			message.channel.send("You do not have the authority to perform this command.");			
		}
	}
	
	else {
		return;
	}
};

function filter(arguments, numF, spaceF, spaceN) {
	for (var i = 0; i < arguments.length; i++) {
		if (isNaN(arguments[i]) && numF == true) {
			arguments.splice(i, 1);
		}
		if (arguments[i] == "" && spaceF == true) {
			arguments.splice(i, 1);
		}
		if (arguments[i] == "[sp]" && spaceN == true) {
			console.log(arguments[i]);
			arguments[i] = " "
			console.log(arguments[i]);			
		}
	}		
};

function help(arguments, message){
	message.channel.send(helpList);
};

function add(arguments, message) {
	filter(arguments, true, true, false);
    if (arguments.length < 1) {
        message.channel.send("Add what?");
        return;
    }
    let sum = 0;
	for (var c = 0; c < arguments.length; c++) {
		sum += parseFloat(arguments[c]);
	}
    message.channel.send(sum.toString());
};

function subtract(arguments, message) {
	filter(arguments, true, true, false);
    if (arguments.length < 1) {
        message.channel.send("Subtract what?");
        return;
    }
    let diff = arguments[0];
	for (var c = 1; c < arguments.length; c++) {
		diff -= parseFloat(arguments[c]);
	}
    message.channel.send(diff.toString());
};

function multiply(arguments, message) {
	filter(arguments, true, true, false);
    if (arguments.length < 1) {
        message.channel.send("Multiply what?");
        return;
    }
    let product = 1;
	for (var c = 0; c < arguments.length; c++) {
		product *= parseFloat(arguments[c]);
	}
    message.channel.send(product.toString());
};

function divide(arguments, message) {
	filter(arguments, true, true, false);
    if (arguments.length < 1) {
        message.channel.send("Divide what?");
        return;
    }
    let quotient = arguments[0];
	for (var c = 1; c < arguments.length; c++) {
		quotient /= parseFloat(arguments[c]);
	}
    message.channel.send(quotient.toString());
};

function a(arguments, message){
	add(arguments, message);
}
function s(arguments, message){
	subtract(arguments, message);
}
function m(arguments, message){
	multiply(arguments, message);
}
function d(arguments, message){
	divide(arguments, message);
}

function say(arguments, message) {
	message.channel.send(arguments.join(" "));
};

function shout(arguments, message) {
	message.channel.send(arguments.join(" ").toUpperCase());
};

function mock(arguments, message) {
	let mockery = arguments.join(" ").toLowerCase().split("");
	for (var i = 0; i < mockery.length; i++){
		let randomN = Math.random()
		if (randomN < 0.5){
			mockery[i] = mockery[i].toUpperCase();
		}
	}
	message.channel.send(mockery.join(""));
};

function reverse(arguments, message) {
	if (arguments.length < 1) {
		message.channel.send("Reverse what?");
		return;
	}
	message.channel.send(arguments.join(" ").split("").reverse().join(""));
};

function b_lasagna(arguments, message) {
	message.channel.send([
	"[Intro]",
	"I don't like you T-Series",
	"Nothing personal kid",
	"But I must go all out",
	"Just this once",
	"",
	"[Verse 1]",
	"Bobs or vegana, whichever will it be?",
	"Sit the f*** down T-Series, I'm here to spill the real tea (Uh)",
	"You tryna dethrone me from spot on number one",
	"But you India you lose, so best think you haven't won",
	"When I'm through with you",
	"We're gonna be completely f***in' done",
	"'Cause we only just begun",
	"I review you, *clap clap* zero, bye b****, gone",
	"So come on T-Series, looking hungry for some drama",
	"Here, let me serve you b**** lasagna",
	"",
	"[Chorus]",
	"b**** lasagna, b**** lasagna",
	"T-Series ain't nothing but a b**** lasagna",
	"b**** lasagna, b**** lasagna",
	"Look at T-Series, they just crying for their momma",
	"b**** lasagna, b**** lasagna",
	"T-Series ain't nothing but a b**** lasagna",
	"b**** lasagna, b**** lasagna",
	"T-Series just wet themself in their pajama",
	"",
	"[Verse 2]",
	"So who the h*** is Bob and why you wanna kiss him? (Ew)",
	"I'm a blue eyes white dragon while you're just dark magician (Oof)",
	"You got a fifth of the population in your nation, but",
	"I got nine-year-olds of worlds so hold your defecation (Oops)",
	"Motu Patlu, what the f*** is that even supposed to mean?",
	"Your language sounds like it come from a mumble rap community",
	"No Papa, no Papa, yes Papa; Johny",
	"Now down all of this sugar and let's throw this f***ing party with some—",
	"",
	"[Chorus]",
	"b**** lasagna, b**** lasagna",
	"Look at T-Series, they just crying for their momma",
	"b**** lasagna, b**** lasagna",
	"T-Series ain't nothing but a b**** lasagna",
	"b**** lasagna, b**** lasagna",
	"Look at T-Series they just wet in their pajama",
	"b**** lasagna, b**** lasagna",
	"T-Series ain't nothing but a b**** lasagna",
	"",
	"[Refrain]",
	"You got a population of one point three-two billion",
	"But most your videos can't seem to hit even a million",
	"",
	"[Outro]",
	"Sub-bot!"
	]);	
};

function defaultdance(arguments, message){
	message.channel.send([
"⠀⠀⠀⠀⣀⣤",
"⠀ ⠀⠀⣿⠿⣶",
" ⠀⠀⠀⣿⣿⣀",
"⠀⠀⠀⣶⣶⣿⠿⠛⣶",
"⠤⣀⠛⣿⣿⣿⣿⣿⣿⣭⣿⣤",
"⠒⠀⠀⠀⠉⣿⣿⣿⣿⠀⠀⠉⣀",
"⠀⠤⣤⣤⣀⣿⣿⣿⣿⣀⠀⠀⣿",
"⠀⠀⠛⣿⣿⣿⣿⣿⣿⣿⣭⣶⠉",
"⠀⠀⠀⠤⣿⣿⣿⣿⣿⣿⣿",
"⠀⠀⠀⣭⣿⣿⣿⠀⣿⣿⣿",
"⠀⠀⠀⣉⣿⣿⠿⠀⠿⣿⣿",
"⠀⠀⠀⠀⣿⣿⠀⠀⠀⣿⣿⣤",
"⠀⠀⠀⣀⣿⣿⠀⠀⠀⣿⣿⣿",
"⠀⠀⠀⣿⣿⣿⠀⠀⠀⣿⣿⣿",
"⠀⠀⠀⣿⣿⠛⠀⠀⠀⠉⣿⣿",
"⠀⠀⠀⠉⣿⠀⠀⠀⠀⠀⠛⣿",
"⠀⠀⠀⠀⣿⠀⠀⠀⠀⠀⠀⣿⣿",
"⠀⠀⠀⠀⣛⠀⠀⠀⠀⠀⠀⠛⠿⠿⠿",
"⠀⠀⠀⠛⠛",
"",
"⠀⠀⠀⣀⣶⣀",
"⠀⠀⠀⠒⣛⣭",
"⠀⠀⠀⣀⠿⣿⣶",
"⠀⣤⣿⠤⣭⣿⣿",
"⣤⣿⣿⣿⠛⣿⣿⠀⣀",
"⠀⣀⠤⣿⣿⣶⣤⣒⣛",
"⠉⠀⣀⣿⣿⣿⣿⣭⠉",
"⠀⠀⣭⣿⣿⠿⠿⣿",
"⠀⣶⣿⣿⠛⠀⣿⣿",
"⣤⣿⣿⠉⠤⣿⣿⠿",
"⣿⣿⠛⠀⠿⣿⣿",
"⣿⣿⣤⠀⣿⣿⠿",
"⠀⣿⣿⣶⠀⣿⣿⣶",
"⠀⠀⠛⣿⠀⠿⣿⣿",
"⠀⠀⠀⣉⣿⠀⣿⣿",
"⠀⠶⣶⠿⠛⠀⠉⣿",
"⠀⠀⠀⠀⠀⠀⣀⣿",
"⠀⠀⠀⠀⠀⣶⣿⠿",
"",
"⠀⠀⠀⠀⠀⠀⠀⠀⣤⣿⣿⠶⠀⠀⣀⣀",
"⠀⠀⠀⠀⠀⠀⣀⣀⣤⣤⣶⣿⣿⣿⣿⣿⣿",
"⠀⠀⣀⣶⣤⣤⠿⠶⠿⠿⠿⣿⣿⣿⣉⣿⣿",
"⠿⣉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠛⣤⣿⣿⣿⣀",
"⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⣿⣿⣿⣿⣶⣤",
"⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣤⣿⣿⣿⣿⠿⣛⣿",
"⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⠛⣿⣿⣿⣿",
"⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣶⣿⣿⠿⠀⣿⣿⣿⠛",
"⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⠀⠀⣿⣿⣿",
"⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠿⠿⣿⠀⠀⣿⣶",
"⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⠛⠀⠀⣿⣿⣶",
"⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⣿⣿⠤",
"⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠿⣿",
"⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿",
"⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣀",
"⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣶⣿",
"",
"⠀⠀⣀",
"⠀⠿⣿⣿⣀",
"⠀⠉⣿⣿⣀",
"⠀⠀⠛⣿⣭⣀⣀⣤",
"⠀⠀⣿⣿⣿⣿⣿⠛⠿⣶⣀",
"⠀⣿⣿⣿⣿⣿⣿⠀⠀⠀⣉⣶",
"⠀⠀⠉⣿⣿⣿⣿⣀⠀⠀⣿⠉",
"⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿",
"⠀⣀⣿⣿⣿⣿⣿⣿⣿⣿⠿",
"⠀⣿⣿⣿⠿⠉⣿⣿⣿⣿",
"⠀⣿⣿⠿⠀⠀⣿⣿⣿⣿",
"⣶⣿⣿⠀⠀⠀⠀⣿⣿⣿",
"⠛⣿⣿⣀⠀⠀⠀⣿⣿⣿⣿⣶⣀",
"⠀⣿⣿⠉⠀⠀⠀⠉⠉⠉⠛⠛⠿⣿⣶",
"⠀⠀⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣿",
"⠀⠀⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉",
"⣀⣶⣿⠛",
"",
"⠀⠀⠀⠀⠀⠀⠀⣀⣀",
"⠀⠀⠀⠀⠀⠀⣿⣿⣿⣤⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣤⣤⣿",
"⠀⠀⠀⠀⠀⠀⠉⣿⣿⣿⣶⣿⣿⣿⣶⣶⣤⣶⣶⠶⠛⠉⠉",
"⠀⠀⠀⠀⠀⠀⣤⣿⠿⣿⣿⣿⣿⣿⠀⠀⠉",
"⠛⣿⣤⣤⣀⣤⠿⠉⠀⠉⣿⣿⣿⣿",
"⠀⠉⠉⠉⠉⠉⠀⠀⠀⠀⠉⣿⣿⣿⣀",
"⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣶⣿⣿⣿⣿⣿",
"⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿",
"⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⠛",
"⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿",
"⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣛⣿⣿",
"⠀⠀⠀⠀⠀⠀⠀⣶⣿⣿⠛⠿⣿⣿⣿⣶⣤",
"⠀⠀⠀⠀⠀⠀⠀⣿⠛⠉⠀⠀⠀⠛⠿⣿⣿⣶⣀",
"⠀⠀⠀⠀⠀⠀⣿⣀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠛⠿⣶⣤",
"⠀⠀⠀⠀⠀⠛⠿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣿⣿⠿",
"⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠛⠉⠉",
"",
"⠀⠀⠀⠀⠀⠀⣤⣶⣶",
"⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣀⣀",
"⠀⠀⠀⠀⠀⣀⣶⣿⣿⣿⣿⣿⣿",
"⣤⣶⣀⠿⠶⣿⣿⣿⠿⣿⣿⣿⣿",
"⠉⠿⣿⣿⠿⠛⠉⠀⣿⣿⣿⣿⣿",
"⠀⠀⠉⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣤⣤",
"⠀⠀⠀⠀⠀⠀⠀⣤⣶⣿⣿⣿⣿⣿⣿",
"⠀⠀⠀⠀⠀⣀⣿⣿⣿⣿⣿⠿⣿⣿⣿⣿",
"⠀⠀⠀⠀⣀⣿⣿⣿⠿⠉⠀⠀⣿⣿⣿⣿",
"⠀⠀⠀⣿⣿⠿⠉⠀⠀⠀⠀⠿⣿⣿⠛",
"⠀⠀⠀⠀⠛⣿⣿⣀⠀⠀⠀⠀⠀⣿⣿⣀",
"⠀⠀⠀⠀⠀⣿⣿⣿⠀⠀⠀⠀⠀⠿⣿⣿",
"⠀⠀⠀⠀⠀⠉⣿⣿⠀⠀⠀⠀⠀⠀⠉⣿",
"⠀⠀⠀⠀⠀⠀⠀⣿⠀⠀⠀⠀⠀⠀⣀⣿",
"⠀⠀⠀⠀⠀⠀⣀⣿⣿",
"⠀⠀⠀⠀⠤⣿⠿⠿⠿",
""]); //splitting due to 2000 character limit
	message.channel.send([
"⠀⠀⠀⠀⣀",
"⠀⠀⣶⣿⠿⠀⠀⠀⣀⠀⣤⣤",
"⠀⣶⣿⠀⠀⠀⠀⣿⣿⣿⠛⠛⠿⣤⣀",
"⣶⣿⣤⣤⣤⣤⣤⣿⣿⣿⣀⣤⣶⣭⣿⣶⣀",
"⠉⠉⠉⠛⠛⠿⣿⣿⣿⣿⣿⣿⣿⠛⠛⠿⠿",
"⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⠿",
"⠀⠀⠀⠀⠀⠀⠀⠿⣿⣿⣿⣿",
"⠀⠀⠀⠀⠀⠀⠀⠀⣭⣿⣿⣿⣿⣿",
"⠀⠀⠀⠀⠀⠀⠀⣤⣿⣿⣿⣿⣿⣿",
"⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⠿",
"⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⠿",
"⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿",
"⠀⠀⠀⠀⠀⠀⠀⠉⣿⣿⣿⣿",
"⠀⠀⠀⠀⠀⠀⠀⠀⠉⣿⣿⣿⣿",
"⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⣿⠛⠿⣿⣤",
"⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣿⠀⠀⠀⣿⣿⣤",
"⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⠀⠀⠀⣶⣿⠛⠉",
"⠀⠀⠀⠀⠀⠀⠀⠀⣤⣿⣿⠀⠀⠉",
"⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉",
"",
"     ⣶⣿⣶",
"⠀⠀⠀⣤⣤⣤⣿⣿⣿",
"⠀⠀⣶⣿⣿⣿⣿⣿⣿⣿⣶",
"⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿",
"⠀⠀⣿⣉⣿⣿⣿⣿⣉⠉⣿⣶",
"⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⠿⣿",
"⣤⣿⣿⣿⣿⣿⣿⣿⠿⠀⣿⣶",
"⣤⣿⠿⣿⣿⣿⣿⣿⠿⠀⠀⣿⣿⣤",
"⠉⠉⠀⣿⣿⣿⣿⣿⠀⠀⠒⠛⠿⠿⠿",
"⠀⠀⠀⠉⣿⣿⣿⠀⠀⠀⠀⠀⠀⠉",
"⠀⠀⠀⣿⣿⣿⣿⣿⣶",
"⠀⠀⠀⠀⣿⠉⠿⣿⣿",
"⠀⠀⠀⠀⣿⣤⠀⠛⣿⣿",
"⠀⠀⠀⠀⣶⣿⠀⠀⠀⣿⣶",
"⠀⠀⠀⠀⠀⠀⠀⠀⠀⣭⣿⣿",
"⠀⠀⠀⠀⠀⠀⠀⠀⣤⣿⣿⠉",
"",
"⠀⠀⠀⠀⠀⠀⠀⠀⠀⣤⣶",
"⠀⠀⠀⠀⠀⣀⣀⠀⣶⣿⣿⠶",
"⣶⣿⠿⣿⣿⣿⣿⣿⣿⣿⣿⣤⣤",
"⠀⠉⠶⣶⣀⣿⣿⣿⣿⣿⣿⣿⠿⣿⣤⣀",
"⠀⠀⠀⣿⣿⠿⠉⣿⣿⣿⣿⣭⠀⠶⠿⠿",
"⠀⠀⠛⠛⠿⠀⠀⣿⣿⣿⣉⠿⣿⠶",
"⠀⠀⠀⠀⠀⣤⣶⣿⣿⣿⣿⣿",
"⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⠒",
"⠀⠀⠀⠀⣀⣿⣿⣿⣿⣿⣿⣿",
"⠀⠀⠀⠀⠀⣿⣿⣿⠛⣭⣭⠉",
"⠀⠀⠀⠀⠀⣿⣿⣭⣤⣿⠛",
"⠀⠀⠀⠀⠀⠛⠿⣿⣿⣿⣭",
"⠀⠀⠀⠀⠀⠀⠀⣿⣿⠉⠛⠿⣶⣤",
"⠀⠀⠀⠀⠀⠀⣀⣿⠀⠀⣶⣶⠿⠿⠿",
"⠀⠀⠀⠀⠀⠀⣿⠛",
"⠀⠀⠀⠀⠀⠀⣭⣶",
"",
"⠀⠀⠀⠀⠀⠀⠀⠀⠀⣤⣤",
"⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿",
"⠀⠀⣶⠀⠀⣀⣤⣶⣤⣉⣿⣿⣤⣀",
"⠤⣤⣿⣤⣿⠿⠿⣿⣿⣿⣿⣿⣿⣿⣿⣀",
"⠀⠛⠿⠀⠀⠀⠀⠉⣿⣿⣿⣿⣿⠉⠛⠿⣿⣤",
"⠀⠀⠀⠀⠀⠀⠀⠀⠿⣿⣿⣿⠛⠀⠀⠀⣶⠿",
"⠀⠀⠀⠀⠀⠀⠀⠀⣀⣿⣿⣿⣿⣤⠀⣿⠿",
"⠀⠀⠀⠀⠀⠀⠀⣶⣿⣿⣿⣿⣿⣿⣿⣿",
"⠀⠀⠀⠀⠀⠀⠀⠿⣿⣿⣿⣿⣿⠿⠉⠉",
"⠀⠀⠀⠀⠀⠀⠀⠉⣿⣿⣿⣿⠿",
"⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⠉",
"⠀⠀⠀⠀⠀⠀⠀⠀⣛⣿⣭⣶⣀",
"⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿",
"⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⠉⠛⣿",
"⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⠀⠀⣿⣿",
"⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣉⠀⣶⠿",
"⠀⠀⠀⠀⠀⠀⠀⠀⣶⣿⠿",
"⠀⠀⠀⠀⠀⠀⠀⠛⠿⠛",
"",
"⠀⠀⠀⣶⣿⣶",
"⠀⠀⠀⣿⣿⣿⣀",
"⠀⣀⣿⣿⣿⣿⣿⣿",
"⣶⣿⠛⣭⣿⣿⣿⣿",
"⠛⠛⠛⣿⣿⣿⣿⠿",
"⠀⠀⠀⠀⣿⣿⣿",
"⠀⠀⣀⣭⣿⣿⣿⣿⣀",
"⠀⠤⣿⣿⣿⣿⣿⣿⠉",
"⠀⣿⣿⣿⣿⣿⣿⠉",
"⣿⣿⣿⣿⣿⣿",
"⣿⣿⣶⣿⣿",
"⠉⠛⣿⣿⣶⣤",
"⠀⠀⠉⠿⣿⣿⣤",
"⠀⠀⣀⣤⣿⣿⣿",
"⠀⠒⠿⠛⠉⠿⣿",
"⠀⠀⠀⠀⠀⣀⣿⣿",
"⠀⠀⠀⠀⣶⠿⠿⠛"
]);
};

function yeet(arguments, message){
	message.channel.send([
"To yeet, or not to yeet--that is the question:",
"Whether 'tis danker in the mind to yeet",
"The slings and arrows of dank fortune",
"Or to yeet arms against a sea of troubles",
"And by yeeting yeet them. To yeet, to yeet--",
"No more--and by a sleep to yeet we yeet",
"The heartache, and the thousand dank shocks",
"That flesh yeets heir to. 'Tis a consummation",
"Devoutly to yeet yeeted. To yeet, to yeet--",
"To yeet--perchance to yeet: ay, there’s the rub,",
"For in that sleep of death what dreams may yeet",
"When we have yeeted off this dank coil,",
"Must yeet us pause. There yeets the respect",
"That yeets calamity of so dank life.",
"For who would yeet the whips and scorns of time,",
"Th' oppressor yeets wrong, the dank man's contumely",
"The pangs of dank love, the law's delay,",
"The insolence of office, and the spurns",
"That dank merit of th' dank takes,",
"When he himself might his quietus yeet",
"With a dank bodkin? Who would fardels yeet,",
"To yeet and yeet under a dank life,",
"But that the dread of something after death,",
"The dank country, from whose bourn",
"No traveller yeets, yeets the will,",
"And yeets us rather yeet those ills we yeet",
"Than yeet to others that we yeet not of?",
"Thus conscience does yeet cowards of us all,",
"And thus the dank hue of resolution",
"Is yeeted o'er with the dank cast of thought,",
"And enterprise of dank pitch and moment",
"With this regard their currents yeet dank",
"And yeet the name of action. -- Soft you now",
"The dank Ophelia! -- Nymph, in thy orisons",
"Yeet all my sins yeeted."]);
};

function prefix(arguments, message) {
	filter(arguments, false, true, true);
	if (arguments.length < 1){
		message.channel.send("What prefix?");
		return;
	} 
	prefixstr = arguments.join("");
	message.channel.send("Set prefix to " + prefixstr);
	client.user.setActivity(prefixstr + "help", {type: "WATCHING"});
};

function mute(arguments, message){
	let id = arguments[0].substring(2, arguments[0].length-1);
	id = id.replace("!", "");
	if (!(message.guild.member(id))) {
		message.channel.send(arguments[0] + " is not a valid id.");
		return;
	}
	if (botAdmins.includes(id)){
		message.channel.send(client.users.get(id).username + "#" + client.users.get(id).discriminator + " is an admin.");
		console.log("Cannot mute admins.");
		return;
	}
	console.log("Found id " + id);
	if (muted.includes(id)){
		message.channel.send(client.users.get(id).username + " is already muted!");
	} else {
		muted.push(id);
		message.channel.send("Muting " + client.users.get(id).username);
		console.log("Muted ids: " + muted);
	}
};

function unmute(arguments, message){
	let id = arguments[0].substring(2, arguments[0].length-1);
	id = id.replace("!", "");
	if (!(message.guild.member(id))) {
		message.channel.send(arguments[0] + " is not a valid id.");
		return;
	}
	console.log("Found id " + id);
	if (muted.includes(id)){
		muted.splice(muted.indexOf(id), 1);
		message.channel.send(client.users.get(id).username + " is no longer muted");
		console.log("Muted ids: " + muted);
	} else {
		message.channel.send(client.users.get(id).username + " is not muted.");
	}
};

function mutelist(arguments, message){
	if (muted.length == 0){
		message.channel.send("No one is muted");
		return;
	}
	message.channel.send("Muted list:");
	for (i = 0; i < muted.length; i++){
		message.channel.send(client.users.get(muted[i]).username + "#" + client.users.get(muted[i]).discriminator);
	}
};

function clearmute(arguments, message){
	mutes = [];
	console.log("Clearing mutes.");
	message.channel.send("Clearing mutes");
};

function kill(arguments, message){
	console.log("Exiting.");
	exit();
};

bot_secret_token = "[secret]";
client.login(bot_secret_token);
