<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LabTestRequest;
use App\Http\Resources\LabTestCollection;
use App\Models\LabTest;
use App\Repositories\LabTests\LabTestInterface;
use Exception;
use Illuminate\Http\Request;

class LabTestController extends Controller
{
	private LabTestInterface $labTestRepository;

	public function __construct(LabTestInterface $labTestRepository)
	{
		$this->labTestRepository =  $labTestRepository;
	}

	public function index(Request $request)
	{
		try {
			$response = $this->labTestRepository->index($request);
			return new LabTestCollection($response);
		} catch (Exception $e) {
			return failure($e->getMessage());
		}
	}


	public function store(LabTestRequest $request)
	{
		$response = $this->labTestRepository->store($request);
		if ($response instanceof LabTest) {
			return success("Lab test created successfully", $response);
		}
		return failure($response->getMessage());
	}


	public function update($id, Request $request)
	{
		$response = $this->labTestRepository->update($id, $request);
		if ($response instanceof LabTest) {
			return success("Lab test updated successfully", $response);
		}
		return failure($response->getMessage());
	}


	public function show(LabTest $labTest){
		return success('',$labTest);
	}


	public function trash($id)
	{
		return $this->labTestRepository->trash($id);
	}


	public function delete($id)
	{
		return $this->labTestRepository->delete($id);
	}
}
