<h2>Attributes</h2>
<table>
	<tr>
		<td class="att">
			<div class="traits_iconcontainer">
				<span class="traits-power"></span>
			</div>
			<span id="power" class="value">916</span>
		</td>
		<td class="att">
			<div class="traits_iconcontainer">
				<span class="traits-damage"></span>
			</div>
			<span id="damage" class="value">0%</span>
		</td>
	</tr>
	
	<tr>
		<td class="att">
			<div class="traits_iconcontainer">
				<span class="traits-precision"></span>
			</div>
			<span id="precision" class="value">916</span>
		</td>
		<td class="att">
			<div class="traits_iconcontainer">
				<span class="traits-criticalchance"></span>
			</div>
			<span id="criticalchance" class="value"><?php echo round((916 - 822) / 21).'%'; ?></span>
		</td>
	</tr>
	
	<tr>
		<td class="att">
			<div class="traits_iconcontainer">
				<span class="traits-toughness"></span>
			</div>
			<span id="toughness" class="value">916</span>
		</td>
		<td class="att">
			<div class="traits_iconcontainer">
				<span class="traits-armor"></span>
			</div>
			<span id="armor" class="value"><?php echo $profession->armor; ?></span>
		</td>
	</tr>
	
	<tr>
		<td class="att">
			<div class="traits_iconcontainer">
				<span class="traits-vitality"></span>
			</div>
			<span id="vitality" class="value">916</span>
		</td>
		<td class="att">
			<div class="traits_iconcontainer">
				<span class="traits-health"></span>
			</div>
			<span id="health" class="value"><?php echo $profession->health+916*10; ?></span>
		</td>
	</tr>
	
	<tr>
		<td class="att">
			<div class="traits_iconcontainer">
				<span class="traits-conditiondamage"></span>
			</div>
			<span id="conditiondamage" class="value">0</span>
		</td>
		<td class="att">
			<div class="traits_iconcontainer">
				<span class="traits-conditionduration"></span>
			</div>
			<span id="conditionduration" class="value">0%</span>
		</td>
	</tr>
	
	<tr>
		<td class="att">
			<div class="traits_iconcontainer">
				<span class="traits-boonduration"></span>
			</div>
			<span id="boonduration" class="value">0%</span>
		</td>
		<td class="att">
			<div class="traits_iconcontainer">
				<span class="traits-healingpower"></span>
			</div>
			<span id="healingpower" class="value">0</span>
		</td>
	</tr>
	
	<tr>
		<td class="att">
			<div class="traits_iconcontainer">
				<span class="traits-criticaldamage"></span>
			</div>
			<span id="criticaldamage" class="value">0%</span>
		</td>
		<td class="att">
			<div class="traits_iconcontainer">
				<span class="traits-class"></span>
			</div>
			<span id="class" class="value">0%</span>
		</td>
	</tr>

</table>

<h2 style="margin-top: 20px">Bonus</h2>
<div id="rune_bonus"></div>