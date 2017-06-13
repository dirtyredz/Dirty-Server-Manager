
<style type="text/css">

</style>

<div id="Top"><span class="Title"><svg class="icon"><use xlink:href="#icon-about"></use></svg>ABOUT</span><span class="Time"></span></div>
<br/>
<img src="/resources/img/DSM_Logo.png" alt="DSM"/>
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
<h4>1.1.0</h4>
  Added zlib_Uncompress.php to handle decompressing data file_put_contents</br>
  *Changed GetSectorData to handle the new data structure</br>
  *Changed GetSectorData to handle the new data structure</br>
  *Changed server.ini configuration deffinitions</br>
  </br>
  *WARNING: Compatible with avorion build 0.12 r8487</br>
  </br>
<h4>1.0.10</h4>
  Added Groups detection into GetPlayerData script (parses admin.xml for players groups)</br>
  Added Debian support for ApacheInstaller script.</br>
  Fixed Maps scrolling issues.</br>
  Added modal confirmation to password change.</br>
  Added /run detection to console input.</br>
  Added Chat Input to home page chat log.</br>
  Added manager-config.ini parsing to CommonController, making it so we dont have to grep for commenly used options like Galaxy Name</br>
  fixed error when starting server for first time and there is no console.log present.</br>
  </br>
<h4>1.0.9</h4>
  Added Apache web server support</br>
  changed Router.php to index.php</br>
  Changed PHPPort to WEBPORT in manager-config.ini</br>
  Added 'ampersand' charecter escaping in UpdateManager</br>
  Updated manager to use unique tmux identifier</br>
  Added Memory Usage graph</br>
  </br>
<h4>1.0.8</h4>
  Added Last Seen support for players, GetPlayerData will track the last time it saw the player in the console</br>
  Changed SendMail script so that the console sendmail form can now send long messages (previously not possible due to max characters in commands)</br>
  Updated/fixed failed GetPlayerData.sh and GetSectorData.sh</br>
  Fixed send mail sending wrong resource when not filling in all the resources in the form</br>
  Added "version" command to manager</br>
  </br>
<h4>1.0.7</h4>
  Fixed wrong number of online players on home page.</br>
  Added Space Invaders page, because why not?</br>
  Updated Definitions for PHPConfig.ini</br>
  Moved Resources files to individual directories (Youll need to manually delete the exsisting files)</br>
  fixed bottom padding of #Main</br>
  Changed Font styles</br>
  Added % to cpu/serverload Graphs</br>
  </br>
<h4>1.0.6</h4>
  Added Support for configuration updates</br>
  </br>
<h4>1.0.5</h4>
  Added sendmail.lua to handle mail form.</br>
  </br>
<h4>1.0.4</h4>
  adjusted session requirments for console  and config page.</br>
  </br>
<h4>1.0.3</h4>
  Fixed Bug in manager install command</br>
  </br>
<h4>1.0.2</h4>
  Added Custom message support for Banners</br>
  Added more dialog to installation and update</br>
  </br>
<h4>1.0.1</h4>
  Updated README</br>
  added Database.php to the update exclusion</br>
  Added Notes to Config page</br>
  Updated default custom messages in PHPConfig.ini</br>
  Updated Database.php default</br>
</br>
<h4>1.0.0</h4>
  Initial Release</br>
<script type="text/javascript">

</script>
