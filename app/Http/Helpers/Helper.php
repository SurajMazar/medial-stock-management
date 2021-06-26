<?php
function success($message, $data = null)
{
  $responseData = [
    'success' => true,
    'message' => $message,
  ];

  if (null != $data) {
    $responseData['data'] = $data;
  }

  return response()->json($responseData, 200);
}


function failure($message, $statusCode = 500, $data = null)
{
  $responseData = [
    'success' => false,
    'message' => $message,
  ];
  if (null != $data) {
    $responseData['data'] = $data;
  }
  return response()->json($responseData, $statusCode);
}
?>