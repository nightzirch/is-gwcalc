/*
	A rework of Ivica Sertic's script for
	the Guild Wars 2 build calculator

	By Christian Grimsgaard and Ivica Sertic

	For Mist League (mistleague.com)
*/

// Document ready
$(document).ready(function() {
	// Calls ML's ready function
	ml.ready();
});

// Creates a new name space
var ml = {
	// View Model
	vm: null,
	
	// Ready functions
	ready: function() {
		// Applies the view model to #is-gwcalc
		ml.vm = new ml.MistLeagueViewModel();
		ko.applyBindings(ml.vm, ml.find("#isgw2calc"));
		
		// Initialize tabs
		$("#build").tabs();
		
		// Changes the profession attribute icon
		ml.ops.attributeProfession();
	},
	
	// Equal to jQuery's way of finding DOM elements,
	// but using pure JS
	find: function(el, parent) {
        if (parent) {
            return parent.querySelector(el);
        }
        else {
            return document.querySelector(el);
        }
    },
	
	// General functions
	general: {
		capitalize: function(str) {
			return str.charAt(0).toUpperCase() + str.slice(1);
		},
		uncapitalize: function(str) {
			return str.charAt(0).toLowerCase() + str.slice(1);
		},
		dotify: function(str, separator) {
			// Put the string into an array, splitting at each letter
			var arr = new Array();
			
			// Creates a helper so we don't skip any elements in arr
			var dotted = false;
			
			for(var i = 0; i <= str.length; i++) {
				// if it's time to put in a dot
				if((i+2)%3 == 0 && i != 1 && !dotted) {
					// Adds a dot to the array
					// or if a separator is specified
					// use the separator
					if(!separator) {
						arr.push(".");
					}
					else {
						arr.push(separator);
					}
					
					// Sets dotted to true so we can subtract 1 from i
					// and not create an infinite loop
					dotted = true;
					i--;
				}
				
				// else it's just time to put in the letters
				else {
					arr.push(str.substr(str.length - i, 1));
					
					// Sets dotted back to false
					dotted = false;
				}
			}
			
			// Reverse, stringify and return
			arr.reverse();
			str = arr.join("");
			return str;
		}
	},
	
	// Operations
	ops: {
		attributeProfession: function() {
			// Changes .traits-profession into the according class name
			$(".traits-profession").removeClass("traits-profession").addClass("traits-" + ml.general.uncapitalize(ml.obj.currentProfessionName));
		}
	},
	
	// Objects
	obj: {
		professions: professions,
		currentProfession: currentProfession,
		currentProfessionName: currentProfessionName,
		weapons: weapons,
		trinkets: trinkets,
		orbs: orbs,
		runes: runes,
		sigils: sigils,
		pluginUrl: pluginUrl
	},
	
	// View Model
	MistLeagueViewModel: function() {
		var self = this;
		
		// Primary Attributes
		self.attributePower = ko.observable(916);
		self.attributePrecision = ko.observable(916);
		self.attributeToughness = ko.observable(916);
		self.attributeVitality = ko.observable(916);
		
		// Secondary Attributes
		self.attributeBoonDuration = ko.observable(0 + "%");
		self.attributeProfession = ko.observable(0);
		self.attributeConditionDamage = ko.observable(0);
		self.attributeConditionDuration = ko.observable(0 + "%");
		self.attributeCriticalDamage = ko.observable(0);
		self.attributeHealingPower = ko.observable(0);
		
		self.attributeArmor = ko.computed(function() {
			var baseArmor = parseInt(ml.obj.currentProfession[0].armor);
			var toughness = self.attributeToughness();
			var armor = baseArmor + toughness;
			return armor;
		});
		
		self.attributeAttack = ko.computed(function() {
			return 0;
		});
		
		self.attributeCriticalChance = ko.computed(function() {
			return 0 + "%";
		});
		
		self.attributeHealth = ko.computed(function() {
			var baseHealth = parseInt(ml.obj.currentProfession[0].health);
			var vitality = self.attributeVitality() * 10;
			var health = baseHealth + vitality;
			
			// Applies spacing between letters to format the number
			// health = ml.general.dotify(health.toString(), " ");
			
			return health;
		});
	}
}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	