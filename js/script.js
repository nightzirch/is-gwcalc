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
	// Models
	vm: null,
	
	// Ready functions
	ready: function() {
		// Applies the view model to #is-gwcalc
		ml.vm = new ml.MistLeagueViewModel();
		ko.applyBindings(ml.vm, ml.find("#isgw2calc"));
		
		// Initialize tabs
		$("#build").tabs();
		$(".selectionArea").tabs();
		
		// Initialize the scrollbar and move it up in the DOM
		$(".selectionAreaContent").sbscroller({
			handleImage: ml.obj.pluginUrl + 'images/scrollbar/handleImage-16x32.png',
			handleTopImage: ml.obj.pluginUrl + 'images/scrollbar/handleTopImage-16x9.png',
			handleBottomImage: ml.obj.pluginUrl + 'images/scrollbar/handleBottomImage-16x9.png',
			handleGripImage: ml.obj.pluginUrl + 'images/scrollbar/handleGripImage-16x8.png'
		});
		var sliderWrap = $(".slider-wrap");
		sliderWrap.parent().parent().append(sliderWrap);
		
		// Calling all the listeners
		ml.listener.all();
		
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
	
	// Listeners
	listener: {
		all: function() {
			// Refresh the scroll
			ml.listener.scrollRefresh();
			ml.listener.armorSlot();
			ml.listener.amuletSlot();
			ml.listener.selectionArea.close();
			ml.listener.selectionArea.rune();
			ml.listener.selectionArea.amulet();
		},
		scrollRefresh: function() {
			$('.selectionAreaNav li a').bind('click', function(e) {
				$('.selectionAreaContent').sbscroller('refresh');
			});
		},
		armorSlot: function() {
			$('.armor').bind('click', function(){
				var dataActive = $(this).attr('data-active');
				var container = $('.selectionArea');
				
				// If container is not visible, make it visible
				if ($(container).hasClass("hide")) {
					$(container).removeClass("hide").addClass("show");
				}
				
				// if another armor slot is .active, remove .active
				// and make this .active
				if (!$(this).hasClass("active")) {
					$('.armor.active').removeClass('active');
					$(this).addClass('active');
				}
				else {
					// Something
				}
				
				// Sets data-active to the clicked armorSlot
				$(container).attr('data-active', dataActive);
			});
		},
		amuletSlot: function() {
			$('.amulet').bind('click', function(){
				var dataActive = $(this).attr('data-active');
				var container = $('.selectionArea');
				
				// If container is not visible, make it visible
				if ($(container).hasClass("hide")) {
					$(container).removeClass("hide").addClass("show");
				}
				
				// Sets data-active to the clicked armorSlot
				$(container).attr('data-active', dataActive);
			});
		},
		selectionArea: {
			close: function() {
				$('.selectionAreaNavContainer .close').bind('click', function(){
					ml.ops.selectionArea.close();
					$('.armor.active').removeClass('active');
				});
			},
			rune: function() {
				// Click events
				$('#selectionAreaRunes img').on('click', function() {
					var container = $('.selectionArea');
					var dataActive = $(container).attr("data-active");
					var activeSlot = $(".armor[data-active=" + dataActive + "]");
					var runeSlot = $(activeSlot).find(".rune-slot");
					var dataId = $(this).attr("data-id");
					
					// Sets the attribute data-id of the .armor-container
					$(activeSlot).attr('data-rune', dataId);
					
					// Sets the background image of the runeSlot to match the selected rune
					$(runeSlot).attr('style', "background-image: url("  + ml.obj.pluginUrl + "images/runes/" + dataId  + ".jpg)");
				})
				// Double click
				.on('dblclick', function() {
					var allRuneSlots = $(".rune-slot");
					var allArmorSlots = $('.armor.armor-container');
					var dataId = $(this).attr("data-id");
					
					$(allArmorSlots).attr('data-rune', dataId);
					$(allRuneSlots).attr('style', "background-image: url("  + ml.obj.pluginUrl + "images/runes/" + dataId  + ".jpg)");
				});
			},
			amulet: function() {
				// Click events
				$('#selectionAreaAmulets img').on('click', function() {
					var container = $('.selectionArea');
					var dataActive = $(container).attr("data-active");
					var activeSlot = $(".amulet[data-active=" + dataActive + "]");
					var amuletSlot = $(activeSlot).find(".amulet-slot");
					var dataId = $(this).attr("data-id");
					
					// Sets the attribute data-id of the .armor-container
					$(activeSlot).attr('data-amulet', dataId);
					
					// Sets the background image of the runeSlot to match the selected rune
					$(amuletSlot).attr('style', "background-image: url("  + ml.obj.pluginUrl + "images/amulets/" + dataId  + ".png)");
				})
				// Double click
				.on('dblclick', function() {
					var container = $('.selectionArea');
					var dataActive = $(container).attr("data-active");
					var activeSlot = $(".amulet[data-active=" + dataActive + "]");
					var jewelSlot = $(activeSlot).find(".jewel-slot");
					var dataId = $(this).attr("data-id");
					
					// Sets the attribute data-jewel of the .armor-container.
					// data-amulet is already set from the click listener
					$(activeSlot).attr('data-jewel', dataId);
					
					// Sets the background image of the runeSlot to match the selected rune
					$(jewelSlot).attr('style', "background-image: url("  + ml.obj.pluginUrl + "images/jewels/" + dataId  + ".jpg)");
				});
			}
		}
	},
	
	// Operations
	ops: {
		attributeProfession: function() {
			// Changes .traits-profession into the according class name
			$(".traits-profession").removeClass("traits-profession").addClass("traits-" + ml.general.uncapitalize(ml.obj.currentProfessionName));
		},
		selectionArea: {
			close: function() {
				var container = $('.selectionArea');
					
				// Make the container hidden
				$(container).removeClass("show").addClass("hide");
				
				// Sets data-active to the clicked armorSlot
				$(container).attr('data-active', "");
			}
		},
		getRuneId: function(armor) {
			return parseInt($('.' + armor + '-container').attr('data-rune'));
		},
		searchRunes: function(id) {
			for(var i = 0; i < runes.length; i++) {
				return (parseInt(runes[i].id) == id) ? runes[i] : false;
			}
		},
		getAmuletId: function() {
			return parseInt($('.amulet-container').attr('data-amulet'));
		},
		getJewelId: function() {
			return parseInt($('.amulet-container').attr('data-jewel'));
		},

		traitPlus: function(i) {
		    if (ml.vm.traitPoints() > 0)
		    {        
		        if (ml.vm['traitLine'+i]() < 30)
		        {
		            ml.vm.traitPoints(ml.vm.traitPoints() - 5)
		            ml.vm['traitLine'+i](ml.vm['traitLine'+i]() + 5);
		        }
		    }
		},

		traitMinus: function(i) {
		    if (ml.vm.traitPoints() < 70)
		    {        
		        if (ml.vm['traitLine'+i]() > 0)
		        {
		            ml.vm.traitPoints(ml.vm.traitPoints() + 5)
		            ml.vm['traitLine'+i](ml.vm['traitLine'+i]() - 5);
		        }  
		    }
		},

		//Refunds all trait points
		traitsRefund: function() {
		    ml.vm.traitPoints(70);

		    for (i=1;i<=5;i++)
		    {
		    	ml.vm['traitLine'+i](0); 
		    }
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


		///Traits

		//Total trait points
		self.traitPoints = ko.observable(70);

		//Points per line
		self.traitLine1 = ko.observable(0);
		self.traitLine2 = ko.observable(0);
		self.traitLine3 = ko.observable(0);
		self.traitLine4 = ko.observable(0);
		self.traitLine5 = ko.observable(0);

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
	},
	
	// Runes Model
	RunesModel: function() {
		return [
			{
				id: ml.ops.getRuneId('helmet'),
				slot: 'helmet',
				rune: ml.ops.searchRunes(ml.ops.getRuneId('helmet'))
			},
			{
				id: ml.ops.getRuneId('shoulders'),
				slot: 'shoulders',
				rune: ml.ops.searchRunes(ml.ops.getRuneId('shoulders'))
			},
			{
				id: ml.ops.getRuneId('chest'),
				slot: 'chest',
				rune: ml.ops.searchRunes(ml.ops.getRuneId('chest'))
			},
			{
				id: ml.ops.getRuneId('gloves'),
				slot: 'gloves',
				rune: ml.ops.searchRunes(ml.ops.getRuneId('gloves'))
			},
			{
				id: ml.ops.getRuneId('leggings'),
				slot: 'leggings',
				rune: ml.ops.searchRunes(ml.ops.getRuneId('leggings'))
			},
			{
				id: ml.ops.getRuneId('boots'),
				slot: 'boots',
				rune: ml.ops.searchRunes(ml.ops.getRuneId('boots'))
			}
		]
	},
	
	// Stats Model
	StatsModel: function() {
		var self = this;
		
		// Primary attributes
		self.power = ml.vm.attributePower();
		self.precision = ml.vm.attributePrecision();
		self.toughness = ml.vm.attributeToughness();
		self.vitality = ml.vm.attributeVitality();
		
		// Secondary attributes
		self.armor = ml.vm.attributeArmor();
		self.attack = ml.vm.attributeAttack();
		self.boonDuration = ml.vm.attributeBoonDuration();
		self.conditionDamage = ml.vm.attributeConditionDamage();
		self.conditionDuration = ml.vm.attributeConditionDuration();
		self.criticalChance = ml.vm.attributeCriticalChance();
		self.criticalDamage = ml.vm.attributeCriticalDamage();
		self.healingPower = ml.vm.attributeHealingPower();
		self.health = ml.vm.attributeHealth();
	},
	
	AccsessoryModel: function() {
		
	},
	
	// Get runes
	runes: function() {
		// Creates a new instance
		var runes = new ml.RunesModel();
		
		return runes;
	},
	
	// Get stats
	stats: function() {
		// Creates a new instance
		var stats = new ml.StatsModel();
		
		return stats;
	},
	
	// Get amulet
	amulet: function() {
		// Creates a new instance
		var amulet = new ml.AmuletModel();
		
		return amulet;
	},
	
	// Slider
	slider: function() {
		
	}


}

//Holds invested trait points


function calculate()
{
	
}