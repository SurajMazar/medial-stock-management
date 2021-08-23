<?php

namespace App\Repositories\LabTests;

  interface LabTestInterface{
    public function index($request);
    public function store($request);
    public function update($id,$request);
    public function trash($id);
    public function delete($id);
  }
?>