<?php

/* @var $nuts NutsCore */

$select_language = nutsGetOptionsLanguages();
$select_zone_id = nutsGetOptionsMenu();
$select_user = nutsGetOptionsUsers();
$select_tpls = nutsGetOptionsTemplates();
$select_header_img = nutsGetOptionsHeaderImage();
$select_content_type = nutsGetOptionsContentType();
$theme = nutsGetTheme();

include(PLUGIN_PATH.'/config.inc.php');
include(PLUGIN_PATH.'/actions.inc.php');

$nuts->open(PLUGIN_PATH.'/form.html');

// custom vars ******************************************************************************************
if(count($custom_fields) == 0)
{
	$nuts->eraseBloc('custom_fields');
}
else
{
	foreach($custom_fields as $c)
	{
		if(!isset($c['label']))$c['label']  = $c['name'];

		// convert pascal case to normal
		$replacements = array();
		for($i=0; $i < strlen($c['label']); $i++)
		{
			if(strtoupper($c['label'][$i]) == $c['label'][$i])
				$replacements[] = $c['label'][$i];
		}
		for($i=0; $i < count($replacements); $i++)
			 $c['label'] = str_replace($replacements[$i], ' '.$replacements[$i], $c['label']);
		$c['label'] = trim($c['label']);


		$nuts->parse('custom_fields.custom_fields_label', $c['label']);
		// $nuts->parse('custom_fields.custom_fields_name', $c['name']);

		// tooltip
		if(!isset($c['help']))$c['help'] = '';
		$nuts->parse('custom_fields.custom_fields_help', $c['help']);

		$field_types = array('text', 'textarea', 'select', 'image', 'file', 'boolean', 'booleanX', 'date', 'datetime', 'colorpicker');
		$except = $c['type'];

		$nuts->parse('custom_fields.custom_fields_'.$c['type'].'.custom_fields_name', $c['name']);



		if($c['type'] == 'text' || $c['type'] == 'colorpicker')
		{

		}
		elseif($c['type'] == 'textarea')
		{

		}
		elseif($c['type'] == 'image' || $c['type'] == 'file')
		{
			if(!isset($c['folder']))$c['folder'] = '';
			$nuts->parse('custom_fields.custom_fields_'.$c['type'].'.custom_fields_folder', $c['folder']);
		}
		elseif($c['type'] == 'select')
		{
			if(count($c['options']) == 0)
			{
				$nuts->eraseBloc('custom_fields.custom_fields_select.custom_fields_select_options');
			}
			else
			{
				foreach($c['options'] as $opt)
				{
					$nuts->parse('custom_fields.custom_fields_select.custom_fields_select_options.custom_fields_opt', $opt);
					$nuts->loop('custom_fields.custom_fields_select.custom_fields_select_options');
				}
			}
		}

		// erase other types
		foreach($field_types as $ft)
		{
			if($except != $ft)
				$nuts->eraseBloc('custom_fields.custom_fields_'.$ft);

			$nuts->loop('custom_fields.custom_fields_'.$ft);
		}

		$nuts->loop('custom_fields');


	}
}

// custom block ***********************************************************************************
/*$nuts->doQuery("SELECT
						DISTINCT GroupName
				FROM
						NutsBlock
				WHERE
						Deleted = 'NO'
				ORDER BY
						GroupName");
$custom_blocks = $nuts->getData();*/
$custom_blocks = &$allowed_groups_block;
$block_preview = array();


if(count($custom_blocks) == 0)
{
	$nuts->parseBloc('custom_blocks', $lang_msg[64]);
}
else
{

	foreach($custom_blocks as $custom_block)
	{
		$nuts->parse('custom_blocks.custom_block_nameX', $custom_block, '|toPascalCase');
		$nuts->parse('custom_blocks.custom_block_name', $custom_block);


		// load every lock by name
		$nuts->doQuery("SELECT
								ID,
								SubGroupName,
								Name,
								Preview
						FROM
								NutsBlock
						WHERE
								Deleted = 'NO' AND
								GroupName = '".addslashes($custom_block)."'
						ORDER BY
								SubGroupName,
								Name");
		$vals = $nuts->getData();
		if(count($vals) == 0)
		{
			$nuts->eraseBloc('custom_blocks.custom_block_options');
		}
		else
		{
			foreach($vals as $val)
			{
				// block preview url
				if(empty($val['Preview']))$val['Preview'] = '/nuts/img/no-preview.png';

				$nuts->parse('custom_blocks.custom_block_options.image_preview', $val['Preview']);
				$nuts->parse('custom_blocks.custom_block_options.custom_block_val', $val['ID']);
				$nuts->parse('custom_blocks.custom_block_options.custom_block_val_name', $val['SubGroupName'].'> '.$val['Name'], '|toPascalCase');
				$nuts->loop('custom_blocks.custom_block_options');

				$block_preview[$val['ID']] = $val['Preview'];
			}
		}

		$nuts->loop('custom_blocks');
	}
}


$nuts->parse('page_manager_block_preview_url', json_encode($block_preview));


// current templates in themes
$tpls_library_path = NUTS_THEMES_PATH.'/'.$theme;
$tpls = (array)glob($tpls_library_path.'/*.html');

$tpls = array_merge(array($tpls_library_path.'/index.html'), $tpls);

$init = false;
$cur_theme = nutsGetTheme();
foreach($tpls as $tpl)
{
	$tpl_name = str_replace($tpls_library_path.'/', '', $tpl);
	$tpl_name_file = $tpl_name;
	$tpl_name = str_replace('.html', '', $tpl_name);
	$tpl_nameX = ucfirst($tpl_name);

	if($tpl_name[0] != '_' && (($init && $tpl_name != 'index') || (!$init && $tpl_name == 'index')))
	{
		$nuts->parse('tpls_preview.theme', $theme);

		// image preview
		$tpl_preview = NUTS_LIBRARY_PATH.'/themes/'.$cur_theme.'/_preview/'.$tpl_name.'.png';
		if(!file_exists($tpl_preview))
			$tpl_preview = NUTS_LIBRARY_PATH.'/_preview/no-preview.png';
		$tpl_preview = basename($tpl_preview);
		$nuts->parse('tpls_preview.tpl_preview', $tpl_preview);

		if($tpl_name == 'index')
		{
			$tpl_nameX = $nuts_lang_msg[75];
			$tpl_name_sel = '';
			$tpl_name_file = '';
		}

		$nuts->parse('tpls_preview.tpl_name_file', $tpl_name_file);
		$nuts->parse('tpls_preview.tpl_nameX', $tpl_nameX);

		$nuts->loop('tpls_preview');

		$init = true;
	}
}

// access groups front office ***********************************************************************************
$sql = "SELECT ID AS GroupID, Name AS GroupName FROM NutsGroup WHERE Deleted = 'NO' AND FrontofficeAccess = 'YES' ORDER BY Priority";
$nuts->doQuery($sql);
$nuts->parseDbRow('page_access');







$plugin->render = $nuts->output();


?>