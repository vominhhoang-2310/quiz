<?php
// Replace with your actual Google Apps Script URL
$googleScriptUrl = "https://script.google.com/macros/s/AKfycbx0xBBWTa7sJiIna6qolBTLHp2PngMSW3MdWDyBUIY8Ua8a8vDPoEEQTO2KxthPNj1pmA/exec";

// Forward the POST request to the Google Apps Script
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Fetch the incoming data
    $postData = file_get_contents('php://input');

    // Set up a cURL request to the Google Apps Script
    $ch = curl_init($googleScriptUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);

    // Execute the request and get the response
    $response = curl_exec($ch);
    curl_close($ch);

    // Return the response to the frontend
    echo $response;
} else {
    http_response_code(405); // Method Not Allowed
    echo json_encode(["error" => "Only POST requests are allowed."]);
}
?>