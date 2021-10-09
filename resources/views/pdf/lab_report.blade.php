

@extends('pdf.layout')


@section('content')
<div class="container">
  <div class="row">
   
    <div class="col-md-12 text-center">
      {{-- <img src="{{asset('logo.png')}}" alt="" class="img-fluid"> --}}
      <h2 class="title">
        ARADHANA PHARMACY
      </h2>
    </div>
   
  </div>
  <div class="row pt-2">
    <div class="w-50">
      <p><span>Pan: </p>
      <p>Tokha 8, Kathmandu</p>
      <p><span>Phone: 4351828</span></p>
    </div>
    <div class="w-50 ml-auto">
      <p class="text-right"><span>Customer: </span>{{$data->customer?$data->customer->name:$data->customer_name}}</p>
      <p class="text-right"><span>Invoice No: </span>{{$data->invoice_number?:""}}</p>
      <p class="text-right"><span>Transaction Date: </span>{{$data->invoice_date?date('F j, Y',strtotime($data->invoice_date)):""}}</p>
    </div>
  </div>
  
  <div class="row">
    <h3 class="title text-center">
      Lab Report
    </h3>
  </div>

  <div class="table-border">
    @if(isset($data->tests) && count($data->tests))
      <table class="table w-100">
        @foreach($data->tests as $tests)
          <thead>
            <tr>
              <th colspan="4">{{$tests->name}}</th>
            </tr>
          </thead>
      
          @if(isset($tests->tests) && count($tests->tests)>0)
            @foreach ($tests->tests as $key=> $test)
            <tbody>
              @if($key === 0)
              <tr>
                <th>Sn</th>
                <th>Name</th>
                <th>Normal</th>
                <th>Result</th>
              </tr>
              @endif
              <tr>
                <td>{{$key+1}}</td>
                <td>{{$test->name}}</td>
                <td>{{$test->normal}}</td>
                <td>{{$test->result}}</td>
              </tr>
            </tbody>
            @endforeach
          @endif
        @endforeach
      @endif
   </table>
  </div>

  <div class="row pt-2">
   @if(isset($data->note))
   Note:{{$data->note}}
   @endif
  </div>
</div>
@endsection
