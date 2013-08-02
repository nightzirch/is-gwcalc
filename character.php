<div class="armorAccessoryContainer">
	<div id="gear">
		<!--h2>Armor & Runes</h2-->
		<div class="armor armor-container helmet-container" data-active="activeHelmet">
			<div class="armor-img armor-slot armor-helmet"></div>
			<div class="empty-slot rune-slot rune-helmet"></div>
		</div>
		<div class="armor armor-container shoulders-container" data-active="activeShoulders">
			<div class="armor-img armor-slot armor-shoulders"></div>
			<div class="empty-slot rune-slot rune-shoulders"></div>
		</div>
		<div class="armor armor-container chest-container" data-active="activeChest">
			<div class="armor-img armor-slot armor-chest"></div>
			<div class="empty-slot rune-slot rune-chest"></div>
		</div>
		<div class="armor armor-container gloves-container" data-active="activeGloves">
			<div class="armor-img armor-slot armor-gloves"></div>
			<div class="empty-slot rune-slot rune-gloves"></div>
		</div>
		<div class="armor armor-container leggings-container" data-active="activeLeggings">
			<div class="armor-img armor-slot armor-leggings"></div>
			<div class="empty-slot rune-slot rune-leggings"></div>
		</div>
		<div class="armor armor-container boots-container" data-active="activeBoots">
			<div class="armor-img armor-slot armor-boots"></div>
			<div class="empty-slot rune-slot rune-boots"></div>
		</div>
		<div class="amulet armor-container amulet-container" data-active="activeAmulet">
			<div class="armor-img amulet-slot"></div>
			<div class="empty-slot jewel-slot"></div>
		</div>
	</div>
</div> <!-- armorAccessoryContainer -->


<div class="selectionAreaContainer">
	<div class="selectionArea hide">
		<div class="activeArrow activeVertical"></div>
		<div class="activeArrow activeHorizontal"></div>
		
		<div class="selectionAreaNavContainer">
			<ul class="selectionAreaNav">
				<li>
					<a href="#selectionAreaCombat" class="selectionAreaCombat"></a>
				</li>
				<li>
					<a href="#selectionAreaCosmetic" class="selectionAreaCosmetic"></a>
				</li>
			</ul>
			
			<span class="close"></span>
		</div>
		
		
		
		<div class="selectionAreaContent">
			<div id="selectionAreaCombat">
				<div class="accordionHeader selectionAreaWeaponsHeader collapsed">
					<span class="accordionHeaderTitle">Weapons</span>
					<span class="accordionHeaderArrow">&#x25BC;</span>
				</div>
				<div class="accordionContainer selectionAreaWeapons" style="display: none">
					<?php foreach ($weapons as $w) { ?>
						<span class="tooltip">
							<img style="margin:5px;" title='<?php echo $w->name; ?>' src="<?php echo plugin_dir_url(__FILE__) ?>images/weapons/<?php echo $w->name; ?>.jpg" data-id='<?php echo $w->id; ?>' />
							<div class="tooltip_frame">
								<div class="tooltip_title">
									<span style="vertical-align:top;padding:8px 0 8px 0;"><?php echo $w->name; ?></span>
								</div>
								<div>
									<ul class="tooltip_list">
										<li style="font-size: 11px;padding-bottom: 8px;">Damage: <span class="weapon_tip">'<?php echo $w->stats; ?>'</span>
										</li>
									</ul>
								</div>
							</div>
						</span>
					<?php }  ?>
				</div>
				
				<div class="accordionHeader selectionAreaAmuletsHeader collapsed">
					<span class="accordionHeaderTitle">Amulets</span>
					<span class="accordionHeaderArrow">&#x25BC;</span>
				</div>
				<div class="accordionContainer selectionAreaAmulets" style="display: none">
					<?php foreach($trinkets as $t) { ?>
						<span class="tooltip">
							<img style="margin:5px;" class="masterTooltip" data-id='<?php echo $t->id; ?>' src="<?php echo plugin_dir_url(__FILE__); ?>images/amulets/<?php echo $t->id?>.jpg" />
							<div class="tooltip_frame">
								<div class="tooltip_title">
									<span style="vertical-align:top;padding:8px 0 8px 0;">
										<?php echo $t->name?>
									</span>
								</div>
								<div>
									<ul>
										<?php $stats = spliti (";", $t->stats);
											foreach($stats as $s) {
												echo '<li class="amulet_tip">'.$s.'</li>';
											}
										?>
									</ul>
								</div>
							</div>
						</span>
					<?php } ?>
				</div>
				
				<div class="accordionHeader selectionAreaJewelsHeader collapsed">
					<span class="accordionHeaderTitle">Jewels</span>
					<span class="accordionHeaderArrow">&#x25BC;</span>
				</div>
				<div class="accordionContainer selectionAreaJewels" style="display: none">
					<?php foreach($orbs as $t) { ?>
					<span class="tooltip" >
						<img style="margin:5px;" data-id='<?php echo $t->id; ?>' src="<?php echo plugin_dir_url(__FILE__); ?>images/jewels/<?php echo $t->id?>.jpg" />
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
										foreach($stats as $s) {
											echo '<li class="orb_tip">'.$s.'</li>';
										}
									?>
								</ul>
							</div>
						</div>
					</span>
				<?php } ?>
				</div>
				
				<div class="accordionHeader selectionAreaRunesHeader collapsed">
					<span class="accordionHeaderTitle">Runes</span>
					<span class="accordionHeaderArrow">&#x25BC;</span>
				</div>
				<div class="accordionContainer selectionAreaRunes" style="display: none">
					<div>
						<?php foreach ($runes as $s) { ?>
							<span class="tooltip" >
								<img style="margin:5px;" data-id='<?php echo $s->id; ?>' src="<?php echo plugin_dir_url(__FILE__); ?>images/runes/<?php echo $s->id?>.jpg" />
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
						<?php }  ?>
					</div>
				</div>
				
				<div class="accordionHeader selectionAreaSigilsHeader collapsed">
					<span class="accordionHeaderTitle">Sigils</span>
					<span class="accordionHeaderArrow">&#x25BC;</span>
				</div>
				<div class="accordionContainer selectionAreaSigils" style="display: none">
					<div>
						<?php foreach ($sigils as $s) { ?>
							<span class="tooltip" >
								<img style="margin:5px;" data-id='<?php echo $s->id; ?>' src="<?php echo plugin_dir_url(__FILE__); ?>images/sigils/<?php echo $s->id?>.jpg" />
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
						<?php }  ?>
					</div>
				</div>	
			</div>
			
			<div id="selectionAreaCosmetic">selectionAreaCosmetic</div>
		</div>
	</div> <!-- selectionArea -->
</div>



<div id="weapons">
	<!--h2>Weapon set</h2-->

	<div class="weapon">
		<div class="weapon-container separate_weapon" data-active="activeMain1" data-slot="mainhand">
			<div class="weapon-img weapon-slot weapon-main weapon-main1"></div>
			<div class="empty-slot sigil-slot sigil-main1"></div>
		</div>
		
		<div class="weapon_set_1 weapon_set_icon"></div>
		
		<div class="weapon-container separate_weapon" data-active="activeOff1" data-slot="offhand">
			<div class="weapon-img weapon-slot weapon-off weapon-off1"></div>
			<div class="empty-slot sigil-slot sigil-off1"></div>
		</div>
	</div>
	

	<?php if ($profession->sets==2){ ?>
		<div class="weapon_swap" onClick="swapWeapons()"></div>
	
		<div class="weapon">
			<div class="weapon-container separate_weapon" data-active="activeMain2" data-slot="mainhand">
				<div class="weapon-img weapon-slot weapon-main weapon-main2"></div>
				<div class="empty-slot sigil-slot sigil-main2"></div>
			</div>
			
			<div class="weapon_set_2 weapon_set_icon"></div>
			
			<div class="weapon-container separate_weapon" data-active="activeOff2" data-slot="offhand">
				<div class="weapon-img weapon-slot weapon-off weapon-off2"></div>
				<div class="empty-slot sigil-slot sigil-off2"></div>
			</div>
		</div>
	<?php } ?>
</div><!-- Weapons -->









<div id="skills">
	<div class="class_specific"></div>
	
	<div class="skillbar">
		<ul class="skills_weapons">
			<li class="skill slot-1">
				<div class="skill_tooltip"></div>
				<div class="skill_image"></div>
				<span class="skill_hotkey">1</span>
			</li>
			<li class="skill slot-2">
				<div class="skill_tooltip"></div>
				<div class="skill_image"></div>
				<span class="skill_hotkey">2</span>
			</li>
			<li class="skill slot-3">
				<div class="skill_tooltip"></div>
				<div class="skill_image"></div>
				<span class="skill_hotkey">3</span>
			</li>
			<li class="skill slot-4">
				<div class="skill_tooltip"></div>
				<div class="skill_image"></div>
				<span class="skill_hotkey">4</span>
			</li>
			<li class="skill slot-5">
				<div class="skill_tooltip"></div>
				<div class="skill_image"></div>
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
				<div class="skill_image"></div>
				<span class="skill_hotkey">6</span>
			</li>
		</ul>
		
		<ul class="skills_utility">
			<li class="skill slot-7">
				<div class="skill_tooltip"></div>
				<div class="skill_expand">
					<span>&#x25B2</span>
				</div>
				<div class="skill_image"></div>
				<span class="skill_hotkey">7</span>
			</li>
			<li class="skill slot-8">
				<div class="skill_tooltip"></div>
				<div class="skill_expand">
					<span>&#x25B2</span>
				</div>
				<div class="skill_image"></div>
				<span class="skill_hotkey">8</span>
			</li>
			<li class="skill slot-9">
				<div class="skill_tooltip"></div>
				<div class="skill_expand">
					<span>&#x25B2</span>
				</div>
				<div class="skill_image"></div>
				<span class="skill_hotkey">9</span>
			</li>
		</ul>
		
		<ul class="skills_elite">
			<li class="skill slot-0">
				<div class="skill_tooltip"></div>
				<div class="skill_expand">
					<span>&#x25B2</span>
				</div>
				<div class="skill_image"></div>
				<span class="skill_hotkey">0</span>
			</li>
		</ul>
	</div>
</div><!-- Skills -->



<div style="clear:both;"></div>


















