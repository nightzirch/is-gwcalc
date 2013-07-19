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
		
		//activates major traits picker
		jQuery('.trait_major').cluetip(
		{
			local:true,
			cursor: 'pointer',
			activation: 'click',
			leftOffset:5,
			onShow: function() {
				jQuery('.cluetip-inner').removeClass('ui-widget-content');
				jQuery('#cluetip').removeClass('ui-widget ui-widget-content'); 
				jQuery(document).one('mousedown',function() { 
					jQuery(document).trigger('hideCluetip');
				})
			}
		});

		jQuery('.tooltip').cluetip(
		{
			local:true,
			showTitle: false,
			dropShadows: false,
			tracking: true,
			leftOffset: 3,
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
		/*$("#selectionAreaCombat").accordion({
			header: "div.accordionHeader",
			active: true,
			collapsible: true,
			heightStyle: "content",
			activate: function( event, ui ) {
				ml.scroll.refresh();
			}
		});*/
		
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
			$('.selectionAreaNav li a').bind('click', function(e) {
				ml.scroll.refresh();
			});
		},
		armorSlot: function() {
			$('.armor').bind('click', function(){
				var dataActive = $(this).attr('data-active');
				var container = $('.selectionArea');
				
				// If container is not visible, make it visible
				if ($(container).hasClass("hide")) {
					$(container).removeClass("hide").addClass("show");
					
					// Refresh the scrollbar
					ml.scroll.refresh();
				}
				
				// if another weapon or armor slot is .active, remove .active
				// and make this .active
				if (!$(this).hasClass("active")) {
					$('.armor-container.active').removeClass('active');
					$('.weapon-container.active').removeClass('active');
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
					
					// Refresh the scrollbar
					ml.scroll.refresh();
				}
				
				// if another weapon or armor slot is .active, remove .active
				// and make this .active
				if (!$(this).hasClass("active")) {
					$('.armor-container.active').removeClass('active');
					$('.weapon-container.active').removeClass('active');
					$(this).addClass('active');
				}
				else {
					// Something
				}
				
				// Sets data-active to the clicked armorSlot
				$(container).attr('data-active', dataActive);
			});
		},
		weaponSlot: function() {
			$('.weapon-container').bind('click', function(){
				var dataActive = $(this).attr('data-active');
				var container = $('.selectionArea');
				
				// If container is not visible, make it visible
				if ($(container).hasClass("hide")) {
					$(container).removeClass("hide").addClass("show");
					
					// Refresh the scrollbar
					ml.scroll.refresh();
				}
				
				// if another weapon or armor slot is .active, remove .active
				// and make this .active
				if (!$(this).hasClass("active")) {
					$('.armor-container.active').removeClass('active');
					$('.weapon-container.active').removeClass('active');
					$(this).addClass('active');
				}
				else {
					// Something
				}
				
				// Sets data-active to the clicked armorSlot
				$(container).attr('data-active', dataActive);
			});
		},
		accordion: function() {
			$(".accordionHeader").bind("click", function(e) {
				$(this).next().slideToggle({
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
				$('.selectionAreaNavContainer .close').bind('click', function(){
					ml.ops.selectionArea.close();
					$('.armor-container.active').removeClass('active');
					$('.weapon-container.active').removeClass('active');
				});
			},
			weapon: function() {
				// Click events
				$('.selectionAreaWeapons img').on('click', function() {
					var container = $('.selectionArea');
					var dataActive = $(container).attr("data-active");
					var activeSlot = $(".weapon-container[data-active=" + dataActive + "]");
					var weaponSlot = $(activeSlot).find(".weapon-slot");
					var title = $(this).attr("title");
					var dataId = $(this).attr("data-id");
					
					// Fetches the selected weapon as an object
					var weapon = ml.ops.getWeapon(dataId);
					
					// Checks if the weapon is mainhand, offhand or twohand
					var weaponMainhand = (parseInt(weapon.mainhand)) ? true : false;
					var weaponOffhand = (parseInt(weapon.offhand)) ? true : false;
					var weaponTwohand = (parseInt(weapon.twohand)) ? true : false;
					
					// Checks what kind of slot is active
					var slotType = $(activeSlot).attr("data-slot");
					
					// Creates a string with weaponType
					var weaponType;
					if(weaponTwohand) {
						// The weapon is a twohand
						// Clear the offhand slot
						ml.ops.clearSlot(activeSlot, "offhand");
						
						// Change some variables to fit this weaponType
						var slotMainhand = $(activeSlot).parent().find("[data-slot=mainhand]");
						activeSlot = slotMainhand;
						weaponSlot = $(activeSlot).find(".weapon-slot");
						
						// Sets the attribute data-id of the .armor-container
						$(activeSlot).attr('data-weapon', dataId);
						
						// Sets the background image of the runeSlot to match the selected rune
						$(weaponSlot).attr('style', "background-image: url("  + ml.obj.pluginUrl + "images/weapons/" + title  + ".jpg)");
						
					}
					else if(weaponTwohand || (weaponMainhand && slotType == "mainhand") || (weaponOffhand && slotType == "offhand")) {
						// Both slot and weapon is either mainhand or offhand
						// Add the weapon to this slot
						
						// Checks if there is a twohand in mainSlot.
						// If so, remove it
						var slotMainhand = $(activeSlot).parent().find("[data-slot=mainhand]");
						var slottedWeapon = ml.ops.getWeapon($(slotMainhand).attr("data-weapon"));
						
						if(slottedWeapon && parseInt(slottedWeapon.twohand)) {
							ml.ops.clearSlot(slotMainhand);
						}
						
						// Sets the attribute data-id of the .armor-container
						$(activeSlot).attr('data-weapon', dataId);
						
						// Sets the background image of the runeSlot to match the selected rune
						$(weaponSlot).attr('style', "background-image: url("  + ml.obj.pluginUrl + "images/weapons/" + title  + ".jpg)");
					}
					else {
						// Weapons dont match
						// Some sort of error
					}
				})
				// Double click
				// We want to add that weapon to both mainhand and offhand slots
				.on('dblclick', function() {
					// Checks if the weapon have both mainhand and offhand active
				});
			},
			sigil: function() {
				// Click events
				$('.selectionAreaSigils img').on('click', function() {
					var container = $('.selectionArea');
					var dataActive = $(container).attr("data-active");
					var activeSlot = $(".weapon-container[data-active=" + dataActive + "]");
					var sigilSlot = $(activeSlot).find(".sigil-slot");
					var dataId = $(this).attr("data-id");
					
					// Sets the attribute data-id of the .armor-container
					$(activeSlot).attr('data-sigil', dataId);
					
					// Sets the background image of the runeSlot to match the selected rune
					$(sigilSlot).attr('style', "background-image: url("  + ml.obj.pluginUrl + "images/sigils/" + dataId  + ".jpg)");
				});
				/*// Double click
				.on('dblclick', function() {
					var allRuneSlots = $(".rune-slot");
					var allArmorSlots = $('.armor.armor-container');
					var dataId = $(this).attr("data-id");
					
					$(allArmorSlots).attr('data-rune', dataId);
					$(allRuneSlots).attr('style', "background-image: url("  + ml.obj.pluginUrl + "images/runes/" + dataId  + ".jpg)");
				});*/
			},
			rune: function() {
				// Click events
				$('.selectionAreaRunes img').on('click', function() {
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
				$('.selectionAreaAmulets img').on('click', function() {
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
			},
			jewel: function() {
				// Click events
				$('.selectionAreaJewels img').on('click', function() {
					var container = $('.selectionArea');
					var dataActive = $(container).attr("data-active");
					var activeSlot = $(".amulet[data-active=" + dataActive + "]");
					var jewelSlot = $(activeSlot).find(".jewel-slot");
					var dataId = $(this).attr("data-id");
					
					// Sets the attribute data-id of the .armor-container
					$(activeSlot).attr('data-jewel', dataId);
					
					// Sets the background image of the runeSlot to match the selected rune
					$(jewelSlot).attr('style', "background-image: url("  + ml.obj.pluginUrl + "images/jewels/" + dataId  + ".jpg)");
				})
				// Double click
				.on('dblclick', function() {
					var container = $('.selectionArea');
					var dataActive = $(container).attr("data-active");
					var activeSlot = $(".amulet[data-active=" + dataActive + "]");
					var amuletSlot = $(activeSlot).find(".amulet-slot");
					var dataId = $(this).attr("data-id");
					
					// Sets the attribute data-amulet of the .armor-container.
					// data-jewel is already set from the click listener
					$(activeSlot).attr('data-amulet', dataId);
					
					// Sets the background image of the runeSlot to match the selected rune
					$(amuletSlot).attr('style', "background-image: url("  + ml.obj.pluginUrl + "images/amulets/" + dataId  + ".png)");
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
		getWeapon: function(id) {
			for(i in weapons) {
				if(id == weapons[i].id) {
					return weapons[i];
				}
			}
		},
		clearSlot: function(el, type) {
			// The slot we wanna manipulate
			var slot = el;
			
			// If type is present, means that we want to
			// clear that type of slot in the parent node
			if(type && (type == "mainhand" || type == "offhand")) {
				var parent = $(el).parent();
				
				// The slot we actually wanna manipulate
				slot = $(parent).find("[data-slot=" + type + "]");
			}
			
			// Clear data-weapon and the background image in .weapon-img
			$(slot).removeAttr("data-weapon");
			$(slot).find(".weapon-img").removeAttr("style");			
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
		    		jQuery('#traitPick').append('<img style="padding:5px" title="'+o.name+'" src="'+ml.obj.pluginUrl+'images/traits/major_'+o.num+'.png" />')
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
			return parseInt(self.traitLine1())*10;
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
			$('.selectionAreaContent').sbscroller('refresh');
		}
	}


}