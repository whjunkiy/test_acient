<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
        "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <title>Vitality EMR</title>
    <link href="css/layout.css" rel="stylesheet" type="text/css"/>
    <link href='https://fonts.googleapis.com/css?family=Oxygen:400,300,700' rel='stylesheet' type='text/css'>

    <link href="SpryAssets/SpryValidationTextField.css" rel="stylesheet" type="text/css"/>
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.9.2/themes/base/jquery-ui.css"/>
    <script src="scripts/jquery.js" type="text/javascript"></script>
    <script src="https://code.jquery.com/ui/1.9.2/jquery-ui.js"></script>
    <script src="SpryAssets/SpryValidationTextField.js" type="text/javascript"></script>
    <script src="scripts/jquery.maskedinput.js" type="text/javascript"></script>
    <script src="scripts/jquery.autocomplete.js" type="text/javascript"></script>
    <script type="text/javascript">
        console.log(121212)
        debugger
        $().ready(function () {
            $("#patient").autocomplete("/include/get_patient_name.php", {
                width: 260,
                matchContains: true,
                selectFirst: false
            });
        });
    </script>

    <style>
        #check_paid p, #uncheck_paid p {
            margin: 10px 0 0 0;
            color: #9e9e9e;
        }

        .ptpcontent, .ptpcontent td, .ptpcontent span, .ptpcontent select, .ptpcontent input {
            font-size: 16px;
        }

        .ptpcontent td {
            padding: 0 10px 10px 0;
        }

        #check_window {
            height: 100%;
            width: 100%;
            position: fixed;
            top: 0;
            left: 0;
            background-color: #3f3f3fd1;
            display: none;
            z-index: 3;
        }

    </style>

</head>

<body>

<div id="check_window" style="display: none;">
</div>

<div id="wrapper">

    <!-- include/header.php -->

    <div id="dashContainer">
        <div id="dashUpperLeft">
            <div id="DULheader">
                Patient Callbacks
            </div>
            <div id="dash1">
                <?php
                $con = mysql_connect("localhost", "nyvemrdatabase", "Hartman1015!");
                if (!$con) {
                    die("Can Not Connect:" . mysql_error());
                }

                mysql_select_db("nyvemrdatabase", $con);

                if (isset($_SESSION['location']) && $_SESSION['location'] == 'la') {
                    mysql_select_db("lavemrdatabase", $con);
                }

                if (isset($_SESSION['location']) && $_SESSION['location'] == 'miami') {
                    mysql_select_db("miamivemrdatabase", $con);
                }

                if (isset($_SESSION['location']) && $_SESSION['location'] == 'ny') {
                    mysql_select_db("nyvemrdatabase", $con);
                }

                if (isset($_SESSION['location']) && $_SESSION['location'] == 'renew') {
                    mysql_select_db("renewvemrdatabase", $con);
                }

                $key = "dk74rhfihow81pzmeus71j4k3";

                $owner = $_SESSION['username'];
                $today = date('Y-m-d');

                $patcbsql = "SELECT patient_id, AES_DECRYPT(firstName,'$key') as firstName, AES_DECRYPT(lastName,'$key') as lastName, cbdate, status, owner, owner_2 FROM patientprofiles WHERE (owner = '$owner' || owner_2 = '$owner') AND cbdate <= '$today' AND cbdate !='0000-00-00' AND (status = 'Patient' || status = 'Inactive') ORDER BY cbdate ASC";

                if ($_SESSION['user_role'] == 'provider +' && isset($_SESSION['physician'])) {
                    $physician = $_SESSION['physician'];
                    $patcbsql = "SELECT patient_id, AES_DECRYPT(firstName,'$key') as firstName, AES_DECRYPT(lastName,'$key') as lastName, cbdate, status, owner FROM patientprofiles WHERE owner = '$owner' AND cbdate <= '$today' AND cbdate !='0000-00-00' AND (status = 'Patient' || status = 'Inactive') AND physician = '$physician' ORDER BY cbdate ASC LIMIT 0, 5";
                } elseif ($session->isUserLevel(11)) {
                    $drname = $_SESSION['drname'];
                    $patcbsql = "SELECT patient_id, AES_DECRYPT(firstName,'$key') as firstName, AES_DECRYPT(lastName,'$key') as lastName, cbdate, status, owner FROM patientprofiles WHERE owner = '$owner' AND cbdate <= '$today' AND cbdate !='0000-00-00' AND (status = 'Patient' || status = 'Inactive') AND physician = '$drname' ORDER BY cbdate ASC LIMIT 0, 5";
                }

                //If a physician is logged in change sql query to only select patients belonging to them
                /*if($session->isUserLevel(11)){
                $drname = $_SESSION['drname'];
                $patcbsql = "SELECT patient_id, AES_DECRYPT(firstName,'$key') as firstName, AES_DECRYPT(lastName,'$key') as lastName, cbdate, status, owner FROM patientprofiles WHERE owner = '$owner' AND cbdate <= '$today' AND cbdate !='0000-00-00' AND (status = 'Patient' || status = 'Inactive') AND physician = '$drname' ORDER BY cbdate ASC LIMIT 0, 5";
                } */

                if ($session->isAdmin() && isset($_SESSION['physician'])) {
                    $physician = $_SESSION['physician'];
                    $patcbsql = "SELECT patient_id, AES_DECRYPT(firstName,'$key') as firstName, AES_DECRYPT(lastName,'$key') as lastName, cbdate, status, owner FROM patientprofiles WHERE owner = '$owner' AND cbdate <= '$today' AND cbdate !='0000-00-00' AND (status = 'Patient' || status = 'Inactive') AND physician = '$physician' ORDER BY cbdate ASC LIMIT 0, 5";
                }


                $mypatcbData = mysql_query($patcbsql, $con);
                echo "<table>
		<tr>
			<th style=\"display:none\">patient_id</th>
			<th>Date</th>
			<th>Patient</th>

		</tr>";

                $i = 0;
                while ($record = mysql_fetch_array($mypatcbData)) {

//If rep 2 is assigned, skip over record
                    if ((isset($record['owner_2']) && $record['owner_2'] != $_SESSION['username']) || $i >= 5) {
                        continue;
                    }

                    $i++;

                    $mysql_cbdate = date('m/d/Y', strtotime($record['cbdate']));

                    echo "<tr>";
                    echo "<td style=\"display:none\">" . $record['patient_id'] . "</td>";
                    echo "<td>" . $mysql_cbdate . "</td>";
                    echo "<td>" . "<a href='details.php?id=" . $record['patient_id'] . "&location=" . $_SESSION['location'] . "'>" . $record['lastName'] . "," . $record['firstName'] . "</a></td>";
                    echo "</tr>";

                }
                echo "</table>";
                mysql_close($con);
                ?>
                <br/><br/><br/>
                <a class="smallBtn" href="pacallback.php">Call-Backs</a>
            </div>
        </div>
        <div id="dashUpperMid">
            <div id="DUMheader">
                Prospect Callbacks
            </div>
            <div id="dash2">
                <?php
                $con = mysql_connect("localhost", "nyvemrdatabase", "Hartman1015!");
                if (!$con) {
                    die("Can Not Connect:" . mysql_error());
                }

                mysql_select_db("nyvemrdatabase", $con);

                if (isset($_SESSION['location']) && $_SESSION['location'] == 'la') {
                    mysql_select_db("lavemrdatabase", $con);
                }

                if (isset($_SESSION['location']) && $_SESSION['location'] == 'miami') {
                    mysql_select_db("miamivemrdatabase", $con);
                }

                if (isset($_SESSION['location']) && $_SESSION['location'] == 'ny') {
                    mysql_select_db("nyvemrdatabase", $con);
                }

                if (isset($_SESSION['location']) && $_SESSION['location'] == 'renew') {
                    mysql_select_db("renewvemrdatabase", $con);
                }

                $key = "dk74rhfihow81pzmeus71j4k3";

                $owner = $_SESSION['username'];
                $today = date('Y-m-d');

                $procbsql = "SELECT patient_id, AES_DECRYPT(firstName,'$key') as firstName, AES_DECRYPT(lastName,'$key') as lastName, cbdate, status, owner, owner_2 FROM patientprofiles WHERE (status = 'Prospect' OR status = 'Renew Special' OR status = 'New Patient Special') AND (owner = '$owner' || owner_2 = '$owner') AND cbdate <= '$today' AND cbdate != 0 ORDER BY cbdate ASC";

                if ($_SESSION['user_role'] == 'provider +' && isset($_SESSION['physician'])) {
                    $physician = $_SESSION['physician'];
                    $procbsql = "SELECT patient_id, AES_DECRYPT(firstName,'$key') as firstName, AES_DECRYPT(lastName,'$key') as lastName, cbdate, status, owner FROM patientprofiles WHERE (status = 'Prospect' OR  status = 'Renew Special' OR status = 'New Patient Special') AND owner = '$owner' AND cbdate <= '$today' AND cbdate != 0 AND physician = '$physician' ORDER BY cbdate ASC LIMIT 0, 5";
                } elseif ($session->isUserLevel(11)) {
                    $drname = $_SESSION['drname'];
                    $procbsql = "SELECT patient_id, AES_DECRYPT(firstName,'$key') as firstName, AES_DECRYPT(lastName,'$key') as lastName, cbdate, status, owner FROM patientprofiles WHERE (status = 'Prospect' OR status = 'Renew Speical' OR status = 'New Patient Special') AND owner = '$owner' AND cbdate <= '$today' AND cbdate != 0 AND physician = '$drname' ORDER BY cbdate ASC LIMIT 0, 5";
                }

                //If a physician is logged in change sql query to only select patients belonging to them
                /*if($session->isUserLevel(11)){
                $drname = $_SESSION['drname'];
                $procbsql = "SELECT patient_id, AES_DECRYPT(firstName,'$key') as firstName, AES_DECRYPT(lastName,'$key') as lastName, cbdate, status, owner FROM patientprofiles WHERE status = 'Prospect' AND owner = '$owner' AND cbdate <= '$today' AND cbdate !='0000-00-00' AND physician = '$drname' ORDER BY cbdate ASC LIMIT 0, 5";
                } */

                //If an admin selects a physician
                if ($session->isAdmin() && isset($_SESSION['physician'])) {
                    $physician = $_SESSION['physician'];
                    $procbsql = "SELECT patient_id, AES_DECRYPT(firstName,'$key') as firstName, AES_DECRYPT(lastName,'$key') as lastName, cbdate, status, owner FROM patientprofiles WHERE (status = 'Prospect' OR status = 'Renew Special' OR status = 'New Patient Special') AND owner = '$owner' AND cbdate <= '$today' AND cbdate != 0 AND physician = '$physician' ORDER BY cbdate ASC LIMIT 0, 5";
                }

                $mycbData = mysql_query($procbsql, $con);
                echo "<table>
		<tr>
			<th style=\"display:none\">patient_id</th>
			<th>Date</th>
			<th>Prospect</th>

		</tr>";

                $i = 0;
                while ($record = mysql_fetch_array($mycbData)) {

//If rep 2 is assigned, skip over record
                    if ((isset($record['owner_2']) && $record['owner_2'] != $_SESSION['username']) || $i >= 5) {
                        continue;
                    }

                    $i++;

                    $mysql_cbdate = date('m/d/Y', strtotime($record['cbdate']));

                    echo "<tr>";
                    echo "<td style=\"display:none\">" . $record['patient_id'] . "</td>";
                    echo "<td>" . $mysql_cbdate . "</td>";
                    echo "<td>" . "<a href='details.php?id=" . $record['patient_id'] . "&location=" . $_SESSION['location'] . "'>" . $record['lastName'] . "," . $record['firstName'] . "</a></td>";
                    echo "</tr>";
                }
                echo "</table>";
                mysql_close($con);
                ?><br/><br/><br/>
                <a class="smallBtn" href="procallback.php">Call-Backs</a>
            </div>
        </div>
        <div id="dashUpperRight">
            <div id="DURheader">
                Search
            </div>
            <div id="dash3">
                <table>
                    <form id="patientSearchForm" name="patientSearchForm" action="mainsearch.php" method="post">
                        <tr>
                            <td><label for="lastName">Last Name:</label></td>
                            <td><input type="text" name="lastName" autocomplete="off" class="text"/></td>
                        </tr>
                        <tr>
                            <td><label for="firstName">First Name:</label></td>
                            <td><input type="text" name="firstName" autocomplete="off" class="text"/></td>
                        </tr>
                        <tr>
                            <td><label for="searchPhone">Phone #:</label></td>
                            <td><span id="psprytextfield1">
    <input type="text" name="searchPhone" autocomplete="off" id="sprytextfield1" class="text"/></span></td>
                        </tr>
                        <tr>
                            <td><label for="searchEmail">Email:</label></td>
                            <td><input type="tel" name="searchEmail" autocomplete="off" class="text"/></td>
                        </tr>
                        <tr>
                            <td><label for="status">Status:</label></td>
                            <td><select name="status" type="menu">
                                    <option value="" selected="selected"></option>
                                    <option value="Patient">Patient</option>
                                    <option value="Prospect">Prospect</option>
                                    <option value="Pending_Labs">Pending Labs</option>
                                    <option value="Labs">Labs</option>
                                    <option value="Pending_Appointment">Pending Appointment</option>
                                    <option value="Pending_Order">Pending Order</option>
                                    <option value="Inactive">Inactive</option>
                                    <option value="Archived">Archived</option>
                                    <option value="Rejected">Rejected</option>

                                </select></td>
                        </tr>
                        <tr>
                            <td>
                                <label for="owner">User:</label>
                            </td>
                            <td>

                                <?php if ($_SESSION['user_role'] == 'outside_sales') { ?>
                                <b><?php echo trim($_SESSION['username']); ?></b>
                                <input type="text" name="owner" value="<?php echo trim($_SESSION['username']); ?>"
                                       style="display: none;"/>
                                <?php } else { ?>

                                <select name="owner" type="menu">
                                    <option value="" selected="selected"></option>

                                <?php
                                $con_user = mysql_connect("localhost", "nyvemrdatabase", "Hartman1015!");
                                mysql_select_db("nyvemrdatabase", $con_user);

                                $user_role_data = mysql_query("SELECT username FROM users WHERE user_role = 'owner' OR user_role = 'coordinator' OR user_role = 'outside_sales' OR user_role = 'manager' ORDER BY username ASC", $con_user);
                                mysql_close($con_user);

                                if (isset($_SESSION['location']) && $_SESSION['location'] == 'la') {
                                    mysql_select_db("lavemrdatabase", $con);
                                }
                                if (isset($_SESSION['location']) && $_SESSION['location'] == 'miami') {
                                    mysql_select_db("miamivemrdatabase", $con);
                                }
                                if (isset($_SESSION['location']) && $_SESSION['location'] == 'renew') {
                                    mysql_select_db("renewvemrdatabase", $con);
                                }

                                while ($user_role_data_record = mysql_fetch_array($user_role_data)) {
                                    echo "<option value='" . $user_role_data_record['username'] . "'>" . $user_role_data_record['username'] . "</option>";
                                }
                                ?>

                                <!--
    	<option value="pfigueira">pfigueira</option>
      <option value="kfigueira">kfigueira</option>
      <option value="mlaurenzo">mlaurenzo</option>
      <option value="nverri">nverri</option>
      <option value="jvanderlugt">jvanderlugt</option>
			<option value="crutherford">crutherford</option>
			<option value="cwalsh">cwalsh</option>
-->
                                    <option value="N/A">N/A</option>
                                </select>

                                <?php } ?>

                            </td>
                        </tr>

                        <?php
                        //if($_SESSION['username'] == 'codyward' || $_SESSION['username'] == 'kfigueira' || $_SESSION['username'] == 'mlaurenzo') {
                        if ($_SESSION['user_role'] == 'owner' || $_SESSION['user_role'] == 'manager' || $_SESSION['username'] == 'alexgaran') {
                            echo '<tr>
	<td><label for="print-view">Printable View:</label></td>
    <td><input type="checkbox" name="print-view" id="print-view"></td>
</tr>';
                        }
                        ?>

                        <tr>
                            <td colspan="2" style="text-align:center"><a href="registernew.php" class="smallBtn">Register</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input
                                        type="submit" name="search" value="Search" class="smallBtn"/></td>
                        </tr>


                    </form>
                </table>
            </div>
        </div>

        <!-- #dashBulletin -->
        <div id="dashBulletin" style="clear:both; width:100%;">
            <div id="dashBulletinHeader">Dashboard Bulletin</div>
            <div id="dashBulletinBody" style="padding: 15px 20px 15px 20px;">
                <?php if ($session->isAdmin()) {
                    include("bulletin.php");
                } ?>
            </div>
        </div>

        <div id="dashLower">
            <div id="dashLowerHeader">Daily Schedule</div>

            <div id="dashLowerTable">
                <?php
                $con = mysql_connect("localhost", "nyvemrdatabase", "Hartman1015!");
                if (!$con) {
                    die("Can Not Connect:" . mysql_error());
                }
                mysql_select_db("nyvemrdatabase", $con);

                if (isset($_SESSION['location']) && $_SESSION['location'] == 'la') {
                    mysql_select_db("lavemrdatabase", $con);
                }
                if (isset($_SESSION['location']) && $_SESSION['location'] == 'miami') {
                    mysql_select_db("miamivemrdatabase", $con);
                }
                if (isset($_SESSION['location']) && $_SESSION['location'] == 'ny') {
                    mysql_select_db("nyvemrdatabase", $con);
                }
                if (isset($_SESSION['location']) && $_SESSION['location'] == 'renew') {
                    mysql_select_db("renewvemrdatabase", $con);
                }

                $d = getdate();
                $d = $d['wday'];
                $di = 1;
                if ($d == 5) {
                    $di = 3;
                }
                if ($d == 6) {
                    $di = 2;
                }

                $sql = "SELECT AES_DECRYPT(patientprofiles.firstName,'$key') as firstName, AES_DECRYPT(patientprofiles.lastName,'$key') as lastName, patientprofiles.patient_id, patientprofiles.patient_balance, appointments.appt_date, appointments.appt_start_time, appointments.appointment_id, appointments.appt_length, appointments.appt_status, appointments.appt_type, appointments.appt_location, patientprofiles.owner, appointments.paid, patientprofiles.timezone AS patient_timezone, patientprofiles.physician, TIME_FORMAT(appointments.appt_start_time,'%h:%i %p') AS appt_time, DATE_FORMAT(appointments.appt_date,'%Y-%m-%d') AS appt_date, appointments.appt_cost FROM patientprofiles INNER JOIN appointments ON patientprofiles.patient_id = appointments.patient_id WHERE patientprofiles.status != 'Deleted' and appt_date BETWEEN CURDATE() AND CURDATE() + INTERVAL " . $di . " DAY ORDER BY appointments.appt_date, appointments.appt_start_time ASC";
                if ($_SESSION['user_role'] == 'provider +' && isset($_SESSION['physician'])) {
                    $physician = $_SESSION['physician'];
                    $sql = "SELECT AES_DECRYPT(patientprofiles.firstName,'$key') as firstName, AES_DECRYPT(patientprofiles.lastName,'$key') as lastName, patientprofiles.patient_id, patientprofiles.patient_balance, appointments.appt_date, appointments.appt_start_time, appointments.appointment_id, appointments.appt_length, appointments.appt_status, appointments.appt_type, appointments.appt_location, patientprofiles.owner, appointments.paid, patientprofiles.timezone AS patient_timezone, patientprofiles.physician, TIME_FORMAT(appointments.appt_start_time,'%h:%i %p') AS appt_time, DATE_FORMAT(appointments.appt_date,'%Y-%m-%d') AS appt_date, appointments.appt_cost FROM patientprofiles INNER JOIN appointments ON patientprofiles.patient_id = appointments.patient_id WHERE patientprofiles.status != 'Deleted' and (appt_date BETWEEN CURDATE() AND CURDATE() + INTERVAL " . $di . " DAY) AND patientprofiles.physician = '$physician' ORDER BY appointments.appt_date,  appointments.appt_start_time ASC";
                } elseif ($session->isUserLevel(11)) {
                    $drname = $_SESSION['drname'];
                    $sql = "SELECT AES_DECRYPT(patientprofiles.firstName,'$key') as firstName, AES_DECRYPT(patientprofiles.lastName,'$key') as lastName, patientprofiles.patient_id, patientprofiles.patient_balance, appointments.appt_date, appointments.appt_start_time, appointments.appointment_id, appointments.appt_length, appointments.appt_status, appointments.appt_type, appointments.appt_location, patientprofiles.owner, appointments.paid, patientprofiles.timezone AS patient_timezone, patientprofiles.physician, TIME_FORMAT(appointments.appt_start_time,'%h:%i %p') AS appt_time, DATE_FORMAT(appointments.appt_date,'%Y-%m-%d') AS appt_date, appointments.appt_cost FROM patientprofiles INNER JOIN appointments ON patientprofiles.patient_id = appointments.patient_id WHERE patientprofiles.status != 'Deleted' and (appt_date BETWEEN CURDATE() AND CURDATE() + INTERVAL " . $di . " DAY) AND (patientprofiles.physician = '$drname' OR patientprofiles.examiner = '$drname') ORDER BY appointments.appt_date, appointments.appt_start_time ASC";
                }
                //If an admin selects a physician
                if ($session->isAdmin() && isset($_SESSION['physician']) && !($_SESSION['user_role'] == 'outside_sales')) {
                    $physician = $_SESSION['physician'];
                    $sql = "SELECT AES_DECRYPT(patientprofiles.firstName,'$key') as firstName, AES_DECRYPT(patientprofiles.lastName,'$key') as lastName, patientprofiles.patient_id, patientprofiles.patient_balance, appointments.appt_date, appointments.appt_start_time, appointments.appointment_id, appointments.appt_length, appointments.appt_status, appointments.appt_type, appointments.appt_location, patientprofiles.owner, appointments.paid, patientprofiles.timezone AS patient_timezone, patientprofiles.physician, TIME_FORMAT(appointments.appt_start_time,'%h:%i %p') AS appt_time, DATE_FORMAT(appointments.appt_date,'%Y-%m-%d') AS appt_date, appointments.appt_cost FROM patientprofiles INNER JOIN appointments ON patientprofiles.patient_id = appointments.patient_id WHERE patientprofiles.status != 'Deleted' and (appt_date BETWEEN CURDATE() AND CURDATE() + INTERVAL " . $di . " DAY) AND (patientprofiles.physician = '$physician') ORDER BY appointments.appt_date, appointments.appt_start_time ASC";
                }


                if ($session->isAdmin() && isset($_SESSION['physician']) && ($_SESSION['user_role'] == 'outside_sales')) {
                    $physician = $_SESSION['physician'];
                    $sql = "SELECT AES_DECRYPT(patientprofiles.firstName,'$key') as firstName, AES_DECRYPT(patientprofiles.lastName,'$key') as lastName, patientprofiles.patient_id, patientprofiles.patient_balance, appointments.appt_date, appointments.appt_start_time, appointments.appointment_id, appointments.appt_length, appointments.appt_status, appointments.appt_type, appointments.appt_location, patientprofiles.owner, appointments.paid, patientprofiles.timezone AS patient_timezone, patientprofiles.physician, TIME_FORMAT(appointments.appt_start_time,'%h:%i %p') AS appt_time, DATE_FORMAT(appointments.appt_date,'%Y-%m-%d') AS appt_date, appointments.appt_cost FROM patientprofiles INNER JOIN appointments ON patientprofiles.patient_id = appointments.patient_id WHERE patientprofiles.status != 'Deleted' and (appt_date BETWEEN CURDATE() AND CURDATE() + INTERVAL " . $di . " DAY) AND (patientprofiles.physician = '$physician') AND (owner = '" . trim($_SESSION['username']) . "' OR owner_2 = '" . trim($_SESSION['username']) . "') ORDER BY appointments.appt_date, appointments.appt_start_time ASC";
                }

                if ($session->isAdmin() && ($_SESSION['user_role'] == 'outside_sales')) {
                    $sql = "SELECT AES_DECRYPT(patientprofiles.firstName,'$key') as firstName, AES_DECRYPT(patientprofiles.lastName,'$key') as lastName, patientprofiles.patient_id, patientprofiles.patient_balance, appointments.appt_date, appointments.appt_start_time, appointments.appointment_id, appointments.appt_length, appointments.appt_status, appointments.appt_type, appointments.appt_location, patientprofiles.owner, appointments.paid, patientprofiles.timezone AS patient_timezone, patientprofiles.physician, TIME_FORMAT(appointments.appt_start_time,'%h:%i %p') AS appt_time, DATE_FORMAT(appointments.appt_date,'%Y-%m-%d') AS appt_date, appointments.appt_cost FROM patientprofiles INNER JOIN appointments ON patientprofiles.patient_id = appointments.patient_id WHERE patientprofiles.status != 'Deleted' and (appt_date BETWEEN CURDATE() AND CURDATE() + INTERVAL " . $di . " DAY) AND (owner = '" . trim($_SESSION['username']) . "' OR owner_2 = '" . trim($_SESSION['username']) . "') ORDER BY appointments.appt_date, appointments.appt_start_time ASC";
                }



                $myData = mysql_query($sql, $con);


                $was_ddate = "";

                while ($record = mysql_fetch_array($myData)) {

                    $displayTime = date('h:i a', strtotime($record['appt_date'] . " " . $record['appt_time']));
                    $ddate = date('F jS, Y', strtotime($record['appt_date']));

                    if (!($was_ddate == $ddate)) {
                        echo "<table><tr><td colspan='8' style='border: none;'><div id='schedDate'><br />" . $ddate . "</div></td></tr><tr><th>Provider time</th><th>Patient time</th>	<th>Name</th><th>User</th><th>Appointment Type</th><th>Location</th><th>Length</th><th>Status</th><th>Paid</th></tr>";
                        $was_ddate = $ddate;
                    }


                    $user_apt_datetime = date('h:i a', strtotime($record['appt_date'] . " " . $record['appt_time']));
// AST and EST - has't time shift.
                    if ($emr_user_timezone == 'CST') {
                        $user_apt_datetime = date('h:i a', strtotime($record['appt_date'] . " " . $record['appt_time'] . ' -1 hours'));
                    }
                    if ($emr_user_timezone == 'MST') {
                        $user_apt_datetime = date('h:i a', strtotime($record['appt_date'] . " " . $record['appt_time'] . ' -2 hours'));
                    }
                    if ($emr_user_timezone == 'PST') {
                        $user_apt_datetime = date('h:i a', strtotime($record['appt_date'] . " " . $record['appt_time'] . ' -3 hours'));
                    }
                    if ($emr_user_timezone == 'AKST') {
                        $user_apt_datetime = date('h:i a', strtotime($record['appt_date'] . " " . $record['appt_time'] . ' -4 hours'));
                    }
                    if ($emr_user_timezone == 'HST') {
                        $user_apt_datetime = date('h:i a', strtotime($record['appt_date'] . " " . $record['appt_time'] . ' -6 hours'));
                    }


                    $patient_apt_datetime = date('h:i a', strtotime($record['appt_date'] . " " . $record['appt_time']));
// AST and EST - has't time shift.
                    if (trim($record["patient_timezone"]) == 'CST') {
                        $patient_apt_datetime = date('h:i a', strtotime($record['appt_date'] . " " . $record['appt_time'] . ' -1 hours'));
                    }
                    if (trim($record["patient_timezone"]) == 'MST') {
                        $patient_apt_datetime = date('h:i a', strtotime($record['appt_date'] . " " . $record['appt_time'] . ' -2 hours'));
                    }
                    if (trim($record["patient_timezone"]) == 'PST') {
                        $patient_apt_datetime = date('h:i a', strtotime($record['appt_date'] . " " . $record['appt_time'] . ' -3 hours'));
                    }
                    if (trim($record["patient_timezone"]) == 'AKST') {
                        $patient_apt_datetime = date('h:i a', strtotime($record['appt_date'] . " " . $record['appt_time'] . ' -4 hours'));
                    }
                    if (trim($record["patient_timezone"]) == 'HST') {
                        $patient_apt_datetime = date('h:i a', strtotime($record['appt_date'] . " " . $record['appt_time'] . ' -6 hours'));
                    }


                    $physician_apt_datetime = date('h:i a', strtotime($record['appt_date'] . " " . $record['appt_time']));
// Get physician timezone
                    mysql_select_db("nyvemrdatabase", $con);
                    $sql_physician = mysql_query("SELECT timezone FROM users  WHERE drname='" . trim($record['physician']) . "' AND location='" . trim($_SESSION['location']) . "'", $con);
                    $row_physician = mysql_fetch_array($sql_physician);

                    if (isset($_SESSION['location']) && $_SESSION['location'] == 'la') {
                        mysql_select_db("lavemrdatabase", $con);
                    }
                    if (isset($_SESSION['location']) && $_SESSION['location'] == 'miami') {
                        mysql_select_db("miamivemrdatabase", $con);
                    }
                    if (isset($_SESSION['location']) && $_SESSION['location'] == 'renew') {
                        mysql_select_db("renewvemrdatabase", $con);
                    }


// AST and EST - has't time shift.
                    if (trim($row_physician["timezone"]) == 'CST') {
                        $physician_apt_datetime = date('h:i a', strtotime($record['appt_date'] . " " . $record['appt_time'] . ' -1 hours'));
                    }
                    if (trim($row_physician["timezone"]) == 'MST') {
                        $physician_apt_datetime = date('h:i a', strtotime($record['appt_date'] . " " . $record['appt_time'] . ' -2 hours'));
                    }
                    if (trim($row_physician["timezone"]) == 'PST') {
                        $physician_apt_datetime = date('h:i a', strtotime($record['appt_date'] . " " . $record['appt_time'] . ' -3 hours'));
                    }
                    if (trim($row_physician["timezone"]) == 'AKST') {
                        $physician_apt_datetime = date('h:i a', strtotime($record['appt_date'] . " " . $record['appt_time'] . ' -4 hours'));
                    }
                    if (trim($row_physician["timezone"]) == 'HST') {
                        $physician_apt_datetime = date('h:i a', strtotime($record['appt_date'] . " " . $record['appt_time'] . ' -6 hours'));
                    }

                    $show_emr_user_timezone = $emr_user_timezone;
                    $patient_timezone = trim($record["patient_timezone"]);
                    $physician_timezone = trim($row_physician["timezone"]);

                    if ($daytime_letter == "D") {
                        $show_emr_user_timezone = str_replace('S', 'D', $emr_user_timezone);
                        $show_emr_user_timezone = str_replace('DD', 'SD', $show_emr_user_timezone);
                        $patient_timezone = str_replace('S', 'D', trim($record["patient_timezone"]));
                        $patient_timezone = str_replace('DD', 'SD', $patient_timezone);
                        $physician_timezone = str_replace('S', 'D', trim($row_physician["timezone"]));
                        $physician_timezone = str_replace('DD', 'SD', $physician_timezone);
                    }


                    if ($_SESSION['user_role'] == 'provider +' || $_SESSION['user_role'] == 'provider') {

                        $displayTime = '<span title="Patient time: ' . $patient_apt_datetime . ' ' . $patient_timezone . '">' . $physician_apt_datetime . ' ' . $physician_timezone . '</span>';

                    } else {

                        $displayTime = '<span title="Patient time: ' . $patient_apt_datetime . ' ' . $patient_timezone . ', Provider time: ' . $physician_apt_datetime . ' ' . $physician_timezone . '">' . $patient_apt_datetime . ' ' . $patient_timezone . '</span>';

                    }


                    if ($record['appt_status'] == 'New') {

                        echo "<tr>";
                        echo "<td>" . "<a href='checkAppt.php?id=" . $record['appointment_id'] . "'>" . $physician_apt_datetime . ' ' . $physician_timezone . "</td>";
                        echo "<td>" . "<a href='checkAppt.php?id=" . $record['appointment_id'] . "'>" . $patient_apt_datetime . ' ' . $patient_timezone . "</td>";
                        echo "<td>" . "<a href='details.php?id=" . $record['patient_id'] . "&location=" . $_SESSION['location'] . "'>" . $record['lastName'] . ", " . $record['firstName'] . "</a></td>";
                        echo "<td>" . $record['owner'] . "</td>";
                        echo "<td>" . $record['appt_type'] . "</td>";
                        echo "<td>" . $record['appt_location'] . "</td>";
                        echo "<td>" . $record['appt_length'] . "</td>";
                        echo "<td>" . "<a href='confirmAppt.php?id=" . $record['appointment_id'] . "'>" . $record['appt_status'] . "</a></td>";
                        echo "<td>" . '<input type="checkbox" class="cpaid" id="' . $record['appointment_id'] . '" data-id="' . $record['appointment_id'] . '" data-appt_cost="' . $record['appt_cost'] . '" data-patient_id="' . $record['patient_id'] . '" data-patient_balance="' . $record['patient_balance'] . '" data-fio="' . $record['lastName'] . ', ' . $record['firstName'] . '" name="npaid"' . ($record['paid'] == '0000-00-00 00:00:00' ? "" : " checked") . ' title="Set Paid/Unpaid appointment\'s status"/></td>';
                        echo "</tr>";
                    } elseif ($record['appt_status'] == 'Checked Out') {

                        echo "<tr>";
                        echo "<td>" . "<a href='checkAppt.php?id=" . $record['appointment_id'] . "'>" . $physician_apt_datetime . ' ' . $physician_timezone . "</td>";
                        echo "<td>" . "<a href='checkAppt.php?id=" . $record['appointment_id'] . "'>" . $patient_apt_datetime . ' ' . $patient_timezone . "</td>";
                        echo "<td>" . "<a href='details.php?id=" . $record['patient_id'] . "&location=" . $_SESSION['location'] . "'>" . $record['lastName'] . ", " . $record['firstName'] . "</a></td>";
                        echo "<td>" . $record['owner'] . "</td>";
                        echo "<td>" . $record['appt_type'] . "</td>";
                        echo "<td>" . $record['appt_location'] . "</td>";
                        echo "<td>" . $record['appt_length'] . "</td>";
                        echo "<td>" . "<a href='confirmAppt.php?id=" . $record['appointment_id'] . "'>" . $record['appt_status'] . "</a></td>";
                        echo "<td>" . '<input type="checkbox" class="cpaid" id="' . $record['appointment_id'] . '" data-id="' . $record['appointment_id'] . '" data-appt_cost="' . $record['appt_cost'] . '" data-patient_id="' . $record['patient_id'] . '" data-patient_balance="' . $record['patient_balance'] . '" data-fio="' . $record['lastName'] . ', ' . $record['firstName'] . '" name="npaid"' . ($record['paid'] == '0000-00-00 00:00:00' ? "" : " checked") . ' title="Set Paid/Unpaid appointment\'s status"/></td>';
                        echo "</tr>";
                    } elseif ($record['appt_status'] == 'Checked In') {

                        echo "<tr>";
                        echo "<td>" . "<a href='checkAppt.php?id=" . $record['appointment_id'] . "'>" . $physician_apt_datetime . ' ' . $physician_timezone . "</td>";
                        echo "<td>" . "<a href='checkAppt.php?id=" . $record['appointment_id'] . "'>" . $patient_apt_datetime . ' ' . $patient_timezone . "</td>";
                        echo "<td>" . "<a href='details.php?id=" . $record['patient_id'] . "&location=" . $_SESSION['location'] . "'>" . $record['lastName'] . ", " . $record['firstName'] . "</a></td>";
                        echo "<td>" . $record['owner'] . "</td>";
                        echo "<td>" . $record['appt_type'] . "</td>";
                        echo "<td>" . $record['appt_location'] . "</td>";
                        echo "<td>" . $record['appt_length'] . "</td>";
                        echo "<td>" . "<a href='confirmAppt.php?id=" . $record['appointment_id'] . "'>" . $record['appt_status'] . "</a></td>";
                        echo "<td>" . '<input type="checkbox" class="cpaid" id="' . $record['appointment_id'] . '" data-id="' . $record['appointment_id'] . '" data-appt_cost="' . $record['appt_cost'] . '" data-patient_id="' . $record['patient_id'] . '" data-patient_balance="' . $record['patient_balance'] . '" data-fio="' . $record['lastName'] . ', ' . $record['firstName'] . '" name="npaid"' . ($record['paid'] == '0000-00-00 00:00:00' ? "" : " checked") . ' title="Set Paid/Unpaid appointment\'s status"/></td>';
                        echo "</tr>";
                    } elseif ($record['appt_status'] == 'Confirmed') {

                        echo "<tr class=\"rowbgd4\">";
                        echo "<td>" . "<a href='checkAppt.php?id=" . $record['appointment_id'] . "'>" . $physician_apt_datetime . ' ' . $physician_timezone . "</td>";
                        echo "<td>" . "<a href='checkAppt.php?id=" . $record['appointment_id'] . "'>" . $patient_apt_datetime . ' ' . $patient_timezone . "</td>";
                        echo "<td>" . "<a href='details.php?id=" . $record['patient_id'] . "&location=" . $_SESSION['location'] . "'>" . $record['lastName'] . ", " . $record['firstName'] . "</a></td>";
                        echo "<td>" . $record['owner'] . "</td>";
                        echo "<td>" . $record['appt_type'] . "</td>";
                        echo "<td>" . $record['appt_location'] . "</td>";
                        echo "<td>" . $record['appt_length'] . "</td>";
                        echo "<td>" . $record['appt_status'] . "</td>";
                        echo "<td>" . '<input type="checkbox" class="cpaid" id="' . $record['appointment_id'] . '" data-id="' . $record['appointment_id'] . '" data-appt_cost="' . $record['appt_cost'] . '" data-patient_id="' . $record['patient_id'] . '" data-patient_balance="' . $record['patient_balance'] . '" data-fio="' . $record['lastName'] . ', ' . $record['firstName'] . '" name="npaid"' . ($record['paid'] == '0000-00-00 00:00:00' ? "" : " checked") . ' title="Set Paid/Unpaid appointment\'s status"/></td>';
                        echo "</tr>";
                    }

                    if (!($was_ddate == $ddate)) {
                        echo "</table><br /><br />";
                    }

                }
                echo "</table><br /><br />";


                ?>
            </div>

        </div> <!-- #dashLower -->
    </div> <!-- #dashContainer -->


    <div id='check_paid'
         style='display: none; text-align: left; position: absolute; z-index: 99; left: 10%; top: 15%; padding: 18px 18px 10px 18px; border-radius: 5px; top: 180px; background: #252525; color: #fff; width: 700px;'>
        <table width='100%'>
            <tr>
                <td colspan='3' style='padding: 0 0 15px 0; font-size: 20px;' id='messageto_all'>Enter Payment</td>
            </tr>
            <tr>
                <td colspan='3' style="background: #fff; padding: 14px 10px 0 10px; color: #000;" class="ptpcontent">

                    <table>
                        <tr>
                            <td style="width: 44%;">

                                <table>
                                    <tr>
                                        <td>Patient:</td>
                                        <td><span id="ipfio" data-patient_id=''></span></td>
                                    </tr>
                                    <tr>
                                        <td>Balance, $:</td>
                                        <td><span id="ipbalance"></span></td>
                                    </tr>
                                </table>

                            </td>
                            <td style="width: 56%;">

                                <table>
                                    <tr>
                                        <td>Payment, $:</td>
                                        <td><input type="text" name="payment" id="ipayment" value=""
                                                   style="width: 98%; color: #2196f3; font-weight: bold; padding-left: 5px;"
                                                   autocomplete="off"/></td>
                                    </tr>
                                    <tr>
                                        <td>Payment Method:</td>
                                        <td><select type="menu" name="pmtMethod" id="ipmtMethod" style="width: 100%;">
                                                <option value="American Express">American Express</option>
                                                <option value="Visa">Visa</option>
                                                <option value="MasterCard">MasterCard</option>
                                                <option value="Discover">Discover</option>
                                                <option value="Check">Check</option>
                                                <option value="Cash">Cash</option>
                                                <option value="Money Order">Money Order</option>
                                                <!-- <option value="pre-paid">pre-paid</option> -->
                                                <option value="no charge">no charge</option>
                                                <option value="-labs-" id="labs_option" style="display: none;">-labs-
                                                </option>
                                            </select>
                                        </td>
                                    </tr>
                                </table>

                            </td>
                        </tr>
                    </table>


                </td>
            </tr>
            <tr>
                <td align='left' style='padding: 10px 0 10px 0; width: 50%;'><span
                            style='float: left; padding: 5px 0 0 0; text-align: left;'></span><input type='button'
                                                                                                     class='smallBtn viewOrderEditOrderButton'
                                                                                                     name='paidit'
                                                                                                     value='Submit'
                                                                                                     id="sendpayment"
                                                                                                     data-master=''
                                                                                                     data-id=''>
                    <p>This will add the payment and Chart note "charged for exam #<span id="ipodredid"></span>" the
                        patient account</p></td>

                <td align='right' style="width: 30%;"><a href='javascript:;' class="ppre-paid" style='color: #61b9ff;'
                                                         data-master=''>Pre-paid</a>
                    <p>It will check "Paid" checkmark on the exam with no payment and Chart note</p></td>

                <td align='right' style="width: 20%;"><a href='javascript:;' class="pclose" style='color: #61b9ff;'
                                                         data-master=''>Cancel</a>
                    <p>It will uncheck "Paid" checkmark on the exam</p></td>
            </tr>
        </table>

    </div>


    <div id='uncheck_paid'
         style='display: none; text-align: left; position: absolute; z-index: 99; left: 10%; top: 15%; padding: 18px 18px 10px 18px; border-radius: 5px; top: 180px; background: #252525; color: #fff; width: 700px;'>

        <table width='100%'>
            <tr>
                <td colspan='2' style='padding: 0 0 15px 0; font-size: 20px;' id='messageto_all'>Uncheck Payment</td>
            </tr>
            <tr>
                <td colspan='2' style="background: #fff; padding: 14px 10px 15px 10px; color: #000;" class="ptpcontent">
                    This will also remove payment in amount of $ <b><span id="remove_payment" data-order_id=''
                                                                          data-patient_id=''
                                                                          data-patient_balance=''></span></b> and chart
                    note in the profile
                </td>
            </tr>
            <tr>
                <td align='left' style='padding: 10px 0 10px 0; width: 50%;'><span
                            style='float: left; padding: 5px 0 0 0; text-align: left;'></span><input type='button'
                                                                                                     class='smallBtn viewOrderEditOrderButton'
                                                                                                     name='unpaidit'
                                                                                                     value='Yes'
                                                                                                     id="removepayment"
                                                                                                     data-master=''
                                                                                                     data-id=''></td>
                <td align='right' style="width: 50%;"><a href='javascript:;' class="rclose" style='color: #61b9ff;'
                                                         data-master=''>Cancel</a>
                    <p>Uncheck without removing payment and chart note</p></td>
            </tr>
        </table>


    </div>


</div> <!-- #wrapper -->

<script type="text/javascript">
    //var sprytextfield1 = new Spry.Widget.ValidationTextField("sprytextfield1", "phone_number", {format:"phone_custom", pattern:"(xxx) xxx-xxxx", useCharacterMasking:true});

    if (jQuery('#sprytextfield1').length) {
        jQuery('#sprytextfield1').mask('(999) 999-9999', {autoclear: false}).on('click', function () {
            if ($(this).val() == '(___) ___-____') {
                $(this).get(0).setSelectionRange(0, 0);
            }
        });
    }


    //Printable view checkbox
    var checkbox = document.getElementById('print-view');

    if (checkbox != null) {
        checkbox.addEventListener('change', (event) => {
            if (event.target.checked) {
                //console.log('checked');
                document.getElementById('patientSearchForm').action = "/mainsearch-print.php";
            } else {
                document.getElementById('patientSearchForm').action = "/mainsearch.php";
            }
        });
    }
</script>

<?php

if (isset($_GET['error']) && $_GET['error'] == 'patient-already-exists') {
    echo '<script>alert("Patient already exists in the database.");</script>';
}

?>


</body>

<script>
    jQuery(document).ready(function ($) {
        $("#expiration_date").datepicker({showOtherMonths: true, selectOtherMonths: true});
        $("#edit_expiration_date").datepicker({showOtherMonths: true, selectOtherMonths: true});


        $('.rclose').on('click', function () {

            var cid = $(this).attr('id');
            cid = cid.substring(1);
            $('#' + cid).prop('checked', false);

            console.log("s=0&id=" + cid + "&location=<?php echo $_SESSION['location']; ?>");

            jQuery.ajax({
                type: "POST",
                url: "/ajax/appointments_paid_update.php",
                data: "s=0&id=" + cid + "&location=<?php echo $_SESSION['location']; ?>",
                success: function (html) {
                },
                error: function (html) {
                }
            });

            $("#uncheck_paid").hide();
            $('#check_window').hide();

        });


        $('#removepayment').on('click', function () {

            console.log("s=0&remove_payment_for_appointment_id=" + $('#remove_payment').data('order_id') + "&payment_val=" + $('#remove_payment').html() + "&patient_id=" + $('#remove_payment').data('patient_id') + "&patient_balance=" + $('#remove_payment').data('patient_balance') + "&location=<?php echo $_SESSION['location']; ?>");


            jQuery.ajax({
                type: "POST",
                url: "/ajax/appointments_paid_update.php",
                data: "s=0&remove_payment_for_appointment_id=" + $('#remove_payment').data('order_id') + "&payment_val=" + $('#remove_payment').html() + "&patient_id=" + $('#remove_payment').data('patient_id') + "&patient_balance=" + $('#remove_payment').data('patient_balance') + "&location=<?php echo $_SESSION['location']; ?>",
                success: function (html) {
                },
                error: function (html) {
                }
            });


            $("#uncheck_paid").hide();
            $('#check_window').hide();

        });


        $('.pclose').on('click', function () {

            var cid = $(this).attr('id');
            cid = cid.substring(1);
            $('#' + cid).prop('checked', false);

            $("#check_paid").hide();
            $('#check_window').hide();

        });


        $('.ppre-paid').on('click', function () {

            var cid = $(this).attr('id');
            cid = cid.substring(1);
            $('#' + cid).prop('checked', true);

            console.log("s=2&id=" + cid + "&location=<?php echo $_SESSION['location']; ?>");

            jQuery.ajax({
                type: "POST",
                url: "/ajax/appointments_paid_update.php",
                data: "s=2&id=" + cid + "&location=<?php echo $_SESSION['location']; ?>",
                success: function (html) {
                },
                error: function (html) {
                }
            });


            $("#check_paid").hide();
            $('#check_window').hide();

        });


        $('.cpaid').on('click', function () {
            $("html, body").animate({scrollTop: 0}, "slow");

            if ($(this).attr("checked") == 'checked') {

                $('#check_window').show();

                $('#ipfio').html($(this).data('fio'));
                $('#ipfio').data('patient_id', jQuery(this).data('patient_id'));
                $('#ipbalance').html($(this).data('patient_balance'));
                $('#ipodredid').html($(this).data('id'));
                $('#ipayment').val($(this).data('appt_cost'));

                $('#check_paid').show();

                $('.pclose').attr('id', 'c' + $(this).data('id'));
                $('.ppre-paid').attr('id', 'c' + $(this).data('id'));
                $('#sendpayment').data('patient_balance', $(this).data('patient_balance'));
                $('#sendpayment').data('id', 's' + $(this).data('id'));

            } else {

                $('#check_window').show();

                $('#remove_payment').data('patient_id', $(this).data('patient_id'));
                $('#remove_payment').data('patient_balance', $(this).data('patient_balance'));
                $('#remove_payment').data('order_id', $(this).data('id'));


                $('#remove_payment').html($(this).data('appt_cost'));

                $('.rclose').attr('id', 'r' + $(this).data('id'));
                $('#removepayment').data('id', 'r' + $(this).data('id'));

                $('#uncheck_paid').show();

            }

        });


        $('#sendpayment').on('click', function () {

            var pmethod = $('#ipmtMethod').val();
            pmethod = pmethod.trim();

            console.log("s=1&id=" + $('#ipodredid').text() + "&location=<?php echo $_SESSION['location']; ?>&patient_id=" + $('#ipfio').data('patient_id') + "&payment_val=" + $('#ipayment').val() + "&pmethod=" + pmethod + "&patient_balance=" + $(this).data('patient_balance'));


            jQuery.ajax({
                type: "POST",
                url: "/ajax/appointments_paid_update.php",
                data: "s=1&id=" + $('#ipodredid').text() + "&location=<?php echo $_SESSION['location']; ?>&patient_id=" + $('#ipfio').data('patient_id') + "&payment_val=" + $('#ipayment').val() + "&pmethod=" + pmethod + "&patient_balance=" + $(this).data('patient_balance'),
                success: function (html) {
                },
                error: function (html) {
                }
            });


            $("#check_paid").hide();
            $('#check_window').hide();

        });


    });


    <?php if ($_SESSION['user_role'] == 'coordinator') { ?>
    $('.cpaid').prop('disabled', true);
    <?php } ?>

</script>

</html>
