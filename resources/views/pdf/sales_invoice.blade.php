

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
      <p class="text-right"><span>Transaction Date: </span>{{$data->transaction_date?date('F j, Y',strtotime($data->transaction_date)):""}}</p>
    </div>
  </div>
  
  <div class="row">
    <h3 class="title text-center">
      Sales Invoice
    </h3>
  </div>

  <div>
    <table class="table">
      <thead>
        <tr>
          <th>Sn</th>
          <th>Item Description</th>
          <th>Batch</th>
          <th>Qty (Rs)</th>
          <th>Rate (Rs)</th>
          <th>Amount (Rs)</th>
        </tr>
      </thead>
      <tbody>
        @if(isset($data->sales) && count($data->sales)>0)
          @foreach ($data->sales as $key=> $p)
            <tr>
              <td>{{$key+1}}</td>
              <td>{{$p->purchase?$p->purchase->product->name:''}}</td>
              <td>{{$p->purchase?$p->purchase->batch:''}}</td>
              <td>{{salesQuantityFormatter($p)}}</td>
              <td>{{$p->rate}}</td>
              <td>{{$p->total}}</td>
            </tr>
          @endforeach
        @else
          <tr>
            <td colspan="6" class="text-center">Sorry no items found </td>
          </tr>
        @endif
      </tbody>
      <tfoot>
        <tr>
          <td colspan="5" class="text-left">
            Total
          </td>
          <td>
            @if(isset($data->sales) && count($data->sales)>0)
              @php
                $total = 0;
                foreach($data->sales as $p){
                  $total = $total+ $p->total;
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
    <div class="w-50 ml-auto">
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

@php
  function salesQuantityFormatter ($item){
  if($item){    
      if($item->purchase && $item->purchase->product && $item->purchase->product->has_sub_units){
        $arr = explode('.',$item->quantity);
        if(count($arr)>1){
          
          return $arr[0].' unit  '.$arr[1]." ".$item->purchase->product->sub_unit_name;
        }
      }
    
    return $item->quantity;
  }

  return 0;
  }
@endphp