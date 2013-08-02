<?php
$rules= get_post(7737); //rules
$rules = $rules->post_content;
$rules = apply_filters('the_content', $rules);
$rules= str_replace(']]>', ']]&gt;', $rules);
$rules = str_replace('\r\n', '<br />', $rules);
$rules = str_replace('\n', '<br />', $rules);
//$rules = htmlentities($rules, ENT_QUOTES);

$registration = get_post(7306); //rules
$registration = $registration->post_content;
$registration = apply_filters('the_content', $registration );
$registration = str_replace(']]>', ']]&gt;', $registration );
$registration = str_replace('\r\n', '<br />', $registration);
$registration = str_replace('\n', '<br />', $registration);
//$registration = htmlentities($registration, ENT_QUOTES);

$reg_en =<<<EOS
<div style="text-align: center;"><iframe src="https://docs.google.com/forms/d/18jEwwvepF5TcobYGq6_fcuzGs2smSbGfahNBkU31Tm4/viewform?embedded=true" height="1295" width="760" frameborder="0" marginwidth="0" marginheight="0"></iframe></div>
EOS;

$reg_de =<<<EOS
<div style="text-align: center;"><iframe src="https://docs.google.com/forms/d/1pAnNF0d-QCdpVVMYqbNF4CFrrgWx9EHnDmFwzT_1fp8/viewform?embedded=true" height="1295" width="760" frameborder="0" marginwidth="0" marginheight="0"></iframe></div>
EOS;

$reg_fr =<<<EOS
<div style="text-align: center;"><iframe src="https://docs.google.com/forms/d/1OIQO-J0ySd7Cj8aynaINIeV1itBQnOVT7dgktHU7pUI/viewform?embedded=true" height="1295" width="760" frameborder="0" marginwidth="0" marginheight="0"></iframe></div>
EOS;

$reg_es =<<<EOS
<div style="text-align: center;"><iframe src="https://docs.google.com/forms/d/1LO177U4ULtgx0EB6m3b8GI9TeGzsd78sxyzwKuQjGgc/viewform?embedded=true" height="1295" width="760" frameborder="0" marginwidth="0" marginheight="0"></iframe></div>
EOS;
$prizes = get_post(8084); //rules
$prizes = $prizes->post_content;
$prizes = apply_filters('the_content', $prizes);
$prizes = str_replace(']]>', ']]&gt;', $prizes);
$prizes = str_replace('\r\n', '<br />', $prizes);
$prizes = str_replace('\n', '<br />', $prizes);
//$prizes = htmlentities($rules, ENT_QUOTES);

$main_en =<<<EOS
We're proud to announce the very first Guild Wars 2 Invitational Tournament on August 31, 2013 at PAX Prime!  We're teaming up with our partner MMORPG.com to host an exciting PvP tournament where the top North American and European teams will face off in a best-three-games-out-of-five match with a cash prize pool of $10,000 on the line.
To determine which teams from each territory will qualify for the Guild Wars 2 Invitational Tournament, teams of five players from Europe and North America will compete in regional qualifying tournaments hosted by MMORPG.com and Mist League.<br /><br />
The European regional tournament will be on July 27-28 and the North American regional will take place on August 3-4.<br /><br />
Both regional qualifying tournaments will have a maximum of 32 teams. The format will be five vs. five single elimination matches, and the winners of each match will be determined by the victors of two out of three games. After the qualifying tournaments are complete, the winning teams will be hosted on August 31, 2013 during PAX Prime for a competition between the two best Guild Wars 2 teams.<br /><br />
We're very excited to be working with both MMORPG.com and the Mist League on this tournament, and we can't wait to see the incredible competition at the regional qualifying tournaments and to host the Guild Wars 2 Invitational Tournament during PAX Prime 2013.<br /><br />
Registration will open next week, for players that live in Canada, United States of America, Mexico, and the European Union plus Iceland, Montenegro, Norway, Serbia, Switzerland, Turkey and are 18 years of age or older, so solidify your team and watch <a href="http://www.guildwars2.com">GuildWars2.com</a> for more information about registration, rules, and eligibility requirements.

EOS;

$main_fr =<<<EOS
Nous sommes ravis d’annoncer que le premier tournoi sur invitation de Guild Wars 2 aura lieu le 31 août 2013 lors du PAX Prime !  En effet, avec la participation de notre partenaire MMORPG.com, nous organisons un tournoi JcJ exaltant : les meilleures équipes nord-américaines et européennes s’affronteront lors de matchs en cinq manches (trois manches gagnantes) pour remporter un prix de 10 000 $.<br /><br />
Afin de déterminer qui pourra participer à ce tournoi sur invitation, des équipes de cinq joueurs provenant d’Europe et d’Amérique du Nord s’affronteront lors de tournois de qualification régionaux organisés par MMORPG.com et Mist League.<br /><br />
Le tournoi de qualification européen aura lieu les 27 et 28 juillet et les qualifications pour l’Amérique du Nord se dérouleront les 3 et 4 août.<br /><br />
Seules 32 équipes pourront participer à chacun de ces tournois de qualification. Les joueurs s’affronteront lors de matchs éliminatoires à cinq contre cinq et devront gagner deux manches sur trois pour remporter chaque rencontre. Une fois les tournois de qualification terminés, les deux équipes victorieuses s’affronteront pendant le PAX Prime, le 31 août 2013, pour déterminer laquelle est la meilleure !<br /><br />
Nous sommes ravis de collaborer avec MMORPG.com et Mist League et nous avons hâte de voir le niveau de compétition extraordinaire qui nous attend lors des tournois de qualification régionaux et du tournoi sur invitation Guild Wars 2 du PAX Prime 2013.<br /><br />
Les inscriptions seront ouvertes dès la semaine prochaine aux joueurs de 18 ans et plus, résidant au Canada, aux États-Unis, au Mexique, dans l’Union Européenne, Islande, Monténégro, Norvège, Serbie, Suisse et Turquie. Il ne vous reste plus qu’à former votre équipe et à visiter régulièrement <a href="http://www.guildwars2.com">GuildWars2.com</a> pour en apprendre davantage sur les inscriptions, les règles et les conditions de participation !

EOS;

$main_de =<<<EOS
Wir freuen uns, unser allererstes Guild Wars 2-Einladungsturnier auf der PAX Prime am 31. August 2013 ankündigen zu dürfen!  In Zusammenarbeit mit unserem Partner MMORPG.com veranstalten wir ein spannendes PvP-Turnier, bei dem die besten nordamerikanischen und europäischen Teams in einem Match gegeneinander antreten, aus dem das Team mit den besten drei von fünf Spielen den Sieg davonträgt. Das Gesamtpreisgeld ist dotiert mit 10.000 $.<br /><br />
Um sich für das Guild Wars 2- Einladungsturnier zu qualifizieren, treten Fünferteams aus allen Regionen Europas und Nordamerikas in regionalen von MMORPG.com and Mist League veranstalteten Qualifikationsturnieren gegeneinander an.<br /><br />
Das regionale europäische Turnier findet vom 27. – 28. Juli statt, während Nordamerika seins vom 3. – 4. August abhält.<br /><br />
An beiden regionalen Qualifikationsturnieren werden maximal 32 Teams teilnehmen. Das Turnier wird in Form von Einzelausscheidungskämpfen ausgetragen, bei denen jeweils Teams aus fünf Spielern gegeneinander antreten – der Sieger wird durch den Gewinn von zwei aus drei Spielen bestimmt. Nach Abschluss der Qualifikationsturniere werden die Siegerteams zum 31. August 2013 auf die PAX Prime eingeladen, wo die beiden besten Guild Wars 2-Teams das Finale bestreiten.<br /><br />
Wir freuen uns riesig darauf, zusammen mit MMORPG.com und der Mist League an diesem Turnier zu arbeiten und können es kaum erwarten, den rasanten Wettbewerb bei den regionalen Qualifikationsturnieren selbst zu erleben und Gastgeber des Guild Wars 2- Einladungsturniers auf der PAX Prime 2013 zu sein.<br /><br />
Ab nächster Woche steht die Anmeldung Spielern ab 18 Jahren offen, die in Kanada, den USA, Mexiko, in den Ländern der Europäischen Union, sowie in Island, Montenegro, Norwegen, Serbien, der Schweiz und der Türkei leben – macht also euer Team startklar und behaltet <a href="http://www.guildwars2.com">GuildWars2.com</a> im Auge, um mehr über die Anmeldung, Regeln und Teilnahmebedingungen zu erfahren.

EOS;

$main_es = <<<EOS
¡Estamos orgullosos de anunciar el primer torneo por invitación de Guild Wars 2, que se celebrará el 31 de agosto de 2013 en la PAX Prime! Estamos trabajando con nuestro socio MMORPG.com para organizar un emocionante torneo PvP donde los mejores equipos de Norteamérica y Europa se enfrentarán al mejor de cinco combates con un premio en metálico de 10 000 dólares.<br /><br />
Para determinar qué equipos de cada territorio se clasificarán para el torneo por invitación deGuild Wars 2, equipos de cinco jugadores de Europa y Norteamérica competirán en torneos clasificatorios regionales organizados por MMORPG.com y Mist League.<br /><br />
El torneo regional europeo tendrá lugar del 27 al 28 de julio y el regional norteamericano, del 3 al 4 de agosto.<br /><br />
Ambos torneos clasificatorios regionales tendrán un máximo de 32 equipos. Habrá combates de eliminación directa de cinco contra cinco y los ganadores serán los jugadores que salgan victoriosos de cada uno de los combates al mejor de tres. Cuando finalicen los torneos clasificatorios, los equipos ganadores participarán en una competición entre los dos mejores equipos de Guild Wars 2 el 31 de agosto de 2013 durante la PAX Prime.<br /><br />
Nos alegramos mucho de poder trabajar tanto con MMORPG.com como con Mist League en este torneo, y estamos deseando ver la increíble competición en los torneos de clasificación regionales y celebrar el torneo por invitación durante la PAX Prime de 2013.<br /><br />
La inscripción se abrirá la próxima semana para jugadores residentes en Canadá, Estados Unidos, México y la Unión Europea e Islandia, Montenegro, Noruega, Serbia, Suiza y Turquía que sean mayores de 18 años, así que consolidad vuestro equipo y consultad <a href="http://www.guildwars2.com">GuildWars2.com</a> para obtener más información sobre la inscripción, las reglas y los requisitos de elegibilidad.

EOS;
//$main = htmlentities($main, ENT_QUOTES);
?>

<script>
 var curIndex = 0;
 var curLang = "_en";
 var ids = ["updatemain", "updaterules", "updatereg"];
function toggle(i) {
  $("#updatemain_en").hide();
  $("#updatemain_fr").hide();
  $("#updatemain_es").hide();
  $("#updatemain_de").hide();
  $("#updatereg_en").hide();
  $("#updatereg_fr").hide();
  $("#updatereg_es").hide();
  $("#updatereg_de").hide();
  $(".nodec").css('color', 'white');
  for (var x = 0; x < ids.length; x++) {
    var sel = ids[x];
    if (x == 0 || x == 2)
      sel = sel + curLang;
    if (x == i) {
      curIndex = i;
      $("#"+sel).show();
      if (x == 0 || x == 2)
        $("#"+ids[x]+"l").css('color','red');
      else
        $("#"+sel+"l").css('color','red !important');
    } else {
      $("#"+sel).hide();
    }
  }
}

function setLang(lang) {
  curLang = lang;
  toggle(curIndex);
}

$(document).ready(function() {

});
</script>
<style type="text/css"><!--
div.ck { color:white; width: 728px; background: none; margin: 0px auto; min-height: 500px}
a.nodec { text-decoration: none; font-weight: normal }
--></style>

<img class="aligncenter" alt="" src="http://www.mistleague.com/aussie/PAX/brk4.fw.png" width="728" height="144" />
<p style="text-align: center;"><a onclick="setLang('_en')" href="javascript:void(0)">EN</a> <span style="color: #ff0000;">|</span> <a onclick="setLang('_de')" href="javascript:void(0)">DE</a> <span style="color: #ff0000;">|</span> <a onclick="setLang('_fr')" href="javascript:void(0)">FR</a> <span style="color: #ff0000;">|</span> <a onclick="setLang('_es')" href="javascript:void(0)">ES</a></p>

<h4 style="text-align: center;"><a class="nodec" id="updatemainl" style="color: #ff0000;" onclick="toggle(0)" href="javascript:void(0)">MAIN</a> | <a class="nodec" id="updateregl" onclick="toggle(2)" href="javascript:void(0)">REGISTRATION</a> | <a class="nodec colorbox" href="http://www.guildwars2.com/pvp-invitational-tournament">ALL INFO</a></h4>
&nbsp;

<div id="updatemain_en" class="ck">
<?=$main_en?>
</div>

<div style="display:none" id="updatemain_fr" class="ck">
<?=$main_fr?>
</div>
<div style="display:none" id="updatemain_de" class="ck">
<?=$main_de?>
</div>
<div style="display:none" id="updatemain_es" class="ck">
<?=$main_es?>
</div>

<div style="display:none" id="updatereg_en" class="ck">
<?=$reg_en?>
</div>
<div style="display:none" id="updatereg_fr" class="ck">
<?=$reg_fr?>
</div>
<div style="display:none" id="updatereg_es" class="ck">
<?=$reg_es?>
</div>
<div style="display:none" id="updatereg_de" class="ck">
<?=$reg_de?>
</div>

<div style="display:none" id="updaterules" class="ck">
<?=$rules?>
</div>