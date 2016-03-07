<?php
function initiateConnection()
{
    global $command, $players, $items, $refundPeople, $refundAmount, $conn, $a;
    $servername   = "5.133.180.163";
    $username     = "outbreak_pstore";
    $password     = "TqNxL;MnmNyp";
    $dbname       = "outbreak_store2";
    $refundPeople = Array();
    $refundAmount = 0;
    $a            = Array();
    
    /*
    Array store_items
    (
        [id] => 962
        [player_id] => 7072
        [type] => hat
        [unique_id] => models/store/hats/afro.mdl
        [date_of_purchase] => 1423782508
        [date_of_expiration] => 0
        [price_of_purchase] => 150
    )
    
    Array store_players
    (
        [id] => 9161
        [authid] => 1:47577598
        [name] => Kikud
        [credits] => 0
        [date_of_join] => 1425727250
        [date_of_last_join] => 1425727250
    )
    */
    
    $conn = new mysqli($servername, $username, $password, $dbname);
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error . "\n");
    }
    
    $players = $conn->query("SELECT * FROM store_players;");
    $items   = $conn->query("SELECT * FROM store_items;");

    foreach ($items as $value) {
        $refundAmount = $value['price_of_purchase'];
        findPlayer($value['player_id'], $value['date_of_purchase']);
    }
    foreach($a as $id=>$credits) {
        $oldCredits = $conn->query("SELECT * FROM store_players WHERE id=" . $id);
        $oldCredits = $oldCredits->fetch_assoc();
        $oldCredits = $oldCredits['credits'];
        $credits = $credits + $oldCredits;
        print("Refunded " . $credits . " credits to " . $id . ".  Original: " . $oldCredits . "\n");
        $sql = "UPDATE store_players SET credits=" . $credits . " WHERE id=" . $id;
        $update = $conn->query($sql);
        $sql = "DELETE FROM store_items WHERE player_id=" . $id;
        $delete = $conn->query($sql);
    }}

function findPlayer($player_id, $purchaseDate)
{
    global $players, $mask, $refundPeople, $refundAmount, $a;
    foreach ($players as $value) {
        if ($value['id'] == $player_id) {
            array_push($refundPeople, $value['id']);
            $newCredits = $value['credits'] + $refundAmount;
            refundPlayer($value['id'], $refundAmount, $purchaseDate);
        }
    }
}

function refundPlayer($player_id, $amount, $purchaseDate) 
{
    global $conn, $a;
    if (isset($a[$player_id])) {
        $a[$player_id] += $amount;
    } else {
        $a[$player_id] = $amount;
    }
}

initiateConnection();

?>
