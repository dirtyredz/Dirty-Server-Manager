<?php
	require __DIR__ . '/SourceQuery/bootstrap.php';

	use xPaw\SourceQuery\SourceQuery;

	define( 'SQ_SERVER_ADDR', '69.30.246.170' );
	define( 'SQ_SERVER_PORT', 27020 );
	define( 'SQ_TIMEOUT',     1 );
	define( 'SQ_ENGINE',      SourceQuery::SOURCE );

	$Query = new SourceQuery( );

	try
	{
		$Query->Connect( SQ_SERVER_ADDR, SQ_SERVER_PORT, SQ_TIMEOUT, SQ_ENGINE );

		print_r( $Query->GetInfo( ) );
		print_r( $Query->GetPlayers( ) );
		print_r( $Query->GetRules( ) );
	}
	catch( Exception $e )
	{
		echo $e->getMessage( );
	}
	finally
	{
		$Query->Disconnect( );
	}
