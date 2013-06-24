<h2>Attributes</h2>
<table>
	<tr>
		<td class="att">
			<div class="traits_iconcontainer">
				<span class="traits-power"></span>
			</div>
		</td>
		<td id="power" class="value">916</td>
	</tr>
	<tr class="even">
		<td class="att">
			<div class="traits_iconcontainer">
				<span class="traits-precision"></span>
			</div>
		</td>
		<td id="precision" class="value">916</td>
	</tr>
	<tr>
		<td class="att">
			<div class="traits_iconcontainer">
				<span class="traits-toughness"></span>
			</div>
		</td>
		<td id="toughness" class="value">916</td>
	</tr>
	<tr class="even">
		<td class="att">
			<div class="traits_iconcontainer">
				<span class="traits-vitality"></span>
			</div>
		</td>
		<td id="vitality" class="value">916</td>
	</tr>
	<tr>
		<td class="att">
			<div class="traits_iconcontainer">
				<span class="traits-criticaldamage"></span>
			</div>
		</td>
		<td id="criticaldamage" class="value">0%</td>
	</tr>
	<tr class="even">
		<td class="att">
			<div class="traits_iconcontainer">
				<span class="traits-conditiondamage"></span>
			</div>
		</td>
		<td id="conditiondamage" class="value">0</td>
	</tr>
	<tr>
		<td class="att">
			<div class="traits_iconcontainer">
				<span class="traits-conditionduration"></span>
			</div>
		</td>
		<td id="conditionduration" class="value">0%</td>
	</tr>
	<tr class="even">
		<td class="att">
			<div class="traits_iconcontainer">
				<span class="traits-healingpower"></span>
			</div>
		</td>
		<td id="healingpower" class="value">0</td>
	</tr>
	<tr>
		<td class="att">
			<div class="traits_iconcontainer">
				<span class="traits-boonduration"></span>
			</div>
		</td>
		<td id="boonduration" class="value">0%</td>
	</tr>
	<tr class="even">
		<td class="att">
			<div class="traits_iconcontainer">
				<span class="traits-criticalchance"></span>
			</div>
		</td>
		<td id="criticalchance" class="value"><?php echo round((916 - 822) / 21).'%'; ?></td>
	</tr>
	<tr>
		<td class="att">
			<div class="traits_iconcontainer">
				<span class="traits-damage"></span>
			</div>
		</td>
		<td id="damage" class="value">0%</td>
	</tr>
	<tr class="even">
		<td class="att">
			<div class="traits_iconcontainer">
				<span class="traits-armor"></span>
			</div>
		</td>
		<td id="armor" class="value"><?php echo $profession->armor; ?></td>
	</tr>
	<tr>
		<td class="att">
			<div class="traits_iconcontainer">
				<span class="traits-health"></span>
			</div>
		</td>
		<td id="health" class="value"><?php echo $profession->health+916*10; ?></td>
	</tr>

</table>

<div id="rune_bonus"></div>