<div class="armorAccessoryContainer">
	<div id="gear">
		<!--h2>Armor & Runes</h2-->
		<div class="armor">
			<div class="armor_img"><img src="<?php echo plugin_dir_url(__FILE__);?>images/armor/helmet.png" /></div>
			<div id="rune1" onClick="runePicker('1')" class="empty-slot"></div>
		</div>
		<div class="armor">
			<div class="armor_img"><img src="<?php echo plugin_dir_url(__FILE__);?>images/armor/shoulders.png" /></div>
			<div id="rune2" class="empty-slot" onClick="runePicker('2')"></div>
		</div>
		<div class="armor">
			<div class="armor_img"><img src="<?php echo plugin_dir_url(__FILE__);?>images/armor/chest.png" /></div>
			<div id="rune3" onClick="runePicker('3')" class="empty-slot"></div>
		</div>
		<div class="armor">
			<div class="armor_img"><img src="<?php echo plugin_dir_url(__FILE__);?>images/armor/gloves.png" /></div>
			<div id="rune4" onClick="runePicker('4')" class="empty-slot"></div>
		</div>
		<div class="armor">
			<div class="armor_img"><img src="<?php echo plugin_dir_url(__FILE__);?>images/armor/leggings.png" /></div>
			<div id="rune5" onClick="runePicker('5')" class="empty-slot"></div>
		</div>
		<div class="armor">
			<div class="armor_img"><img src="<?php echo plugin_dir_url(__FILE__);?>images/armor/boots.png" /></div>
			<div id="rune6" onClick="runePicker('6')" class="empty-slot"></div>
		</div>
	
		<div id="runes" title="Runes" class="dialog" style="display:none"> 
			<div id="rune_accordion">
			<?php foreach ($rune_types as $k) { ?>
				<h3><?php echo $rune_keys[$k->type]?></h3>
				<div>
			   <?php foreach ($runes as $s) {
					if ($s->type == $k->type)
					{ ?>
					<span class="tooltip" >
						<img style="margin:5px;" onClick="runePick('<?php echo $s->id; ?>')" src="<?php echo plugin_dir_url(__FILE__); ?>images/runes/<?php echo $s->id?>.jpg" />
						<div class="tooltip_frame">
							<div class="tooltip_title">
									<img style="float:left"src="<?php echo plugin_dir_url(__FILE__); ?>images/runes/<?php echo $s->id?>.jpg"/><span style="padding-left:5px;font-size:11px;"><?php echo $s->name?></span>
							</div>
							<div style="clear:both;"></div>
							<div class="tooltip_description" style="margin-top:8px;">
								<ul>
								<?php 
									$rstats = explode(";", $s->stats);
									for ($x=0;$x<sizeof($rstats);$x++)				 						
									{
										$c = $x+1;
										echo '<li style="margin:6px 0 6px 0;"><span style="margin-right:5px;">('.$c.')</span><span>'.$rstats[$x].'</span></li>';
									}
								?>
								</ul>
							</div>
						</div>
					</span>
					<?php } }  ?>
				</div>
			<?php } ?>
			</div>
		</div>
	</div><!-- Gear -->
	
	<div id="accessories">
		<!--h2>Accessories & Jewels</h2-->
		<div class="armor">
			<div id="trinket" onClick="trinketPicker()" class="armor_img"></div>
			<div id="orb" onClick="orbPicker()" class="empty-slot"></div>
		</div>
	
		<div id="trinket_pick" class="dialog" title="Chose an Amulet" style="display:none;">
			<?php foreach($trinkets as $t) { ?>
				<span class="tooltip">
					<img style="margin:5px;" class="masterTooltip" onClick="trinketPick('<?php echo $t->id; ?>')" src="<?php echo plugin_dir_url(__FILE__); ?>images/trinkets/<?php echo $t->id?>.png" />
					<div class="tooltip_frame">
						<div class="tooltip_title">
							<span style="vertical-align:top;padding:8px 0 8px 0;">
								<?php echo $t->name?>
							</span>
						</div>
						<div>
							<ul>
							<?php $stats = spliti (";", $t->stats);
								foreach($stats as $s)
								{
									echo '<li class="amulet_tip">'.$s.'</li>';
								}
	
							 ?>
							</ul>
						</div>
					</div>
				</span>
			<?php } ?>
		</div>
	
		<div id="orb_pick" class="dialog" title="Chose a Orb" style="display:none;">
			<?php foreach($orbs as $t) { ?>
				<span class="tooltip" >
					<img style="margin:5px;" onClick="orbPick('<?php echo $t->id; ?>')" src="<?php echo plugin_dir_url(__FILE__); ?>images/jewels/<?php echo $t->id?>.jpg" />
					<div class="tooltip_frame">
						<div class="tooltip_title">
							<span>
								<img src="<?php echo plugin_dir_url(__FILE__); ?>images/jewels/<?php echo $t->id?>.jpg"/>
							</span>
							<span style="vertical-align:top;padding:8px;">
								<?php echo $t->name?>
							</span>
						</div>
						<div>
							<ul>
							<?php $stats = spliti (";", $t->stats);
								foreach($stats as $s)
								{
									echo '<li class="orb_tip">'.$s.'</li>';
								}
	
							 ?>
							</ul>
						</div>
					</div>
				</span>
			<?php } ?>
		</div>
	</div> <!-- Accessories -->
</div> <!-- armorAccessoryContainer -->


<div class="selectionAreaContainer">
	<div class="selectionArea">
		<div class="activeArrow activeVertical"></div>
		<div class="activeArrow activeHorizontal"></div>
		
		<div class="selectionAreaNavContainer">
			<ul class="selectionAreaNav">
				<li>
					<a href="#selectionAreaRunes" class="selectionAreaRunes"></a>
				</li>
				<li>
					<a href="#selectionAreaSigils" class="selectionAreaSigils"></a>
				</li>
				<li>
					<a href="#selectionAreaCosmetic" class="selectionAreaCosmetic"></a>
				</li>
			</ul>
		</div>
		
		<div class="selectionAreaContent">
			<div id="selectionAreaRunes">
				<div id="rune_accordion">
					<?php foreach ($rune_types as $k) { ?>
						<h3><?php echo $rune_keys[$k->type]?></h3>
						<div>
					   <?php foreach ($runes as $s) {
							if ($s->type == $k->type)
							{ ?>
								<span class="tooltip" >
									<img style="margin:5px;" onClick="runePick('<?php echo $s->id; ?>')" src="<?php echo plugin_dir_url(__FILE__); ?>images/runes/<?php echo $s->id?>.jpg" />
									<div class="tooltip_frame">
										<div class="tooltip_title">
												<img style="float:left"src="<?php echo plugin_dir_url(__FILE__); ?>images/runes/<?php echo $s->id?>.jpg"/><span style="padding-left:5px;font-size:11px;"><?php echo $s->name?></span>
										</div>
										<div style="clear:both;"></div>
										<div class="tooltip_description" style="margin-top:8px;">
											<ul>
											<?php 
												$rstats = explode(";", $s->stats);
												for ($x=0;$x<sizeof($rstats);$x++)				 						
												{
													$c = $x+1;
													echo '<li style="margin:6px 0 6px 0;"><span style="margin-right:5px;">('.$c.')</span><span>'.$rstats[$x].'</span></li>';
												}
											?>
											</ul>
										</div>
									</div>
								</span>
							<?php } }  ?>
						</div>
					<?php } ?>
				</div>
			</div>
			
			<div id="selectionAreaSigils">
				<div id="sigil_accordion">
					<?php foreach ($sigil_types as $k) { ?>
						<h3><?php echo $sigil_keys[$k->type]?></h3>
						<div>
					   <?php foreach ($sigils as $s) {
							if ($s->type == $k->type)
							{ ?>
							<span class="tooltip" >
								<img style="margin:5px;" onClick="sigilPick('<?php echo $s->id; ?>')" src="<?php echo plugin_dir_url(__FILE__); ?>images/sigils/<?php echo $s->id?>.jpg" />
								<div class="tooltip_frame">
									<div class="tooltip_title">
											<img style="float:left"src="<?php echo plugin_dir_url(__FILE__); ?>images/sigils/<?php echo $s->id?>.jpg"/><span style="padding-left:5px;font-size:11px;"><?php echo $s->name?></span>
									</div>
									<div style="clear:both;"></div>
									<div class="tooltip_description" style="margin-top:5px;">
										<?php echo $s->stats?>
									</div>
								</div>
							</span>
							<?php } }  ?>
						</div>
					<?php } ?>
				</div>
			</div>
			
			<div id="selectionAreaCosmetic">selectionAreaCosmetic</div>
		</div>
	</div> <!-- selectionArea -->
</div>



<div id="weapons">
	<!--h2>Weapon set</h2-->

	<div class="weapon">
		<div class="separate_weapon">
			<div id="weapon_set_1_mainhand" onClick="weaponPicker('mainhand','1')" class="weapon_pick"></div>
			<div class="sigils">
				<div id="sigil_mainhand1" onClick="sigilPicker('mainhand','1')" class="empty-slot"></div>
			</div>
		</div>
		
		<div class="weapon_set_1 weapon_set_icon"></div>
		
		<div class="separate_weapon">
			<div id="weapon_set_1_offhand" onClick="weaponPicker('offhand','1')" class="weapon_pick"></div>
			<div class="sigils">
				<div id="sigil_offhand1" onClick="sigilPicker('offhand','1')" class="empty-slot"></div>
			</div>
		</div>
	</div>
	

	<?php if ($profession->sets==2){ ?>
	<div class="weapon_swap" onClick="swapWeapons()"></div>

	<div class="weapon">
		<div class="separate_weapon">
			<div id="weapon_set_2_mainhand" onClick="weaponPicker('mainhand','2')" class="weapon_pick"></div>
			<div class="sigils">
				<div id="sigil_mainhand2" onClick="sigilPicker('mainhand','2')" class="empty-slot"></div>
			</div>
		</div>
		
		<div class="weapon_set_2 weapon_set_icon"></div>
		
		<div class="separate_weapon">
			<div id="weapon_set_2_offhand" onClick="weaponPicker('offhand','2')" class="weapon_pick"></div>
			<div class="sigils">
				<div id="sigil_offhand2" onClick="sigilPicker('offhand','2')" class="empty-slot"></div>
			</div>
		</div>
	</div>
	<?php } ?>

	<div id="sigil_pick" title="Sigils" class="dialog" style="display:none;">
		<div id="sigil_accordion">
			<?php foreach ($sigil_types as $k) { ?>
				<h3><?php echo $sigil_keys[$k->type]?></h3>
				<div>
			   <?php foreach ($sigils as $s) {
					if ($s->type == $k->type)
					{ ?>
					<span class="tooltip" >
						<img style="margin:5px;" onClick="sigilPick('<?php echo $s->id; ?>')" src="<?php echo plugin_dir_url(__FILE__); ?>images/sigils/<?php echo $s->id?>.jpg" />
						<div class="tooltip_frame">
							<div class="tooltip_title">
									<img style="float:left"src="<?php echo plugin_dir_url(__FILE__); ?>images/sigils/<?php echo $s->id?>.jpg"/><span style="padding-left:5px;font-size:11px;"><?php echo $s->name?></span>
							</div>
							<div style="clear:both;"></div>
							<div class="tooltip_description" style="margin-top:5px;">
								<?php echo $s->stats?>
							</div>
						</div>
					</span>
					<?php } }  ?>
				</div>
			<?php } ?>
		</div>
	</div>

	<div id="weapon_picker" title="Pick a weapon" class="dialog"></div>
</div><!-- Weapons -->









<div id="skills">
	<div class="class_specific"></div>
	
	<div class="skillbar">
		<ul class="skills_weapons">
			<li class="skill slot-1">
				<div class="skill_tooltip"></div>
				<img class="skill_image" />
				<span class="skill_hotkey">1</span>
			</li>
			<li class="skill slot-2">
				<div class="skill_tooltip"></div>
				<img class="skill_image" />
				<span class="skill_hotkey">2</span>
			</li>
			<li class="skill slot-3">
				<div class="skill_tooltip"></div>
				<img class="skill_image" />
				<span class="skill_hotkey">3</span>
			</li>
			<li class="skill slot-4">
				<div class="skill_tooltip"></div>
				<img class="skill_image" />
				<span class="skill_hotkey">4</span>
			</li>
			<li class="skill slot-5">
				<div class="skill_tooltip"></div>
				<img class="skill_image" />
				<span class="skill_hotkey">5</span>
			</li>
		</ul>
		
		<div class="vitals">
			<img class="endurance" src="<?php echo plugin_dir_url(__FILE__);?>/images/endurance.png" />
			<div class="health">
				<span data-bind="text: attributeHealth"></span>
			</div>
		</div>
		
		<ul class="skills_heal">
			<li class="skill slot-6">
				<div class="skill_tooltip"></div>
				<div class="skill_expand">
					<span>&#x25B2</span>
				</div>
				<img class="skill_image" />
				<span class="skill_hotkey">6</span>
			</li>
		</ul>
		
		<ul class="skills_utility">
			<li class="skill slot-7">
				<div class="skill_tooltip"></div>
				<div class="skill_expand">
					<span>&#x25B2</span>
				</div>
				<img class="skill_image" />
				<span class="skill_hotkey">7</span>
			</li>
			<li class="skill slot-8">
				<div class="skill_tooltip"></div>
				<div class="skill_expand">
					<span>&#x25B2</span>
				</div>
				<img class="skill_image" />
				<span class="skill_hotkey">8</span>
			</li>
			<li class="skill slot-9">
				<div class="skill_tooltip"></div>
				<div class="skill_expand">
					<span>&#x25B2</span>
				</div>
				<img class="skill_image" />
				<span class="skill_hotkey">9</span>
			</li>
		</ul>
		
		<ul class="skills_elite">
			<li class="skill slot-0">
				<div class="skill_tooltip"></div>
				<div class="skill_expand">
					<span>&#x25B2</span>
				</div>
				<img class="skill_image" />
				<span class="skill_hotkey">0</span>
			</li>
		</ul>
	</div>
</div><!-- Skills -->



<div style="clear:both;"></div>


















