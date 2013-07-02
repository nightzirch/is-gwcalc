jQuery(document).ready(function($) {

	//BEGIN switcher
	jQuery('#professions img').click(function(){
		
		jQuery('#professions img').css('opacity',0.5);
		jQuery(this).css('opacity',1);
	
	});
	// END switcher

	// Initialize tabs
	jQuery("#build").tabs();
});

var equipment = {
    weapon_mainhand1 : 0,
    weapon_offhand1 : 0,
    sigil_mainhand1 : 0,
    sigil_offhand1 : 0,
    amulet : 0,
    jewel : 0,
    rune1 : 0,
    rune2 : 0,
    rune3 : 0,
    rune4 : 0,
    rune5 : 0,
    rune6 : 0, 
    };

var profession = jQuery.grep(professions, function(e){ return e.name == profes; });

if(profession[0].sets == 2)
{
    equipment['weapon_mainhand2'] = 0;
    equipment['weapon_offhand2'] = 0;
    equipment['sigil_mainhand2'] = 0;
    equipment['sigil_offhand2'] = 0;
}


function weaponPicker(type,set)
{
    closeOpenDialog();

    var length = weapons.length;

    jQuery("#weapon_picker").empty();

    if (type == 'mainhand')
    {
        type2 = 'twohand';
    }
    else
    {
        type2 = "offhand";
    }

    for (var x=0;x<length;x++)  
    {
        if(weapons[x].type == type || weapons[x].type == type2)
        {   
            jQuery("#weapon_picker").append('<span class="tooltip"><img style="margin:5px;" title="'+weapons[x].name+'" src="'+plg_url+'images/weapons/'+weapons[x].name+'.jpg" onClick="weaponPick(\''+weapons[x].name+'\',\''+set+'\',\''+type+'\')" /><div class="tooltip_frame"><div class="tooltip_title"><span style="vertical-align:top;padding:8px 0 8px 0;">'+weapons[x].name+'</span></div><div><ul class="tooltip_list"><li style="font-size: 11px;padding-bottom: 8px;">Damage: <span class="weapon_tip">'+weapons[x].stats+'</span></li></ul></div></div></span>');
        }
    }

    var anchor = "weapon_set_"+set+"_"+type;

    jQuery("#weapon_picker").dialog(
    {
        position: { my: "left top", at: "left bottom", of: "#"+anchor },
        resize: "auto",
        dialogClass:'dialog_style',
        minHeight: 50,
        width: 200,
        modal: false,
        draggable: false
     });
}

function runePicker(anchor)
{  
    closeOpenDialog();

    jQuery("#runes").dialog(
    {
        position: { my: "left top", at: "left bottom", of: "#rune"+anchor },
        minHeight: 50,
        width: 188,
        modal: false,
        draggable: false,
        open: function(){
            jQuery("#rune_accordion").accordion({  heightStyle: "content",active: false,collapsible: true });}
     });

    jQuery("#rune"+anchor).addClass("active");
}

function trinketPicker()
{  
    closeOpenDialog();

    jQuery("#trinket_pick").dialog(
    {
        position: { my: "left top", at: "left bottom", of: "#trinket"},
        //resize: "auto",
        minHeight: 50,
        width: 188,
        modal: false,
        draggable: false
     });
}

function orbPicker()
{  
    closeOpenDialog();

    jQuery("#orb_pick").dialog(
    {
        position: { my: "left top", at: "left bottom", of: "#orb"},
        //resize: "auto",
        minHeight: 50,
        width: 188,
        modal: false,
        draggable: false
     });
}

function sigilPicker(type,set)
{  
    closeOpenDialog();

    jQuery("#sigil_pick").dialog(
    {
        position: { my: "left top", at: "left bottom", of: "#sigil_"+type+set},
        minHeight: 50,
        width: 188,
        modal: false,
        draggable: false,
        open: function(){
            jQuery("#sigil_accordion").accordion({ heightStyle: "content",active: false,collapsible: true });}
     });

    jQuery("#sigil_"+type+set).addClass("active")
}

function closeOpenDialog()
{
    jQuery(".dialog").dialog();
    jQuery(".dialog").dialog("close");
    jQuery(".active").removeClass("active");
}

function weaponPick(wpn,set,type)
{
    var anchor = "#weapon_set_"+set+"_"+type;
    var weapon = jQuery.grep(weapons, function(e){ return e.name == wpn; });
    jQuery(anchor).html('<span class="tooltip"><img src="'+plg_url+'images/weapons/'+wpn+'.jpg" /><div class="tooltip_frame"><div class="tooltip_title"><span style="vertical-align:top;padding:8px 0 8px 0;">'+wpn+'</span></div><div><ul class="tooltip_list"><li style="font-size: 11px;padding-bottom: 8px;">Damage: <span class="weapon_tip">'+weapon[0].stats+'</span></li></ul></div></div></span>');
    
    if (weapon[0].type == 'twohand')
    {
        jQuery('#weapon_set_'+set+'_offhand').empty();
        equipment['weapon_offhand'+set] = 0;
    }


    if (type == 'offhand' && equipment['weapon_mainhand'+set] != 0)
    {
        var wep = jQuery.grep(weapons, function(e){ return e.id == equipment['weapon_mainhand'+set]; });

        if (wep[0].type == 'twohand')
        {
            jQuery('#weapon_set_'+set+'_mainhand').empty();
            equipment['weapon_mainhand'+set] = 0;
        }
    }


    closeOpenDialog();

    equipment['weapon_'+type+set] = weapon[0].id;
}

function trinketPick(id)
{
    var trinket = jQuery.grep(trinkets, function(e){ return e.id == id; });
    jQuery("#trinket").html('<span class="tooltip"><img title="'+trinket[0].name+'" src="'+plg_url+'images/trinkets/'+id+'.png" /><div class="tooltip_frame"><div class="tooltip_title"><span style="vertical-align:top;padding:8px 0 8px 0;">'+trinket[0].name+'</span></div><div><ul class="tooltip_list"></ul></div></div></span>');

    stats = trinket[0].stats.split(';');
    var length = stats.length;
    for (var i=0;i<length;i++)
    {
        jQuery("#trinket .tooltip_list").append(
            '<li class="amulet_tip">'+stats[i]+'</li>'
        );
    }
                                                          
    equipment['amulet'] = trinket[0].id;

    closeOpenDialog();
    calculate();
}

function orbPick(id)
{
    var orb = jQuery.grep(orbs, function(e){ return e.id == id; });
    jQuery("#orb").html('<span class="tooltip"><img src="'+plg_url+'images/jewels/'+id+'.jpg" /><div class="tooltip_frame"><div class="tooltip_title"><span style="vertical-align:top;padding:8px 0 8px 0;">'+orb[0].name+'</span></div><div><ul class="tooltip_list"></ul></div></div></span>');
   
    stats = orb[0].stats.split(';');
    var length = stats.length;
    for (var i=0;i<length;i++)
    {
        jQuery("#orb .tooltip_list").append(
            '<li class="orb_tip">'+stats[i]+'</li>'
        );
    }

    equipment['jewel'] = orb[0].id;

    closeOpenDialog();
    calculate();
}

function runePick(id)
{
    var rune = jQuery.grep(runes, function(e){ return e.id == id; });
    jQuery("#gear .active").html('<span class="tooltip"><img src="'+plg_url+'images/runes/'+rune[0].id+'.jpg" /><div class="tooltip_frame"><div class="tooltip_title"><span style="vertical-align:top;padding:8px 0 8px 0;">'+rune[0].name+'</span></div><div><ul class="tooltip_list"></ul></div></div></span>');
   
    stats = rune[0].stats.split(';');
    var length = stats.length;
    for (var i=0;i<length;i++)
    {
        jQuery("#gear .active .tooltip_list").append(
            '<li style="margin:6px 0 6px 0;" class="rune_tip"><span style="margin-right:5px;">('+i+')</span><span>'+stats[i]+'</span></li>'
        );
    }
 
    equipment[jQuery('#gear .active').attr('id')] = rune[0].id;

    jQuery("#gear .active").removeClass("active");
    closeOpenDialog();
    calculate();
}

function sigilPick(id)
{
    var sigil = jQuery.grep(sigils, function(e){ return e.id == id; });
    jQuery(".active").html('<span class="tooltip"><img src="'+plg_url+'images/sigils/'+id+'.jpg" /><div class="tooltip_frame"><div class="tooltip_title"><img style="float:left;" src="'+plg_url+'images/sigils/'+id+'.jpg" /><span style="padding-left:5px;font-size:11px;">'+sigil[0].name+'</span></div><div class="tooltip_description" style="margin-top:15px;">'+sigil[0].stats+'</div></div></span>');
   
    jQuery(".active").removeClass("active");

    closeOpenDialog();
}

function traitPlus(i)
{
    trait_points = parseInt(jQuery("#trait_points_left").html());
    if (trait_points > 0)
    {
        x = parseInt(jQuery("#traits_invested-"+i).html());
        
        if (x < 30)
        {
            trait_points -= 1;
            x += 1;
            jQuery("#traits_invested-"+i).html(x);
            jQuery("#trait_points_left").html(trait_points);
        }
    }
}

function traitMinus(i)
{
    trait_points = parseInt(jQuery("#trait_points_left").html());
    if (trait_points < 70)
    {
        x = parseInt(jQuery("#traits_invested-"+i).html());
        
        if (x > 0)
        {
            trait_points += 1;
            x -= 1;
            jQuery("#traits_invested-"+i).html(x);
            jQuery("#trait_points_left").html(trait_points);
        }  
    }
}

function traitsRefund()
{
    trait_points = 70
    jQuery("#trait_points_left").html(trait_points);

    for (i=1;i<=5;i++)
    {
        jQuery("#traits_invested-"+i).html('0');
    }

}

function calculate()
{
    var stats = {
    Power : 916,
    Precision : 916,
    Toughness : 916,
    Vitality : 916,
    CriticalDamage : 0,
    ConditionDamage : 0,
    ConditionDuration : 0,
    HealingPower : 0,
    BoonDuration : 0,
    Health: 0
    };

    //get amulet stats
    if(equipment['amulet'] != 0)
    {
       var trinket = jQuery.grep(trinkets, function(e){ return e.id == equipment['amulet']; });
        var trinket = trinket[0].stats;
        trinket = trinket.split(';');
        var length = trinket.length;
        for (var i=0;i<length;i++)
        {
            stat = trinket[i].split(':');
            stats[stat[0].replace(/\s+/g, '')]+=parseInt(stat[1]);
        } 
    }
    
    //get orb stats
    if(equipment['jewel'] != 0)
    {
        var orb = jQuery.grep(orbs, function(e){ return e.id == equipment['jewel']; });
        var orb = orb[0].stats;
        orb = orb.split(';');
        var length = orb.length;
        for (var i=0;i<length;i++)
        {
            stat = orb[i].split(':');
            stats[stat[0].replace(/\s+/g, '')]+=parseInt(stat[1]);
        }
    }

    //get rune stats
    var rune = new Array (equipment['rune1'],equipment['rune2'],equipment['rune3'],equipment['rune4'],equipment['rune5'],equipment['rune6']);
    var x = 0;
    rune_list = Object();
    
    for (var counter=0;counter<rune.length;counter++)
    {
        if(rune[counter] != 0)
        {
            for (var i=0;i<rune.length;i++)
            {
                
                    if (rune[i] == rune[counter])
                    {
                        x++;
                    }
            }

            rune_list[rune[counter]] = x;
            x = 0;
        }
    }

    jQuery("#rune_bonus").empty();

    jQuery.each(rune_list, function(key, value)
    {
        var r = jQuery.grep(runes, function(e){ return e.id == key; });
        jQuery("#rune_bonus").append('<span style="font-weight:bold;">'+r[0].name+'</span>');
        jQuery("#rune_bonus").append('<ul class="stats'+key+'"></ul>')
        stat = r[0].stats.split(';');
        for (var i=0;i<value;i++)
        {
            jQuery('#rune_bonus .stats'+key).append('<li>'+stat[i]+'</li>');
            stat_split = stat[i].split(':');
            stats[stat_split[0].replace(/\s+/g, '')]+=parseInt(stat_split[1]);
        }
        
    });

    //Calculate other stats
    stats['CriticalChance'] = Math.floor((stats['Precision']-822)/21);
    stats['Health'] = parseInt(profession[0].health)+stats['Vitality']*10;  

    //update stats
    jQuery.each(stats, function(key, value) {
        if(key=='CriticalChance' || key=='CriticalDamage')
        {
            jQuery("#"+key.toLowerCase()).html(value+"%");
        }
        else
        {
            jQuery("#"+key.toLowerCase()).html(value);

        }
    });

    
}

function swapWeapons()
{
    var x = jQuery("#weapon_set_1_mainhand").html();
    var m2 = jQuery("#weapon_set_2_mainhand").html();

    var c = equipment['weapon_mainhand1'];
    equipment['weapon_mainhand1'] = equipment['weapon_mainhand2'];
    equipment['weapon_mainhand2'] = c

    jQuery("#weapon_set_1_mainhand").html(m2);
    jQuery("#weapon_set_2_mainhand").html(x);

    var y = jQuery("#weapon_set_1_offhand").html();
    var o2 = jQuery("#weapon_set_2_offhand").html();

    var c = equipment['weapon_offhand1'];
    equipment['weapon_offhand1'] = equipment['weapon_offhand2'];
    equipment['weapon_offhand2'] = c

    jQuery("#weapon_set_1_offhand").html(o2);
    jQuery("#weapon_set_2_offhand").html(y);

    x = jQuery("#sigil_mainhand1").html();
    jQuery("#sigil_mainhand1").html(jQuery("#sigil_mainhand2").html());
    jQuery("#sigil_mainhand2").html(x);

    x = jQuery("#sigil_offhand1").html();
    jQuery("#sigil_offhand1").html(jQuery("#sigil_offhand2").html());
    jQuery("#sigil_offhand2").html(x);
}