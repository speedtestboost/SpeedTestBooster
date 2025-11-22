<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Simple PHP API for any dynamic features
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Handle basic API requests
$path = $_GET['path'] ?? '';

switch ($path) {
    case 'speed-test':
        // Return static response for speed test
        echo json_encode([
            'status' => 'success',
            'message' => 'Speed test initiated',
            'timestamp' => time()
        ]);
        break;
    
    default:
        http_response_code(404);
        echo json_encode(['error' => 'Endpoint not found']);
        break;
}
?>
