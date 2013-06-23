			<div class="<?php echo strtolower($profession->name).'-traits' ?>">
		 		<?php $i = 1;foreach ($traitLines as $line) { ?>   

		 		<div id="<?php echo 'traits-'.$i; ?>">
		 			<h3 id="traitLineName"><?php echo $line->name; ?></h3>
		 			<div id="<?php echo 'traitLine-'.$i ?>" class="traitField">
		 				<div class="traitField1">
		 					<div class="plus_box" style="cursor:pointer"></div>
		 					<div class="minus_box" style="cursor:pointer"></div>
							<div id="traits_invested-1" class="traits_invested">0</div>
							<div class="traits_pri">
								<div class="traits_iconcontainer">
									<span class="<?php echo 'traits-'.strtolower($line->pri); ?>"></span>
								</div>
								<strong id="trait_bonus-1-1">+0</strong>
							</div>
							<div class="traits_sec">
								<div class="traits_iconcontainer">
									<span class="<?php echo 'traits-'.strtolower($line->sec); ?>"></span>
								</div>
								<strong id="trait_bonus-1-2">+0</strong>
							</div>
		 				</div>
		 				<div class="traitField2">
		 					<div class="trait_minor">
		 						<div class="trait_minor_locked"></div>
								<span class="t5"></span>
							</div>

							<div class="trait_major">
								<div class="trait_major_locked"></div>
								<span class="t10"></span>
							</div>
		 				</div>
		 				<div class="traitField3">
		 					<div class="trait_minor">
		 						<div class="trait_minor_locked"></div>
								<span class="t15"></span>
							</div>

							<div class="trait_major">
								<div class="trait_major_locked"></div>
								<span class="t20"></span>
							</div>
		 				</div>
		 				<div class="traitField4">
		 					<div class="trait_minor">
		 						<div class="trait_minor_locked"></div>
								<span class="t25"></span>
							</div>

							<div class="trait_major">
								<div class="trait_major_locked"></div>
								<span class="t30"></span>
							</div>
		 				</div>
		 			</div>
		 		</div>
		 			
				<?php $i++;}	?>
		 	</div>