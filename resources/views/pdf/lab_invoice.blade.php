

@extends('pdf.layout')


@section('content')
<div class="container">
  <div class="row">
   
    {{-- <div class="col-md-12 text-center"> --}}
      {{-- <img src="{{asset('logo.png')}}" alt="" class="img-fluid"> --}}
      {{-- <h2 class="title">
        ARADHANA PHARMACY
      </h2>
    </div> --}}
   
  </div>
  <div class="row pt-2">
    {{-- <div class="w-50">
      <p><span>Pan: </p>
      <p>Tokha 8, Kathmandu</p>
      <p><span>Phone: 4351828</span></p>
    </div> --}}
    <div class="w-50 ml-auto">
      <p class="text-right"><span>Customer: </span>{{$data->customer?$data->customer->name:$data->customer_name}}</p>
      <p class="text-right"><span>Invoice No: </span>{{$data->invoice_number?:""}}</p>
      <p class="text-right"><span>Transaction Date: </span>{{$data->invoice_date?date('F j, Y',strtotime($data->invoice_date)):""}}</p>
    </div>
  </div>
  
  <div class="row">
    <h3 class="title text-center">
      Lab Invoice
    </h3>
  </div>

  <div>
    @if(isset($data->tests) && count($data->tests))
      <table class="table">
        @foreach($data->tests as $tests)
          <thead>
            <tr>
              <th colspan="3">{{$tests->name}}</th>
            </tr>
          </thead>
      
          @if(isset($tests->tests) && count($tests->tests)>0)
            @foreach ($tests->tests as $key=> $test)
            <tbody>
              <tr>
                <th>Sn</th>
                <th>Name</th>
                <th>Price (Rs)</th>
              </tr>
              <tr>
                <td>{{$key+1}}</td>
                <td>{{$test->name}}</td>
                <td>{{$test->price}}</td>
              </tr>
            </tbody>
            @endforeach
          @endif
        @endforeach
      @endif
      <tfoot>
        <tr>
          <td colspan="2" class="text-left">
            Total
          </td>
          <td>
            @if(isset($data->tests) && count($data->tests)>0)
              @php
                $total = 0;
                foreach($data->tests as $p){
                  foreach($p->tests as $t){
                    $total = $total + $t->price;
                  }
                }
                echo 'Rs'. $total;
              @endphp
              @else
              0
            @endif
          </td>
          <td></td>
        </tr>
      </tfoot>
   </table>
  </div>

  <div class="row">
    <div class="w-100">
      <table class="table">
        <tbody>
          @if(isset($data->alterations) && count($data->alterations)>0)
            @foreach ($data->alterations as $a)
              <tr>
                <td>{{$a->name}}</td>
                <td>{{$a->operation === "sub"?'-':"+"}} {{$a->amount}}</td>
              </tr>
            @endforeach
          @endif
        </tbody>
        <tfoot>
          <tr>
            <td>Grand total</td>
            <td>Rs {{$data->amount}}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>

  <div class="row pt-2">
   @if(isset($data->note))
   Note:{{$data->note}}
   @endif
  </div>
</div>
@endsection
