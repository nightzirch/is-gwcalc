/*
	A rework of Ivica Sertic's script for
	the Guild Wars 2 build calculator

	By Christian Grimsgaard and Ivica Sertic

	For Mist League (mistleague.com)
*/

// Document ready
jQuery(document).ready(function() {
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
		jQuery("#build").tabs();
		jQuery(".selectionArea").tabs();
		
		//activates major traits picker
		jQuery('.trait_major').cluetip(
		{
			local:true,
			cursor: 'pointer',
			activation: 'click',
			leftOffset:5,
			multiple:true,
			onShow: function(ct) {
				jQuery('.cluetip-inner').removeClass('ui-widget-content');
				jQuery('#cluetip').removeClass('ui-widget ui-widget-content'); 
				// jQuery(document).one('mousedown',function() { 
				//  	jQuery(ct).hide();
				// });

				jQuery('.trait_tooltip').cluetip(
				{
					local:true,
					showTitle: false,
					dropShadows: false,
					tracking: true,
					leftOffset: 3,
					multiple: true,
					cluezIndex: 98,
					onActivate: function() {
						jQuery('.cluetip-inner').removeClass('ui-widget-content');
						jQuery('#cluetip').removeClass('ui-widget ui-widget-content');
						var data = jQuery(this).attr('data-id');
						data = data.split(':');

						var item = jQuery.grep(ml.obj[data[0]], function(e){ return e.id == parseInt(data[1]); });
						jQuery('#tooltip .tooltip_title').html('<span class="'+data[0]+'_title">'+item[0].name+'</span>');
						jQuery('#tooltip .tooltip_content').html(item[0].description);
					}
				});

			}
		});

		//tooltip generator
		jQuery('.tooltip').cluetip(
		{
			local:true,
			showTitle: false,
			dropShadows: false,
			tracking: true,
			leftOffset: 3,
			multiple: true,
			cluezIndex: 98,
			onActivate: function() {
				jQuery('.cluetip-inner').removeClass('ui-widget-content');
				jQuery('#cluetip').removeClass('ui-widget ui-widget-content');
				var data = jQuery(this).attr('data-id');
				data = data.split(':');

				var item = jQuery.grep(ml.obj[data[0]], function(e){ return e.id == parseInt(data[1]); });
				
				if( data[0] == 'traits') {
					jQuery('#tooltip .tooltip_title').html('<span class="'+data[0]+'_title">'+item[0].name+'</span>');
					jQuery('#tooltip .tooltip_content').html(item[0].description);
				}
				else if (data[0] == 'weapons') {
						jQuery('#tooltip .tooltip_title').html('<span class="'+data[0]+'_title">'+item[0].name+'</span>');
						jQuery('#tooltip .tooltip_content').html('<span>Damage: </span><span class="weapons_stats">'+item[0].stats+'</span>');
				}
				else {
					if (data[0] == "trinkets") {data[0] = 'amulets'}
					jQuery('#tooltip .tooltip_title').html('<img height="34px" src="'+ml.obj.pluginUrl+'/images/'+data[0]+'/'+item[0].id+'.jpg" style="margin-right:5px;" /><span style="vertical-align:top;padding-left:5px;" class="'+data[0]+'_title">'+item[0].name+'</span>');

					if (data[0] == 'sigils') {
						jQuery('#tooltip .tooltip_content').html(item[0].stats);
					}
					else if (data[0] == 'runes') {
						stats = item[0].stats;
						stats = stats.split(';');
						jQuery('#tooltip .tooltip_content').html('<ul class="rune_stats"></ul>');
						for (var x = 0;x<stats.length;x++)
						{
							jQuery('.rune_stats').append('<li>('+(x+1)+') '+stats[x]+'</li>')
						}
					}
					else if (data[0] == 'amulets' || data[0] == 'orbs') {
						stats = item[0].stats;
						stats = stats.split(';');
						if (data[0]=='orbs'){data[0] = 'jewels'}
						jQuery('#tooltip .tooltip_content').html('<ul class="stats_'+data[0]+'"></ul>');
						for (var x = 0;x<stats.length;x++)
						{
							jQuery('.stats_'+data[0]).append('<li>'+stats[x]+'</li>')
						}
					}
				}
			}

		});
	
		// Initialize accordions
		/*jQuery("#selectionAreaCombat").accordion({
			header: "div.accordionHeader",
			active: true,
			collapsible: true,
			heightStyle: "content",
			activate: function( event, ui ) {
				ml.scroll.refresh();
			}
		});*/
		
		// Initialize the scrollbar and move it up in the DOM
		jQuery(".selectionAreaContent").sbscroller({
			handleImage: ml.obj.pluginUrl + 'images/scrollbar/handleImage-16x32.png',
			handleTopImage: ml.obj.pluginUrl + 'images/scrollbar/handleTopImage-16x9.png',
			handleBottomImage: ml.obj.pluginUrl + 'images/scrollbar/handleBottomImage-16x9.png',
			handleGripImage: ml.obj.pluginUrl + 'images/scrollbar/handleGripImage-16x8.png'
		});
		var sliderWrap = jQuery(".slider-wrap");
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
			ml.listener.weaponSlot();
			ml.listener.accordion();
			ml.listener.selectionArea.close();
			ml.listener.selectionArea.weapon();
			ml.listener.selectionArea.sigil();
			ml.listener.selectionArea.rune();
			ml.listener.selectionArea.amulet();
			ml.listener.selectionArea.jewel();
		},
		scrollRefresh: function() {
			jQuery('.selectionAreaNav li a').bind('click', function(e) {
				ml.scroll.refresh();
			});
		},
		armorSlot: function() {
			jQuery('.armor').bind('click', function(){
				var dataActive = jQuery(this).attr('data-active');
				var container = jQuery('.selectionArea');
				
				// If container is not visible, make it visible
				if (jQuery(container).hasClass("hide")) {
					jQuery(container).removeClass("hide").addClass("show");
					
					// Refresh the scrollbar
					ml.scroll.refresh();
				}
				
				// if another weapon or armor slot is .active, remove .active
				// and make this .active
				if (!jQuery(this).hasClass("active")) {
					jQuery('.armor-container.active').removeClass('active');
					jQuery('.weapon-container.active').removeClass('active');
					jQuery(this).addClass('active');
				}
				else {
					// Something
				}
				
				// Sets data-active to the clicked armorSlot
				jQuery(container).attr('data-active', dataActive);
				
				// Toggles the correct categories in selectionArea
				ml.ops.toggleAccordions("armor");
			});
		},
		amuletSlot: function() {
			jQuery('.amulet').bind('click', function(){
				var dataActive = jQuery(this).attr('data-active');
				var container = jQuery('.selectionArea');
				
				// If container is not visible, make it visible
				if (jQuery(container).hasClass("hide")) {
					jQuery(container).removeClass("hide").addClass("show");
					
					// Refresh the scrollbar
					ml.scroll.refresh();
				}
				
				// if another weapon or armor slot is .active, remove .active
				// and make this .active
				if (!jQuery(this).hasClass("active")) {
					jQuery('.armor-container.active').removeClass('active');
					jQuery('.weapon-container.active').removeClass('active');
					jQuery(this).addClass('active');
				}
				else {
					// Something
				}
				
				// Sets data-active to the clicked armorSlot
				jQuery(container).attr('data-active', dataActive);
				
				// Toggles the correct categories in selectionArea
				ml.ops.toggleAccordions("amulet");
			});
		},
		weaponSlot: function() {
			jQuery('.weapon-container').bind('click', function(){
				var dataActive = jQuery(this).attr('data-active');
				var container = jQuery('.selectionArea');
				
				// If container is not visible, make it visible
				if (jQuery(container).hasClass("hide")) {
					jQuery(container).removeClass("hide").addClass("show");
					
					// Refresh the scrollbar
					ml.scroll.refresh();
				}
				
				// if another weapon or armor slot is .active, remove .active
				// and make this .active
				if (!jQuery(this).hasClass("active")) {
					jQuery('.armor-container.active').removeClass('active');
					jQuery('.weapon-container.active').removeClass('active');
					jQuery(this).addClass('active');
				}
				else {
					// Something
				}
				
				// Sets data-active to the clicked armorSlot
				jQuery(container).attr('data-active', dataActive);
				
				// Toggles the correct categories in selectionArea
				ml.ops.toggleAccordions("weapon");
			});
		},
		accordion: function() {
			jQuery(".accordionHeader").bind("click", function(e) {
				jQuery(this).toggleClass("collapsed");
				
				jQuery(this).next().slideToggle({
					duration: 400,
					easing: "swing",
					queue: false,
					complete: function() {
						ml.scroll.refresh();
					}
				});
			});
		},
		selectionArea: {
			close: function() {
				jQuery('.selectionAreaNavContainer .close').bind('click', function(){
					ml.ops.selectionArea.close();
					jQuery('.armor-container.active').removeClass('active');
					jQuery('.weapon-container.active').removeClass('active');
				});
			},
			weapon: function() {
				// Click events
				jQuery('.selectionAreaWeapons img').on('click', function() {
					var container = jQuery('.selectionArea');
					var dataActive = jQuery(container).attr("data-active");
					var activeSlot = jQuery(".weapon-container[data-active=" + dataActive + "]");
					var weaponSlot = jQuery(activeSlot).find(".weapon-slot");
					var title = jQuery(this).attr("title");
					var dataId = jQuery(this).attr("data-id");
					
					// Fetches the selected weapon as an object
					var weapon = ml.ops.getWeapon(dataId);
					
					// Checks if the weapon is mainhand, offhand or twohand
					var weaponMainhand = (parseInt(weapon.mainhand)) ? true : false;
					var weaponOffhand = (parseInt(weapon.offhand)) ? true : false;
					var weaponTwohand = (parseInt(weapon.twohand)) ? true : false;
					
					// Checks what kind of slot is active
					var slotType = jQuery(activeSlot).attr("data-slot");
					
					// Creates a string with weaponType
					var weaponType;
					
					if(weaponTwohand) {
						// The weapon is a twohand
						// Clear the offhand slot for weapon and sigil
						ml.ops.clearWeaponSlot(activeSlot, "offhand");
						
						// Change some variables to fit this weaponType
						var slotMainhand = jQuery(activeSlot).parent().find("[data-slot=mainhand]");
						activeSlot = slotMainhand;
						weaponSlot = jQuery(activeSlot).find(".weapon-slot");
						
						// Sets the attribute data-id of the .armor-container
						jQuery(activeSlot).attr('data-weapon', dataId);
						
						// Sets the background image of the runeSlot to match the selected rune
						jQuery(weaponSlot).attr('style', "background-image: url("  + ml.obj.pluginUrl + "images/weapons/" + title  + ".jpg)");
						
					}
					else if(weaponTwohand || (weaponMainhand && slotType == "mainhand") || (weaponOffhand && slotType == "offhand")) {
						// Both slot and weapon is either mainhand or offhand
						// Add the weapon to this slot
						
						// Checks if there is a twohand in mainSlot.
						// If so, remove it
						var slotMainhand = jQuery(activeSlot).parent().find("[data-slot=mainhand]");
						var slottedWeapon = ml.ops.getWeapon(jQuery(slotMainhand).attr("data-weapon"));
						
						if(slottedWeapon && parseInt(slottedWeapon.twohand)) {
							ml.ops.clearWeaponSlot(slotMainhand);
						}
						
						// Sets the attribute data-id of the .armor-container
						jQuery(activeSlot).attr('data-weapon', dataId);
						
						// Sets the background image of the weaponSlot to match the selected weapon
						jQuery(weaponSlot).attr('style', "background-image: url("  + ml.obj.pluginUrl + "images/weapons/" + title  + ".jpg)");
					}
					else {
						// Weapons dont match
						// Some sort of error
					}
					
					// Set weapon skills
					ml.ops.setSkills();
				})
				// Double click
				// We want to add that weapon to both mainhand and offhand slots
				.on('dblclick', function() {
					var container = jQuery('.selectionArea');
					var dataActive = jQuery(container).attr("data-active");
					var activeSlots = jQuery(".weapon-container[data-active=" + dataActive + "]").parent().find(".weapon-container");
					var weaponSlots = jQuery(activeSlots).find(".weapon-slot");
					var title = jQuery(this).attr("title");
					var dataId = jQuery(this).attr("data-id");
					
					// Fetches the selected weapon as an object
					var weapon = ml.ops.getWeapon(dataId);
					
					// Checks if the weapon is mainhand, offhand or twohand
					var weaponMainhand = (parseInt(weapon.mainhand)) ? true : false;
					var weaponOffhand = (parseInt(weapon.offhand)) ? true : false;
					var weaponTwohand = (parseInt(weapon.twohand)) ? true : false;
					
					// Checks if the weapon have both mainhand and offhand active
					if(weaponMainhand && weaponOffhand) {
						// Sets the attribute data-id of the .armor-container
						jQuery(activeSlots).attr('data-weapon', dataId);
						
						// Sets the background image of the weaponSlot to match the selected weapon
						jQuery(weaponSlots).attr('style', "background-image: url("  + ml.obj.pluginUrl + "images/weapons/" + title  + ".jpg)");
					}
					
					// Set weapon skills
					ml.ops.setSkills();
				});
			},
			sigil: function() {
				// Click events
				jQuery('.selectionAreaSigils img').on('click', function() {
					var container = jQuery('.selectionArea');
					var dataActive = jQuery(container).attr("data-active");
					var activeSlot = jQuery(".weapon-container[data-active=" + dataActive + "]");
					var sigilSlot = jQuery(activeSlot).find(".sigil-slot");
					var dataId = jQuery(this).attr("data-id");
					
					// Checks to see if there is a weapon in the current slot.
					// Only if it is, we will add the sigil
					if($(activeSlot).attr("data-weapon")) {
					
						// Sets the attribute data-id of the .armor-container
						jQuery(activeSlot).attr('data-sigil', dataId);
						
						// Sets the background image of the runeSlot to match the selected rune
						jQuery(sigilSlot).attr('style', "background-image: url("  + ml.obj.pluginUrl + "images/sigils/" + dataId  + ".jpg)");
					}
				});
				/*// Double click
				.on('dblclick', function() {
					var allRuneSlots = jQuery(".rune-slot");
					var allArmorSlots = jQuery('.armor.armor-container');
					var dataId = jQuery(this).attr("data-id");
					
					jQuery(allArmorSlots).attr('data-rune', dataId);
					jQuery(allRuneSlots).attr('style', "background-image: url("  + ml.obj.pluginUrl + "images/runes/" + dataId  + ".jpg)");
				});*/
			},
			rune: function() {
				// Click events
				jQuery('.selectionAreaRunes img').on('click', function() {
					var container = jQuery('.selectionArea');
					var dataActive = jQuery(container).attr("data-active");
					var activeSlot = jQuery(".armor[data-active=" + dataActive + "]");
					var runeSlot = jQuery(activeSlot).find(".rune-slot");
					var dataId = jQuery(this).attr("data-id");
					
					// Sets the attribute data-id of the .armor-container
					jQuery(activeSlot).attr('data-rune', dataId);
					
					// Sets the background image of the runeSlot to match the selected rune
					jQuery(runeSlot).attr('style', "background-image: url("  + ml.obj.pluginUrl + "images/runes/" + dataId  + ".jpg)");
				})
				// Double click
				.on('dblclick', function() {
					var allRuneSlots = jQuery(".rune-slot");
					var allArmorSlots = jQuery('.armor.armor-container');
					var dataId = jQuery(this).attr("data-id");
					
					jQuery(allArmorSlots).attr('data-rune', dataId);
					jQuery(allRuneSlots).attr('style', "background-image: url("  + ml.obj.pluginUrl + "images/runes/" + dataId  + ".jpg)");
				});
			},
			amulet: function() {
				// Click events
				jQuery('.selectionAreaAmulets img').on('click', function() {
					var container = jQuery('.selectionArea');
					var dataActive = jQuery(container).attr("data-active");
//					var activeSlot = jQuery(".amulet[data-active=" + dataActive + "]");
					var activeSlot = jQuery(".amulet");
					var amuletSlot = jQuery(activeSlot).find(".amulet-slot");
					var dataId = jQuery(this).attr("data-id");
					
					// Sets the attribute data-id of the .armor-container
					jQuery(activeSlot).attr('data-amulet', dataId);
					
					// Sets the background image of the runeSlot to match the selected rune
					jQuery(amuletSlot).attr('style', "background-image: url("  + ml.obj.pluginUrl + "images/amulets/" + dataId  + ".jpg)");
				})
				// Double click
				.on('dblclick', function() {
					var container = jQuery('.selectionArea');
					var dataActive = jQuery(container).attr("data-active");
//					var activeSlot = jQuery(".amulet[data-active=" + dataActive + "]");
					var activeSlot = jQuery(".amulet");
					var jewelSlot = jQuery(activeSlot).find(".jewel-slot");
					var dataId = jQuery(this).attr("data-id");
					
					// Sets the attribute data-jewel of the .armor-container.
					// data-amulet is already set from the click listener
					jQuery(activeSlot).attr('data-jewel', dataId);
					
					// Sets the background image of the runeSlot to match the selected rune
					jQuery(jewelSlot).attr('style', "background-image: url("  + ml.obj.pluginUrl + "images/jewels/" + dataId  + ".jpg)");
				});
			},
			jewel: function() {
				// Click events
				jQuery('.selectionAreaJewels img').on('click', function() {
					var container = jQuery('.selectionArea');
					var dataActive = jQuery(container).attr("data-active");
//					var activeSlot = jQuery(".amulet[data-active=" + dataActive + "]");
					var activeSlot = jQuery(".amulet");
					var jewelSlot = jQuery(activeSlot).find(".jewel-slot");
					var dataId = jQuery(this).attr("data-id");
					
					// Sets the attribute data-id of the .armor-container
					jQuery(activeSlot).attr('data-jewel', dataId);
					
					// Sets the background image of the runeSlot to match the selected rune
					jQuery(jewelSlot).attr('style', "background-image: url("  + ml.obj.pluginUrl + "images/jewels/" + dataId  + ".jpg)");
				})
				// Double click
				.on('dblclick', function() {
					var container = jQuery('.selectionArea');
					var dataActive = jQuery(container).attr("data-active");
//					var activeSlot = jQuery(".amulet[data-active=" + dataActive + "]");
					var activeSlot = jQuery(".amulet");
					var amuletSlot = jQuery(activeSlot).find(".amulet-slot");
					var dataId = jQuery(this).attr("data-id");
					
					// Sets the attribute data-amulet of the .armor-container.
					// data-jewel is already set from the click listener
					jQuery(activeSlot).attr('data-amulet', dataId);
					
					// Sets the background image of the runeSlot to match the selected rune
					jQuery(amuletSlot).attr('style', "background-image: url("  + ml.obj.pluginUrl + "images/amulets/" + dataId  + ".jpg)");
				});
			}
		}
	},
	
	// Operations
	ops: {
		attributeProfession: function() {
			// Changes .traits-profession into the according class name
			jQuery(".traits-profession").removeClass("traits-profession").addClass("traits-" + ml.general.uncapitalize(ml.obj.currentProfessionName));
		},
		selectionArea: {
			close: function() {
				var container = jQuery('.selectionArea');
					
				// Make the container hidden
				jQuery(container).removeClass("show").addClass("hide");
				
				// Sets data-active to the clicked armorSlot
				jQuery(container).attr('data-active', "");
			}
		},
		getRuneId: function(armor) {
			return parseInt(jQuery('.' + armor + '-container').attr('data-rune'));
		},
		searchRunes: function(id) {
			for(var i = 0; i < runes.length; i++) {
				return (parseInt(runes[i].id) == id) ? runes[i] : false;
			}
		},
		getAmuletId: function() {
			return parseInt(jQuery('.amulet-container').attr('data-amulet'));
		},
		getJewelId: function() {
			return parseInt(jQuery('.amulet-container').attr('data-jewel'));
		},
		getWeapon: function(id) {
			for(i in weapons) {
				if(id == weapons[i].id) {
					return weapons[i];
				}
			}
		},
		clearWeaponSlot: function(el, type) {
			// The slot we wanna manipulate
			var slot = el;
			
			// If type is present, means that we want to
			// clear that type of slot in the parent node
			if(type && (type == "mainhand" || type == "offhand")) {
				var parent = jQuery(el).parent();
				
				// The slot we actually wanna manipulate
				slot = jQuery(parent).find("[data-slot=" + type + "]");
			}
			
			// Clear data-weapon and the background image in .weapon-img
			jQuery(slot).removeAttr("data-weapon");
			jQuery(slot).find(".weapon-img").removeAttr("style");
			
			// Clear data-sigil and the background image in .sigil-img
			jQuery(slot).removeAttr("data-sigil");
			jQuery(slot).find(".sigil-slot").removeAttr("style");
		},
		setSkills: function() {
			var profession = currentProfession[0].name;
			var skillSlots = $("#skills .skills_weapons .skill");
			
			// Finds the ID of the weapons in the first weapon set
			var weaponsArrRaw = $('#weapons .weapon:first-child .weapon-container');
			var weaponsArr = new Array();
			
			// Loops through the weaponsArr and gets the weapon objects and inserts them into a new array
			for(var i  = 0; i < weaponsArrRaw.length; i++) {
				var currentWeaponId = parseInt($(weaponsArrRaw[i]).attr("data-weapon"));
				
				if(isNaN(currentWeaponId)) {
					// Adds null to the weaponsArr
					weaponsArr.push(null);
				}
				else {
					// Adds a weapon with this ID to the weaponsArr
					weaponsArr.push(ml.ops.getWeapon(currentWeaponId));
				}
				
				// Adds a weapon with this ID to the weaponsArr
				// weaponsArr.push(ml.ops.getWeapon(currentWeaponId));
			}
			
			// Creates the loop variable
			var y = 5;
			
			/*// If twohand
			if(parseInt(weaponsArr[0].twohand)) {
				
			}*/
			
			// If only onehand and it's in mainhand
			// If there is no weapons in mainHand or mainHand is not a twohand
			// and if there is no 
			if(weaponsArr[0] && (!parseInt(weaponsArr[0].twohand) && !weaponsArr[1])) {
					y = 3;
			}
			
			// Clearing previous images
			ml.ops.clearSkillSlots();
			
			for(var i = 0; i < y; i++) {
				// If only offhand
				if(!weaponsArr[0] && weaponsArr[1]) {
					// Pushes the loop so we add to the offhand skill slots
					i += 3;
				}
				
				// Finding out if we're working with mainhand or offhand
				var weaponNumber = (i < 3 || (weaponsArr[0] && parseInt(weaponsArr[0].twohand))) ? 0 : 1;
				
				$(skillSlots[i]).find(".skill_image").attr("style", 'background-image: url(' + ml.obj.pluginUrl + 'images/skills/' + profession + "/" + weaponsArr[weaponNumber].name + "/" + (i + 1) + '.png)');
				
				if(!weaponsArr[0] && weaponsArr[1]) {
					// If we're done
					if(i >= y - 1) {
						break;
					}
					else {
						// Sets the loop back in place
						i -= 3;
					}
				}
			}
		},
		clearSkillSlots: function() {
			var skillSlots = $("#skills .skills_weapons .skill");
			$(skillSlots).find(".skill_image").removeAttr("style");
		},
		toggleAccordions: function(type) {
			var selectionArea = $('.selectionArea');
			var activeType = $(selectionArea).attr('data-active-type');
			
			// Checks if there's a change in the type clicked
			// E.g. this will not fire if the activeSlot is .mainHand2
			// and the clicked slot is .offhand1, since both are weapons
			if(!activeType || activeType != type) {
				// Set data-active-type to the current type
				$(selectionArea).attr('data-active-type', type);
				
				var accordionHeadersStr = ".accordionHeader";
				var accordionHeaders = $(accordionHeadersStr);
				var slotTypes = {
					"armor": [$(".selectionAreaRunesHeader")],
					"amulet": [$(".selectionAreaAmuletsHeader"), $(".selectionAreaJewelsHeader")],
					"weapon": [$(".selectionAreaWeaponsHeader"), $(".selectionAreaSigilsHeader")]
				}
				
				// Add .collapsed to all accordionHeaders
				$(accordionHeaders).addClass("collapsed");
				
				for(var j = 0; j < slotTypes[type].length; j++) {
					for(var i = 0; i < accordionHeaders.length; i++) {
						// If the current header in the loop exists in slotTypes[type]
						// and it is collapsed, we then want to open it up
						//if(slotTypes[type][j][0] == accordionHeaders[i] && accordionHeaders[i].classList.contains("collapsed")) {
						if(slotTypes[type][j][0] == accordionHeaders[i]) {
							// Remove .collapsed from the current accordionHeader because we do not want to collapse this one
							$(accordionHeaders[i]).removeClass("collapsed").addClass("not-collapsed");
						}
					}
				}
				
				$(accordionHeadersStr + ".collapsed").next().slideUp({
					duration: 400,
					easing: "swing",
					queue: false
				});
				$(accordionHeadersStr + ".not-collapsed").removeClass("not-collapsed").next().slideDown({
					duration: 400,
					easing: "swing",
					queue: false,
					complete: function() {
						ml.scroll.refresh();
					}
				});
			}
		},

		setMajorTrait: function(id, line,tier) {
			var o = jQuery.grep(ml.obj.traits, function(e){ return e.id == parseInt(id); });
			ml.vm.majorTraits[tier+line] = id;
			jQuery('#traitLine-'+line+' #major_'+tier).html('<img class="tooltip" data-id="traits:'+id+'" rel="#tooltip" src="'+ml.obj.pluginUrl+'images/traits/major_'+o[0].num+'.png" />');
			jQuery('.cluetip-default').hide();
		},

		traitPlus: function(i) {
		    if (ml.vm.traitPoints() > 0)
		    {        
		        if (ml.vm['traitLine'+i]() < 30)
		        {
		            ml.vm.traitPoints(parseInt(ml.vm.traitPoints()) - 5)
		            ml.vm['traitLine'+i](parseInt(ml.vm['traitLine'+i]()) + 5);

		            ml.ops.setTraits('unlock');
		        }
		    }
		},

		traitMinus: function(i) {
		    if (ml.vm.traitPoints() < 70)
		    {        
		        if (ml.vm['traitLine'+i]() > 0)
		        {
		            ml.vm.traitPoints(parseInt(ml.vm.traitPoints()) + 5)
		            ml.vm['traitLine'+i](parseInt(ml.vm['traitLine'+i]()) - 5);

		            ml.ops.setTraits('lock');
		        }
		    }
		},

		//Refunds all trait points
		traitsRefund: function() {
		    ml.vm.traitPoints(70);

		    for (i=1;i<=5;i++)
		    {
		    	ml.vm['traitLine'+i](0);

		    	jQuery('.traitField2 img.trait_minor_'+i).attr('src', ml.obj.pluginUrl+'images/traits/minor_locked.png');
		        jQuery('.traitField2 img.trait_minor_'+i).removeClass('minor_class');

		    	jQuery('.traitField3 img.trait_minor_'+i).attr('src', ml.obj.pluginUrl+'images/traits/minor_locked.png');
		        jQuery('.traitField3 img.trait_minor_'+i).removeClass('minor_class');

		    	jQuery('.traitField4 img.trait_minor_'+i).attr('src', ml.obj.pluginUrl+'images/traits/minor_locked.png');
		        jQuery('.traitField4 img.trait_minor_'+i).removeClass('minor_class');

		        jQuery('#traitLine-'+i+' .traitField2 .trait_major_unlocked').addClass('trait_major_locked');
			    jQuery('#traitLine-'+i+' .traitField2 .trait_major_unlocked').removeClass('trait_major_unlocked');
			    
			    jQuery('#traitLine-'+i+' .traitField3 .trait_major_unlocked').addClass('trait_major_locked');
			    jQuery('#traitLine-'+i+' .traitField3 .trait_major_unlocked').removeClass('trait_major_unlocked');
			    
			    jQuery('#traitLine-'+i+' .traitField4 .trait_major_unlocked').addClass('trait_major_locked');
			    jQuery('#traitLine-'+i+' .traitField4 .trait_major_unlocked').removeClass('trait_major_unlocked');
		    }
		},

		setTraitLine: function (i,num) {
			if (ml.vm['traitLine'+i]() < num)
			{
				x = parseInt(num)-parseInt(ml.vm['traitLine'+i]());
				if ((parseInt(ml.vm.traitPoints())-x) >= 0)
		        {
		        	ml.vm['traitLine'+i](parseInt(num));
					ml.vm.traitPoints(ml.vm.traitPoints() - x);
					ml.ops.setTraits('unlock');
				}
			}	
			
		},

		setTraits: function(op) {
			if (op = 'unlock') {
				for(i=1;i<=5;i++) {
					if (ml.vm['traitLine'+i]() >= 5) {
			            jQuery('.traitField2 img.trait_minor_'+i).attr('src', ml.obj.pluginUrl+'images/traits/minor_'+ml.obj.currentProfession[0].name.toLowerCase()+'.png');
			            jQuery('.traitField2 img.trait_minor_'+i).addClass('minor_class');
			        }

			        if (ml.vm['traitLine'+i]() >= 10) {
			        	jQuery('#traitLine-'+i+' .traitField2 .trait_major_locked').addClass('trait_major_unlocked');
			        	jQuery('#traitLine-'+i+' .traitField2 .trait_major_locked').removeClass('trait_major_locked');

			        }

			        if (ml.vm['traitLine'+i]() >= 15) {
			           	jQuery('.traitField3 img.trait_minor_'+i).attr('src', ml.obj.pluginUrl+'images/traits/minor_'+ml.obj.currentProfession[0].name.toLowerCase()+'.png');
			           	jQuery('.traitField3 img.trait_minor_'+i).addClass('minor_class');
			        }

			        if (ml.vm['traitLine'+i]() >= 20) {
			        	jQuery('#traitLine-'+i+' .traitField3 .trait_major_locked').addClass('trait_major_unlocked');
			        	jQuery('#traitLine-'+i+' .traitField3 .trait_major_locked').removeClass('trait_major_locked');

			        }

			        if (ml.vm['traitLine'+i]() >= 25) {
			          	jQuery('.traitField4 img.trait_minor_'+i).attr('src', ml.obj.pluginUrl+'images/traits/minor_'+ml.obj.currentProfession[0].name.toLowerCase()+'.png');
			           	jQuery('.traitField4 img.trait_minor_'+i).addClass('minor_class');
			        }

			        if (ml.vm['traitLine'+i]() >= 30) {
			        	jQuery('#traitLine-'+i+' .traitField4 .trait_major_locked').addClass('trait_major_unlocked');
			        	jQuery('#traitLine-'+i+' .traitField4 .trait_major_locked').removeClass('trait_major_locked');

			        }
				}
			}

			if (op = 'lock') {
				for(i=1;i<=5;i++) {
					if (ml.vm['traitLine'+i]() < 5)
			        {
			          	jQuery('.traitField2 img.trait_minor_'+i).attr('src', ml.obj.pluginUrl+'images/traits/minor_locked.png');
			          	jQuery('.traitField2 img.trait_minor_'+i).removeClass('minor_class');
			        }

			        if (ml.vm['traitLine'+i]() < 10) {
			        	jQuery('#traitLine-'+i+' .traitField2 .trait_major_unlocked').addClass('trait_major_locked');
			        	jQuery('#traitLine-'+i+' .traitField2 .trait_major_unlocked').removeClass('trait_major_unlocked');

			        }

			        if (ml.vm['traitLine'+i]() < 15)
			        {
			            jQuery('.traitField3 img.trait_minor_'+i).attr('src', ml.obj.pluginUrl+'images/traits/minor_locked.png');
			            jQuery('.traitField3 img.trait_minor_'+i).removeClass('minor_class');
			        }

			        if (ml.vm['traitLine'+i]() < 20) {
			        	jQuery('#traitLine-'+i+' .traitField3 .trait_major_unlocked').addClass('trait_major_locked');
			        	jQuery('#traitLine-'+i+' .traitField3 .trait_major_unlocked').removeClass('trait_major_unlocked');

			        }

			        if (ml.vm['traitLine'+i]() < 25)
			        {
			            jQuery('.traitField4 img.trait_minor_'+i).attr('src', ml.obj.pluginUrl+'images/traits/minor_locked.png');
			            jQuery('.traitField4 img.trait_minor_'+i).removeClass('minor_class');
			        }

			        if (ml.vm['traitLine'+i]() < 30) {
			        	jQuery('#traitLine-'+i+' .traitField4 .trait_major_unlocked').addClass('trait_major_locked');
			        	jQuery('#traitLine-'+i+' .traitField4 .trait_major_unlocked').removeClass('trait_major_unlocked');

			        }
			    }
			}
		},

		getTraits: function (tier,i)
		{  

			jQuery('.cluetip-inner').removeClass('ui-widget-content');
			jQuery('#cluetip').removeClass('ui-widget ui-widget-content');

		    if (tier == 'adept')
		    {
		    	tier = 6;
		    }
		    else if (tier == 'master')
		    {
		    	tier = 10;
		    }
		    else if (tier == 'grandmaster')
		    {
		    	tier = 12;
		    }

		    jQuery('#traitPick').html('');

		    for(var x = 0; x<ml.obj.traits.length;x++)
		    {
		    	o = ml.obj.traits[x];

		    	if (((o.num <= tier) && (o.trait_line == i)) && (o.type == 'major'))
		    	{
		    		jQuery('#traitPick').append('<img class="trait_tooltip" style="padding:5px" data-id="traits:'+o.id+'" rel="#tooltip" onClick="ml.ops.setMajorTrait(\''+o.id+'\',\''+i+'\',\''+o.tier+'\')" src="'+ml.obj.pluginUrl+'images/traits/major_'+o.num+'.png" />');
		    	}
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
		traitLines: traitLines,
		traits: traits,
		pluginUrl: pluginUrl
	},
	
	// View Model
	MistLeagueViewModel: function() {
		var self = this;

		self.majorTraits = {
			adept1: 0,
			master1: 0,
			grandmaster1: 0,
			adept2: 0,
			master3: 0,
			grandmaster2: 0,
			adept3: 0,
			master3: 0,
			grandmaster3: 0,
			adept4: 0,
			master4: 0,
			grandmaster4: 0,
			adept5: 0,
			master5: 0,
			grandmaster5: 0,
		};

		// Total trait points
		self.traitPoints = ko.observable(70);

		// Trait points per line
		self.traitLine1 = ko.observable(0);
		self.traitLine2 = ko.observable(0);
		self.traitLine3 = ko.observable(0);
		self.traitLine4 = ko.observable(0);
		self.traitLine5 = ko.observable(0);

		//Trait line primary stats bonus
		self.traitPower = ko.computed(function() {
			var total = 0;
			var traitLine = parseInt(self.traitLine1())*10;
			var runes = 0;
			
			total = traitLine + runes;
			
			return total;
		});

		self.traitPrecision = ko.computed(function() {
			return parseInt(self.traitLine2())*10;
		});

		self.traitToughness = ko.computed(function() {
			return parseInt(self.traitLine3())*10;
		});

		self.traitVitality = ko.computed(function() {
			return parseInt(self.traitLine4())*10;
		});

		self.traitProfession = ko.computed(function() {
			if (ml.obj.currentProfession[0].name != 'Ranger') {
				return parseInt(self.traitLine5()) + '%';
			}
			else {
				return parseInt(self.traitLine5());
			}
		});
		
		
		//Trait line secondary stats bonus
		self.traitBoonDuration = ko.computed(function() {
			var traitLine = jQuery.grep(ml.obj.traitLines, function(e){ return e.sec == 'Boon Duration'; });
			return parseInt(self['traitLine'+traitLine[0].position]()) + '%';
		});

		self.traitConditionDamage = ko.computed(function() {
			var traitLine = jQuery.grep(ml.obj.traitLines, function(e){ return e.sec == 'Condition Damage'; });
			return parseInt(self['traitLine'+traitLine[0].position]())*10;
		});

		self.traitConditionDuration = ko.computed(function() {
			var traitLine = jQuery.grep(ml.obj.traitLines, function(e){ return e.sec == 'Condition Duration'; });
			return parseInt(self['traitLine'+traitLine[0].position]()) + '%';
		});

		self.traitCriticalDamage = ko.computed(function() {
			var traitLine = jQuery.grep(ml.obj.traitLines, function(e){ return e.sec == 'Critical Damage'; });
			return parseInt(self['traitLine'+traitLine[0].position]()) + '%';
		});

		self.traitHealingPower = ko.computed(function() {
			var traitLine = jQuery.grep(ml.obj.traitLines, function(e){ return e.sec == 'Healing Power'; });
			return parseInt(self['traitLine'+traitLine[0].position]())*10;
		});


		// Primary Attributes
		self.attributePower = ko.computed(function() {
			return 916+parseInt(self.traitPower());
		});

		self.attributePrecision = ko.computed(function() {
			return 916+parseInt(self.traitPrecision());
		});

		self.attributeToughness = ko.computed(function() {
			return 916+parseInt(self.traitToughness());
		});

		self.attributeVitality = ko.computed(function() {
			return 916+parseInt(self.traitVitality());
		});
		
		// Secondary Attributes
		self.attributeBoonDuration = ko.computed(function() {
			return 0 + parseInt(self.traitBoonDuration()) + '%';
		});

		self.attributeProfession = ko.computed(function() {
			if (ml.obj.currentProfession[0].name != 'Ranger') {
				return 0 + parseInt(self.traitProfession()) + '%';
			}
			else {
				return 0 + parseInt(self.traitProfession());
			}
		});

		self.attributeConditionDamage = ko.computed(function() {
			return 0 + parseInt(self.traitConditionDamage());
		});

		self.attributeConditionDuration = ko.computed(function() {
			return 0 + parseInt(self.traitConditionDuration()) + '%';
		});

		self.attributeCriticalDamage = ko.computed(function() {
			return 0 + parseInt(self.traitCriticalDamage()) + '%';
		});

		self.attributeHealingPower = ko.computed(function() {
			return 0 +parseInt(self.traitHealingPower());
		});
		
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
	
	// Scrollbar
	scroll: {
		refresh: function() {
			// Calls the refresh
			jQuery('.selectionAreaContent').sbscroller('refresh');
			
			// Corrects the amount of images being applied
			ml.scroll.correctImages();
		},
		correctImages: function() {
			var scrollbars = [
				$(".slider-wrap img.scrollbar-top"),
				$(".slider-wrap img.scrollbar-bottom"),
				$(".slider-wrap img.scrollbar-grip")
			]
			
			for(i in scrollbars) {
				if(scrollbars[i].length > 1) {
					// More than one element!
					for(var j = 0; j < scrollbars[i].length; j++) {
						// Skip the first element
						if(j > 0) {
							// Removing element
							$(scrollbars[i][j]).remove();
						}
					}
				}
			}
		}
	}


}