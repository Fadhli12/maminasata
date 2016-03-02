<?php
/*
* Mysql database class - only one connection alowed
*/
error_reporting(1);
date_timezone_set("Asia/Singapore");
class Database {
	private $_connection;
	private static $_instance; //The single instance
	private $_host = "192.168.23.23";
	private $_username = "maminasata";
	private $_password = "maminasata123";
	private $_database = "maminasata";
	private $error = 0;
	/*
	Get an instance of the Database
	@return Instance
	*/
	public static function getInstance() {
		if(!self::$_instance) { // If no instance then make one
			self::$_instance = new self();
		}
		return self::$_instance;
	}
	// Constructor
	private function __construct() {
		$this->_connection = new mysqli($this->_host, $this->_username, 
			$this->_password, $this->_database);
	
		// Error handling
		if(mysqli_connect_error()) {
			$this->error = 1;

		}
		if ($this->error == 1){
			$host = "localhost";
			$username = "root";
			$password = "";
			$database = "maminasata";

			$this->_connection = new mysqli($host, $username,
				$password, $database);

			// Error handling
			if(mysqli_connect_error()) {
				trigger_error("Failed to conencto to MySQL: " . mysql_connect_error(),
					E_USER_ERROR);
			}
		}
	}
	// Magic method clone is empty to prevent duplication of connection
	private function __clone() { }
	// Get mysqli connection
	public function getConnection() {
		return $this->_connection;
	}

}
?>