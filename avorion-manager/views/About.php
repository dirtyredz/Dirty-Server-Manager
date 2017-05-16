
<style type="text/css">

</style>

<div id="Top"><span class="Title"><svg class="icon"><use xlink:href="#icon-about"></use></svg>ABOUT</span><span class="Time"></span></div>
<br/>
<img src="/resources/DSM_Logo.png" alt="DSM"/>
<h1>Dirty Server Manager</h1>
<h2>The Unofficial Avorion Linux Server Manager.</h2>
<div class="Version"><h3>Version: <?php echo $Data['Version']; ?></h3><span><?php echo $Data['UpToDate']; ?></span></div>
<br/>
<a target="_blank" href="https://docs.google.com/document/d/1RuysyToh9CTSn7mMwL6VJ0k76VbaGuXLyV74pm0J4ug/edit#">TODO</a>
<br/>
<br/>
<h3>FAQ</h3>
<div class="Question"><span>Q: </span>How are you feeling today?</div><br/>
<div class="Answer"><span>&nbsp;&nbsp;&nbsp;&nbsp;A: </span>Im feeling GREAT!, Thanks for asking.</div><br/>
<br/>
<div class="Question"><span>Q: </span>Another question?</div><br/>
<div class="Answer"><span>&nbsp;&nbsp;&nbsp;&nbsp;A: </span>With another answer.</div><br/>
<br/>
<br/>
<h3>CHANGE LOG:</h3>
<h4>0.0.0</h4>
<ul class="ChangeLog">
  <li>Added About Page.</li>
  <li>Hide player data from public view.</li>
  <li>Using Material Costfactor, generated a Net Worth field for player data.</li>
  <li>Pushed Account Managment functions behind web root for security.</li>
  <li>Sanitized and form inputs.</li>
  <li>Added CPU Usage graph to admin graphs view.</li>
  <li>Added Restart Command and Start/Stop of GetSectorData() to CPU Usage graph.
      <br/>This will display the time when those commands were issued.
  </li>
  <li>Added "Keep me logged in forever" Checkbox on the SignIn page.</li>
  <li>Attached #Loading to Sidebar Links start/success ajax.</li>
  <li>Set #Loading styles so its not visible if the page is scrolled.</li>
  <li>Fixed Counting of Faction Data, was just displaying last record.</li>
  <li>Changed writing behavior to Database, now it is more dependable.</li>
  <li>Added Cron job for GetPlayerData(), defaulting to every 30 minutes.
    <br/>It runs pretty quickly, so im not worried about CPU Usage.
  </li>

</ul>
<script type="text/javascript">

</script>
