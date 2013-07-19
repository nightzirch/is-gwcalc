			<div class="traits_top">
				<div id="trait_points_refund" onClick="ml.ops.traitsRefund()" title="Refund trait points"></div>
				<div stlye="float:left;"><span id="trait_points_left" data-bind="text: traitPoints"></span> <span style="margin-left:5px;width: 57px;height: 24px;display: block;font-size: 9px;float: right;margin-top: 7px;">unspent trait points</span></div>
			</div>
			<div style="clear:both;"></div>
			<div class="<?php echo strtolower($profession->name).'-traits' ?>">
		 		<?php $i = 1;foreach ($traitLines as $line) { ?>   

		 		<div id="<?php echo 'traits-'.$i; ?>">
		 			<h3 id="traitLineName"><?php echo $line->name; ?></h3>
		 			<div id="<?php echo 'traitLine-'.$i ?>" class="traitField">
		 				<div class="traitField1">
		 					<div class="plus_box" style="cursor:pointer" onClick="ml.ops.traitPlus('<?php echo $i ?>')"></div>
		 					<div class="minus_box" style="cursor:pointer" onClick="ml.ops.traitMinus('<?php echo $i ?>')"></div>
							<div class="traits_invested" data-bind="text: <?php echo 'traitLine'.$i ?>"></div>
							<div class="traits_pri">
								<div class="traits_iconcontainer">
									<span title="<?php echo $line->pri; ?>" class="<?php echo 'traits-'.strtolower(str_replace(' ', '',$line->pri)); ?>"></span>
								</div>
								<?php if ($line->position == 5) {$line->pri = Profession;} ?>
								<strong class="trait_bonus" data-bind="text: trait<?php echo str_replace(' ', '',$line->pri); ?>"></strong>
							</div>
							<div class="traits_sec">
								<div class="traits_iconcontainer">
									<span title="<?php echo $line->sec; ?>" class="<?php echo 'traits-'.strtolower(str_replace(' ', '',$line->sec)); ?>"></span>
								</div>
								<strong class="trait_bonus" data-bind="text: trait<?php echo str_replace(' ', '',$line->sec); ?>"></strong>
							</div>
		 				</div>
		 				<div class="traitField2">
		 					<div class="trait_minor">
		 						<div class="trait_minor_locked">
		 							<?php foreach($traits as $t) { if ((($t->tier == 'adept') && ($t->trait_line == $i)) && ($t->type == 'minor')) { ?>		 	
		 							<img class="trait_minor_<?php echo $i ?> tooltip" rel="#tooltip" data-id="traits:<?php echo $t->id; ?>" onClick="ml.ops.setTraitLine('<?php echo $i ?>','5')" src="<?php echo plugin_dir_url(__FILE__); ?>images/traits/minor_locked.png" />										
									<?php } } ?>
		 						</div>
								<span class="t5"></span>
							</div>

							<div class="trait_major" rel="#traitPick" title="Pick a major trait" onClick="ml.ops.getTraits('adept','<?php echo $i ?>')">
								<div class="trait_major_locked"></div>
								<span class="t10"></span>
							</div>
		 				</div>
		 				<div class="traitField3">
		 					<div class="trait_minor">
		 						<div class="trait_minor_locked">
		 							<?php foreach($traits as $t) { if ( (($t->tier == 'master') && ($t->trait_line == $i)) && ($t->type == 'minor')) { ?>		 			
		 								<img class="trait_minor_<?php echo $i ?> tooltip" rel="#tooltip" data-id="traits:<?php echo $t->id; ?>" onClick="ml.ops.setTraitLine('<?php echo $i ?>','15')" src="<?php echo plugin_dir_url(__FILE__); ?>images/traits/minor_locked.png" />										
									<?php } } ?>
		 						</div>
								<span class="t15"></span>
							</div>

							<div class="trait_major" rel="#traitPick" title="Pick a major trait" onClick="ml.ops.getTraits('master','<?php echo $i ?>')">
								<div class="trait_major_locked"></div>
								<span class="t20"></span>
							</div>
		 				</div>
		 				<div class="traitField4">
		 					<div class="trait_minor">
		 						<div class="trait_minor_locked">	
		 							<?php foreach($traits as $t) { if ( (($t->tier == 'grandmaster') && ($t->trait_line == $i)) && ($t->type == 'minor')) { ?>		 			
		 								<img class="trait_minor_<?php echo $i ?> tooltip" rel="#tooltip" data-id="traits:<?php echo $t->id; ?>" onClick="ml.ops.setTraitLine('<?php echo $i ?>','25')" src="<?php echo plugin_dir_url(__FILE__); ?>images/traits/minor_locked.png" />										
									<?php } } ?>
		 						</div>
								<span class="t25"></span>
							</div>

							<div class="trait_major" rel="#traitPick" title="Pick a major trait" onClick="ml.ops.getTraits('grandmaster','<?php echo $i ?>')">
								<div class="trait_major_locked"></div>
								<span class="t30"></span>
							</div>
		 				</div>
		 			</div>
		 		</div>
		 			
				<?php $i++;}	?>
		 	</div>

		 	<div id="traitPick" style="display:none" title="Chose a rune">
		 		<span>test</span>
		 	</div>