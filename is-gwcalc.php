<?php
/*
Plugin Name: isGuildWars2 Calculator
Description: Guild Wars 2 PvP Build Calculator. Shortcode [isgw2calc]
Version: 1.0
Author: Ivica Sertić
Author URI: http://ivica-sertic.from.hr
License: General Public License 3


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

//Database install hook
include_once dirname( __FILE__ ).'/dbinstall.php';
register_activation_hook( __FILE__, 'db_install' );
register_activation_hook( __FILE__, 'db_install_data' );
register_deactivation_hook( __FILE__, 'db_uninstall' );




//[isgw2calc]
function display_func(){

	//Style
	wp_enqueue_style( 'gw2calc', plugins_url( 'css/style.css', __FILE__ ));

	//JQuery
	wp_enqueue_script("jquery");
	wp_enqueue_script("jquery_ui", "http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js");
	
	//get args
	$args['class'] = $_GET['class'];

	global $wpdb;
	//get professions
	$table_class = $wpdb->prefix . "isgw2calc_class";
	$query = "SELECT * FROM $table_class";	
	$classes = $wpdb->get_results($query);

	//get runes
	$table_runes = $wpdb->prefix . "isgw2calc_runes";
	$query = "SELECT * FROM $table_runes";	
	$runes = $wpdb->get_results($query);

	//get sigils types
	$query = "SELECT DISTINCT type FROM $table_runes";	
	$rune_types = $wpdb->get_results($query);

	$rune_keys = array('conditiondamage'=>'Condition Damage','power' => 'Power');

	//get sigils
	$table_sigils = $wpdb->prefix . "isgw2calc_sigils";
	$query = "SELECT * FROM $table_sigils";	
	$sigils = $wpdb->get_results($query);

	//get sigils types
	$query = "SELECT DISTINCT type FROM $table_sigils";	
	$sigil_types = $wpdb->get_results($query);

	$sigil_keys = array('staticstat' => 'Static Stat Bonus','stackonkill' => 'Stacking On Kill','conditionduration'=>'Condition Duration','onkill' => 'On Kill','chargeperkill'=>'Charge Per Kill','oncriticalhit'=>'On Critical Hit','onweaponswap'=>'On Weapon Swap');

	//get trinkets
	$table_trinkets = $wpdb->prefix . "isgw2calc_trinkets";
	$query = "SELECT * FROM $table_trinkets";	
	$trinkets = $wpdb->get_results($query);

	//get orbs
	$table_orbs = $wpdb->prefix . "isgw2calc_orbs";
	$query = "SELECT * FROM $table_orbs";	
	$orbs = $wpdb->get_results($query);
	
	//if class variable is set
	if (isset($args['class']))
	{

		//get current profession
		$query = "SELECT * FROM $table_class WHERE name ='".$args['class']."'";	
		$profession = $wpdb->get_row($query);
		$currentProfession = $wpdb->get_results($query);

		//get weapons
		$table_weapons = $wpdb->prefix . "isgw2calc_weapons";
		$query = "SELECT * FROM $table_weapons WHERE cid = $profession->id";	
		$weapons = $wpdb->get_results($query);

		//get traits
		$table_trait_lines = $wpdb->prefix . "isgw2calc_trait_lines";
		$query = "SELECT * FROM $table_trait_lines WHERE cid = $profession->id";	
		$traitLines = $wpdb->get_results($query);

		$table_traits = $wpdb->prefix . "isgw2calc_traits";
		$query = "SELECT * FROM $table_traits WHERE cid = $profession->id";	
		$traits = $wpdb->get_results($query);

		//get skills
	}
	
	wp_enqueue_script( 'knockout', plugins_url( 'js/lib/knockout-2.2.1.js', __FILE__));
	wp_enqueue_script( 'jquery_slider', plugins_url( 'js/lib/jquery.sbscroller.js', __FILE__), array('jquery'));
	wp_enqueue_script( 'jquery_mousewheel', plugins_url( 'js/lib/jquery.mousewheel.js', __FILE__), array('jquery'));
	
	wp_enqueue_script( 'gw2calc', plugins_url( 'js/script.js', __FILE__ ), array('knockout', 'jquery')); 
	wp_localize_script('gw2calc', 'professions', $classes);
	wp_localize_script('gw2calc', 'currentProfession', $currentProfession);
	wp_localize_script('gw2calc', 'currentProfessionName', $args['class']);
	wp_localize_script('gw2calc', 'weapons', $weapons);
	wp_localize_script('gw2calc', 'trinkets', $trinkets);
	wp_localize_script('gw2calc', 'orbs', $orbs);
	wp_localize_script('gw2calc', 'runes', $runes);
	wp_localize_script('gw2calc', 'sigils', $sigils);
	wp_localize_script('gw2calc', 'traitLines', $traitLines);
	wp_localize_script('gw2calc', 'pluginUrl', plugin_dir_url(__FILE__) );
	
	ob_start();
	/// HTML START //////////////////////
	?> 
	<div id="isgw2calc">
	<div id="professions">
	<?php foreach ($classes as $c) { ?>
	

		<span style="padding:5px;"><a href="<?php echo add_query_arg('class', $c->name, get_permalink()); ?>" ><img  <?php if ($c->name==$args['class']){ echo 'style="opacity:1;"';}?> src="<?php echo plugin_dir_url(__FILE__);?>images/prof_icons/<?php echo $c->id; ?>.png" title="<?php echo $c->name; ?>"></a></span>

	<?php } ?>
	</div>
	<div>
	 	
	 	<?php if(isset($args['class'])){ ?>
	 	
	 	<div id="build">
	 		<div>
	 		<ul class="build_navigation">
				<li class="character">
					<span class="gradient-line gradient-left line-top"></span>
					<a href="#character" class="character"></a>
					<span class="color-fill"></span>
					<span class="gradient-line gradient-left line-bottom"></span>
				</li>
				<li class="traits">
					<span class="gradient-line gradient-left line-top"></span>
					<a href="#traits" class="traits"></a>
					<span class="color-fill"></span>
					<span class="gradient-line gradient-left line-bottom"></span>
				</li>
				<li class="story">
					<span class="gradient-line gradient-left line-top"></span>
					<a href="#story" class="story"></a>
					<span class="color-fill"></span>
					<span class="gradient-line gradient-left line-bottom"></span>
				</li>
				<li class="social">
					<span class="gradient-line gradient-left line-top"></span>
					<a href="#social" class="social"></a>
					<span class="color-fill"></span>
					<span class="gradient-line gradient-left line-bottom"></span>
				</li>
			</ul>
			</div>
			
			<div class="build_container">
				<span class="gradient-line gradient-right line-top"></span>
				<div id="character">
					<?php include('character.php') ?>
				</div>
				
				<div id="traits">
					<?php include('traits.php') ?>
				</div>
				
				<div id="story">
					<?php include('story.php') ?>
				</div>
				
				<div id="social">
					<?php include('social.php') ?>
				</div>
				<span class="gradient-line gradient-right line-bottom"></span>
			</div>
	 	</div> 

	 	<div id="display" style="float:left;width:20%">
	 		<?php include('aside.php') ?>
	 	</div>
	</div>
	<?php }  ?>	
	</div>
	 <?php
	 /// HTML END ///////////////////////

	 $output = ob_get_contents();
	 ob_end_clean();
	 return $output;
 
}
add_shortcode( 'isgw2calc', 'display_func' );

?>