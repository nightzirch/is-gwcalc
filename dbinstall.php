<?php
/*
Copyright 2013,  Ivica 'Xicer' Sertić,  (email : xicer85@gmail.com)

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License, version 3, as 
published by the Free Software Foundation.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
*/

function db_uninstall () {
   global $wpdb;

   $table_names = array("class","weapons","trinkets","orbs","runes","sigils","trait_lines");
   
   foreach ($table_names as $table)
   {
      $table_name = $wpdb->prefix . "isgw2calc_".$table; 
  
      $wpdb->query( "DROP TABLE IF EXISTS $table_name" );
   }     		
}

function db_install () {
   global $wpdb;
   $table_name = $wpdb->prefix . "isgw2calc_class"; 
   
   $query = "CREATE TABLE $table_name (
  			id mediumint(9) NOT NULL AUTO_INCREMENT,
 			name varchar(50) NOT NULL,
  			armor mediumint(9) NOT NULL,
			health mediumint(9) NOT NULL,
      sets mediumint(9) NOT NULL,
  			PRIMARY KEY (id)
			);";
	
	$wpdb->query( $query );
	
   $table_name = $wpdb->prefix . "isgw2calc_weapons"; 
   
   $query = "CREATE TABLE $table_name (
  			id mediumint(9) NOT NULL AUTO_INCREMENT,
			cid mediumint(9) NOT NULL,
 			name varchar(50) NOT NULL,
  		mainhand tinyint(1) NOT NULL,
      offhand tinyint(1) NOT NULL,
      twohand tinyint(1) NOT NULL,
			stats varchar(255) NOT NULL,
  			PRIMARY KEY (id,cid)
			);";
	
	$wpdb->query( $query );		


  $table_name = $wpdb->prefix . "isgw2calc_trinkets"; 
   
   $query = "CREATE TABLE $table_name (
        id mediumint(9) NOT NULL AUTO_INCREMENT,
      name varchar(50) NOT NULL,
      stats varchar(255) NOT NULL,
        PRIMARY KEY (id)
      );";
  
  $wpdb->query( $query ); 

  $table_name = $wpdb->prefix . "isgw2calc_orbs"; 
   
   $query = "CREATE TABLE $table_name (
        id mediumint(9) NOT NULL AUTO_INCREMENT,
      name varchar(50) NOT NULL,
      stats varchar(255) NOT NULL,
        PRIMARY KEY (id)
      );";
  
  $wpdb->query( $query ); 

  $table_name = $wpdb->prefix . "isgw2calc_runes"; 
   
   $query = "CREATE TABLE $table_name (
        id mediumint(9) NOT NULL AUTO_INCREMENT,
      name varchar(50) NOT NULL,
      stats varchar(255) NOT NULL,
      type varchar(255) NOT NULL,
        PRIMARY KEY (id)
      );";
  
  $wpdb->query( $query );   

  $table_name = $wpdb->prefix . "isgw2calc_sigils"; 
   
   $query = "CREATE TABLE $table_name (
        id mediumint(9) NOT NULL AUTO_INCREMENT,
        name varchar(50) NOT NULL,
        stats varchar(255) NOT NULL,
        type varchar(255) NOT NULL,
        PRIMARY KEY (id)
      );";
  
  $wpdb->query( $query ); 

  $table_name = $wpdb->prefix . "isgw2calc_trait_lines"; 

  $query = "CREATE TABLE $table_name (
          id mediumint(8) NOT NULL AUTO_INCREMENT,
          name varchar(32) NOT NULL,
          cid mediumint(8) NOT NULL,
          position mediumint(8) NOT NULL,
          pri varchar(32) NOT NULL,
          sec varchar(32) NOT NULL,
          PRIMARY KEY (id)
        );"; 
 
  $wpdb->query( $query ); 

}

function db_install_data() {
   global $wpdb;
   
   /////////////////////
   /// BEGIN CLASS DATA
   
   $table_name = $wpdb->prefix . "isgw2calc_class"; 
   
   $classes = array();
   
   array_push($classes, array('name' => 'Elementalist', 'armor' => '1836', 'health' => 1645 , 'sets' => 1));
   array_push($classes,array('name' => 'Engineer', 'armor' => '1980', 'health' => 5922, 'sets' => 2 ));
   array_push($classes,array('name' => 'Guardian', 'armor' => '2127', 'health' => 1645, 'sets' => 2  ));
   array_push($classes,array('name' => 'Mesmer', 'armor' => '1836', 'health' => 5922, 'sets' => 2  ));
   array_push($classes,array('name' => 'Necromancer', 'armor' => '1836', 'health' => 9212, 'sets' => 2  ));
   array_push($classes,array('name' => 'Ranger', 'armor' => '1980', 'health' => 5922, 'sets' => 2  ));
   array_push($classes,array('name' => 'Thief', 'armor' => '1980', 'health' => 1645, 'sets' => 2  ));
   array_push($classes,array('name' => 'Warrior', 'armor' => '2127', 'health' => 9212, 'sets' => 2  ));
   
   foreach ($classes as $cl)
   {
	 $rows_affected = $wpdb->insert( $table_name, array( 'name' => $cl['name'], 'armor' => $cl['armor'], 'health' => $cl['health'], 'sets' => $cl['sets'] ) );
   }
   
   /// END CLASS DATA
   /////////////////////
   
   /////////////////////
   /// BEGIN WEAPON DATA
   
   $table_name = $wpdb->prefix . "isgw2calc_weapons"; 
   
   $weapons = array();
   
   array_push($weapons, array('cid' => '5', 'name' => 'Axe', 'mainhand' => '1', 'offhand' => '0', 'twohand' => '0', 'stats' => '857-1048' ));
   array_push($weapons, array('cid' => '5', 'name' => 'Dagger', 'mainhand' => '1','offhand' => '1', 'twohand' => '0', 'stats' => '924-981' ));
   array_push($weapons, array('cid' => '5', 'name' => 'Staff', 'mainhand' => '0','offhand' => '0', 'twohand' => '1', 'stats' => '985-1111' ));

   
   foreach ($weapons as $w)
   {
	 $rows_affected = $wpdb->insert( $table_name, array('cid' => $w['cid'], 'name' => $w['name'], 'mainhand' => $w['mainhand'], 'offhand' => $w['offhand'], 'twohand' => $w['twohand'], 'stats' => $w['stats'] ) );
   }
   
   /// END WEAPON DATA
   /////////////////////

   /////////////////////
   /// BEGIN TRINKET DATA
   
   $table_name = $wpdb->prefix . "isgw2calc_trinkets"; 
   
   $trinkets = array();
   
   array_push($trinkets, array('id' => '1', 'name' => 'Berserker\'s Amulet', 'stats' => 'Power:798;Precision:569;Vitality:284;Critical Damage:15%' ));
   array_push($trinkets, array('id' => '2', 'name' => 'Celestial Amulet', 'stats' => 'Power:284;Precision:284;Toughness:284;Vitality:284;Critical Damage:15%;Condition Damage:284;Healing Power:284' ));
   array_push($trinkets, array('id' => '3', 'name' => 'Cleric\'s Amulet', 'stats' => 'Power:569;Toughness:569;Healing Power:798' ));
   array_push($trinkets, array('id' => '4', 'name' => 'Knight\'s Amulet', 'stats' => 'Power:596;Precision:569;Vitality:798' ));
   array_push($trinkets, array('id' => '5', 'name' => 'Rabid Amulet', 'stats' => 'Precision:569;Toughness:569;Condition Damage:798' ));
   array_push($trinkets, array('id' => '6', 'name' => 'Rampager\'s Amulet', 'stats' => 'Power:284;Precision:798;Vitality:284;Condition Damage:569' ));
   array_push($trinkets, array('id' => '7', 'name' => 'Shaman\'s Amulet', 'stats' => 'Toughness:798;Condition Damage:569;Healing Power:569' ));
   array_push($trinkets, array('id' => '8', 'name' => 'Soldier\'s Amulet', 'stats' => 'Power:798;Toughness:569;Vitality:569' ));
   array_push($trinkets, array('id' => '9', 'name' => 'Valkyrie\'s Amulet', 'stats' => 'Power:798;Toughness:569;Critical Damage:15%;Healing Power:284' ));
   array_push($trinkets, array('id' => '10', 'name' => 'Carrion Amulet', 'stats' => 'Power:569;Vitality:569;Condition Damage:798' ));


   
   foreach ($trinkets as $w)
   {
   $rows_affected = $wpdb->insert( $table_name, array('id' => $w['cid'], 'name' => $w['name'], 'stats' => $w['stats'] ) );
   }
   
   /// END TRINKET DATA
   /////////////////////

   /////////////////////
   /// BEGIN ORB DATA
   
   $table_name = $wpdb->prefix . "isgw2calc_orbs"; 
   
   $array = array();
   
   array_push($array, array('id' => '1', 'name' => 'Berserker\'s Jewel', 'stats' => 'Power:125;Precision:75;Critical Damage:5%;Vitality:45' ));
   array_push($array, array('id' => '2', 'name' => 'Celestial Jewel', 'stats' => 'Power:45;Precision:45;Condition Damage:45;Toughness:45;Vitality:45;Healing Power:45;Critical Damage:5%' ));
   array_push($array, array('id' => '3', 'name' => 'Cleric\'s Jewel', 'stats' => 'Healing Power:125;Power:75;Toughness:75' ));
   array_push($array, array('id' => '4', 'name' => 'Knight\'s Jewel', 'stats' => 'Vitality:125;Power:75;Precision:75' ));
   array_push($array, array('id' => '5', 'name' => 'Rabid Jewel', 'stats' => 'Condition Damage:125;Precision:75;Toughness:75' ));
   array_push($array, array('id' => '6', 'name' => 'Rampager\'s Jewel', 'stats' => 'Precision:125;Condition Damage:75;Power:45;Vitality:45' ));
   array_push($array, array('id' => '7', 'name' => 'Shaman\'s Jewel', 'stats' => 'Toughness:125;Condition Damage:75;Healing Power:75' ));
   array_push($array, array('id' => '8', 'name' => 'Soldier\'s Jewel', 'stats' => 'Power:125;Vitality:75;Toughness:75' ));
   array_push($array, array('id' => '9', 'name' => 'Valkyrie\'s Jewel', 'stats' => 'Power:125;Toughness:75;Critical Damage:5%;Healing Power:45' ));
   array_push($array, array('id' => '10', 'name' => 'Carrion Jewel', 'stats' => 'Condition Damage:125;Power:75;Vitality:75' ));


   
   foreach ($array as $w)
   {
   $rows_affected = $wpdb->insert( $table_name, array('id' => $w['cid'], 'name' => $w['name'], 'stats' => $w['stats'] ) );
   }
   
   /// END ORB DATA
   /////////////////////

   /////////////////////
   /// BEGIN SIGIL DATA
   
   $table_name = $wpdb->prefix . "isgw2calc_sigils"; 
   
   $array = array();
   
    array_push($array, array('id' => '1', 'name' => 'Sigil of Superior Accuracy', 'stats' => '+5% crit chance', 'type' => 'staticstat' ));
    array_push($array, array('id' => '2', 'name' => 'Sigil of Superior Force', 'stats' => '+5% damage', 'type' => 'staticstat' ));
    array_push($array, array('id' => '3', 'name' => 'Sigil of Superior Accuracy', 'stats' => 'You gain +10 precision each time you kill a foe. (max 25 stacks and ends on down or weapon swap)', 'type' => 'stackonkill' ));
    array_push($array, array('id' => '4', 'name' => 'Sigil of Superior Bloodlust', 'stats' => 'You gain +10 power each time you kill a foe. (max 25 stacks and ends on down or weapon swap)', 'type' => 'stackonkill' ));
    array_push($array, array('id' => '5', 'name' => 'Sigil of Superior Life', 'stats' => 'You gain +10 healing each time you kill a foe. (max 25 stacks and ends on down or weapon swap)', 'type' => 'stackonkill' ));
    array_push($array, array('id' => '6', 'name' => 'Sigil of Minor Corruption', 'stats' => 'You gain +10 condition damage each time you kill a foe. (max 25 stacks and ends on down or weapon swap)', 'type' => 'stackonkill' ));
    array_push($array, array('id' => '7', 'name' => 'Sigil of Superior Chilling', 'stats' => 'When you apply frozen it lasts 10% longer.', 'type' => 'conditionduration' ));
    array_push($array, array('id' => '8', 'name' => 'Sigil of Superior Agony', 'stats' => 'Bleeds you apply last 10% longer.', 'type' => 'conditionduration' ));
    array_push($array, array('id' => '9', 'name' => 'Sigil of Superior Debility', 'stats' => 'When you apply weakness it lasts 10% longer.', 'type' => 'conditionduration' ));
    array_push($array, array('id' => '10', 'name' => 'Sigil of Superior Hobbling', 'stats' => 'When you apply cripple it lasts 10% longer.', 'type' => 'conditionduration' ));
    array_push($array, array('id' => '11', 'name' => 'Sigil of Superior Paralyzation', 'stats' => '15% stun duration.', 'type' => 'conditionduration' ));
    array_push($array, array('id' => '12', 'name' => 'Sigil of Superior Peril', 'stats' => 'When you apply vulnerability it lasts 10% longer.', 'type' => 'conditionduration' ));
    array_push($array, array('id' => '13', 'name' => 'Sigil of Superior Smoldering', 'stats' => 'When you apply burning it lasts 10% longer.', 'type' => 'conditionduration' ));
    array_push($array, array('id' => '14', 'name' => 'Sigil of Superior Venom', 'stats' => 'When you apply poisen it lasts 10% longer.', 'type' => 'conditionduration' ));
    array_push($array, array('id' => '15', 'name' => 'Sigil of Superior Restoration', 'stats' => 'Gain Health on Killing a Foe.', 'type' => 'onkill' ));
    array_push($array, array('id' => '16', 'name' => 'Sigil of Superior Stamina', 'stats' => 'Your endurance is refilled each time you kill a Foe.', 'type' => 'onkill' ));
    array_push($array, array('id' => '17', 'name' => 'Sigil of Superior Speed', 'stats' => 'Gain swiftness (10 seconds) on Killing a Foe.', 'type' => 'onkill' ));
    array_push($array, array('id' => '18', 'name' => 'Sigil of Demon Summoning', 'stats' => 'You gain a summoning charge when ever you kill a foe. At 26 charges you summon a fleshreaver.(Lose all charges on down or weapon swap)', 'type' => 'chargeperkill' ));
    array_push($array, array('id' => '19', 'name' => 'Sigil of Superior Sanctuary', 'stats' => 'Each time you kill a foe you gain a charge. At 26 charges you are invulnerable for 5s.', 'type' => 'chargeperkill' ));
    array_push($array, array('id' => '20', 'name' => 'Sigil of Superior Air', 'stats' => '30% chance to cause a lightning strike on a critical hit. (This effect cannot trigger more than once every 5 seconds)', 'type' => 'oncriticalhit' ));
    array_push($array, array('id' => '21', 'name' => 'Sigil of Superior Blood', 'stats' => '30% chance to life steal on critical.', 'type' => 'oncriticalhit' ));
    array_push($array, array('id' => '22', 'name' => 'Sigil of Superior Earth', 'stats' => '60% chance to do a 5s bleed on critical.', 'type' => 'oncriticalhit' ));
    array_push($array, array('id' => '23', 'name' => 'Sigil of Superior Fire', 'stats' => '30% chance to cause flame blast on critical hit causing AoE damage. (This effect cannot trigger more than once every 5s)', 'type' => 'oncriticalhit' ));
    array_push($array, array('id' => '24', 'name' => 'Sigil of Superior Frailty', 'stats' => '30% chance to cause vulnerability for 10s on critical hit', 'type' => 'oncriticalhit' ));
    array_push($array, array('id' => '25', 'name' => 'Sigil of Superior Ice', 'stats' => '30% chance to cause a 2s freeze on a critical hit.', 'type' => 'oncriticalhit' ));
    array_push($array, array('id' => '26', 'name' => 'Sigil of Superior Strength', 'stats' => '30% chance to apply might for 10s on critical', 'type' => 'oncriticalhit' ));
    array_push($array, array('id' => '27', 'name' => 'Sigil of Superior Purity', 'stats' => '60% chance to remove a condition on critical. (This effect cannot trigger more than once every 10s)', 'type' => 'oncriticalhit' ));
    array_push($array, array('id' => '28', 'name' => 'Sigil of Superior Nullification', 'stats' => '60% chance to remove a boon on critical. (This effect cannot trigger more than once every 10s)', 'type' => 'oncriticalhit' ));
    array_push($array, array('id' => '29', 'name' => 'Sigil of Superior Rage', 'stats' => '10% chance on critical to apply quickness for 2 seconds. (This effect cannot trigger more than once every 45s)', 'type' => 'oncriticalhit' ));
    array_push($array, array('id' => '30', 'name' => 'Sigil of Superior Water', 'stats' => '30% chance to Heal nearby allies on critical hit. (This effect cannot trigger more than once every 10s)', 'type' => 'oncriticalhit' ));
    array_push($array, array('id' => '31', 'name' => 'Sigil of Intelligence', 'stats' => 'Your next attack after swapping to this weapon while in combat has a 100% chance to critical.', 'type' => 'onweaponswap' ));
    array_push($array, array('id' => '32', 'name' => 'Sigil of Superior Battle', 'stats' => 'You gain 3 stacks of might for 20s when you swap to this weapon while in combat', 'type' => 'onweaponswap' ));
    array_push($array, array('id' => '33', 'name' => 'Sigil of Superior Doom', 'stats' => 'You deal poison on your next attack for 5 seconds after you swap to this weapon while in combat.', 'type' => 'onweaponswap' ));
    array_push($array, array('id' => '34', 'name' => 'Sigil of Superior Energy', 'stats' => 'You gain 50% of your endurance when you swap to this weapon while in combat. (This effect cannot trigger more than once every 9s)', 'type' => 'onweaponswap' ));
    array_push($array, array('id' => '35', 'name' => 'Sigil of Superior Geomancy', 'stats' => 'You bleed nearby foes for 7s when you swap to this weapon while in combat. (This effect cannot trigger more than once every 9s)', 'type' => 'onweaponswap' ));
    array_push($array, array('id' => '36', 'name' => 'Sigil of Superior Hydromancy', 'stats' => 'You freeze nearby foes for 3s when you swap to this weapon while in combat. (This effect cannot trigger more than once every 9s)', 'type' => 'onweaponswap' ));
    array_push($array, array('id' => '37', 'name' => 'Sigil of Superior Leeching', 'stats' => 'Your next attack after swapping to this weapon while in combat steals some health.', 'type' => 'onweaponswap' ));


   
   foreach ($array as $w)
   {
   $rows_affected = $wpdb->insert( $table_name, array('id' => $w['cid'], 'name' => $w['name'], 'stats' => $w['stats'],'type' => $w['type'] ) );
   }
   
   /// END SIGIL DATA
   /////////////////////

   /////////////////////
   /// BEGIN RUNE DATA
   
   $table_name = $wpdb->prefix . "isgw2calc_runes"; 
   
   $array = array();
   
   array_push($array, array('id' => '1', 'name' => 'PvP Rune of Grenth', 'stats' => 'Condition Damage: 28;Chilled Duration: 20%;Condition Damage:55;5% chance to cause  chill for 3 seconds when hit. (Cooldown: 30s);Condition Damage: 100;When you use a healing skill nearby foes are  chilled for 3 seconds. (Cooldown: 10s)', 'type' => 'conditiondamage' ));
   array_push($array, array('id' => '18', 'name' => 'PvP Rune of Balthazar', 'stats' => 'Power: 25;Burning Duration: 15%;Power: 50;You gain haste for 5s when you\'re hit below 20% health. (cooldown: 90s);Power: 90;When you use a healing skill nearby foes are burned for 3 seconds. (cooldown: 10s)', 'type' => 'power' ));  
   
   foreach ($array as $w)
   {
   $rows_affected = $wpdb->insert( $table_name, array('id' => $w['cid'], 'name' => $w['name'], 'stats' => $w['stats'],'type' => $w['type'] ) );
   }
   
   /// END RUNE DATA
   /////////////////////

   /////////////////////
   /// BEGIN TRAIT LINE DATA
   
   $table_name = $wpdb->prefix . "isgw2calc_trait_lines"; 
   
   $array = array();

      array_push($array, array('name' => 'Fire Magic', 'cid' => '1', 'position' => '1','pri' => 'Power', 'sec' => 'ConditionDuration'));
      array_push($array, array('name' => 'Air Magic', 'cid' => '1', 'position' => '2','pri' => 'Precision', 'sec' => 'CriticalDamage'));
      array_push($array, array('name' => 'Earth Magic', 'cid' => '1', 'position' => '3', 'pri' => 'Toughness', 'sec' => 'ConditionDamage')); 
      array_push($array, array('name' => 'Water Magic', 'cid' => '1', 'position' => '4', 'pri' => 'Vitality', 'sec' => 'HealingPower')); 
      array_push($array, array('name' => 'Arcana', 'cid' => '1', 'position' => '5', 'pri' => 'AttunementRechargeRate', 'sec' => 'BoonDuration')); 

      array_push($array, array('name' => 'Explosives', 'cid' => '2', 'position' => '1','pri' => 'Power', 'sec' => 'ConditionDuration'));
      array_push($array, array('name' => 'Firearms', 'cid' => '2', 'position' => '2','pri' => 'Precision', 'sec' => 'ConditionDamage'));
      array_push($array, array('name' => 'Inventions', 'cid' => '2', 'position' => '3', 'pri' => 'Toughness', 'sec' => 'HealingPower')); 
      array_push($array, array('name' => 'Alchemy', 'cid' => '2', 'position' => '4', 'pri' => 'Vitality', 'sec' => 'BoonDuration')); 
      array_push($array, array('name' => 'Tools', 'cid' => '2', 'position' => '5', 'pri' => 'ToolBeltRechargeRate', 'sec' => 'CriticalDamage')); 

      array_push($array, array('name' => 'Zeal', 'cid' => '3', 'position' => '1','pri' => 'Power', 'sec' => 'ConditionDuration'));
      array_push($array, array('name' => 'Radiance', 'cid' => '3', 'position' => '2','pri' => 'Precision', 'sec' => 'ConditionDamage'));
      array_push($array, array('name' => 'Valor', 'cid' => '3', 'position' => '3', 'pri' => 'Toughness', 'sec' => 'CriticalDamage')); 
      array_push($array, array('name' => 'Honor', 'cid' => '3', 'position' => '4', 'pri' => 'Vitality', 'sec' => 'HealingPower')); 
      array_push($array, array('name' => 'Virtues', 'cid' => '3', 'position' => '5', 'pri' => 'VirtueRechargeRate', 'sec' => 'BoonDuration')); 

      array_push($array, array('name' => 'Domination', 'cid' => '4', 'position' => '1','pri' => 'Power', 'sec' => 'ConditionDuration'));
      array_push($array, array('name' => 'Dueling', 'cid' => '4', 'position' => '2','pri' => 'Precision', 'sec' => 'CriticalDamage'));
      array_push($array, array('name' => 'Chaos', 'cid' => '4', 'position' => '3', 'pri' => 'Toughness', 'sec' => 'BoonDuration')); 
      array_push($array, array('name' => 'Inspiration', 'cid' => '4', 'position' => '4', 'pri' => 'Vitality', 'sec' => 'HealingPower')); 
      array_push($array, array('name' => 'Illusions', 'cid' => '4', 'position' => '5', 'pri' => 'ShreddingRechargeRate', 'sec' => 'ConditionDamage')); 

      array_push($array, array('name' => 'Spite', 'cid' => '5', 'position' => '1', 'pri' => 'Power', 'sec' => 'ConditionDuration'));
      array_push($array, array('name' => 'Curses', 'cid' => '5', 'position' => '2', 'pri' => 'Precision', 'sec' => 'ConditionDamage'));
      array_push($array, array('name' => 'Death Magic', 'cid' => '5', 'position' => '3', 'pri' => 'Toughness', 'sec' => 'BoonDuration'));
      array_push($array, array('name' => 'Blood Magic', 'cid' => '5', 'position' => '4', 'pri' => 'Vitality', 'sec' => 'HealingPower'));
      array_push($array, array('name' => 'Soul Reaping', 'cid' => '5', 'position' => '5', 'pri' => 'LifeForcePool', 'sec' => 'CriticalDamage'));  

      array_push($array, array('name' => 'Marksmanship', 'cid' => '6', 'position' => '1', 'pri' => 'Power', 'sec' => 'ConditionDuration'));
      array_push($array, array('name' => 'Skirmishing', 'cid' => '6', 'position' => '2', 'pri' => 'Precision', 'sec' => 'CriticalDamage'));
      array_push($array, array('name' => 'Wilderness Survival', 'cid' => '6', 'position' => '3', 'pri' => 'Toughness', 'sec' => 'ConditionDamage'));
      array_push($array, array('name' => 'Nature Magic', 'cid' => '6', 'position' => '4', 'pri' => 'Vitality', 'sec' => 'BoonDuration'));
      array_push($array, array('name' => 'Beastmastery', 'cid' => '6', 'position' => '5', 'pri' => 'PetAttributeBonus', 'sec' => 'HealingPower')); 

      array_push($array, array('name' => 'Deadly Arts', 'cid' => '7', 'position' => '1', 'pri' => 'Power', 'sec' => 'ConditionDuration'));
      array_push($array, array('name' => 'Critical Strikes', 'cid' => '7', 'position' => '2', 'pri' => 'Precision', 'sec' => 'CriticalDamage'));
      array_push($array, array('name' => 'Shadow Arts', 'cid' => '7', 'position' => '3', 'pri' => 'Toughness', 'sec' => 'HealingPower'));
      array_push($array, array('name' => 'Acrobatics', 'cid' => '7', 'position' => '4', 'pri' => 'Vitality', 'sec' => 'BoonDuration'));
      array_push($array, array('name' => 'Trickery', 'cid' => '7', 'position' => '5', 'pri' => 'StealRechargeRate', 'sec' => 'ConditionDamage'));

      array_push($array, array('name' => 'Strength', 'cid' => '8', 'position' => '1','pri' => 'Power', 'sec' => 'ConditionDuration'));
      array_push($array, array('name' => 'Arms', 'cid' => '8', 'position' => '2','pri' => 'Precision', 'sec' => 'ConditionDamage'));
      array_push($array, array('name' => 'Defense', 'cid' => '8', 'position' => '3', 'pri' => 'Toughness', 'sec' => 'HealingPower')); 
      array_push($array, array('name' => 'Tactics', 'cid' => '8', 'position' => '4', 'pri' => 'Vitality', 'sec' => 'BoonDuration')); 
      array_push($array, array('name' => 'Discipline', 'cid' => '8', 'position' => '5', 'pri' => 'BurstDamage', 'sec' => 'CriticalDamage'));   

   
   
   foreach ($array as $w)
   {
   $rows_affected = $wpdb->insert( $table_name, array('id' => $w['id'], 'name' => $w['name'], 'cid' => $w['cid'],'position' => $w['position'],'pri' => $w['pri'],'sec' => $w['sec'] ) );
   }
   
   /// END TRAIT LINE  DATA
   /////////////////////
   
}	



?>