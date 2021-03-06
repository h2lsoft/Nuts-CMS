<?php

include('config.inc.php');
include('headers.inc.php');

@session_start();
$insert = ($_SESSION['Language'] == 'fr') ? "Insérer" : "Insert";
$cancel = ($_SESSION['Language'] == 'fr') ? "Annuler" : "Cancel";

$nothing_editable = ($_SESSION['Language'] == 'fr') ? "Aucune erreur trouvée" : "No error found";
$msg_lang = ($_SESSION['Language'] == 'fr') ? "Langage" : "Language";
$theme = nutsGetTheme();

?>
<!doctype html>
<html>
<head>
	<title>Spellchecker</title>
	<meta http-equiv="X-UA-Compatible" content="chrome=1" />
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js"></script>
	<script src="/library/js/shortcut.js"></script>



	<script type="text/javascript" src="/library/js/php.js"></script>
	<link rel="stylesheet" type="text/css" href="/library/js/tiny_mce/themes/advanced/skins/o2k7/dialog.css" media="all" />

	<link href="/library/js/spellchecker/css/jquery.spellchecker.css" rel="stylesheet" />
	<script src="/library/js/spellchecker/js/jquery.spellchecker.js"></script>

	<link href="/themes/editor_css.php?t=<?php echo $theme; ?>" rel="stylesheet" />

	<style type="text/css">
		body {overflow: hidden; width: 99%!important; background: #F0F0EE!important;}
		#rte_content {width: 99%!important; height: 760px; overflow: scroll; overflow-x: hidden; border:1px solid #666; padding: 5px; background: white; margin-top: 5px}
		input[type=button] {cursor: pointer;}
		#loader {height: 20px; line-height: 20px; position: absolute; z-index: 2; top:35px; left: 15px; background: white; border: 1px solid #e5e5e5; padding: 3px 8px; display: none;}
	</style>

	<script>
	var parent_id = '<?php echo $_GET['parent']; ?>';
	</script>

</head>
<body>

<div id="loader"><img src="/nuts/img/ajax-loader.gif" /> Loading...</div>

<form name="source" onsubmit="return false;" action="#">

	<?php echo $msg_lang; ?> :

	<select id="language" autofocus="autofocus">
		<option value="en">English</option>
		<option value="fr">Français</option>
		<option value="it">Italiano</option>
		<option value="es">Spanish</option>
		<option value="ru">Russian</option>
	</select>
	<input type="button" value="ok" id="button_ok" />


	<div id="rte_content"></div>


	<div class="mceActionPanel">
		<input type="button" name="insert" value="<?php echo $insert; ?>" id="insert" onclick="textSubmit()" />
		<input type="button" name="cancel" value="<?php echo $cancel; ?>" onclick="window.close();" id="cancel" />
	</div>
</form>

<script>
$('#language').val("<?php echo $_GET['lang'] ?>");

$('#button_ok').click(function(){

	$('#loader').show();

	// Init the html spellchecker
	var spellchecker = new $.SpellChecker('#rte_content', {
		lang: $('#language').val(),
		parser: 'html',

		local: {
			requestError: 'There was an error processing (Please verify php extension pspell is activated)'
		},

		webservice: {
			path: '../library/js/spellchecker/webservices/php/SpellChecker.php',
			driver: 'PSpell'
		},

		suggestBox: {
			position: 'below'
		}
	});


	spellchecker.on('check.complete', function() {
		$('#loader').hide();
	});

	spellchecker.on('check.fail', function() {
		$('#loader').hide();
	});

	// Bind spellchecker handler functions
	spellchecker.on('check.success', function() {
		alert("<?php echo $nothing_editable; ?>");
		$('#loader').hide();
	});



	spellchecker.check();

});




$(function(){
	src = opener.getIFrameDocument('iframe_'+parent_id).body.innerHTML;
	$('#rte_content').html(src);
});


function textSubmit()
{
	// clean format
	patterns = array();
	reps = array();
	$('#rte_content span.spellchecker-word-highlight').each(function(i){

		c = $(this).html();
		if(!in_array(c, patterns) && c.indexOf('<span class="spellchecker-word-highlight">') == -1)
		{
			pat = '<span class="spellchecker-word-highlight">'+c+'</span>';
			pat_r = c;
			patterns[patterns.length] = pat;
			reps[reps.length] = pat_r;
		}
	});

	src = $('#rte_content').html();
	for(i=0; i < patterns.length; i++)
	{
		src = str_replace(patterns[i], reps[i], src);
	}


	opener.getIFrameDocument('iframe_'+parent_id).body.innerHTML = src;
	opener.WYSIWYGTextareaReload(parent_id);
	window.close();
}

// shorcuts
$(document).keydown(function(e){
	code = e.keyCode ? e.keyCode : e.which;
	if(code == 27)
		$('#cancel').click();
});

shortcut.add("Ctrl+S",function() {textSubmit();});
shortcut.add("ENTER",function() {$('#button_ok').click();});

</script>

</body>
</html>
